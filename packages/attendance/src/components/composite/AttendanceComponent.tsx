import React, { useState, useEffect, Suspense } from "react";
import {
  VStack,
  Text,
  HStack,
  Box,
  Pressable,
  Actionsheet,
  Stack,
  Button,
  Badge,
  ScrollView,
} from "native-base";
import { useTranslation } from "react-i18next";
import { TouchableHighlight } from "react-native-web";
import moment from "moment";
import {
  IconByName,
  calendar,
  attendanceRegistryService,
  H2,
  BodySmall,
  Subtitle,
  BodyMedium,
} from "@shiksha/common-lib";

import { colors, colorTheme } from "utils/functions/ColorTheme";

// @ts-ignore
const Card = React.lazy(() => import("students/Card"));
const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

export const GetIcon = ({ status, _box, color, _icon }) => {
  let icon = <></>;
  let iconProps = { fontSize: "lg", isDisabled: true, ..._icon };
  switch (status) {
    case "Present":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendancePresent}>
          <IconByName name="CheckboxCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Absent":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendanceAbsent}>
          <IconByName name="CloseCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Late":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.checkBlankcircle}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Holiday":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendanceUnmarkedLight}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Unmarked":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendanceUnmarked}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Today":
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendanceUnmarked}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    default:
      icon = (
        <Box {..._box} color={color ? color : colorTheme.attendancedefault}>
          <IconByName name={status} {...iconProps} />
        </Box>
      );
      break;
  }
  return icon;
};

export default function AttendanceComponent({
  type,
  page,
  student,
  attendanceProp,
  hidePopUpButton,
  getAttendance,
  sms,
  _card,
  isEditDisabled,
  _weekBox,
  appName,
  manifest,
}) {
  const { t } = useTranslation();
  const teacherId = localStorage.getItem("id");
  const [attendance, setAttendance] = React.useState([]);
  const [attendanceObject, setAttendanceObject] = React.useState([]);
  const [days, setDays] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [smsShowModal, setSmsShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState({});
  const status = Array.isArray(
    manifest?.["attendance.default_attendance_states"]
  )
    ? manifest?.["attendance.default_attendance_states"]
    : manifest?.["attendance.default_attendance_states"]
    ? JSON.parse(manifest?.["attendance.default_attendance_states"])
    : [];
  useEffect(() => {
    if (typeof page === "object") {
      setDays(
        page.map((e) =>
          calendar(
            e,
            type,
            manifest?.[
              "class_attendance.no_of_day_display_on_attendance_screen"
            ]
          )
        )
      );
    } else {
      setDays([
        calendar(
          page,
          type,
          manifest?.["class_attendance.no_of_day_display_on_attendance_screen"]
        ),
      ]);
    }
    async function getData() {
      if (attendanceProp) {
        setAttendance(attendanceProp);
      }
      setLoading({});
    }
    getData();
  }, [page, attendanceProp, type]);

  const markAttendance = async (dataObject) => {
    console.log({ dataObject });
    setLoading({
      [dataObject.date + dataObject.id]: true,
    });
    if (dataObject.attendanceId) {
      attendanceRegistryService
        .update(
          {
            id: dataObject.attendanceId,
            attendance: dataObject.attendance,
          },
          {
            onlyParameter: ["attendance", "id", "date", "classId"],
          }
        )
        .then((e) => {
          const newData = attendance.filter(
            (e) =>
              !(
                e.date === dataObject.date &&
                e.studentId === dataObject.studentId
              )
          );

          setAttendance([
            ...newData,
            { ...dataObject, id: dataObject.attendanceId },
          ]);
          setLoading({});
          setShowModal(false);
        });
    } else {
      attendanceRegistryService
        .create({
          studentId: student.id,
          date: dataObject.date,
          attendance: dataObject.attendance,
          attendanceNote: "Test",
          classId: student.currentClassID,
          subjectId: "History",
          teacherId: teacherId,
        })
        .then((e) => {
          setAttendance([...attendance, dataObject]);
          setLoading({});
          setShowModal(false);
        });
    }
  };
  return (
    <Stack space={type !== "day" ? "15px" : ""}>
      <VStack space={type !== "day" ? "15px" : "2"}>
        {!_card?.isHideStudentCard ? (
          <Suspense fallback="loading">
            <Card
              attendanceProp={attendance ? attendance : []}
              appName={appName}
              href={"/students/" + student.id}
              item={student}
              _arrow={{ _icon: { fontSize: "large" } }}
              type="attendance"
              hidePopUpButton={hidePopUpButton}
              {...(type === "day" ? { _textTitle: { fontSize: "xl" } } : {})}
              {..._card}
              rightComponent={
                type === "day"
                  ? days.map((day, index) => (
                      <CalendarComponent
                        manifest={manifest}
                        key={index}
                        monthDays={[[day]]}
                        isIconSizeSmall={true}
                        isEditDisabled={isEditDisabled}
                        {...{
                          attendance,
                          student,
                          markAttendance,
                          setAttendanceObject,
                          setShowModal,
                          setSmsShowModal,
                          loading,
                          type,
                          _weekBox: _weekBox?.[index] ? _weekBox[index] : {},
                        }}
                      />
                    ))
                  : false
              }
            />
          </Suspense>
        ) : (
          ""
        )}
        {type !== "day" ? (
          <Box borderWidth={1} borderColor={colors.coolGray} rounded="xl">
            {days.map((day, index) => (
              <CalendarComponent
                manifest={manifest}
                key={index}
                monthDays={day}
                isEditDisabled={isEditDisabled}
                {...{
                  sms,
                  attendance,
                  student,
                  markAttendance,
                  setAttendanceObject,
                  setShowModal,
                  setSmsShowModal,
                  loading,
                  type,
                  _weekBox: _weekBox?.[index] ? _weekBox[index] : {},
                }}
              />
            ))}
          </Box>
        ) : (
          <></>
        )}
        <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
          <Actionsheet.Content alignItems={"left"} bg={colors.bgMarkAttendance}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="25px">
                <H2 color={colors.white}>{t("MARK_ATTENDANCE")}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.white}
                onPress={(e) => setShowModal(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box w="100%" p={4} justifyContent="center" bg={colors.white}>
            {status.map((item) => {
              return (
                <Pressable
                  key={item}
                  p={3}
                  onPress={(e) => {
                    if (attendanceObject.attendance !== item) {
                      markAttendance({
                        ...attendanceObject,
                        attendance: item,
                      });
                    } else {
                      setShowModal(false);
                    }
                  }}
                >
                  <HStack alignItems="center" space={2}>
                    <GetIcon status={item} _box={{ p: 2 }} />
                    <Text color={colors.darkGray} bold fontSize="lg">
                      {t(item)}
                    </Text>
                  </HStack>
                </Pressable>
              );
            })}
          </Box>
        </Actionsheet>
        <Actionsheet
          isOpen={smsShowModal}
          onClose={() => setSmsShowModal(false)}
        >
          <Actionsheet.Content alignItems={"left"}>
            {/* <HStack justifyContent={"end"}>
              <IconByName
                name="CloseCircleLineIcon"
                onPress={(e) => setSmsShowModal(false)}
              />
            </HStack> */}
            <VStack space={5} alignItems="center" p="5">
              <Subtitle color={colors.messageSent}>
                Message Sent to Parent
              </Subtitle>
              <Subtitle color={colors.messageAlert}>Absent alert</Subtitle>
              <BodyMedium color={colors.messageInfo} textAlign="center">
                Hello Mr. B.K. Chaudhary, this is to inform you that your ward
                Sheetal is absent in school on Wednesday, 12th of January 2022.
              </BodyMedium>
              <Button
                variant="outline"
                colorScheme="button"
                onPress={(e) => setSmsShowModal(false)}
              >
                {t("CLOSE")}
              </Button>
            </VStack>
          </Actionsheet.Content>
        </Actionsheet>
      </VStack>
      <></>
    </Stack>
  );
}

const CalendarComponent = ({
  monthDays,
  type,
  isIconSizeSmall,
  isEditDisabled,
  sms,
  attendance,
  student,
  markAttendance,
  setAttendanceObject,
  setShowModal,
  setSmsShowModal,
  loading,
  manifest,
  _weekBox,
}) => {
  let thisMonth = monthDays?.[1]?.[0]?.format("M");
  const holidays = [];
  const status = Array.isArray(
    manifest?.["attendance.default_attendance_states"]
  )
    ? manifest?.["attendance.default_attendance_states"]
    : manifest?.["attendance.default_attendance_states"]
    ? JSON.parse(manifest?.["attendance.default_attendance_states"])
    : [];

  const handleAttendaceData = (attendance, day) => {
    let isToday = moment().format("YYYY-MM-DD") === day.format("YYYY-MM-DD");
    let isAllowDay = false;
    if (manifest?.["class_attendance.previous_attendance_edit"] === "true") {
      isAllowDay = day.format("YYYY-MM-DD") <= moment().format("YYYY-MM-DD");
    } else {
      isAllowDay = day.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD");
    }

    let isHoliday =
      day.day() === 0 || holidays.includes(day.format("YYYY-MM-DD"));
    let dateValue = day.format("YYYY-MM-DD");
    let smsDay = sms?.find(
      (e) => e.date === day.format("YYYY-MM-DD") && e.studentId === student.id
    );
    let attendanceItem = attendance
      .slice()
      .reverse()
      .find((e) => e.date === dateValue && e.studentId === student.id);
    let attendanceIconProp = !isIconSizeSmall
      ? {
          _box: { py: 2, minW: "46px", alignItems: "center" },
          status: "CheckboxBlankCircleLineIcon",
        }
      : {};
    let attendanceType = PRESENT;
    if (attendanceItem?.attendance === PRESENT) {
      attendanceIconProp = {
        ...attendanceIconProp,
        status: attendanceItem?.attendance,
      };
    } else if (attendanceItem?.attendance === ABSENT) {
      attendanceIconProp = {
        ...attendanceIconProp,
        status: attendanceItem?.attendance,
      };
    } else if (attendanceItem?.attendance === "Late") {
      attendanceIconProp = {
        ...attendanceIconProp,
        status: attendanceItem?.attendance,
      };
    } else if (day.day() === 0) {
      attendanceIconProp = { ...attendanceIconProp, status: "Holiday" };
    } else if (isToday) {
      attendanceIconProp = { ...attendanceIconProp, status: "Today" };
    } else if (moment().diff(day, "days") > 0) {
      attendanceIconProp = { ...attendanceIconProp, status: UNMARKED };
    }

    if (status) {
      const arr = status;
      const i = arr.indexOf(attendanceItem?.attendance);
      if (i === -1) {
        attendanceType = arr[0];
      } else {
        attendanceType = arr[(i + 1) % arr.length];
      }
    }

    return [
      isToday,
      isAllowDay,
      isHoliday,
      dateValue,
      smsDay,
      attendanceItem,
      attendanceIconProp,
      attendanceType,
    ];
  };

  return monthDays.map((week, index) => (
    <HStack
      justifyContent="space-around"
      alignItems="center"
      key={index}
      borderBottomWidth={
        monthDays.length > 1 && monthDays.length - 1 !== index ? "1" : "0"
      }
      borderBottomColor={colors.lightGray}
      {...(type === "day" ? { px: "2" } : { p: "2" })}
      {..._weekBox}
    >
      {week.map((day, subIndex) => {
        const [
          isToday,
          isAllowDay,
          isHoliday,
          dateValue,
          smsDay,
          attendanceItem,
          attendanceIconProp,
          attendanceType,
        ] = handleAttendaceData(attendance, day);

        return (
          <VStack
            key={subIndex}
            alignItems="center"
            borderWidth={isToday ? "1" : ""}
            borderColor={isToday ? colors.calendarBtn : ""}
            p={type === "day" ? "1" : "0"}
            rounded="lg"
            opacity={
              type !== "month" && thisMonth && day.format("M") !== thisMonth
                ? 0
                : isHoliday
                ? 0.3
                : 1
            }
            bg={
              smsDay?.type && isEditDisabled
                ? smsDay?.type.toLowerCase() + ".50"
                : ""
            }
          >
            {smsDay?.type && isEditDisabled ? (
              <Badge
                bg={smsDay?.type.toLowerCase() + ".500"}
                rounded="full"
                p="0"
                w="2"
                h="2"
                position="absolute"
                right="0"
                top="0"
              />
            ) : (
              ""
            )}
            <Text
              key={subIndex}
              pt={monthDays.length > 1 && index ? 0 : !isIconSizeSmall ? 2 : 0}
              textAlign="center"
            >
              {!isIconSizeSmall ? (
                <VStack alignItems={"center"}>
                  {index === 0 ? (
                    <BodySmall pb="1" color={colors.dateText}>
                      {day.format("ddd")}
                    </BodySmall>
                  ) : (
                    ""
                  )}
                  <BodySmall color={colors.date}>{day.format("DD")}</BodySmall>
                </VStack>
              ) : (
                <HStack alignItems={"center"} space={1}>
                  <Text>{day.format("dd")}</Text>
                  <Text>{day.format("D")}</Text>
                </HStack>
              )}
            </Text>
            <TouchableHighlight
              onPress={(e) => {
                if (!isEditDisabled && isAllowDay && !isHoliday) {
                  const newAttendanceData = {
                    attendanceId: attendanceItem?.id ? attendanceItem.id : null,
                    id: attendanceItem?.id ? attendanceItem.id : null,
                    date: dateValue,
                    attendance: attendanceType,
                    studentId: student.id,
                  };
                  markAttendance(newAttendanceData);
                }
              }}
              onLongPress={(event) => {
                if (
                  !isEditDisabled &&
                  day.format("M") === moment().format("M") &&
                  day.day() !== 0
                ) {
                  setAttendanceObject({
                    attendanceId: attendanceItem?.id ? attendanceItem.id : null,
                    date: dateValue,
                    attendance: attendanceItem?.attendance,
                    id: attendanceItem?.id,
                    studentId: student.id,
                  });
                  setShowModal(true);
                }
              }}
            >
              <Box alignItems="center">
                {loading[dateValue + student.id] ? (
                  <GetIcon
                    {...attendanceIconProp}
                    status="Loader4LineIcon"
                    color={colors.primary}
                    isDisabled
                    _icon={{ _fontawesome: { spin: true } }}
                  />
                ) : (
                  <GetIcon {...attendanceIconProp} />
                )}
              </Box>
            </TouchableHighlight>
            {!isEditDisabled ? (
              smsDay?.type ? (
                <IconByName
                  mt="1"
                  p="5px"
                  rounded="full"
                  name="MailFillIcon"
                  bg={smsDay?.type.toLowerCase() + ".100"}
                  colorScheme={smsDay?.type.toLowerCase()}
                  color={smsDay?.type.toLowerCase() + ".500"}
                  _icon={{ size: "14" }}
                  onPress={(e) => setSmsShowModal(true)}
                />
              ) : (
                <Box p="3" mt="1"></Box>
              )
            ) : (
              ""
            )}
          </VStack>
        );
      })}
    </HStack>
  ));
};
