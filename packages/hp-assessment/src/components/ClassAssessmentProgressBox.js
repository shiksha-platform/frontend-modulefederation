import React, { useEffect, useState } from "react";
import { Box, HStack, VStack, Text, Divider, Button } from "native-base";
import {
  ProgressBar,
  overrideColorTheme,
  BodyMedium,
  hpAssessmentRegistryService,
  assessmentRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);
import moment from "moment";

export default function SchoolAssessmentProgressBox() {
  const { t } = useTranslation();
  let assessmentList = [];
  const grades = localStorage.getItem("hp-assessment-grades").split(",");
  const classId =
    localStorage.getItem("hp-assessment-groupId") ||
    "2bd698db-49a4-4811-943d-9954f8c1f377";
  const [assessmentData, setAssessmentData] = React.useState([]);
  // const [maxStudent, setMaxStudent] = React.useState(20);
  let assessmentAPICount = 0;

  const calculateAssessmentResults = (
    assessmentsData,
    gradeData,
    i,
    maxStudent = 20
  ) => {
    const nipunStudent = Math.floor(
      assessmentsData.filter((item) => {
        return item.status === "nipun";
      }).length / 2
    );

    const nipunReadyStudent = Math.floor(
      assessmentsData.filter((item) => {
        return item.status === "COMPLETED";
      }).length / 2
    );

    assessmentList.push({
      nipunStudent,
      nipunReadyStudent,
      gradeName: gradeData?.name,
      maxStudent: maxStudent,
    });
    ++assessmentAPICount;
    if (assessmentAPICount === grades.length) {
      setAssessmentData(assessmentList);
    }
  };

  const getAssessmentDetails = async (id, i) => {
    const params = {
      fromDate: moment().startOf("year").format("MM-DD-YYYY"),
      toDate: moment().format("MM-DD-YYYY"),
      groupId: id,
      subject: "English",
      // groupId: localStorage.getItem("hp-assessment-groupId") || "300bd6a6-ee1f-424a-a763-9db8b08a19e9",
    };
    const assessmentData =
      await assessmentRegistryService.getFilteredAssessments(params);
    const {
      data: { data },
    } = await hpAssessmentRegistryService.getGroupDetailsById(id);

    /*const req = {
      limit: 15,
      page: 1,
      filters: { school_id: JSON.parse(localStorage.getItem("hp-assessment-school")).schoolId, grade_number: data.gradeLevel },
    };
    const classData = await hpAssessmentRegistryService.studentSearch(req);*/

    const req = {
      limit: "20",
      page: 1,
      filters: { groupId: { _eq: id } },
    };
    const classData =
      await hpAssessmentRegistryService.getGroupMembershipSearch(req);
    calculateAssessmentResults(
      assessmentData,
      data,
      i,
      classData?.data?.data?.length
    );
  };

  // need to call this api with all three class ids
  /*const getStudentsList = async () => {
    let list = [];
    const param = {
      limit: "20",
      page: 1,
      filters: { groupId: { _eq: classId } },
    };
    const {
      data: { data },
    } = await hpAssessmentRegistryService.getGroupMembershipSearch(param);
    calculateParticipantData(data);
    calculateAssessmentResults(data);
    for (const key in data) {
      const res = await studentRegistryService.getOne({ id: data[key].userId });
      res.membershipStatus = data[key].status;
      res.groupMembershipId = data[key].groupMembershipId;
      list.push(res);
      if (key == data.length - 1) {
        setTotalStudentCount(list.length);
      }
    }
    setLoading(false);
  };*/

  useEffect(() => {
    grades.forEach((item, i) => {
      getAssessmentDetails(item, i);
    });
  }, []);
  return (
    <>
      <Box>
        <VStack space={6}>
          {assessmentData &&
            assessmentData.length > 0 &&
            assessmentData.map((data) => {
              return (
                <HStack alignItems="center">
                  <Box w={"20%"}>
                    <BodyMedium>Grade {data?.gradeName}</BodyMedium>
                  </Box>
                  <Box w={"78%"}>
                    <ProgressBar
                      flex="1"
                      data={[
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
                          name: `${
                            data?.nipunReadyStudent + data?.nipunStudent
                          } pending`,
                          color: "hpAssessment.unmarked",
                          value:
                            data?.maxStudent -
                            (data?.nipunReadyStudent + data?.nipunStudent),
                        },
                      ]}
                    />
                  </Box>
                </HStack>
              );
            })}
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
