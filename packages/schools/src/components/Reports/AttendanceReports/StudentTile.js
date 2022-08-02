import React, { useState } from "react";
import {
  Collapsible,
  IconByName,
  attendanceRegistryService,
  ProgressBar,
  getUniqAttendance,
  BodyMedium,
} from "@shiksha/common-lib";
import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Progress,
  Button,
  Divider,
  Actionsheet,
  Checkbox,
  Avatar,
  Spacer,
  Pressable,
} from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { H2, overrideColorTheme } from "@shiksha/common-lib";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);

// import StudentDetailCard from "./StudentDetail";

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const StudentTile = ({ index, student, dataFor }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (dataFor === "success") {
    return (
      <React.Fragment>
        <Box
          bg={colors.lightGreen}
          p={4}
          rounded={5}
          borderColor={colors.green}
          borderWidth={1}
        >
          <HStack alignItems="center" space={3}>
            <Avatar
              size="48px"
              borderRadius="md"
              source={{
                uri: "https://via.placeholder.com/50x50.png",
              }}
            />
            <VStack>
              <HStack alignItems="center">
                <BodyMedium color={colors.subtitle}>{student.name}</BodyMedium>
                <Text fontSize="8px" color={colors.subtitle} mx={2}>
                  ●
                </Text>
                <Text color={colors.green}>100%</Text>
              </HStack>
              <BodyMedium color={colors.subtitle}>
                Roll No: {student.rollNo}
              </BodyMedium>
            </VStack>
          </HStack>
        </Box>
      </React.Fragment>
    );
  } else if (dataFor === "failure") {
    return (
      <React.Fragment>
        <Box
          bg={colors.redLight}
          p={4}
          rounded={5}
          borderColor={colors.absent}
          borderWidth={1}
        >
          <HStack alignItems="center" space={3}>
            <Avatar
              size="48px"
              borderRadius="md"
              source={{
                uri: "https://via.placeholder.com/50x50.png",
              }}
            />
            <VStack>
              <HStack alignItems="center">
                <BodyMedium color={colors.subtitle}>{student.name}</BodyMedium>
                <Text fontSize="8px" color={colors.subtitle} mx={2}>
                  ●
                </Text>
                <Text color={colors.absent}>14 days</Text>
              </HStack>
              <BodyMedium color={colors.subtitle}>
                Roll No: {student.rollNo}
              </BodyMedium>
            </VStack>
          </HStack>
        </Box>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Box bg={colors.white} py={1}>
          <HStack alignItems="center" space={3}>
            <Avatar
              size="48px"
              borderRadius="md"
              source={{
                uri: "https://via.placeholder.com/50x50.png",
              }}
            />
            <VStack>
              <BodyMedium color={colors.subtitle}>{student.name}</BodyMedium>
              <BodyMedium color={colors.subtitle} fontSize={"xs"}>
                Roll No: {student.rollNo}
              </BodyMedium>
            </VStack>
          </HStack>
        </Box>
      </React.Fragment>
    );
  }
};

export default StudentTile;
