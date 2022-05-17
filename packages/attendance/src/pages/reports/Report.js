import moment from "moment";
import { Box, HStack, Menu, Pressable, Text, VStack } from "native-base";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CalendarBar from "../../components/CalendarBar";
import {
  IconByName,
  Layout,
  Collapsible,
  capture,
  calendar,
} from "@shiksha/common-lib";
import * as classServiceRegistry from "../../services/classServiceRegistry";
import { GetAttendance } from "../../components/AttendanceComponent";
import * as studentServiceRegistry from "../../services/studentServiceRegistry";
import ReportSummary from "../../components/ReportSummary";
import { Link } from "react-router-dom";
import manifest from "../../manifest.json";

export default function Report({ footerLinks }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [calsses, setClasses] = useState([]);
  const teacherId = localStorage.getItem("id");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [calendarView, setCalendarView] = useState("days");
  const [makeDefaultCollapse, setMakeDefaultCollapse] = useState(false);

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      let responceClass = await classServiceRegistry.getAll({
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
    const studentData = await studentServiceRegistry.getAll({ classId });
    setStudents({ ...students, [classId]: studentData });
  };

  return (
    <Layout
      _header={{
        title: t("MY_CLASSES"),
        icon: "Group",
        subHeading: moment().format("hh:mm a"),
        _subHeading: { fontWeight: 500 },
        iconComponent: (
          <Menu
            w="120"
            placement="bottom right"
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <Box rounded={"full"} px="5" py="2" bg="button.500">
                    <HStack space="2">
                      <Text color="white" fontSize="14" fontWeight="500">
                        {calendarView === "monthInDays"
                          ? t("MONTH_VIEW")
                          : calendarView === "week"
                          ? t("WEEK_VIEW")
                          : t("TODAY_VIEW")}
                      </Text>
                      <IconByName
                        color="white"
                        name="ArrowDownSLineIcon"
                        isDisabled
                      />
                    </HStack>
                  </Box>
                </Pressable>
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
          activeColor="gray.900"
          _box={{ p: 0, bg: "transparent" }}
          {...{ page, setPage }}
        />
      }
      _subHeader={{ bg: "reportCard.500" }}
      _footer={footerLinks}
    >
      <Box bg="white" p="5" mb="4" roundedBottom={"xl"} shadow={2}>
        {calsses.map((item, index) => (
          <Box
            key={index}
            borderBottomWidth={1}
            borderBottomColor="coolGray.200"
          >
            <Collapsible
              defaultCollapse={!index ? true : makeDefaultCollapse}
              onPressFuction={(e) => getAttendance(item.id)}
              header={
                <VStack>
                  <Text fontSize="16" fontWeight="600">
                    {item.name}
                  </Text>
                  <Text fontSize="10" fontWeight="400">
                    {index % 2 === 0 ? t("MORNING") : t("MID_DAY_MEAL")}
                  </Text>
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
                <Text py="5" px="10px" fontSize={12} color={"gray.400"}>
                  <Text bold color={"gray.700"}>
                    {t("NOTES")}
                    {": "}
                  </Text>
                  {t("MONTHLY_REPORT_WILL_GENRRATED_LAST_DAY_EVERY_MONTH")}
                </Text>
                <Link
                  style={{
                    color: "rgb(63, 63, 70)",
                    textDecoration: "none",
                  }}
                  to={
                    "/attendance/report/" +
                    (item.id.startsWith("1-")
                      ? item.id.replace("1-", "")
                      : item.id) +
                    "/" +
                    calendarView
                  }
                >
                  <Box
                    rounded="lg"
                    borderWidth="1"
                    px={6}
                    py={2}
                    mt="2"
                    textAlign={"center"}
                    borderColor={"button.500"}
                    _text={{ color: "button.500" }}
                  >
                    {t("SEE_FULL_REPORT")}
                  </Box>
                </Link>
              </VStack>
            </Collapsible>
          </Box>
        ))}
      </Box>
    </Layout>
  );
}
