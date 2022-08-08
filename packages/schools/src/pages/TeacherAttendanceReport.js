import moment from "moment";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Pressable,
  Stack,
  Text,
  VStack,
  Divider,
} from "native-base";
import React, { useState, useEffect } from "react";
import { TouchableHighlight } from "react-native-web";
import {
  IconByName,
  Layout,
  ProgressBar,
  H2,
  Collapsible,
  overrideColorTheme,
  calendar,
  BodyLarge,
  BodyMedium,
} from "@shiksha/common-lib";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const TeacherAttendanceReport = () => {
  const [progressData, setProgressData] = React.useState([
    {
      name: "22 Present",
      color: colors.green,
      value: 22,
    },
    {
      name: "4 Absent",
      color: colors.absent,
      value: 4,
    },
    {
      name: "1 Unmarked",
      color: colors.unmarked,
      value: 1,
    },
  ]);
  const [weekPage, setWeekPage] = useState(0);
  const [attendanceType, setAttendanceType] = useState("MORNING_SCHOOL");
  const [teacherObject, setTeacherObject] = useState({});
  const teacherId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [attendance, setAttendance] = useState([]);
  const [attendanceObject, setAttendanceObject] = useState({});
  const [weekDays, setWeekDays] = useState([]);

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      if (!ignore) {
        setWeekDays(calendar(weekPage, "month"));
      }
    };
    getData();
  }, [weekPage]);

  return (
    <Layout
      _header={{
        title: "Attendance Report",
        _heading: { color: colors.white },
      }}
      _appBar={{ languages: ["en"] }}
    >
      <Box p={5} bg={"gray.100"}>
        <H2>Chandan Pandit</H2>
        <BodyLarge color={colors.date}>Class VI . Sec A</BodyLarge>
      </Box>
      <Box p={5} bg={"gray.100"}>
        <Collapsible
          defaultCollapse={true}
          header={
            <Box py={4}>
              <H2>Daily Attendance</H2>
            </Box>
          }
        >
          <Divider mb={4} />
          <CalendarComponent
            monthDays={weekDays}
            item={teacherObject}
            attendance={attendance}
            setAttendanceObject={setAttendanceObject}
          />
        </Collapsible>
      </Box>
      <Box px={5} bg={"gray.100"}>
        <Collapsible
          defaultCollapse={true}
          header={
            <Box py={4}>
              <H2>Monthly Attendance</H2>
            </Box>
          }
        >
          <Divider mb={4} />
          <VStack space={6}>
            <HStack alignItems="center" justifyContent="space-between">
              <BodyMedium w={"20%"}>Jan 2022</BodyMedium>
              <Box w={"80%"} pr={3}>
                <ProgressBar data={progressData} />
              </Box>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <BodyMedium w={"20%"}>Dec 2021</BodyMedium>
              <Box w={"80%"} pr={3}>
                <ProgressBar data={progressData} />
              </Box>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <BodyMedium w={"20%"}>Nov 2021</BodyMedium>
              <Box w={"80%"} pr={3}>
                <ProgressBar data={progressData} />
              </Box>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <HStack alignItems="center">
                <Box bg={colors.green} w="15px" h="15px" rounded={4} />
                <Text mx={2}>Present</Text>
              </HStack>
              <HStack alignItems="center">
                <Box bg={colors.absent} w="15px" h="15px" rounded={4} />
                <Text mx={2}>Absent</Text>
              </HStack>
              <HStack alignItems="center">
                <Box bg={colors.unmarkeds} w="15px" h="15px" rounded={4} />
                <Text mx={2}>Unmarked</Text>
              </HStack>
            </HStack>
          </VStack>
        </Collapsible>
      </Box>
    </Layout>
  );
};

const CalendarComponent = ({
  monthDays,
  isIconSizeSmall,
  attendance,
  setAttendanceObject,
  type,
  item,
  loding,
  _weekBox,
}) => {
  const sample = ["Present", "Absent", "SpecialDuty"];

  return monthDays.map((week, index) => (
    <HStack
      key={index}
      justifyContent="space-around"
      alignItems="center"
      p="0.5"
      {...(_weekBox?.[index] ? _weekBox[index] : {})}
    >
      {week.map((day, subIndex) => {
        let isToday = moment().format("Y-MM-DD") === day.format("Y-MM-DD");
        let dateValue = day.format("Y-MM-DD");
        let smsItem = attendance
          .slice()
          .reverse()
          .find((e) => e.date === dateValue);
        let smsIconProp = !isIconSizeSmall
          ? {
              _box: { py: 2, minW: "46px", alignItems: "center" },
              status: "CheckboxBlankCircleLineIcon",
            }
          : {};
        if (smsItem?.type && smsItem?.type === "Present") {
          smsIconProp = {
            ...smsIconProp,
            status: smsItem?.type,
            type: smsItem?.status,
          };
        } else if (smsItem?.type && smsItem?.type === "Absent") {
          smsIconProp = {
            ...smsIconProp,
            status: smsItem?.type,
            type: smsItem?.status,
          };
        } else if (smsItem?.type && smsItem?.type === "SpecialDuty") {
          smsIconProp = {
            ...smsIconProp,
            status: smsItem?.type,
            type: smsItem?.status,
          };
        } else if (day.day() === 0) {
          smsIconProp = { ...smsIconProp, status: "Holiday" };
        } else if (isToday) {
          smsIconProp = { ...smsIconProp, status: "Today" };
        } else if (moment().diff(day, "days") > 0) {
          smsIconProp = { ...smsIconProp, status: "Unmarked" };
        }

        return (
          <VStack
            key={subIndex}
            alignItems="center"
            opacity={
              type && type !== "month" && day.day() !== 0
                ? 1
                : day.day() === 0
                ? 0.3
                : day.format("M") !== moment().format("M")
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
                    <Text pb="4" color={colors.dateLight} fontSize={12}>
                      {day.format("ddd")}
                    </Text>
                  ) : (
                    ""
                  )}
                  <Text color={colors.date} fontSize={14} fontWeight={600}>
                    {day.format("DD")}
                  </Text>
                </VStack>
              ) : (
                <HStack alignItems={"center"} space={1}>
                  <Text>{day.format("dd")}</Text>
                  <Text>{day.format("D")}</Text>
                </HStack>
              )}
            </Text>
            <TouchableHighlight onPress={(e) => setAttendanceObject(smsItem)}>
              <Box alignItems="center">
                {loding && loding[dateValue + item.id] ? (
                  <GetIcon
                    {...smsIconProp}
                    status="Present"
                    color={colors.primary}
                    isDisabled
                    _icon={{ _fontawesome: { spin: true } }}
                  />
                ) : (
                  <GetIcon
                    {...smsIconProp}
                    status={sample[Math.floor(Math.random() * sample.length)]}
                  />
                )}
              </Box>
            </TouchableHighlight>
          </VStack>
        );
      })}
    </HStack>
  ));
};

const GetIcon = ({ status, _box, color, _icon }) => {
  let icon = <></>;
  let iconProps = { fontSize: "xl", isDisabled: true, ..._icon };
  switch (status) {
    case "Present":
      icon = (
        <Box {..._box} color={color ? color : colors.attendancePresent}>
          <IconByName name="CheckboxCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Absent":
      icon = (
        <Box {..._box} color={color ? color : colors.attendanceAbsent}>
          <IconByName name="CloseCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "SpecialDuty":
      icon = (
        <Box {..._box} color={color ? color : colors.specialDuty}>
          <IconByName name="AwardLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Holiday":
      icon = (
        <Box {..._box} color={color ? color : colors.holiDay}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Unmarked":
      icon = (
        <Box {..._box} color={color ? color : colors.attendanceUnmarked}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Today":
      icon = (
        <Box {..._box} color={color ? color : colors.attendanceUnmarked}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    default:
      icon = (
        <Box {..._box} color={color ? color : colors.attendancedefault}>
          <IconByName name={status} {...iconProps} />
        </Box>
      );
      break;
  }
  return icon;
};

export default TeacherAttendanceReport;
