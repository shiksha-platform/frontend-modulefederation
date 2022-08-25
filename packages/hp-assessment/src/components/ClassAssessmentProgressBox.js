import React, { useState } from "react";
import { Box, HStack, VStack, Text, Divider, Button } from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible,
  ProgressBar,
  overrideColorTheme, BodySmall, BodyMedium
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);
export default function SchoolAssessmentProgressBox() {
  const { t } = useTranslation();
  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "22 Nipun",
      color: "hpAssessment.success",
      value: 22,
    },
    {
      name: "4 Completed",
      color: "hpAssessment.absent",
      value: 4,
    },
    {
      name: "1 pending",
      color: "hpAssessment.unmarked",
      value: 1,
    },
  ]);
  return (
    <>
      <Box>
        <VStack space={6}>
          <HStack alignItems="center">
            <Box w={"20%"}><BodyMedium>Grade I</BodyMedium></Box>
            <Box w={"78%"}>
              <ProgressBar flex="1" data={progressAssessment} />
            </Box>
          </HStack>
          <HStack alignItems="center">
            <Box w={"20%"}><BodyMedium>Grade II</BodyMedium></Box>
            <Box w={"78%"}>
              <ProgressBar data={progressAssessment} />
            </Box>
          </HStack>
          <HStack alignItems="center">
            <Box w={"20%"}><BodyMedium>Grade III</BodyMedium></Box>
            <Box w={"78%"}>
              <ProgressBar data={progressAssessment} />
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
              <BodyMedium>Nipun</BodyMedium>
            </HStack>
            <HStack alignItems="center">
              <Box w="15px" h="15px" mr={2} bg="hpAssessment.absent" rounded={4}></Box>
              <BodyMedium>Completed</BodyMedium>
            </HStack>
            <HStack alignItems="center">
              <Box
                w="15px"
                h="15px"
                mr={2}
                bg="hpAssessment.unmarked"
                rounded={4}
              ></Box>
              <BodyMedium>Not Assessed</BodyMedium>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </>
  );
}
