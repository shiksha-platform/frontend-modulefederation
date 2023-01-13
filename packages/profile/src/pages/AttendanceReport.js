import moment from "moment";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Menu,
  Text,
  VStack,
} from "native-base";
import React, { useState, useEffect, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { TouchableHighlight } from "react-native-web";
import {
  capture,
  IconByName,
  Layout,
  telemetryFactory,
  ProgressBar,
  userRegistryService,
  overrideColorTheme,
  H2,
  BodyLarge,
  Subtitle,
  BodySmall,
  H4,
  getArray,
} from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";
import colorTheme from "../colorTheme";
import { report } from "utils/report";
const colors = overrideColorTheme(colorTheme);

export default function AttendanceReport({ footerLinks, appName, config }) {
  const { t } = useTranslation();
  const [weekPage, setWeekPage] = useState(0);
  const [teacherObject, setTeacherObject] = useState({});
  const teacherId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [attendance, setAttendance] = useState([]);
  const [attendanceObject, setAttendanceObject] = useState({});
  const [weekDays, setWeekDays] = useState([]);
  const [reportTypes, setReportTypes] = React.useState([]);
  const [calendarView, setCalendarView] = React.useState();
  const [reportData, setReportData] = React.useState([]);

  const CalendarBar = React.lazy(() => import("attendance/CalendarBar"));
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      if (!ignore) {
        const { reportAttendace, weekData } = await report(
          weekPage,
          calendarView
        );
        setWeekDays(weekData);
        setAttendance(reportAttendace[0] ? reportAttendace[0]?.data : []);
        setReportData(reportAttendace);
      }
    };
    getData();
  }, [weekPage, calendarView]);

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      if (!ignore) {
        const arr = getArray(config?.["report_types"]);
        setReportTypes(arr);
        if (arr.includes("dailyReport")) {
          setCalendarView("days");
        } else if (arr.includes("weeklyReport")) {
          setCalendarView("weeks");
        } else if (arr.includes("monthlyReport")) {
          setCalendarView("month");
        }
        const resultTeacher = await userRegistryService.getOne(
          { id: teacherId },
          { Authorization: "Bearer " + token }
        );
        setTeacherObject(resultTeacher);
      }
    };
    getData();
  }, [teacherId, token]);

  const handleBackButton = () => {
    const telemetryData = telemetryFactory.end({
      appName,
      type: "Self-Attendance-End-Report",
      startEventId: localStorage.getItem("UUID"),
      duration: 0,
    });
    capture("END", telemetryData);
    navigate(-1);
  };

  return (
    <Layout
      _header={{
        title: t("ATTENDANCE_REPORTS"),
        subHeading: <H4>{t("MY_PROFILE")}</H4>,
        textTransform: "capitalize",
        iconComponent:
          reportTypes?.length > 0 ? (
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
                    {calendarView === "month"
                      ? t("MONTH_VIEW")
                      : calendarView === "weeks"
                      ? t("WEEK_VIEW")
                      : t("TODAY_VIEW")}
                  </Button>
                );
              }}
            >
              {reportTypes.includes("dailyReport") ? (
                <Menu.Item onPress={(item) => setCalendarView("days")}>
                  {t("TODAY_VIEW")}
                </Menu.Item>
              ) : (
                <React.Fragment />
              )}

              {reportTypes.includes("weeklyReport") ? (
                <Menu.Item onPress={(item) => setCalendarView("weeks")}>
                  {t("WEEK_VIEW")}
                </Menu.Item>
              ) : (
                <React.Fragment />
              )}

              {reportTypes.includes("monthlyReport") ? (
                <Menu.Item onPress={(item) => setCalendarView("month")}>
                  {t("MONTH_VIEW")}
                </Menu.Item>
              ) : (
                <React.Fragment />
              )}
            </Menu>
          ) : (
            <React.Fragment />
          ),
      }}
      subHeader={
        <HStack space="4" justifyContent="space-between" alignItems="center">
          <Suspense fallback="loading">
            <CalendarBar
              view={calendarView}
              activeColor="profile.darkGray0"
              setPage={setWeekPage}
              page={weekPage}
              _box={{ p: 2, bg: "transparent" }}
            />
          </Suspense>
        </HStack>
      }
      _subHeader={{ bg: "profile.cardBg" }}
      _appBar={{ onPressBackButton: handleBackButton }}
      _footer={footerLinks}
    >
      <VStack space="1">
        <Box bg={"profile.white"} p="5" py="30">
          <HStack space="4" justifyContent="space-between" alignItems="center">
            <H2>{t("MY_ATTENDANCE")}</H2>
          </HStack>
        </Box>
        <Box bg={"profile.white"}>
          <VStack py="5">
            <CalendarComponent
              page={weekPage}
              type={calendarView}
              monthDays={weekDays}
              attendance={attendance}
              setAttendanceObject={setAttendanceObject}
            />
          </VStack>
          <Actionsheet
            isOpen={attendanceObject?.attendance}
            _backdrop={{ opacity: "0.9", bg: "profile.gray" }}
          >
            <Actionsheet.Content
              p="0"
              alignItems={"left"}
              bg={"profile.white"}
            ></Actionsheet.Content>
            <Box bg="profile.white" w="100%" p="5">
              <VStack space="5" textAlign="center">
                <Subtitle color={"profile.gray"}>
                  {t("ATTENDANCE_DETAILS")}
                </Subtitle>
                <H2>{attendanceObject?.type}</H2>
                <BodyLarge color={"profile.gray"}>
                  {attendanceObject?.mess2age}
                </BodyLarge>
                <Button
                  variant="outline"
                  flex={1}
                  onPress={(e) => setAttendanceObject({})}
                >
                  {t("CLOSE")}
                </Button>
              </VStack>
            </Box>
          </Actionsheet>
        </Box>
        <VStack space={5} bg={"profile.white"} p="5">
          <HStack space="4" justifyContent="space-between" alignItems="center">
            <Box py="15px">
              <H2 textTransform="none">
                {t(
                  calendarView === "days"
                    ? "MY_MONTHLY_ATTENDANCE_DAY"
                    : calendarView === "weeks"
                    ? "MY_MONTHLY_ATTENDANCE_WEEK"
                    : "MY_MONTHLY_ATTENDANCE"
                )}
              </H2>
            </Box>
          </HStack>
          <Box bg={"profile.reportBoxBg"} rounded="10px">
            <VStack p="5" space={3}>
              <VStack space={"30px"}>
                {reportData.map((item, index) => {
                  let data = [
                    "Present",
                    "Absent",
                    "SpecialDuty",
                    "Unmarked",
                  ].map((status) => {
                    return {
                      color: `profile.${status?.toLowerCase()}`,
                      value: item?.data?.filter((e) => e.attendance === status)
                        .length,
                    };
                  });
                  return (
                    <HStack key={index} alignItems={"center"} space={3}>
                      <VStack alignItems={"center"}>
                        <BodySmall>{item?.name}</BodySmall>
                      </VStack>
                      <VStack flex="auto" alignContent={"center"}>
                        <ProgressBar data={data} />
                      </VStack>
                    </HStack>
                  );
                })}
              </VStack>
            </VStack>
          </Box>
          {/* <Button variant={"outline"}>{t("SEE_MORE")}</Button> */}
        </VStack>
      </VStack>
    </Layout>
  );
}

const CalendarComponent = ({
  monthDays,
  isIconSizeSmall,
  attendance,
  setAttendanceObject,
  type,
  page,
  _weekBox,
}) => {
  return monthDays.map((week, index) => (
    <HStack
      key={index}
      justifyContent="space-around"
      alignItems="center"
      borderBottomWidth={
        monthDays.length > 1 && monthDays.length - 1 !== index ? "1" : "0"
      }
      borderBottomColor={"profile.lightGray2"}
      p={"2"}
      {...(_weekBox?.[index] ? _weekBox[index] : {})}
    >
      {week.map((day, subIndex) => {
        let isToday = moment().format("Y-MM-DD") === day.format("Y-MM-DD");
        let dateValue = day.format("Y-MM-DD");
        let attendanceItem = attendance
          .slice()
          .reverse()
          .find((e) => e.date === dateValue);

        let attendanceIconProp = !isIconSizeSmall
          ? {
              _box: { py: 2, minW: "46px", alignItems: "center" },
              status: "CheckboxBlankCircleLineIcon",
            }
          : {};
        if (
          attendanceItem?.attendance &&
          attendanceItem?.attendance === "Present"
        ) {
          attendanceIconProp = {
            ...attendanceIconProp,
            status: attendanceItem?.attendance,
            type: attendanceItem?.attendance,
          };
        } else if (
          attendanceItem?.attendance &&
          attendanceItem?.attendance === "Absent"
        ) {
          attendanceIconProp = {
            ...attendanceIconProp,
            status: attendanceItem?.attendance,
            type: attendanceItem?.attendance,
          };
        } else if (
          attendanceItem?.attendance &&
          attendanceItem?.attendance === "SpecialDuty"
        ) {
          attendanceIconProp = {
            ...attendanceIconProp,
            status: attendanceItem?.attendance,
            type: attendanceItem?.attendance,
          };
        } else if (day.day() === 0) {
          attendanceIconProp = { ...attendanceIconProp, status: "Holiday" };
        } else if (isToday) {
          attendanceIconProp = { ...attendanceIconProp, status: "Today" };
        } else if (moment().diff(day, "days") > 0) {
          attendanceIconProp = { ...attendanceIconProp, status: "Unmarked" };
        }

        return (
          <VStack
            key={subIndex}
            alignItems="center"
            borderWidth={isToday ? "1" : ""}
            borderColor={isToday ? "profile.lightGray2" : ""}
            rounded="lg"
            opacity={
              type && type !== "month" && day.day() !== 0
                ? 1
                : day.day() === 0
                ? 0.3
                : typeof page !== "undefined" &&
                  type === "month" &&
                  day.format("M") !== moment().add(page, "month").format("M")
                ? 0.3
                : 1
            }
          >
            <Text
              key={subIndex}
              pt={monthDays.length > 1 && index ? 0 : !isIconSizeSmall ? 2 : 0}
              textAlign="center"
            >
              {!isIconSizeSmall ? (
                <VStack alignItems={"center"}>
                  {index === 0 ? (
                    <Text pb="1" color={"profile.lightGray0"}>
                      {day.format("ddd")}
                    </Text>
                  ) : (
                    ""
                  )}
                  <Text color={"profile.bodyText"}>{day.format("DD")}</Text>
                </VStack>
              ) : (
                <HStack alignItems={"center"} space={1}>
                  <Text>{day.format("dd")}</Text>
                  <Text>{day.format("D")}</Text>
                </HStack>
              )}
            </Text>
            <TouchableHighlight
              onPress={(e) => setAttendanceObject(attendanceItem)}
            >
              <Box alignItems="center">
                <GetIcon {...attendanceIconProp} />
              </Box>
            </TouchableHighlight>
          </VStack>
        );
      })}
    </HStack>
  ));
};

export const GetIcon = ({ status, _box, color, _icon }) => {
  let icon = <></>;
  let iconProps = { fontSize: "xl", isDisabled: true, ..._icon };
  switch (status) {
    case "Present":
      icon = (
        <Box {..._box} color={color ? color : "profile.present"}>
          <IconByName name="CheckboxCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Absent":
      icon = (
        <Box {..._box} color={color ? color : "profile.absent"}>
          <IconByName name="CloseCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "SpecialDuty":
      icon = (
        <Box {..._box} color={color ? color : "profile.specialDuty"}>
          <IconByName name="AwardLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Holiday":
      icon = (
        <Box {..._box} color={color ? color : "profile.holiDay"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Unmarked":
      icon = (
        <Box {..._box} color={color ? color : "profile.unmarked"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Today":
      icon = (
        <Box {..._box} color={color ? color : "profile.unmarked"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    default:
      icon = (
        <Box {..._box} color={color ? color : "profile.defaultMark"}>
          <IconByName name={status} {...iconProps} />
        </Box>
      );
      break;
  }
  return icon;
};
