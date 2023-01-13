import {
  BodySmall,
  H1,
  IconByName,
  Subtitle,
  overrideColorTheme,
  BodyLarge,
} from "@shiksha/common-lib";
import { Box, HStack, Text, VStack } from "native-base";
import Profile from "pages/Profile";
import React from "react";
import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";

const colors = overrideColorTheme(colorTheme);
export default function AttendanceSummaryCard({ thisMonth, lastMonth }) {
  const { t } = useTranslation();

  let bg,
    iconName,
    title = "";
  if (thisMonth > 100) {
    thisMonth = 100;
  } else if (lastMonth > 100) {
    lastMonth = 100;
  }
  // if (thisMonth >= 100) {
  //   bg = "attendanceSuccessCardCompareBg.500";
  //   iconName = "EmotionHappyLineIcon";
  //   title = t("YOU_HAVE_BEEN_PRESENT_ALL_DAYS_THIS_MONTH");
  // } else if (thisMonth < 100 && thisMonth >= 50) {
  //   bg = "attendanceWarningCardCompareBg.500";
  //   iconName = "EmotionNormalLineIcon";
  //   title = t("AVERAGE_THAN_LAST_MONTH_CAN_BE_IMPROVED");
  // } else {
  //   bg = "attendanceDangerCardCompareBg.500";
  //   iconName = "EmotionSadLineIcon";
  //   title = t("ABSENT_TODAY_POOR_THAN_LAST_WEEK");
  // }
  return (
    <VStack>
      {title !== "" ? (
        <Box bg={"profile.success"} roundedTop={"xl"} py="10px" px="15px">
          <HStack alignItems={"center"}>
            <IconByName name={iconName} color={"profile.white"} />
            <Subtitle textTransform="ingerit" color={"profile.white"}>
              {title}
            </Subtitle>
          </HStack>
        </Box>
      ) : (
        <React.Fragment />
      )}
      <Box bg={"profile.primaryLight"} p="5">
        <HStack alignItems={"center"} justifyContent="space-around">
          <VStack alignItems="center">
            <H1 color={"profile.success"}>
              {thisMonth ? Math.round(thisMonth) : 0}%
            </H1>
            <BodyLarge color={"profile.gray"}>{t("THIS_MONTH")}</BodyLarge>
          </VStack>
          <VStack alignItems="center">
            <H1 color={"profile.presentText"}>
              {lastMonth ? Math.round(lastMonth) : 0}%
            </H1>
            <BodyLarge color={"profile.gray"}>{t("LAST_MONTH")}</BodyLarge>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
}
