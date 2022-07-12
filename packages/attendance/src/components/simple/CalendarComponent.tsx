// Lib
import colorTheme from "colorTheme";
import * as React from "react";
import moment from "moment";
import { BodySmall, IconByName } from "@shiksha/common-lib";
import { HStack, VStack, Box, Text, Badge } from "native-base";
import { TouchableHighlight } from "react-native-web";
import { GetIcon } from "components/simple/GetIcon";

// Utils
import { HandleAttendanceData } from "utils/functions/HandleAttendanceData";

export const CalendarComponent = ({
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
  return monthDays.map((week, index) => (
    <HStack
      justifyContent="space-around"
      alignItems="center"
      key={index}
      borderBottomWidth={
        monthDays.length > 1 && monthDays.length - 1 !== index ? "1" : "0"
      }
      borderBottomColor={colorTheme.lightGray}
      {...(type === "day" ? { px: "2" } : { p: "2" })}
      {..._weekBox}
    >
      {week.map((day, subIndex) => {
        const {
          isToday,
          isAllowDay,
          isHoliday,
          dateValue,
          smsDay,
          attendanceItem,
          attendanceIconProp,
          attendanceType,
        } = HandleAttendanceData({
          attendance,
          day,
          sms,
          isIconSizeSmall,
          student,
          manifest,
        });

        return (
          <VStack
            key={subIndex}
            alignItems="center"
            borderWidth={isToday ? "1" : ""}
            borderColor={isToday ? colorTheme.calendarBtn : ""}
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
                    <BodySmall pb="1" color={colorTheme.dateText}>
                      {day.format("ddd")}
                    </BodySmall>
                  ) : (
                    ""
                  )}
                  <BodySmall color={colorTheme.date}>
                    {day.format("DD")}
                  </BodySmall>
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
                    color={colorTheme.primary}
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
