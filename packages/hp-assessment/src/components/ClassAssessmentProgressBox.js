import React, { useEffect, useState } from "react";
import { Box, HStack, VStack, Text, Divider, Button } from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible,
  ProgressBar,
  overrideColorTheme,
  BodySmall,
  BodyMedium, hpAssessmentRegistryService, assessmentRegistryService
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);
export default function SchoolAssessmentProgressBox() {
  const { t } = useTranslation();
  let assessmentList = [];
  const grades = localStorage.getItem('hp-assessment-grades').split(",");
  const [assessmentData, setAssessmentData] = React.useState([]);

  const calculateAssessmentResults = (assessmentsData, gradeData, i) => {
    const nipunStudent =
      Math.floor(
        assessmentsData.filter((item) => {
          return item.status === "nipun";
        }).length / 2
      );

    const nipunReadyStudent =
      Math.floor(
        assessmentsData.filter((item) => {
          return item.status === "COMPLETED";
        }).length / 2
      );

    assessmentList.push({nipunStudent, nipunReadyStudent, gradeName: gradeData?.name});
    if(i+1 === grades.length){
      setAssessmentData(assessmentList)
    }
  };

  const getAssessmentDetails = async (id, i) => {
    const params = {
      fromDate: "01-01-2022",
      toDate: "08-25-2022",
      groupId: id,
      subject: "English",
      // groupId: localStorage.getItem("hp-assessment-groupId") || "300bd6a6-ee1f-424a-a763-9db8b08a19e9",
    };
    const assessmentData = await assessmentRegistryService.getFilteredAssessments(params);
    const {data: {data}} = await hpAssessmentRegistryService.getGroupDetailsById(id);
    calculateAssessmentResults(assessmentData, data, i);
  };

  useEffect(() => {
    grades.forEach((item, i)=> {
      getAssessmentDetails(item, i);
    })
  }, [])
  return (
    <>
      <Box>
        <VStack space={6}>
          {
            assessmentData && assessmentData.length > 0 && assessmentData.map((data) => {
              return <HStack alignItems="center">
                <Box w={"20%"}>
                  <BodyMedium>Grade {data?.gradeName}</BodyMedium>
                </Box>
                <Box w={"78%"}>
                  <ProgressBar flex="1"
                               data={
                                 [
                                   {
                                     name: `${data?.nipunStudent} Nipun`,
                                     color: "hpAssessment.success",
                                     value: data?.nipunStudent,
                                   },
                                   {
                                     name: `${data?.nipunReadyStudent} Completed`,
                                     color: "hpAssessment.absent",
                                     value: data?.nipunReadyStudent,
                                   },
                                   {
                                     name: `${(data?.nipunReadyStudent + data?.nipunStudent)} pending`,
                                     color: "hpAssessment.unmarked",
                                     value: 20 - (data?.nipunReadyStudent + data?.nipunStudent),
                                   },
                                 ]
                               }
                  />
                </Box>
              </HStack>
            })
          }
          {/*
          <HStack alignItems="center">
            <Box w={"20%"}>
              <BodyMedium>Grade I</BodyMedium>
            </Box>
            <Box w={"78%"}>
              <ProgressBar flex="1" data={progressAssessment} />
            </Box>
          </HStack>
          <HStack alignItems="center">
            <Box w={"20%"}>
              <BodyMedium>Grade II</BodyMedium>
            </Box>
            <Box w={"78%"}>
              <ProgressBar data={progressAssessment} />
            </Box>
          </HStack>
          <HStack alignItems="center">
            <Box w={"20%"}>
              <BodyMedium>Grade III</BodyMedium>
            </Box>
            <Box w={"78%"}>
              <ProgressBar data={progressAssessment} />
            </Box>
          </HStack>
          */}
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
              <Box
                w="15px"
                h="15px"
                mr={2}
                bg="hpAssessment.absent"
                rounded={4}
              ></Box>
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
