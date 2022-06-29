import React from "react";
import moment from "moment";
import { Box, Button, HStack, Pressable, Text, VStack } from "native-base";
import { TouchableHighlight } from "react-native-web";
import GetIcon from "atoms/GetIcon";
import Message from "./Message";
import { overrideColorTheme } from "@shiksha/common-lib";
import colorTheme from "../../../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const CalendarComponent = ({
  monthDays,
  type,
  isIconSizeSmall,
  sms,
  setSmsObject,
  student,
  loading,
  _weekBox,
}) => {
  if (type === "month") {
    return monthDays.map((week, index) => (
      <HStack
        key={index}
        justifyContent="space-around"
        alignItems="center"
        borderBottomWidth={
          monthDays.length > 1 && monthDays.length - 1 !== index ? "1" : "0"
        }
        borderBottomColor={colors.lightGray}
        p={"2"}
        {...(_weekBox?.[index] ? _weekBox[index] : {})}
      >
        {week.map((day, subIndex) => {
          let isToday = moment().format("Y-MM-DD") === day.format("Y-MM-DD");
          let dateValue = day.format("Y-MM-DD");
          let smsItem = sms
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
              borderWidth={isToday ? "1" : ""}
              borderColor={isToday ? colors.primary : ""}
              rounded="lg"
              opacity={
                type !== "month" && day.day() !== 0
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
                pt={
                  monthDays.length > 1 && index ? 0 : !isIconSizeSmall ? 2 : 0
                }
                textAlign="center"
              >
                {!isIconSizeSmall ? (
                  <VStack alignItems={"center"}>
                    {index === 0 ? (
                      <Text pb="1" color={colors.cardText}>
                        {day.format("ddd")}
                      </Text>
                    ) : (
                      ""
                    )}
                    <Text color={colors.cardText}>{day.format("DD")}</Text>
                  </VStack>
                ) : (
                  <HStack alignItems={"center"} space={1}>
                    <Text>{day.format("dd")}</Text>
                    <Text>{day.format("D")}</Text>
                  </HStack>
                )}
              </Text>
              <TouchableHighlight
                onPress={(e) => setSmsObject(smsItem)}
                // onLongPress={(e) => {
                //   console.log({ e });
                // }}
              >
                <Box alignItems="center">
                  {loading && loading[dateValue + student.id] ? (
                    <GetIcon
                      {...smsIconProp}
                      status="Loader4LineIcon"
                      color={colors.primary}
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
  } else {
    return sms.map((item, index) => (
      <Pressable key={index} onPress={(e) => setSmsObject(item)}>
        <Message key={index} item={item} />
      </Pressable>
    ));
  }
};

export default CalendarComponent;
