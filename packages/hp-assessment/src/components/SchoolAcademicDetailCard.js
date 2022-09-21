import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  VStack,
  Text,
  HStack,
  Avatar,
  Divider,
  Actionsheet,
  Stack,
  Pressable,
} from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible,
  BodyLarge,
  Caption,
  overrideColorTheme,
  hpAssessmentRegistryService,
  classRegistryService,
  studentRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const _handleGradeSelect = (id, name) => {
  localStorage.setItem("hp-assessment-groupId", id);
  localStorage.setItem("hp-assessment-groupName", name);
};

const TileBasedOnStatus = ({ status, id, name, children }) => {
  const navigate = useNavigate();
  if (status === "ONGOING") {
    return (
      <Pressable
        onPress={() => {
          _handleGradeSelect(id, name);
          navigate("/hpAssessment/class-details");
        }}
      >
        <Box
          bg="hpAssessment.ongoing"
          p={4}
          borderColor={colors.warning}
          borderWidth={1}
          rounded={10}
        >
          {children}
        </Box>
      </Pressable>
    );
  }
  if (status === "COMPLETED") {
    return (
      <Pressable
        onPress={() => {
          _handleGradeSelect(id, name);
          navigate("/hpAssessment/class-details");
        }}
      >
        <Box
          bg="hpAssessment.completed"
          p={4}
          borderColor="hpAssessment.completeSeparator"
          borderWidth={1}
          rounded={10}
        >
          {children}
        </Box>
      </Pressable>
    );
  }
  return (
    <Pressable
      onPress={() => {
        _handleGradeSelect(id, name);
        navigate("/hpAssessment/class-details");
      }}
    >
      <Box
        p={4}
        borderColor="hpAssessment.pendingSeparator"
        borderWidth={1}
        rounded={10}
      >
        {children}
      </Box>
    </Pressable>
  );
};

export default function SchoolAcademicDetailCard() {
  const { t } = useTranslation();
  const grades = localStorage.getItem("hp-assessment-grades").split(",");

  const [gradeList, setGradeList] = useState([]);

  const getGroupsUnderSchool = () => {
    const promiseList = grades.map((item, i) => {
      return hpAssessmentRegistryService.getGroupDetailsById(item);
    });
    Promise.all(promiseList).then((res) => {
      const formattedResponse = res.map((item) => {
        return item.data.data;
      });
      getStudentDetails(formattedResponse);
    });
  };

  const getStudentDetails = (formattedResponse) => {
    const newFormattedResponse = formattedResponse.map(async (item, i) => {
      const params = {
        limit: 20,
        page: 1,
        filters: { school_id: item.schoolId, grade_number: item.gradeLevel },
      };
      const data = await hpAssessmentRegistryService.studentSearch(params);
      return { ...item, totalStudent: data?.data?.total };
    });

    setFormattedResponse(newFormattedResponse);
  };

  const setFormattedResponse = async (newFormattedResponse) => {
    await Promise.all(newFormattedResponse).then((res) => {
      getMembershipList(res);
    });
  };

  const getMembershipList = (res) => {
    const resWithStatus = res.map(async (item, i) => {
      const params = {
        limit: 20,
        page: 1,
        filters: { groupId: { _eq: item.groupId } },
      };
      const {
        data: { data },
      } = await hpAssessmentRegistryService.getGroupMembershipSearch(params);
      const allStatus = data.map((key) => {
        return key.status;
      });
      return { ...item, allStatus };
    });

    setGradeDataWithStaus(resWithStatus);
    /*let list = [];
    const param = {
      limit: "20",
      page: 1,
      filters: { groupId: { _eq: classId } },
    };*/
    // const {
    //   data: { data },
    // } = await hpAssessmentRegistryService.getGroupMembershipSearch(param);
    /*for (const key in data) {
      const res = await studentRegistryService.getOne({ id: data[key].userId });
      res.membershipStatus = data[key].status;
      res.groupMembershipId = data[key].groupMembershipId;
      list.push(res);
      if (key == data.length - 1) {
        setStudentlist(list);
        setTotalStudentCount(list.length)
      }
    }
    setLoading(false);*/
  };

  const setGradeDataWithStaus = async (resWithStatus) => {
    await Promise.all(resWithStatus).then((res) => {
      setGradeList(res);
      // getMembershipList(res);
    });
  };

  const checkTileStatus = (statusArray) => {
    const isPending = statusArray.every((item) => {
      return item === "";
    });

    const isCompleted = statusArray.every((item) => {
      return item != "";
    });
    if (isPending) {
      return "PENDING";
    } else if (isCompleted) {
      return "COMPLETED";
    } else {
      return "ONGOING";
    }
  };

  useEffect(() => {
    getGroupsUnderSchool();
  }, []);

  return (
    <>
      <Collapsible
        defaultCollapse={true}
        header={
          <Box py={4}>
            <H2>Academic Details</H2>
          </Box>
        }
      >
        <>
          {/*<Divider mb={4} />*/}
          <VStack space={4}>
            {gradeList &&
              gradeList.length > 0 &&
              gradeList.map((item) => {
                return (
                  <TileBasedOnStatus
                    status={checkTileStatus(item.allStatus)}
                    id={item.groupId}
                    name={item.gradeLevel}
                  >
                    <HStack alignItems="center" justifyContent="space-between">
                      <Box>
                        <VStack>
                          <BodyLarge>
                            {item.gradeLevel == 1
                              ? "Grade I"
                              : item.gradeLevel == 2
                              ? "Grade II"
                              : "Grade III"}
                          </BodyLarge>
                          <Caption color={colors.gray}>
                            {item.totalStudent} Students
                          </Caption>
                        </VStack>
                      </Box>
                      <IconByName
                        name="ArrowRightSLineIcon"
                        isDisabled={true}
                      />
                    </HStack>
                  </TileBasedOnStatus>
                );
              })}
            {/*
            <TileBasedOnStatus status={"pending"}>
              <HStack alignItems="center" justifyContent="space-between">
                <Box>
                  <VStack>
                    <BodyLarge>Grade I</BodyLarge>
                    <Caption color={colors.gray}>65 Students</Caption>
                  </VStack>
                </Box>
                <IconByName name="ArrowRightSLineIcon" isDisabled={true} />
              </HStack>
            </TileBasedOnStatus>

            <TileBasedOnStatus status={"visited"}>
              <HStack alignItems="center" justifyContent="space-between">
                <Box>
                  <VStack>
                    <BodyLarge>Grade II</BodyLarge>
                    <Caption color={colors.gray}>69 Students</Caption>
                  </VStack>
                </Box>
                <IconByName name="ArrowRightSLineIcon" isDisabled={true} />
              </HStack>
            </TileBasedOnStatus>

            <TileBasedOnStatus status={"nipun_ready"}>
              <HStack alignItems="center" justifyContent="space-between">
                <Box>
                  <VStack>
                    <BodyLarge>Grade III</BodyLarge>
                    <Caption color={colors.gray}>69 Students</Caption>
                  </VStack>
                </Box>
                <IconByName name="ArrowRightSLineIcon" isDisabled={true} />
              </HStack>
            </TileBasedOnStatus>
            */}
          </VStack>
        </>
      </Collapsible>
    </>
  );
}
