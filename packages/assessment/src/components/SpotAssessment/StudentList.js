import React, { useState } from "react";
import {
  Collapsible,
  overrideColorTheme,
  H2,
  Caption,
  BodyLarge,
} from "@shiksha/common-lib";
import {
  HStack,
  VStack,
  Box,
  Divider,
  Avatar,
  Spacer,
  Pressable,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);
const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const StudentListCard = ({ classId, students, setHeaderDetails }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [studentlist, setStudentlist] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();

  React.useEffect(() => {
    setStudentlist([
      {
        id: 1,
        name: "Rahul",
        fathersName: "Father's Name",
      },
      {
        id: 2,
        name: "Rahul",
        fathersName: "Father's Name",
      },
      {
        id: 3,
        name: "Rahul",
        fathersName: "Father's Name",
      },
    ]);
  }, []);

  return (
    <Collapsible
      defaultCollapse={true}
      header={
        <>
          <VStack>
            <H2>{t("Students List")}</H2>
            <HStack alignItems={"center"}>
              <Caption color={colors.gray}>{t("Total ") + 24}</Caption>{" "}
              <Caption color={colors.lightGray}> ●</Caption>{" "}
              <Caption color={colors.gray}> {t("Present ") + 19}</Caption>
            </HStack>
          </VStack>
        </>
      }
      fontSize="2px"
    >
      {studentlist &&
        studentlist.length &&
        studentlist.map((student, index) => {
          return (
            <React.Fragment key={`student${index}`}>
              <Box py="3">
                <Pressable onPress={() => navigate("/assessment-result")}>
                  <HStack alignItems="center" space={3}>
                    <Avatar
                      size="48px"
                      borderRadius="md"
                      source={{
                        uri: "https://via.placeholder.com/50x50.png",
                      }}
                    />
                    <VStack>
                      <BodyLarge>
                        {index + 1}{" "}
                        <Caption color={colors.lightGray}> ●</Caption>{" "}
                        {student.name}
                      </BodyLarge>
                      <Caption color={colors.lightGray}>
                        Mr. {student.fathersName}
                      </Caption>
                    </VStack>
                    <Spacer />
                  </HStack>
                </Pressable>
              </Box>

              {studentlist.length - 1 != index && (
                <Divider bg={colors.dividerColor}></Divider>
              )}
            </React.Fragment>
          );
        })}
    </Collapsible>
  );
};

export default StudentListCard;
