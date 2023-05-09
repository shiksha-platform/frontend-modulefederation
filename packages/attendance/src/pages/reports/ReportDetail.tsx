// Lib
import moment, { Moment } from "moment";
import { Box, FlatList, HStack, Stack, Text, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CalendarBar } from "components/composite/CalendarBar";
import AttendanceComponent from "../../components/composite/AttendanceComponent";
import { ReportSummary } from "../../components/simple/ReportSummary";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Collapsible } from "components/simple/Collapsible";

import {
  IconByName,
  Layout,
  getStudentsPresentAbsent,
  getUniqAttendance,
  capture,
  telemetryFactory,
  calendar,
  classRegistryService,
  studentRegistryService,
  overrideColorTheme,
  BodyLarge,
  H2,
  Caption,
  Subtitle,
} from "@shiksha/common-lib";
import colorTheme from "../../colorTheme";
import { GetAttendanceReport } from "utils/functions/GetAttendanceReport";
import { ReportDetailData } from "components/composite/ReportDetailData";
import { CompareReportHeading } from "components/simple/CompareReportHeading";
import { usePAStudents } from "utils/customhooks/usePAStudents";

const colors = overrideColorTheme(colorTheme);

export default function ReportDetail({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const { classId, view } = useParams();
  const [classObject, setClassObject] = useState<any>({});
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [attendanceForReport, setAttendanceForReport] = useState([]);
  const [presentStudents] = usePAStudents({
    students,
    attendance,
    type: "present",
  });
  const [absentStudents] = useState({
    students,
    attendance,
    type: "absent",
  });
  const [calendarView] = useState(
    view
      ? ["month", "monthInDays"].includes(view)
        ? "monthInDays"
        : ["week", "weeks"].includes(view)
        ? "week"
        : "days"
      : "days"
  );
  const teacherId = localStorage.getItem("id");
  const [attendanceStartTime, setAttendanceStartTime] = useState<Moment>();
  const navigate = useNavigate();

  useEffect(() => {
    const telemetryData = telemetryFactory.start({
      appName,
      type: "Attendance-Full-Report-Start",
      groupID: classId,
    });
    capture("START", telemetryData);
    setAttendanceStartTime(moment());
  }, []);

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      let classObj = await classRegistryService.getOne({ id: classId });
      if (!ignore) setClassObject(classObj);
      const studentData = await studentRegistryService.getAll({ classId });
      setStudents(studentData);
      await getAttendance();
      await getAttendanceForReport();
    };
    getData();
    return () => {
      ignore = true;
    };
  }, [classId, page]);

  const getAttendance = async () => {
    const attendanceData = await GetAttendanceReport(
      page,
      calendar,
      calendarView,
      "getAttendance"
    );
    setAttendance(attendanceData);
  };

  const getAttendanceForReport = async () => {
    const attendanceData = await GetAttendanceReport(
      page,
      calendar,
      calendarView,
      "getAttendanceForReport"
    );
    setAttendanceForReport(attendanceData);
  };

  const handleBackButton = () => {
    const telemetryData = telemetryFactory.end({
      appName,
      type: "Attendance-Full-Report-End",
      groupID: classId,
      duration: attendanceStartTime
        ? moment().diff(attendanceStartTime, "seconds")
        : 0,
    });
    capture("END", telemetryData);
    navigate(-1);
  };

  return (
    // @ts-ignore
    <Layout
      _appBar={{
        onPressBackButton: handleBackButton,
      }}
      _header={{
        title: t("REPORT_DETAILS"),
        // @ts-ignore
        subHeading: classObject?.name,
        iconComponent: (
          <Link
            to={"/attendance/reportCompare/" + classId}
            style={{ textDecoration: "none" }}
          >
            <Box
              rounded={"full"}
              px="4"
              py="1"
              borderColor={colors.primary}
              borderWidth={1}
            >
              <HStack space="2">
                <BodyLarge color={colors.primary}>{t("COMPARE")}</BodyLarge>
                {
                  //@ts-ignore
                  <IconByName
                    color={colors.primary}
                    name="ArrowDownSLineIcon"
                    isDisabled
                  />
                }
              </HStack>
            </Box>
          </Link>
        ),
      }}
      subHeader={
        <Stack>
          <H2>
            {(classObject?.name ? "Class " + classObject?.name : "") +
              (classObject?.section ? " Sec " + classObject?.section : "")}
          </H2>
          <Caption>
            {t("TOTAL")}: {students.length} {t("PRESENT")}:
            {
              attendanceForReport.filter((e) => e.attendance === "Present")
                .length
            }
          </Caption>
        </Stack>
      }
      _subHeader={{ bg: colorTheme.reportCardBackg, mb: 1 }}
      _footer={footerLinks}
    >
      <VStack space="1">
        <Box bg="white" p="5">
          <HStack space="4" justifyContent="space-between" alignItems="center">
            <CalendarBar
              _box={{ p: 0 }}
              {...{ page, setPage }}
              view={calendarView}
            />
            {
              // @ts-ignore
              <IconByName name={"ListUnorderedIcon"} isDisabled />
            }
          </HStack>
        </Box>
        <Box bg="white" p="5">
          <Box borderBottomWidth={1} borderBottomColor={colorTheme.coolGray}>
            {
              // @ts-ignore
              <Collapsible
                defaultCollapse={true}
                header={
                  <VStack>
                    <H2>{t("SUMMARY")}</H2>
                    <Caption>
                      {t("TOTAL")}: {students.length} {t("PRESENT")}:
                      {
                        getUniqAttendance(
                          attendanceForReport,
                          "Present",
                          students
                        ).length
                      }
                    </Caption>
                  </VStack>
                }
                body={
                  <VStack pt="5">
                    <ReportSummary
                      {...{
                        students,
                        attendance: [attendanceForReport],
                        calendarView,
                      }}
                    />
                    <Subtitle py="5" px="10px" color={colorTheme.grayInLight}>
                      {/* @ts-ignore*/}
                      <Text bold color={colorTheme.darkGray}>
                        {t("NOTES")}
                        {": "}
                      </Text>
                      {t("MONTHLY_REPORT_WILL_GENRRATED_LAST_DAY_EVERY_MONTH")}
                    </Subtitle>
                  </VStack>
                }
              />
            }
          </Box>
        </Box>
        <ReportDetailData
          appName={appName}
          data={presentStudents}
          calendarView={calendarView}
          type="present"
        />
        <ReportDetailData
          appName={appName}
          data={absentStudents}
          calendarView={calendarView}
          type="absent"
        />
        <Box bg={colors.white} p={4}>
          <Stack space={2}>
            {
              // @ts-ignore
              <Collapsible
                defaultCollapse={true}
                isHeaderBold={false}
                header={
                  <CompareReportHeading
                    _textSmall={students?.length + " " + t("STUDENTS")}
                    _textMed={t("STUDENT_WISE_ATTENDANCE")}
                  />
                }
                body={
                  <FlatList
                    // @ts-ignore
                    data={students}
                    renderItem={({ item, index }) => (
                      <AttendanceComponent
                        isEditDisabled
                        page={page}
                        student={item}
                        // @ts-ignore
                        withDate={1}
                        type={
                          calendarView === "monthInDays"
                            ? "month"
                            : calendarView === "days"
                            ? "weeks"
                            : "weeks"
                        }
                        attendanceProp={attendance}
                        getAttendance={getAttendance}
                        _card={{ hidePopUpButton: true }}
                      />
                    )}
                    keyExtractor={(item) => item.id}
                  />
                }
              />
            }
          </Stack>
        </Box>
      </VStack>
    </Layout>
  );
}
