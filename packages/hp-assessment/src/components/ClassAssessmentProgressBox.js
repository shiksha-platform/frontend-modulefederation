import React, { useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Text, Divider, Button
} from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible, ProgressBar, overrideColorTheme
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);
export default function SchoolAssessmentProgressBox() {
  const { t } = useTranslation();
  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "22 Nipun",
      color: colors.successBarColor,
      value: 22,
    },
    {
      name: "4 Completed",
      color: '#DF5B5B',
      value: 4,
    },
    {
      name: "1 pending",
      color: colors.pendingBarColor,
      value: 1,
    },
  ]);
  return (
    <>
      <Box>
        <VStack space={4}>
          <HStack alignItems="center">
            <Box w={'20%'}>
              Grade I
            </Box>
            <Box w={'79%'}>
              <ProgressBar
                flex="1"
                data={progressAssessment}
              />
            </Box>
          </HStack>
          <HStack alignItems="center">
            <Box w={'20%'}>
              Grade II
            </Box>
            <Box w={'79%'}>
              <ProgressBar
                data={progressAssessment}
              />
            </Box>
          </HStack>
          <HStack alignItems="center">
            <Box w={'20%'}>
              Grade III
            </Box>
            <Box w={'79%'}>
              <ProgressBar
                data={progressAssessment}
              />
            </Box>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <HStack alignItems="center" >
              <Box w='15px' h="15px" mr={2} bg={colors.successBarColor} rounded={4}></Box>
              <Text>Nipun</Text>
            </HStack>
            <HStack alignItems="center" >
              <Box w='15px' h="15px" mr={2} bg={'#DF5B5B'} rounded={4}></Box>
              <Text>Completed</Text>
            </HStack>
            <HStack alignItems="center" >
              <Box w='15px' h="15px" mr={2} bg={colors.pendingBarColor} rounded={4}></Box>
              <Text>Not Assessed</Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </>
  );
}
