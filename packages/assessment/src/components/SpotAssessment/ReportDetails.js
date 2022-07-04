import {
  Collapsible,
  IconByName,
  Layout,
  ProgressBar,
  H2,
  H3,
  telemetryFactory,
  capture,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack, Stack, Avatar, Button } from "native-base";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(ArcElement, Tooltip, Legend);

export default function ReportDetails({ appName }) {
  const { t } = useTranslation();
  const [weekPage, setWeekPage] = useState(0);
  const [allAttendanceStatus, setAllAttendanceStatus] = useState({});
  const [students, setStudents] = useState([]);
  const [searchStudents, setSearchStudents] = useState([]);
  const [classObject, setClassObject] = useState({});
  const { classId } = useParams();
  const [loading, setLoading] = useState(false);
  const teacherId = sessionStorage.getItem("id");
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState();
  const [pageName, setPageName] = useState();
  const [headerDetails, setHeaderDetails] = useState();
  const [questionList, setQuestionList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "12 Assessed",
      color: "#0D921B",
      value: 12,
    },
    {
      name: "6 pending",
      color: "#DDDDDD",
      value: 6,
    },
  ]);

  const _handleSpotAssessmentFullReportStart = () => {
    const telemetryData = telemetryFactory.start({
      appName,
      type: "Spot-Assessment-End",
    });
    capture("START", telemetryData);
  };

  const _handleSpotAssessmentFullReportEnd = () => {
    const telemetryData = telemetryFactory.end({
      appName,
      type: "Spot-Assessment-End",
    });
    capture("END", telemetryData);
  };

  const _handleSpotAssessmentFullReportShare = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Spot-Assessment-Full-Report-Share",
    });
    capture("INTERACT", telemetryData);
  };

  const _handleSpotAssessmentFullReportDownload = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Spot-Assessment-Full-Report-Download",
    });
    capture("INTERACT", telemetryData);
  };
  /*useEffect(() => {

    return () => {
      console.log('page leaved');
    }
  }, []);*/

  return (
    <Layout
      _header={{
        title: "Report Details",
        isEnableSearchBtn: true,
        // setSearch: setSearch,
        subHeading: "Spot Assessment",
      }}
      _appBar={{
        languages: ["en"],
        rightIcon: <HStack>
          <IconByName name="ShareLineIcon" />
          <IconByName name="DownloadLineIcon" />
        </HStack>
      }}
      subHeader={
        <VStack>
          <Text fontSize={"lg"}>Science</Text>
          <HStack alignItems={"center"}>
            <Text color={"#373839"} fontSize={"xs"}>
              {t("Class VI")}
            </Text>{" "}
            <Text fontSize="5px" color="#373839">
              {" "}
              ●
            </Text>{" "}
            <Text color="#373839" fontSize={"xs"}>
              {" "}
              {t("Sec A")}
            </Text>
          </HStack>
        </VStack>
      }
      _subHeader={{ bg: "#FFCAAC" }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            module: "Registry",
            route: "/classes",
            routeparameters: {},
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
        ],
      }}
    >
      <Stack space={1} mb="2" shadow={2}>
        <Box bg={"#EFEFEF"}>
          <VStack space={2}>
            <Box p={4} bg={"white"}>
              <HStack alignItems="center" justifyContent="space-between">
                <Text fontSize={16} fontWeight={600}>
                  15, January 2022
                </Text>
                <IconByName name="ListUnorderedIcon" pr="0" />
              </HStack>
            </Box>

            <Box p={4} bg={"white"}>
              <VStack space={2}>
                <H2 bold>Class Participation</H2>
                <Box borderRadius="md">
                  <VStack>
                    <Box px="4" py={2} bg={"#F57B7B"} roundedTop="6">
                      <HStack alignItems="center">
                        <IconByName
                          name="EmotionSadLineIcon"
                          pr="0"
                          color="white"
                        />
                        <Text color="white" bold fontSize="xs">
                          {" "}
                          Poor overall performance!
                        </Text>
                      </HStack>
                    </Box>
                    <Box p="4" bg={"#FFF8F7"}>
                      <VStack flex="auto" alignContent={"center"}>
                        <ProgressBar
                          isTextShow
                          legendType="separated"
                          h="35px"
                          _bar={{ rounded: "md" }}
                          isLabelCountHide
                          data={progressAssessment}
                        />
                      </VStack>
                    </Box>
                    <Box
                      p="4"
                      bg={"#FEF1EE"}
                      borderBottomRadius={6}
                      textAlign="center"
                    >
                      <Text>
                        Average Class Score is <Text bold>18</Text> out of{" "}
                        <Text bold>25</Text>
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            <Box p={4} bg="white">
              <VStack space={4}>
                <H2 mb={3} fontWeight={600}>
                  100% Achievers
                </H2>
                <Box p={4} bg="#FFF9F9" rounded="10">
                  <HStack space={2} justifyContent="space-between">
                    <Box textAlign={"center"}>
                      <VStack space={1}>
                        <Avatar
                          size="48px"
                          mx="auto"
                          borderRadius="md"
                          source={{
                            uri: "https://via.placeholder.com/50x50.png",
                          }}
                        />
                        <H3>Shivani Joshi</H3>
                        <Text fontSize="xs" color={"#373839"}>
                          Roll No 11
                        </Text>
                      </VStack>
                    </Box>

                    <Box textAlign={"center"}>
                      <VStack space={1}>
                        <Avatar
                          size="48px"
                          mx="auto"
                          borderRadius="md"
                          source={{
                            uri: "https://via.placeholder.com/50x50.png",
                          }}
                        />
                        <H3>Shivani Joshi</H3>
                        <Text fontSize="xs" color={"#373839"}>
                          Roll No 11
                        </Text>
                      </VStack>
                    </Box>

                    <Box textAlign={"center"}>
                      <VStack space={1}>
                        <Avatar
                          size="48px"
                          mx="auto"
                          borderRadius="md"
                          source={{
                            uri: "https://via.placeholder.com/50x50.png",
                          }}
                        />
                        <H3>Shivani Joshi</H3>
                        <Text fontSize="xs" color={"#373839"}>
                          Roll No 11
                        </Text>
                      </VStack>
                    </Box>
                  </HStack>
                </Box>
              </VStack>
            </Box>
            <Box p={4} bg="white">
              <Collapsible
                defaultCollapse={true}
                header={
                  <VStack>
                    <H2 px={2} fontWeight={600}>
                      {t("Student Wise Assessment")}
                    </H2>
                    <HStack alignItems={"center"}>
                      <Text color={"#373839"} fontSize={"xs"} fontWeight={400}>
                        {t("3 Students")}{" "}
                      </Text>
                      <Text fontSize="5px" color="#373839" fontWeight={400}>
                        {" "}
                        ●{" "}
                      </Text>
                      <Text color="#373839" fontSize={"xs"} fontWeight={400}>
                        {" "}
                        {t("Max Score : " + 25)}
                      </Text>
                    </HStack>
                  </VStack>
                }
                fontSize="2px"
              >
                <VStack pt={6} space={4}>
                  <Box>
                    <VStack space={4}>
                      <Box>
                        <HStack
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Box>
                            <HStack>
                              <Avatar
                                size="48px"
                                borderRadius="md"
                                mr={4}
                                source={{
                                  uri: "https://via.placeholder.com/50x50.png",
                                }}
                              />
                              <Box>
                                <VStack>
                                  <H2>Shah Rukh Khan</H2>
                                  <HStack alignItems={"center"}>
                                    <Text
                                      color={"#373839"}
                                      fontSize={"xs"}
                                      fontWeight={400}
                                    >
                                      {t("Roll No. 23")}{" "}
                                    </Text>
                                    <Text
                                      fontSize="5px"
                                      color="#373839"
                                      fontWeight={400}
                                    >
                                      {" "}
                                      ●{" "}
                                    </Text>
                                    <Text
                                      color="#373839"
                                      fontSize={"xs"}
                                      fontWeight={400}
                                    >
                                      {" "}
                                      {t("Mr. Father's Name")}
                                    </Text>
                                  </HStack>
                                </VStack>
                              </Box>
                            </HStack>
                          </Box>
                          <Box>
                            <VStack>
                              <Box position="relative">
                                <Doughnut
                                  width={"25px"}
                                  height={"25px"}
                                  data={{
                                    datasets: [
                                      {
                                        id: 1,
                                        label: "",
                                        data: [14, 6],
                                        backgroundColor: ["#0D921B", "#F7F7FD"],
                                        borderWidth: 0,
                                        cutout: "80%",
                                      },
                                    ],
                                  }}
                                />
                                <Text
                                  position="absolute"
                                  top="50%"
                                  left="50%"
                                  style={{ transform: "translate(-50%, -25%)" }}
                                >
                                  14
                                </Text>
                              </Box>
                              <Text>Total Score</Text>
                            </VStack>
                          </Box>
                        </HStack>
                      </Box>

                      <Box borderColor="#EFEFEF" borderRadius={10} p={4}>
                        <HStack justifyContent="space-between" flexWrap="wrap">
                          {questionList &&
                            questionList.length &&
                            questionList.map((question, index) => {
                              return (
                                <Box
                                  key={`q-${index}`}
                                  minW="20%"
                                  textAlign="center"
                                  mb={8}
                                >
                                  <VStack justifyContent="center" space={2}>
                                    <Text fontSize="xs">Q-{question}</Text>
                                    {/*<IconByName name="CheckboxCircleLineIcon" color={"#0D921B"} p={0} _icon={{ size: 20 }} mx={"auto"} />*/}
                                    <IconByName
                                      name="CloseCircleLineIcon"
                                      color={"#F57B7B"}
                                      p={0}
                                      _icon={{ size: 20 }}
                                      mx={"auto"}
                                    />
                                  </VStack>
                                </Box>
                              );
                            })}
                        </HStack>
                      </Box>
                      <Box>
                        <Button
                          colorScheme="button"
                          variant="outline"
                          py={3}
                        >
                          {t("See all students")}
                        </Button>
                      </Box>
                    </VStack>
                  </Box>
                </VStack>
              </Collapsible>
            </Box>
          </VStack>
        </Box>
      </Stack>
    </Layout>
  );
}
