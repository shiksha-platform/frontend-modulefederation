import React, { useEffect, useState } from "react";
import { Box, HStack, VStack, Text, Divider, Button } from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible,
  ProgressBar,
  overrideColorTheme,
  assessmentRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);
export default function ClassAssessmentResultCollapsibleCard() {
  const { t } = useTranslation();
  const [assessmentsData, setAssessmentsData] = React.useState([]);
  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "22 Nipun",
      color: colors.successBarColor,
      value: 22,
    },
    {
      name: "4 Completed",
      color: "#DF5B5B",
      value: 4,
    },
    {
      name: "1 pending",
      color: colors.unmarked,
      value: 1,
    },
  ]);

  const getFilteredAssessments = async () => {
    const params = {
      // fromDate: '',
      // toDate: '',
      groupId:
        localStorage.getItem("hp-assessment-groupId") ||
        "300bd6a6-ee1f-424a-a763-9db8b08a19e9",
    };
    const data = await assessmentRegistryService.getFilteredAssessments(params);
    setAssessmentsData(data);
  };

  useEffect(() => {
    getFilteredAssessments();
  }, []);

  return (
    <>
      <Collapsible
        defaultCollapse={true}
        header={
          <Box py={4}>
            <H2>Assessments Results</H2>
          </Box>
        }
      >
        <>
          <Box>
            <VStack space={4}>
              <HStack alignItems="center">
                <Box w={"20%"}>Grade I</Box>
                <Box w={"79%"}>
                  <ProgressBar flex="1" data={progressAssessment} />
                </Box>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center">
                  <Box
                    w="15px"
                    h="15px"
                    mr={2}
                    bg={colors.successBarColor}
                    rounded={4}
                  ></Box>
                  <Text>Nipun</Text>
                </HStack>
                <HStack alignItems="center">
                  <Box
                    w="15px"
                    h="15px"
                    mr={2}
                    bg={"#DF5B5B"}
                    rounded={4}
                  ></Box>
                  <Text>Completed</Text>
                </HStack>
                <HStack alignItems="center">
                  <Box
                    w="15px"
                    h="15px"
                    mr={2}
                    bg={colors.unmarked}
                    rounded={4}
                  ></Box>
                  <Text>Not Assessed</Text>
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </>
      </Collapsible>
    </>
  );
}
