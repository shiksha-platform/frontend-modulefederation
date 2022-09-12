import { Box, Menu, Button, Text, VStack, Center } from "native-base";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CalendarBar from "../../components/CalendarBar/CalendarBar";
import {
  IconByName,
  Layout,
  Collapsible,
  capture,
  calendar,
  classRegistryService,
  studentRegistryService,
  overrideColorTheme,
  H1,
  H2,
  Caption,
  Subtitle,
  getApiConfig,
  getArray,
  Loading,
} from "@shiksha/common-lib";
import { GetAttendance } from "../../components/AttendanceComponent";
import ReportSummary from "../../components/ReportSummary";
import { useNavigate } from "react-router-dom";
import manifestLocal from "../../manifest.json";
import colorTheme from "../../colorTheme";

const colors = overrideColorTheme(colorTheme);

export default function Report({ footerLinks, config }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [classes, setClasses] = useState([]);
  const teacherId = localStorage.getItem("id");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [calendarView, setCalendarView] = React.useState();
  const [makeDefaultCollapse, setMakeDefaultCollapse] = useState(false);
  const titleName = t("ATTENDANCE_REPORTS");
  const [reportTypes, setReportTypes] = React.useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(async () => {
    let ignore = false;
    if (!ignore) {
      if (classes[0]?.id) getAttendance(classes[0].id);
      setMakeDefaultCollapse(makeDefaultCollapse);
    }
    return () => {
      ignore = true;
    };
  }, [page, calendarView, classes]);

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      const arr = getArray(config?.["Attendance.report_types"]);
      setReportTypes(arr);
      if (arr.includes("daily-report")) {
        setCalendarView("days");
      } else if (arr.includes("weekly-report")) {
        setCalendarView("week");
      } else if (arr.includes("monthly-report")) {
        setCalendarView("monthInDays");
      }

      let responceClass = await classRegistryService.getAll({
        teacherId: teacherId,
        type: "class",
        role: "teacher",
      });
      if (!ignore) {
        if (responceClass[0].id) getAttendance(responceClass[0].id);
        setClasses(responceClass);
      }
    };
    getData();
    setLoading(false);
    return () => {
      ignore = true;
    };
  }, [teacherId]);

  useEffect(() => {
    capture("PAGE");
  }, []);

  const getAttendance = async (classId) => {
    let weekdays = calendar(page, calendarView);
    let params = {
      fromDate: weekdays?.[0]?.format("Y-MM-DD"),
      toDate: weekdays?.[weekdays.length - 1]?.format("Y-MM-DD"),
    };
    const attendanceData = await GetAttendance(params);
    setAttendance({ ...attendance, [classId]: attendanceData });
    const studentData = await studentRegistryService.getAll({ classId });
    setStudents({ ...students, [classId]: studentData });
  };

  if (loading) {
    return <Loading />;
  }

  if (!calendarView) {
    return (
      <Center>
        <Center bg="attendace.cardBg" height={window.innerHeight}>
          <H1 textTransform="inherit">{t("REPORT_CONFIG_TYPE_NOT_FOUND")}</H1>
        </Center>
      </Center>
    );
  }

  return (
    <Layout
      _header={{
        title: (
          <VStack>
            {titleName.split(" ").map((item, subIndex) => (
              <H1 key={subIndex}>{item}</H1>
            ))}
          </VStack>
        ),
        iconComponent: (
          <Menu
            w="120"
            placement="bottom right"
            trigger={(triggerProps) => {
              return (
                <Button
                  {...triggerProps}
                  rounded="20"
                  px={5}
                  py="7px"
                  _text={{
                    color: colors.white,
                    fontSize: "14px",
                    lineHeight: "18px",
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}
                  rightIcon={
                    <IconByName
                      color={colors.white}
                      name="ArrowDownSLineIcon"
                      isDisabled
                      p="0"
                    />
                  }
                >
                  {calendarView === "monthInDays"
                    ? t("MONTH_VIEW")
                    : calendarView === "week"
                    ? t("WEEK_VIEW")
                    : t("TODAY_VIEW")}
                </Button>
              );
            }}
          >
            {reportTypes.includes("daily-report") ? (
              <Menu.Item onPress={(item) => setCalendarView("days")}>
                {t("TODAY_VIEW")}
              </Menu.Item>
            ) : (
              <React.Fragment />
            )}

            {reportTypes.includes("weekly-report") ? (
              <Menu.Item onPress={(item) => setCalendarView("week")}>
                {t("WEEK_VIEW")}
              </Menu.Item>
            ) : (
              <React.Fragment />
            )}

            {reportTypes.includes("monthly-report") ? (
              <Menu.Item onPress={(item) => setCalendarView("monthInDays")}>
                {t("MONTH_VIEW")}
              </Menu.Item>
            ) : (
              <React.Fragment />
            )}
          </Menu>
        ),
      }}
      _appBar={{ languages: manifestLocal.languages }}
      subHeader={
        <CalendarBar
          view={calendarView}
          activeColor={colors.grayIndark}
          _box={{ p: 0, bg: "transparent" }}
          {...{ page, setPage }}
        />
      }
      _subHeader={{ bg: colors.reportCardBackg }}
      _footer={footerLinks}
    >
      <Box bg={colors.white} mb="4" roundedBottom={"xl"} shadow={2}>
        {classes.map((item, index) => (
          <Box
            key={index}
            borderBottomWidth={1}
            borderBottomColor={colors.coolGray}
          >
            <Collapsible
              defaultCollapse={!index ? true : makeDefaultCollapse}
              onPressFuction={(e) => getAttendance(item.id)}
              header={
                <VStack>
                  <H2>
                    {(item?.name ? item?.name : "") +
                      (item?.section ? " • Sec " + item?.section : "")}
                  </H2>
                </VStack>
              }
            >
              <VStack py="4">
                <ReportSummary
                  {...{
                    page,
                    calendarView,
                    students: students[item.id] ? students[item.id] : [],
                    attendance: attendance[item.id]
                      ? [attendance[item.id]]
                      : [],
                  }}
                />
                <Subtitle
                  py="5"
                  px="10px"
                  color={colors.grayInLight}
                  textTransform="inherit"
                >
                  <Text bold color={colors.darkGray} textTransform="inherit">
                    {t("NOTES")}
                    {": "}
                  </Text>
                  {t("MONTHLY_REPORT_WILL_GENRRATED_LAST_DAY_EVERY_MONTH")}
                </Subtitle>
                <Button
                  variant="outline"
                  colorScheme={"button"}
                  onPress={(e) =>
                    navigate(
                      "/attendance/report/" +
                        (item.id.startsWith("1-")
                          ? item.id.replace("1-", "")
                          : item.id) +
                        "/" +
                        calendarView
                    )
                  }
                >
                  {t("SEE_FULL_REPORT")}
                </Button>
              </VStack>
            </Collapsible>
          </Box>
        ))}
      </Box>
    </Layout>
  );
}
