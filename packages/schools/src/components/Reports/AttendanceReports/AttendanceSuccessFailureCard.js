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
} from "@shiksha/common-lib";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);
import StudentTile from "./StudentTile";
function AttendanceSuccessFailureCard({ dataFor }) {
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
    <Collapsible
      defaultCollapse={true}
      header={
        <Box py={4}>
          {dataFor === "success" && (
            <>
              <H2>100% This Week</H2>
              <BodyMedium color={colors.subtitle}>3 Students</BodyMedium>
            </>
          )}
          {dataFor === "failure" && (
            <>
              <H2>Absent Consecutive 3 Days</H2>
              <HStack alignItems="center">
                <BodyMedium color={colors.subtitle}>3 Students</BodyMedium>
                <Text fontSize="8px" color={colors.subtitle} mx={2}>
                  ●
                </Text>
                <BodyMedium color={colors.absent}>Less than 45%</BodyMedium>
              </HStack>
            </>
          )}
        </Box>
      }
    >
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
    </Collapsible>
  );
}
export default AttendanceSuccessFailureCard;
