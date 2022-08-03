import React, { useState } from "react";
import {
  Box,
  Center,
  VStack,
  Text,
  HStack,
  Avatar,
  Divider,
  Spacer,
  Pressable,
  Button,
} from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible,
  ProgressBar,
  overrideColorTheme,
  BodyMedium,
  Caption,
} from "@shiksha/common-lib";
import StudentTile from "../AttendanceReports/StudentTile";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);

function AssessmentAchieverCard({ dataFor }) {
  const [studentList, setStudentList] = useState([
    {
      id: 1,
      name: "Rahul",
      class: "VI A",
      rollNo: 11,
    },
    {
      id: 2,
      name: "Rahul",
      class: "VI A",
      rollNo: 12,
    },
    {
      id: 3,
      name: "Rahul",
      class: "VI A",
      rollNo: 13,
    },
  ]);

  return (
    <Box bg={colors.white} p={4} rounded={10}>
      <Box py={4}>
        <H2>100% Achievers</H2>
        <HStack alignItems="center">
          <BodyMedium color={colors.subtitle}>SubText-1</BodyMedium>
          <Caption color={colors.subtitle} mx={2}>
            ●
          </Caption>
          <BodyMedium color={colors.subtitle}>SubText-2</BodyMedium>
        </HStack>
      </Box>
      <>
        <Divider mb={4} />
        <VStack space={4}>
          {studentList &&
            studentList.length &&
            studentList.map((student, index) => {
              return (
                <StudentTile
                  student={student}
                  index={index}
                  key={student.id}
                  dataFor={dataFor}
                />
              );
            })}
        </VStack>
      </>
    </Box>
  );
}
export default AssessmentAchieverCard;
