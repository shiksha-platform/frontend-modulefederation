import React, { useState } from "react";
import {
  Collapsible,
  IconByName,
  attendanceRegistryService,
  ProgressBar,
  getUniqAttendance,
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
  Input,
} from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { H2 } from "@shiksha/common-lib";
import SingleSelectQuestionCard from "./questionTypes/SingleSelectQuestionCard";
import SimpleQuestionCard from "./questionTypes/SimpleQuestionCard";
import MultipleSelectQuestionCard from "./questionTypes/MultipleSelectQuestionCard";
import QuestionList from "./QuestionLIst";
import RoundedProgressBar from "../RoundedProgressBar";
// import StudentDetailCard from "./StudentDetail";

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const StudentsList = ({ classId, students, setHeaderDetails }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [studentlist, setStudentlist] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState();
  const [activeStage, setActiveStage] = useState();

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
        subHeading: "State Examinations",
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
          <Box shadow={2} rounded={6} p={4} pb={0}>
            <Box>
              <VStack space={8}>
                <Box>
                  <VStack space={2}>
                    <Text fontSize="lg" bold>
                      Practical
                    </Text>
                    <Input placeholder="Enter Marks" />
                  </VStack>
                </Box>

                <Divider />

                <Box>
                  <VStack space={2}>
                    <Text fontSize="lg" bold>
                      Theory
                    </Text>
                    <Input placeholder="Enter Marks" />
                  </VStack>
                </Box>
              </VStack>
            </Box>

            <Box py="4">
              <Button
                colorScheme="button"
                py={3}
                _text={{ color: "#fff" }}
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
          <Box shadow={2} rounded={6} p={4} pb={0}>
            <Box>
              <VStack space={8}>
                <Box>
                  <VStack space={2}>
                    <Text fontSize="lg" bold>
                      Practical
                    </Text>
                    <HStack
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        borderWidth={2}
                        borderColor={"#F87558"}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Text color={"#F87558"}>A</Text>
                      </Box>

                      <Box
                        borderWidth={2}
                        borderColor={"#F87558"}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Text color={"#F87558"}>B</Text>
                      </Box>

                      <Box
                        borderWidth={2}
                        borderColor={"#F87558"}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Text color={"#F87558"}>C</Text>
                      </Box>

                      <Box
                        borderWidth={2}
                        borderColor={"#F87558"}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Text color={"#F87558"}>D</Text>
                      </Box>
                    </HStack>
                  </VStack>
                </Box>

                <Divider />

                <Box>
                  <VStack space={2}>
                    <Text fontSize="lg" bold>
                      Theory
                    </Text>
                    <HStack
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        borderWidth={2}
                        borderColor={"#F87558"}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Text color={"#F87558"}>A</Text>
                      </Box>

                      <Box
                        borderWidth={2}
                        borderColor={"#F87558"}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Text color={"#F87558"}>B</Text>
                      </Box>

                      <Box
                        borderWidth={2}
                        borderColor={"#F87558"}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Text color={"#F87558"}>C</Text>
                      </Box>

                      <Box
                        borderWidth={2}
                        borderColor={"#F87558"}
                        borderRadius={"full"}
                        w="30px"
                        h="30px"
                        alignItems={"center"}
                        justifyContent="center"
                      >
                        <Text color={"#F87558"}>D</Text>
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
                _text={{ color: "#fff" }}
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
        <Box p={4}>
          <VStack space={4}>
            <QuestionList />
            <Box py="4">
              <Button
                colorScheme="button"
                py={3}
                _text={{ color: "#fff" }}
                onPress={() => setActiveStage(2)}
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
      <Box p={4}>
        <VStack space={4}>
          <Box>
            <VStack mb={3}>
              <H2 fontWeight="600" color="gray.800">
                {t("Students List")}
              </H2>
              <HStack alignItems={"center"}>
                <Text color="gray.400" fontSize={"xs"}>
                  {t("Total ") + 24}
                </Text>{" "}
                <Text fontSize="5px" color="gray.400">
                  {" "}
                  ●
                </Text>{" "}
                <Text color="gray.400" fontSize={"xs"}>
                  {" "}
                  {t("Present ") + 19}
                </Text>
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
                              <Text
                                color="coolGray.800"
                                _dark={{
                                  color: "warmGray.50",
                                }}
                                bold
                              >
                                {index + 1} . {student.name}
                              </Text>
                              <Text color="gray.400" fontSize={"xs"}>
                                Mr. {student.fathersName}
                              </Text>
                            </VStack>
                          </HStack>
                          <HStack
                            alignItems="center"
                            justifyContent={"space-between"}
                          >
                            <Checkbox colorScheme="orange">
                              {t("Absent")}
                            </Checkbox>
                            {index === 0 && (
                              <Button
                                colorScheme="button"
                                _text={{ color: "#fff" }}
                                size="xs"
                                px={3}
                                onPress={() => setSelectedStudent(student)}
                              >
                                {t("Mark")}
                              </Button>
                            )}

                            {index === 1 && (
                              <Button isDisabled={true} size="xs" px={3}>
                                {t("Mark")}
                              </Button>
                            )}

                            {index === 2 && (
                              <HStack alignItems="center">
                                <Text mr={1} color="#666666">Total Score</Text>
                                <Box marginTop={'-8px'}>
                                  <RoundedProgressBar
                                    values={[79, 21]}
                                    colors={["#0D921B", "#EAE0DF"]}
                                    title={{ text: "79", fontSize: "12px" }}
                                    // legend={{ text: "Total Score", fontSize: "14px" }}
                                    cutout={"79%"}
                                    size="45px"
                                  />
                                </Box>
                              </HStack>
                            )}
                          </HStack>
                        </VStack>
                      </Box>
                      {studentlist.length - 1 != index && <Divider></Divider>}
                    </React.Fragment>
                  );
                })}
            </VStack>
          </Box>

          <Box py="4">
            <Button
              colorScheme="button"
              py={3}
              _text={{ color: "#fff" }}
              onPress={() => navigate("/examscores")}
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
