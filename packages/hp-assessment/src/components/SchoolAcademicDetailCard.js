import React, { useState } from "react";
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
  Collapsible, BodyLarge, Caption, overrideColorTheme
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const _handleGradeSelect = () => {
  localStorage.setItem(
    "hp-assessment-groupId",
    "300bd6a6-ee1f-424a-a763-9db8b08a19e9"
  );
};

const TileBasedOnStatus = ({ status, children }) => {
  const navigate = useNavigate();
  if (status === "ongoing") {
    return (
      <Pressable
        onPress={() => {
          _handleGradeSelect();
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
  if (status === "complete" || status === "completeWithNipun") {
    return (
      <Pressable
        onPress={() => {
          _handleGradeSelect();
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
        _handleGradeSelect();
        navigate("/hpAssessment/class-details");
      }}
    >
      <Box p={4} borderColor="hpAssessment.pendingSeparator" borderWidth={1} rounded={10}>
        {children}
      </Box>
    </Pressable>
  );
};

export default function SchoolAcademicDetailCard() {
  const { t } = useTranslation();
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

            <TileBasedOnStatus status={"ongoing"}>
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

            <TileBasedOnStatus status={"complete"}>
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
          </VStack>
        </>
      </Collapsible>
    </>
  );
}
