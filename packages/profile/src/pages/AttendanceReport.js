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
} from "native-base";
import React, { useState, useEffect, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { TouchableHighlight } from "react-native-web";
import * as teacherServiceRegistry from "../services/teacherServiceRegistry";
import {
  capture,
  IconByName,
  Layout,
  telemetryFactory,
  ProgressBar,
  calendar,
} from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";

export default function AttendanceReport({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [weekPage, setWeekPage] = useState(0);
  const [attendanceType, setAttendanceType] = useState("MORNING_SCHOOL");
  const [teacherObject, setTeacherObject] = useState({});
  const teacherId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [attendance, setAttendance] = useState([]);
  const [attendanceObject, setAttendanceObject] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [weekDays, setWeekDays] = useState([]);
  const CalendarBar = React.lazy(() => import("attendance/CalendarBar"));
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      if (!ignore) {
        setWeekDays(calendar(weekPage, "month"));
      }
    };
    getData();
  }, [weekPage]);

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      const resultTeacher = await teacherServiceRegistry.getOne(
        { id: teacherId },
        { Authorization: "Bearer " + token }
      );
      if (!ignore) {
        setTeacherObject(resultTeacher);
        let newMonthDays = calendar(weekPage, "monthInDays");
        setAttendance(
          newMonthDays
            .map((date, index) => {
              if (date.day() !== 0 && moment().add(weekPage, "months") > date) {
                let newType =
                  index % 4 === 0
                    ? "Unmarked"
                    : index % 3 === 0
                    ? "SpecialDuty"
                    : index % 2 === 0
                    ? "Present"
                    : "Absent";
                return {
                  status: "Send",
                  type: newType,
                  date: date.format("Y-MM-DD"),
                  message:
                    date.format("dddd, DD MMMM, Y") +
                    " Time: (10.00am - 2.30pm) was on " +
                    newType +
                    " at Kendriya Vidyalaya Ganeshkhind. Principal Dr. R.C Chandra",
                };
              }
              return null;
            })
            .filter((e) => e)
        );
      }
    };
    getData();
  }, [weekPage, teacherId, token]);

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
        subHeading: t("MY_PROFILE"),
      }}
      subHeader={
        <HStack space="4" justifyContent="space-between" alignItems="center">
          <Suspense fallback="loading">
            <CalendarBar
              view="monthInDays"
              activeColor="gray.900"
              setPage={setWeekPage}
              page={weekPage}
              _box={{ p: 2, bg: "transparent" }}
            />
          </Suspense>
        </HStack>
      }
      _subHeader={{ bg: "classCard.500" }}
      _appBar={{ onPressBackButton: handleBackButton }}
      _footer={footerLinks}
    >
      <VStack space="1">
        <Box bg="white" p="5" py="30">
          <HStack space="4" justifyContent="space-between" alignItems="center">
            <Text fontSize="16" fontWeight="600">
            {t("MY_ATTENDANCE")}
            </Text>
            <Stack>
              <Button
                rounded={"full"}
                colorScheme="button"
                variant="outline"
                bg="button.100"
                rightIcon={
                  <IconByName
                    color="button.500"
                    name="ArrowDownSLineIcon"
                    isDisabled
                  />
                }
                onPress={(e) => setShowModal(true)}
              >
                <Text color="button.500" fontSize="14" fontWeight="500">
                  {t(attendanceType)}
                </Text>
              </Button>
              <Actionsheet
                isOpen={showModal}
                _backdrop={{ opacity: "0.9", bg: "gray.500" }}
              >
                <Actionsheet.Content
                  p="0"
                  alignItems={"left"}
                  bg="classCard.500"
                >
                  <HStack justifyContent={"space-between"}>
                    <Stack p={5} pt={2} pb="25px">
                      <Text fontSize="16px" fontWeight={"600"}>
                        {t("SELECT_VIEW")}
                      </Text>
                    </Stack>
                    <IconByName
                      name="CloseCircleLineIcon"
                      color="classCard.900"
                      onPress={(e) => setShowModal(false)}
                    />
                  </HStack>
                </Actionsheet.Content>
                <Box w="100%" bg="white">
                  {[
                    { name: t("MORNING_SCHOOL"), value: "MORNING_SCHOOL" },
                    { name: t("EVENING_SCHOOL"), value: "EVENING_SCHOOL" },
                    { name: t("HOLIDAYS"), value: "HOLIDAYS" },
                  ].map((item, index) => {
                    return (
                      <Pressable
                        key={index}
                        p="5"
                        borderBottomWidth={1}
                        borderBottomColor="coolGray.100"
                        onPress={(e) => {
                          setAttendanceType(item.value);
                        }}
                      >
                        <Text
                          fontSize="14px"
                          fontWeight="500"
                          color={
                            attendanceType === item.value ? "button.500" : ""
                          }
                        >
                          {item.name}
                        </Text>
                      </Pressable>
                    );
                  })}
                  <Box p="5">
                    <Button
                      variant="outline"
                      onPress={(e) => setShowModal(false)}
                    >
                      {t("CONTINUE")}
                    </Button>
                  </Box>
                </Box>
              </Actionsheet>
            </Stack>
          </HStack>
        </Box>
        <Box bg="white">
          <HStack space="4" justifyContent="space-between" alignItems="center">
            <Box p="5">
              <Text fontSize="16" fontWeight="600">
                {t("SEND_MESSAGE")}
              </Text>
            </Box>
          </HStack>
          <VStack>
            <CalendarComponent
              monthDays={weekDays}
              item={teacherObject}
              attendance={attendance}
              setAttendanceObject={setAttendanceObject}
            />
          </VStack>
          <Actionsheet
            isOpen={attendanceObject?.status}
            _backdrop={{ opacity: "0.9", bg: "gray.500" }}
          >
            <Actionsheet.Content
              p="0"
              alignItems={"left"}
              bg="white"
            ></Actionsheet.Content>
            <Box bg="white" w="100%" p="5">
              <VStack space="5" textAlign="center">
                <Text fontSize="12px" fontWeight="500" color="gray.400">
                  {t("ATTENDANCE_DETAILS")}
                </Text>
                <Text fontWeight="600" fontSize="16px">
                  {attendanceObject?.type}
                </Text>
                <Text fontWeight="600" fontSize="14px" color="gray.500">
                  {attendanceObject.message}
                </Text>
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
        <VStack space={5} bg="white" p="5">
          <HStack
            space="4"
            justifyContent="space-between"
            alignItems="center"
            
          >
            <Box py="15px">
              <Text fontSize="16" fontWeight="600">
                {t("MY_MONTHLY_ATTENDANCE")}
              </Text>
            </Box>
          </HStack>
          <Box bg={"reportBoxBg.400"} rounded="10px">
            <VStack p="5" space={3}>
              <VStack space={"30px"}>
                {[
                  moment(),
                  moment().add(-1, "months"),
                  moment().add(-2, "months"),
                ].map((month, index) => (
                  <HStack key={index} alignItems={"center"} space={3}>
                    <VStack alignItems={"center"}>
                      <Text fontSize="12px" fontWeight="400">
                        {month.format("Y MMM")}
                      </Text>
                    </VStack>
                    <VStack flex="auto" alignContent={"center"}>
                      <ProgressBar
                        data={[
                          "Present",
                          "Absent",
                          "SpecialDuty",
                          "Unmarked",
                        ].map((status) => {
                          return {
                            name: month.format("Y MMM"),
                            color:
                              status === "Present"
                                ? "attendancePresent.500"
                                : status === "Absent"
                                ? "attendanceAbsent.500"
                                : status === "Unmarked"
                                ? "attendanceUnmarked.300"
                                : "special_duty.500",
                            value: attendance.filter((e) => e.type === status)
                              .length,
                          };
                        })}
                      />
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </Box>
          <Button variant={"outline"}>{t("SEE_MORE")}</Button>
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
  item,
  loding,
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
      borderBottomColor={"coolGray.300"}
      p={"2"}
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
                    <Text pb="1" color={"attendanceCardText.400"}>
                      {day.format("ddd")}
                    </Text>
                  ) : (
                    ""
                  )}
                  <Text color={"attendanceCardText.500"}>
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
            <TouchableHighlight
              onPress={(e) => setAttendanceObject(smsItem)}
              // onLongPress={(e) => {
              //   console.log({ e });
              // }}
            >
              <Box alignItems="center">
                {loding && loding[dateValue + item.id] ? (
                  <GetIcon
                    {...smsIconProp}
                    status="Loader4LineIcon"
                    color={"button.500"}
                    isDisabled
                    _icon={{ _fontawesome: { spin: true } }}
                  />
                ) : (
                  <GetIcon {...smsIconProp} />
                )}
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
        <Box {..._box} color={color ? color : "attendancePresent.500"}>
          <IconByName name="CheckboxCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Absent":
      icon = (
        <Box {..._box} color={color ? color : "attendanceAbsent.500"}>
          <IconByName name="CloseCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "SpecialDuty":
      icon = (
        <Box {..._box} color={color ? color : "special_duty.500"}>
          <IconByName name="AwardLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Holiday":
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.100"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Unmarked":
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.500"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Today":
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.500"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    default:
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.400"}>
          <IconByName name={status} {...iconProps} />
        </Box>
      );
      break;
  }
  return icon;
};
