import React, { useEffect, useState } from "react";
import { Box, HStack, VStack, Text, Divider, Button } from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible,
  ProgressBar,
  overrideColorTheme,
  Caption, BodyMedium
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);
export default function ClassParticipationCollapsibleCard({assessmentsData, totalStudentCount, presentStudentCount, absentStudentCount}) {
  const { t } = useTranslation();
  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: `${presentStudentCount} Present`,
      color: "hpAssessment.success",
      value: presentStudentCount,
    },
    {
      name: `${absentStudentCount} Absent`,
      color: "hpAssessment.absent",
      value: absentStudentCount,
    },
    {
      name: `${(totalStudentCount - (presentStudentCount + absentStudentCount))} Unmarked`,
      color: "hpAssessment.unmarked",
      value: (totalStudentCount - (presentStudentCount + absentStudentCount)),
    },
  ]);

  return (
    <>
      <Collapsible
        defaultCollapse={true}
        header={
          <Box py={4}>
            <H2>Class Participation</H2>
            <HStack alignItems={"center"}>
              <Caption>
                {t("Total Students for Evaluation ") + 27}
              </Caption>{" "}
              <Caption fontSize={2}>
                {" "}
                •
              </Caption>{" "}
              <Caption> {t("Present ") + presentStudentCount}</Caption>
            </HStack>
          </Box>
        }
      >
        <>
          <Box>
            <VStack space={4}>
              <HStack alignItems="center">
                <Box w={"20%"}><BodyMedium>Total</BodyMedium></Box>
                <Box w={"78%"}>
                  <ProgressBar flex="1" data={progressAssessment} />
                </Box>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center">
                  <Box
                    w="15px"
                    h="15px"
                    mr={2}
                    bg="hpAssessment.success"
                    rounded={4}
                  ></Box>
                  <BodyMedium>Present</BodyMedium>
                </HStack>
                <HStack alignItems="center">
                  <Box
                    w="15px"
                    h="15px"
                    mr={2}
                    bg="hpAssessment.absent"
                    rounded={4}
                  ></Box>
                  <BodyMedium>Absent</BodyMedium>
                </HStack>
                <HStack alignItems="center">
                  <Box
                    w="15px"
                    h="15px"
                    mr={2}
                    bg="hpAssessment.unmarked"
                    rounded={4}
                  ></Box>
                  <BodyMedium>Unmarked</BodyMedium>
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </>
      </Collapsible>
    </>
  );
}
