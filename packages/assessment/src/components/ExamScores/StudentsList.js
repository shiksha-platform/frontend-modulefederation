import React, { useState } from "react";
import {
  H2,
  overrideColorTheme,
  Caption,
  BodyLarge,
  Subtitle,
} from "@shiksha/common-lib";
import {
  HStack,
  Text,
  VStack,
  Box,
  Button,
  Divider,
  Checkbox,
  Avatar,
  Input,
} from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import QuestionList from "./QuestionLIst";
import RoundedProgressBar from "../RoundedProgressBar";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

// import StudentDetailCard from "./StudentDetail";

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const StudentsList = ({ setHeaderDetails }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [studentlist, setStudentlist] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();
  const [activeStage, setActiveStage] = useState();
  const questionType = "SA";

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

  React.useEffect(() => {
    if (selectedStudent) {
      setHeaderDetails({
        title: "Summative Assessment 1",
        subHeading: <BodyLarge>{t("State Examinations")}</BodyLarge>,
        student: {
          name: selectedStudent.name,
          fathersName: selectedStudent.fathersName,
        },
      });
    }
  }, [selectedStudent]);

  if (selectedStudent) {
    if (activeStage === 2) {
      return (
        <Box p={4}>
          <Box bg={colors.white} shadow={2} rounded={6} p={4} pb={0}>
            <Box>
              <VStack space={8}>
                <Box>
                  <VStack space={2}>
                    <H2>Practical</H2>
                    <Input placeholder="Enter Marks" />
                  </VStack>
                </Box>

                <Divider />

                <Box>
                  <VStack space={2}>
                    <H2>Theory</H2>
                    <Input placeholder="Enter Marks" />
                  </VStack>
                </Box>
              </VStack>
            </Box>

            <Box py="4">
              <Button
                colorScheme="button"
                py={3}
                _text={{ color: colors.white }}
                onPress={() => setActiveStage(3)}
              >
                {t("Save")}
              </Button>
            </Box>
          </Box>
        </Box>
      );
    } else if (activeStage === 3) {
      return (
        <Box p={4}>
          <Box bg={colors.white} shadow={2} rounded={6} p={4} pb={0}>
            <Box>
              <VStack space={8}>
                <Box>
                  <VStack space={2}>
                    <H2>Practical</H2>
                    <HStack
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        borderWidth={2}
                        borderColor={colors.primary}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Subtitle color={colors.primary}>A</Subtitle>
                      </Box>

                      <Box
                        borderWidth={2}
                        borderColor={colors.primary}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Subtitle color={colors.primary}>B</Subtitle>
                      </Box>

                      <Box
                        borderWidth={2}
                        borderColor={colors.primary}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Subtitle color={colors.primary}>C</Subtitle>
                      </Box>

                      <Box
                        borderWidth={2}
                        borderColor={colors.primary}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Subtitle color={colors.primary}>D</Subtitle>
                      </Box>
                    </HStack>
                  </VStack>
                </Box>

                <Divider />

                <Box>
                  <VStack space={2}>
                    <H2>Theory</H2>
                    <HStack
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        borderWidth={2}
                        borderColor={colors.primary}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Subtitle color={colors.primary}>A</Subtitle>
                      </Box>

                      <Box
                        borderWidth={2}
                        borderColor={colors.primary}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Subtitle color={colors.primary}>B</Subtitle>
                      </Box>

                      <Box
                        borderWidth={2}
                        borderColor={colors.primary}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Subtitle color={colors.primary}>C</Subtitle>
                      </Box>

                      <Box
                        borderWidth={2}
                        borderColor={colors.primary}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Subtitle color={colors.primary}>D</Subtitle>
                      </Box>
                    </HStack>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            <Box py="4">
              <Button
                colorScheme="button"
                py={3}
                _text={{ color: colors.white }}
                onPress={() => setActiveStage(3)}
              >
                {t("Save")}
              </Button>
            </Box>
          </Box>
        </Box>
      );
    } else {
      return (
        <Box bg={colors.white} p={4}>
          <VStack space={4}>
            <QuestionList questionType={questionType} />
            <Box py="4">
              <Button
                colorScheme="button"
                py={3}
                _text={{ color: colors.white }}
                onPress={() => {
                  if (questionType === "SA") {
                    setActiveStage(2);
                  } else {
                    setActiveStage(3);
                  }
                }}
              >
                {t("Save")}
              </Button>
            </Box>
          </VStack>
        </Box>
      );
    }
  } else {
    return (
      <Box p={4} bg={colors.white}>
        <VStack space={4}>
          <Box>
            <VStack mb={3}>
              <H2>{t("Students List")}</H2>
              <HStack alignItems={"center"}>
                <Caption color={colors.gray}>{t("Total ") + 24}</Caption>{" "}
                <Caption color={colors.lightGray}> ●</Caption>{" "}
                <Caption color={colors.gray}> {t("Present ") + 19}</Caption>
              </HStack>
            </VStack>
          </Box>

          <Box>
            <VStack space={4}>
              {studentlist &&
                studentlist.length &&
                studentlist.map((student, index) => {
                  return (
                    <React.Fragment key={`studentslist${index}`}>
                      <Box>
                        <VStack space={2}>
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
                          </HStack>
                          <HStack
                            alignItems="center"
                            justifyContent={"space-between"}
                          >
                            <Checkbox
                              colorScheme="button"
                              borderColor={colors.primary}
                              borderRadius="0"
                            >
                              {""}
                              <BodyLarge>{t("Absent")}</BodyLarge>
                            </Checkbox>
                            {index === 0 && (
                              <Button
                                colorScheme="button"
                                _text={{ color: colors.white }}
                                size="xs"
                                px={3}
                                py="6px"
                                onPress={() => setSelectedStudent(student)}
                              >
                                {t("Mark")}
                              </Button>
                            )}

                            {index === 1 && (
                              <Button
                                isDisabled={true}
                                size="xs"
                                px={3}
                                py="6px"
                              >
                                {t("Mark")}
                              </Button>
                            )}

                            {index === 2 && (
                              <HStack alignItems="center">
                                <BodyLarge mr={1} color={colors.lightGray0}>
                                  Total Score
                                </BodyLarge>
                                <Box marginTop={"-8px"}>
                                  <RoundedProgressBar
                                    values={[79, 21]}
                                    colors={[
                                      colors.successBarColor,
                                      colors.circleProgressBarcolor,
                                    ]}
                                    title={{ text: "79", fontSize: "12px" }}
                                    // legend={{ text: "Total Score", fontSize: "14px" }}
                                    cutout={"79%"}
                                    size="45px"
                                  />
                                </Box>
                              </HStack>
                              // <Button
                              //   colorScheme="button"
                              //   _text={{ color: colors.white }}
                              //   size="xs"
                              //   px={3}
                              //   py="6px"
                              // >
                              //   {t("Mark")}
                              // </Button>
                            )}
                          </HStack>
                        </VStack>
                      </Box>
                      {studentlist.length - 1 != index && (
                        <Divider bg={colors.dividerColor}></Divider>
                      )}
                    </React.Fragment>
                  );
                })}
            </VStack>
          </Box>

          <Box py="4">
            <Button
              colorScheme="button"
              py={3}
              _text={{ color: colors.white }}
              onPress={() => navigate("/assessment/examscores")}
            >
              {t("Save")}
            </Button>
          </Box>
        </VStack>
      </Box>
    );
  }
};

export default StudentsList;
