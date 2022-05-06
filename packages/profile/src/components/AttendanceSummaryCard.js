import { IconByName } from "@shiksha/common-lib";
import { Box, HStack, Text, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

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
  if (thisMonth >= 100) {
    bg = "attendanceSuccessCardCompareBg.500";
    iconName = "EmotionHappyLineIcon";
    title = t("YOU_HAVE_BEEN_PRESENT_ALL_DAYS_THIS_MONTH");
  } else if (thisMonth < 100 && thisMonth >= 50) {
    bg = "attendanceWarningCardCompareBg.500";
    iconName = "EmotionNormalLineIcon";
    title = t("AGERAGE_THAN_LAST_MONTH_CAN_BE_IMPROVED");
  } else {
    bg = "attendanceDangerCardCompareBg.500";
    iconName = "EmotionSadLineIcon";
    title = t("ABSENT_TODAY_POOR_THAN_LAST_WEEK");
  }
  return (
    <VStack>
      <Box bg={bg} roundedTop={"xl"} py="10px" px="15px">
        <HStack alignItems={"center"}>
          <IconByName name={iconName} color={"white"} />
          <Text
            textTransform="ingerit"
            fontSize="12px"
            fontWeight="500"
            color={"white"}
          >
            {title}
          </Text>
        </HStack>
      </Box>
      <Box bg="weekCardCompareBg.500" p="5">
        <HStack alignItems={"center"} justifyContent="space-around">
          <VStack alignItems="center">
            <Text fontSize="24px" fontWeight="600" color="present.500">
              {thisMonth}%
            </Text>
            <Text fontSize="14px" fontWeight="400" color="gray.500">
              {t("THIS_MONTH")}
            </Text>
          </VStack>
          <VStack alignItems="center">
            <Text
              fontSize="24px"
              fontWeight="600"
              color="presentCardCompareText.500"
            >
              {lastMonth}%
            </Text>
            <Text fontSize="14px" fontWeight="400" color="gray.500">
              {t("LAST_MONTH")}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </VStack>
  );
}
