// Lib
import {
  capture,
  telemetryFactory,
  IconByName,
  Layout,
  calendar,
  H1,
  classRegistryService,
  studentRegistryService,
  overrideColorTheme,
  BodySmall,
  getApiConfig,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest1 from "../manifest.json";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, FlatList, HStack, Stack, VStack, Button } from "native-base";
import moment, { Moment } from "moment";

// Components
import { TimeBar } from "components/simple/TimeBar/TimeBar";
import { GetAttendance } from "../services/calls/registryCalls";
import { MultipleAttendance } from "components/composite/MultipleAttendance";
import AttendanceComponent from "components/composite/AttendanceComponent";
import Loader from "../components/simple/Loader";
import FourOFour from "../components/simple/FourOFour";

// Utils
import { sortByAdmissionNo, sortByName } from "utils/functions/StudentSorts";
import { colors, colorTheme } from "utils/functions/ColorTheme";
import { PRESENT, ABSENT } from "utils/functions/Constants";
import {
  isMoment,
  isMoment2DArray,
  isMomentArray,
} from "utils/types/typeGuards";

export default function Attendance({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [weekPage, setWeekPage] = useState(0);
  const [allAttendanceStatus, setAllAttendanceStatus] = useState<{
    success?: string;
    fail?: string;
  }>({});
  const [students, setStudents] = useState([]);
  const [searchStudents, setSearchStudents] = useState([]);
  const [classObject, setClassObject] = useState<any>({});
  let { classId } = useParams();
  if (!classId) classId = "9eae88b7-1f2d-4561-a64f-871cf7a6b3f2";
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [sms, setSms] = useState([]);
  const teacherId = localStorage.getItem("id");
  const [attendanceStartTime, setAttendanceStartTime] = useState<Moment>();
  const [unmarkStudents, setUnmarkStudents] = useState([]);
  const navigate = useNavigate();
  const [manifest, setManifest] = React.useState<any>();

  useEffect(() => {
    let studentIds = attendance
      .filter((e) => e.attendance !== "Unmarked")
      .map((e) =>
        e?.studentId?.startsWith("1-")
          ? e?.studentId?.replace("1-", "")
          : e?.studentId
      );
    setUnmarkStudents(
      students.filter(
        (e) =>
          !studentIds.includes(
            e.id.startsWith("1-") ? e.id.replace("1-", "") : e.id
          )
      )
    );
  }, [attendance, students]);

  useEffect(() => {
    const filterStudent = students.filter((e) =>
      e?.fullName?.toLowerCase().match(search?.toLowerCase())
    );
    setSearchStudents(filterStudent);
  }, [search, students]);

  useEffect(() => {
    let ignore = false;
    async function getData() {
      const newManifest = await getApiConfig();
      setManifest(newManifest);
      const studentData = await studentRegistryService.getAll({ classId });
      if (
        newManifest?.["attendance_card.order_of_attendance_card"] ===
        '"Alphabetically"'
      ) {
        setStudents(sortByName(studentData));
      } else {
        setStudents(sortByAdmissionNo(studentData));
      }
      setSearchStudents(studentData);
      if (!ignore)
        setClassObject(await classRegistryService.getOne({ id: classId }));

      setSms(
        studentData.map((e, index) => ({
          type: index % 2 === 0 ? ABSENT : PRESENT,
          date: moment().add(-1, "days").format("Y-MM-DD"),
          studentId: e.id,
        }))
      );
    }
    getData();
    return () => {
      ignore = true;
    };
  }, [classId]);

  useEffect(() => {
    let ignore = false;
    async function getData() {
      if (!ignore) await getAttendance();
    }
    getData();
    return () => {
      ignore = true;
    };
  }, [weekPage]);

  const getAttendance = async () => {
    let weekdays = calendar(weekPage, "week");
    // type guard
    if (isMoment(weekdays) || isMoment2DArray(weekdays)) return;
    let params = {
      fromDate: weekdays?.[0]?.format("Y-MM-DD"),
      toDate: weekdays?.[weekdays.length - 1]?.format("Y-MM-DD"),
    };
    const attendanceData = await GetAttendance(params);
    setAttendance(attendanceData);
  };

  const newSetIsEditDisabled = (isEditDisabled) => {
    setIsEditDisabled(isEditDisabled);
    if (!isEditDisabled) {
      const telemetryData = telemetryFactory.start({
        appName,
        type: "Attendance-Start",
        groupID: classId,
      });
      capture("START", telemetryData);
      setAttendanceStartTime(moment());
    } else {
      const telemetryData = telemetryFactory.end({
        appName,
        type: "Attendance-End",
        groupID: classId,
        duration: attendanceStartTime
          ? moment().diff(attendanceStartTime, "seconds")
          : 0,
        percentage:
          ((students?.length - unmarkStudents.length) / students?.length) * 100,
      });
      capture("END", telemetryData);
      setAttendanceStartTime(moment());
    }
  };

  if (!classObject && !classObject?.name) {
    return <FourOFour />;
  }

  if (loading) {
    return (
      <Loader
        success={allAttendanceStatus.success}
        fail={allAttendanceStatus.fail}
      />
    );
  }

  return (
    // @ts-ignore
    <Layout
      _header={{
        title: classObject?.title ? classObject?.title : "",
        // isEnableSearchBtn: true,
        // setSearch: setSearch,
        subHeading: t("ATTENDANCE_REGISTER"),
        iconComponent: (
          <Button
            variant="outline"
            rounded="full"
            px={5}
            py={1}
            bg={colorTheme.reportbtnBg}
            textTransform="capitalize"
            alignItems="center"
            // @ts-ignore
            rightIcon={<IconByName name="ArrowDownSLineIcon" isDisabled />}
            onPress={(e) => navigate("/attendance/report")}
          >
            {t("Report")}
          </Button>
        ),
      }}
      _appBar={{
        languages: manifest1.languages,
        isEnableSearchBtn: true,
        setSearch: setSearch,
      }}
      subHeader={
        <HStack p={1} space="4" justifyContent="space-between">
          <VStack>
            <H1>{classObject?.title ? classObject?.title : ""}</H1>
            <BodySmall>
              {t("TOTAL") + " " + students.length + " " + t("STUDENTS")}
            </BodySmall>
          </VStack>
          {
            // @ts-ignore
            <IconByName
              size="50"
              mt="8px"
              name="ArrowRightSLineIcon"
              onPress={(e) => navigate(`/students/class/${classId}`)}
            />
          }
        </HStack>
      }
      _subHeader={{ bg: colorTheme.attendanceCardBg }}
      _footer={footerLinks}
    >
      <Stack space={1}>
        <Box bg={colors.white} px="4" py="30">
          <HStack space="4" justifyContent="space-between" alignItems="center">
            <TimeBar
              setPage={setWeekPage}
              page={weekPage}
              previousDisabled={
                Math.abs(weekPage) >=
                moment()
                  .startOf("week")
                  .diff(
                    moment(
                      manifest?.[
                        "class_attendance.date_till_previous_attendance_allow"
                      ]
                    ).startOf("week"),
                    "week"
                  )
              }
              nextDisabled={weekPage >= 0}
              leftErrorText={
                !isEditDisabled
                  ? {
                      title:
                        "Please click on save before moving to the previous page.",
                      status: "error",
                      placement: "top",
                    }
                  : false
              }
              rightErrorText={
                !isEditDisabled
                  ? {
                      title:
                        "Please click on save before moving to the next page.",
                      status: "error",
                      placement: "top",
                    }
                  : false
              }
              type="week"
            />

            <Button
              variant="ghost"
              colorScheme="button"
              endIcon={
                <IconByName
                  name={isEditDisabled ? "PencilLineIcon" : "CheckLineIcon"}
                  isDisabled
                  _icon={{ width: "18", height: "18" }}
                  w="18px"
                  h="18px"
                />
              }
              _text={{
                fontSize: "14px",
                fontWeight: "500",
                textTransform: "capitalize",
              }}
              onPress={(e) => {
                newSetIsEditDisabled(!isEditDisabled);
              }}
            >
              {isEditDisabled ? t("EDIT") : t("CANCEL")}
            </Button>
          </HStack>
        </Box>
      </Stack>
      <Box bg={colors.white} py="10px" px="5">
        <FlatList
          // @ts-ignore
          data={searchStudents}
          renderItem={({ item, index }) => (
            <AttendanceComponent
              manifest={manifest}
              hidePopUpButton={false}
              page={weekPage}
              student={item}
              sms={sms.filter((e) => e.studentId === item.id)}
              // @ts-ignore
              withDate={1}
              attendanceProp={attendance}
              isEditDisabled={isEditDisabled}
              appName
            />
          )}
          keyExtractor={(item, index) => (item?.id ? item?.id : index)}
        />
      </Box>
      <MultipleAttendance
        isWithEditButton={false}
        {...{
          manifest,
          students,
          attendance,
          getAttendance,
          setLoading,
          setAllAttendanceStatus,
          allAttendanceStatus,
          classId,
          classObject,
          isEditDisabled,
          setIsEditDisabled: newSetIsEditDisabled,
          appName,
        }}
      />
    </Layout>
  );
}
