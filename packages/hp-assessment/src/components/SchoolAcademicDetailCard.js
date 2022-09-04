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
  if (status === "visited") {
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
  if (status === "completed") {
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
  let list = [];

  /*const getGroupsUnderSchool = async (id, i) => {
    const {data: {data}} = await hpAssessmentRegistryService.getGroupDetailsById(id);
    list.push(data);
    if(i+1 === grades.length){
      setGradeList(list)
    }
  };*/

  const getGroupsUnderSchool = (id, i) => {
    hpAssessmentRegistryService.getGroupDetailsById(id).then((res) => {
      const data = res.data.data;
      list.push(data);
      if (i + 1 === grades.length) {
        setGradeList(list);
      }
    });
  };

  useEffect(() => {
    grades.forEach((item, i) => {
      getGroupsUnderSchool(item, i);
    });
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
                    status={item.status}
                    id={item.groupId}
                    name={item.name}
                  >
                    <HStack alignItems="center" justifyContent="space-between">
                      <Box>
                        <VStack>
                          <BodyLarge>{item.name}</BodyLarge>
                          <Caption color={colors.gray}>65 Students</Caption>
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
