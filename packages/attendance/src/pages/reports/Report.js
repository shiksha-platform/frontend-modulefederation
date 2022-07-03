import { Box, Menu, Button, Text, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CalendarBar } from "../../components/composite/CalendarBar";
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
} from "@shiksha/common-lib";
import { GetAttendance } from "../../services/calls/registryCalls";
import { ReportSummary } from "../../components/simple/ReportSummary";
import { useNavigate } from "react-router-dom";
import manifest from "../../manifest.json";
import colorTheme from "../../colorTheme";

const colors = overrideColorTheme(colorTheme);

export default function Report({ footerLinks }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [calsses, setClasses] = useState([]);
  const teacherId = localStorage.getItem("id");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [calendarView, setCalendarView] = useState("days");
  const [makeDefaultCollapse, setMakeDefaultCollapse] = useState(false);
  const titleName = t("ATTENDANCE_REPORTS");
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
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
    return () => {
      ignore = true;
    };
  }, [teacherId]);

  useEffect(() => {
    let ignore = false;
    if (!ignore) {
      if (calsses[0]?.id) getAttendance(calsses[0].id);
      setMakeDefaultCollapse(makeDefaultCollapse);
    }
    return () => {
      ignore = true;
    };
  }, [page, calendarView]);

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
            <Menu.Item onPress={(item) => setCalendarView("days")}>
              {t("TODAY_VIEW")}
            </Menu.Item>
            <Menu.Item onPress={(item) => setCalendarView("week")}>
              {t("WEEK_VIEW")}
            </Menu.Item>
            <Menu.Item onPress={(item) => setCalendarView("monthInDays")}>
              {t("MONTH_VIEW")}
            </Menu.Item>
          </Menu>
        ),
      }}
      _appBar={{ languages: manifest.languages }}
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
        {calsses.map((item, index) => (
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
                  <H2>{item.name}</H2>
                  <Caption>
                    {index % 2 === 0 ? t("MORNING") : t("MID_DAY_MEAL")}
                  </Caption>
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
                <Subtitle py="5" px="10px" color={colors.grayInLight}>
                  <Text bold color={colors.darkGray}>
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
