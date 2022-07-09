// Lib
import moment from "moment";
import { Box, FlatList, HStack, Stack, Text, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  IconByName,
  Layout,
  Collapsible,
  getStudentsPresentAbsent,
  getUniqAttendance,
  calendar,
  H2,
  Caption,
} from "@shiksha/common-lib";
import { useNavigate, useParams } from "react-router-dom";

// Components
// Lazy Loading
// @ts-ignore
import { CalendarBar } from "components/composite/CalendarBar";
import AttendanceComponent from "components/composite/AttendanceComponent";

// Services
import {
  DefaultStudents,
  GetAllStudents,
  GetAttendance,
  GetOneClass,
} from "../../services/calls/registryCalls";
import manifest from "../../manifest.json";

// Utils
import { colorTheme } from "utils/functions/ColorTheme";
import { IconComponent } from "components/simple/IconComponent";
import { PresentStudentsSummary } from "components/composite/PresentStudentsSummary";
import { StudentCardsList } from "components/composite/StudentCardsList";
import { CardListHolder } from "components/composite/CardListHolder";
import { CompareAttendanceModal } from "components/simple/CompareAttendanceModal";
import { isMoment, isMoment2DArray } from "utils/types/typeGuards";
import { CompareReportHeading } from "components/simple/CompareReportHeading";

export default function ClassReportDetail({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classObject, setClassObject] = useState<any>({});
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [compare, setCompare] = useState();
  const [compareAttendance, setCompareAttendance] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [presentCount, setPresentCount] = useState(0);
  const [thisTitle, setThisTitle] = useState("");
  const [lastTitle, setLastTitle] = useState("");

  const teacherId = localStorage.getItem("id");

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      if (!ignore && compare) {
        setThisTitle(compare === "week" ? t("THIS_WEEK") : t("THIS_MONTH"));
        setLastTitle(compare === "week" ? t("LAST_WEEK") : t("LAST_MONTH"));
        let classObj = await GetOneClass(classId);
        const studentData = await GetAllStudents(classId);
        setClassObject(classObj);
        setStudents(studentData);
        const { attendanceData, workingDaysCount } = await getAttendance(
          0,
          true
        );
        setAttendance(attendanceData);
        setPresentCount(
          getUniqAttendance(attendanceData, "Present", studentData).length
        );
        const newCompareAttendance = await getAttendance(-1);
        setCompareAttendance(newCompareAttendance);

        setPresentStudents(
          await DefaultStudents(
            getStudentsPresentAbsent(
              attendanceData,
              studentData,
              workingDaysCount
            )
          )
        );
        setAbsentStudents(
          await DefaultStudents(
            getStudentsPresentAbsent(attendanceData, studentData, 3, "Absent")
          )
        );
      }
    };
    getData();
    return () => {
      ignore = true;
    };
  }, [classId, compare, page, t]);

  const getAttendance = async (newPage = 0, withCount = false) => {
    let weekdays = calendar(
      newPage ? newPage + page : page,
      ["days", "week"].includes(compare) ? "week" : compare
    );
    if (isMoment(weekdays) || isMoment2DArray(weekdays)) return {};
    let workingDaysCount = weekdays.filter((e) => e.day())?.length;
    let params = {
      fromDate: weekdays?.[0]?.format("Y-MM-DD"),
      toDate: weekdays?.[weekdays.length - 1]?.format("Y-MM-DD"),
    };
    if (withCount) {
      return { attendanceData: await GetAttendance(params), workingDaysCount };
    } else {
      return await GetAttendance(params);
    }
  };

  return (
    // @ts-ignore
    <Layout
      _header={{
        title: t("MY_CLASS"),
        subHeading: moment().format("hh:mm A"),
        _subHeading: { fontWeight: 500 },
        iconComponent: (
          <IconComponent
            iconName={"ArrowDownSLineIcon"}
            lastTitle={lastTitle}
          />
        ),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <Stack>
          <H2>{classObject.name}</H2>
          <Caption>
            {t("TOTAL")}: {students.length} {t("PRESENT")}:{presentCount}
          </Caption>
        </Stack>
      }
      _subHeader={{ bg: colorTheme.bgReportCard, mb: 1 }}
      _footer={footerLinks}
    >
      {compare ? (
        <VStack space="1">
          <Box bg={colorTheme.white} p="5">
            <HStack
              space="4"
              justifyContent="space-between"
              alignItems="center"
            >
              <CalendarBar
                _box={{ p: 0 }}
                {...{ page, setPage }}
                view={compare}
              />
              {
                // @ts-ignore
                <IconByName name={"ListUnorderedIcon"} isDisabled />
              }
            </HStack>
          </Box>
          <PresentStudentsSummary
            students={students}
            attendance={attendance}
            compareAttendance={compareAttendance}
            thisTitle={thisTitle}
            lastTitle={lastTitle}
            page={page}
            compare={compare}
            presentCount={presentCount}
          />
          <CardListHolder
            _textMed={`100% ${thisTitle}`}
            _textSmall={presentStudents?.length + " " + t("STUDENTS")}
          >
            <StudentCardsList
              thisTitle={thisTitle}
              lastTitle={lastTitle}
              data={presentStudents}
              appName={appName}
              attendance={attendance}
              compareAttendance={compareAttendance}
              _bgColor={colorTheme.presentCardCompareBg}
              _textColor={colorTheme.presentCardText}
              _textCompareColor={colorTheme.presentCardCompareText}
            />
          </CardListHolder>
          <CardListHolder
            _textSmall={absentStudents?.length + " " + t("STUDENTS")}
            _textMed={t("ABSENT_CONSECUTIVE_3_DAYS")}
          >
            <StudentCardsList
              thisTitle={thisTitle}
              lastTitle={lastTitle}
              data={absentStudents}
              appName={appName}
              attendance={attendance}
              compareAttendance={compareAttendance}
              _bgColor={colorTheme.absentCardCompareBg}
              _textColor={colorTheme.absentCardText}
              _textCompareColor={colorTheme.absentCardCompareText}
            />
          </CardListHolder>
          <Box bg="white" p={4}>
            <Stack space={2}>
              <Collapsible
                defaultCollapse={true}
                isHeaderBold={false}
                // @ts-ignore
                header={
                  <CompareReportHeading
                    _textMed={t("STUDENT_WISE_ATTENDANCE")}
                    _textSmall={students?.length + " " + t("STUDENTS")}
                  />
                }
              >
                <FlatList
                  // @ts-ignore
                  data={students}
                  renderItem={({ item, index }) => (
                    <AttendanceComponent
                      isEditDisabled
                      type={compare === "monthInDays" ? "month" : "weeks"}
                      _weekBox={[{}, { bg: colorTheme.weekCardCompareBg }]}
                      page={[page, page - 1]}
                      student={item}
                      // @ts-ignore
                      withDate={1}
                      attendanceProp={[...attendance, ...compareAttendance]}
                      getAttendance={getAttendance}
                      _card={{ hidePopUpButton: true }}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                />
              </Collapsible>
            </Stack>
          </Box>
        </VStack>
      ) : (
        <CompareAttendanceModal
          showModal={showModal}
          setShowModal={setShowModal}
          appName={appName}
          navigate={navigate}
          setCompare={setCompare}
          classId={classId}
        />
      )}
    </Layout>
  );
}
