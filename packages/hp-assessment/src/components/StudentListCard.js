import React, { useState, useEffect } from "react";
import {
  Collapsible,
  overrideColorTheme,
  H2,
  Caption,
  BodyLarge,
  studentRegistryService,
  Loading,
  questionRegistryService,
  IconByName,
  telemetryFactory,
  capture,
  assessmentRegistryService,
  H3,
  useWindowSize,
} from "@shiksha/common-lib";
import {
  HStack,
  VStack,
  Box,
  Divider,
  Avatar,
  Spacer,
  Pressable,
  Button,
  Actionsheet,
  Stack,
  Checkbox,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import colorTheme from "../colorTheme";
import nipun_badge from "../stories/assets/nipun_badge.svg";
const colors = overrideColorTheme(colorTheme);
const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const TileBasedOnStatus = ({
  status,
  children,
  setSelectedStudent,
  student,
}) => {
  if (student.status === "visited") {
    return (
      <Pressable
        onPress={() => {setSelectedStudent(student)}}
        isDisabled={student.attendance === "Absent"}
        _disabled={{ cursor: "not-allowed" }}
      >
        <Box
          bg="hpAssessment.ongoing"
          p={4}
          borderColor="hpAssessment.warning"
          borderWidth={1}
          rounded={10}
        >
          {children}
        </Box>
      </Pressable>
    );
  }
  if (status === "nipun_ready" || status === "nipun") {
    return (
      <Pressable
        onPress={() => setSelectedStudent(student)}
        isDisabled={student.attendance === "Absent"}
        _disabled={{ cursor: "not-allowed" }}
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
      onPress={() => setSelectedStudent(student)}
      isDisabled={student.status === "Absent"}
      _disabled={{ cursor: "not-allowed" }}
    >
      <Box
        bg="hpAssessment.white"
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

const StudentListCard = ({
  classId,
  setPageName,
  student,
  setHeaderDetails,
  chooseAssessmentTypeModal,
  handleSelectedStudent,
  handleStudentPageNext,
  studentList,
  selectedStudent,
  setSelectedStudent
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [width, height] = useWindowSize();

  const [loading, setLoading] = React.useState(false);

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <TileBasedOnStatus
      setSelectedStudent={setSelectedStudent}
      student={student}
    >
      <HStack alignItems="center" justifyContent="space-between">
        <Box>
          <HStack alignItems="center" space={3}>
            <Avatar
              size="48px"
              borderRadius="md"
              source={{
                uri: "https://via.placeholder.com/50x50.png",
              }}
            />
            <VStack>
              <BodyLarge
                color={
                  selectedStudent?.id === student.id
                    ? "hpAssessment.black"
                    : "hpAssessment.gray"
                }
              >{student.firstName}</BodyLarge>
            </VStack>
          </HStack>
        </Box>
        {/*{
          index === 2 &&
          <Box>
            <img src={nipun_badge} alt="nipun" style={{maxWidth: '35px'}} />
          </Box>
        }*/}
      </HStack>
    </TileBasedOnStatus>
  );
};

export default StudentListCard;
