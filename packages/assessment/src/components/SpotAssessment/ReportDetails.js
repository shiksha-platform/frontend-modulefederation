import {
  Collapsible,
  IconByName,
  Layout,
  ProgressBar,
  H2,
  H3,
  telemetryFactory,
  capture,
  overrideColorTheme,
  BodyLarge,
  Caption,
  Subtitle,
  assessmentRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, HStack, Text, VStack, Stack, Avatar, Button } from "native-base";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import colorTheme from "../../colorTheme";
import RoundedProgressBar from "components/RoundedProgressBar";
import moment from "moment";
const colors = overrideColorTheme(colorTheme);
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
  const [reportStartTime, setReportStartTime] = useState();
  const [questionList, setQuestionList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);

  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "12 Assessed",
      color: colors.successBarColor,
      value: 12,
    },
    {
      name: "6 pending",
      color: colors.pendingBarColor,
      value: 6,
    },
  ]);

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

  const _handleFullReportStartEvent = () => {
    const telemetryData = telemetryFactory.start({
      appName,
      type: "Spot-Assessment-Full-Report-Start",
    });
    capture("START", telemetryData);
    setReportStartTime(+new Date());
  };

  const _handleFullReportEndEvent = () => {
    const endTime = +new Date();
    const diff = (endTime - reportStartTime) / 1000 || 0;
    const telemetryData = telemetryFactory.end({
      appName,
      type: "Spot-Assessment-Full-Report-End",
      duration: diff,
    });
    capture("END", telemetryData);
  };

  const getAssessments = async () => {
    const fromDate = moment().format("YYYY-MM-DD");
    const toDate = moment().format("YYYY-MM-DD");

    const param = {
      fromDate,
      toDate,
      groupId: "ce045222-52a8-4a0a-8266-9220f63baba7",
      subject: "English",
    };

    const data = await assessmentRegistryService.getFilteredAssessments(param);
  };

  useEffect(() => {
    getAssessments();
    _handleFullReportStartEvent();
    return () => {
      _handleFullReportEndEvent();
    };
  }, []);

  return (
    <Layout
      _header={{
        title: "Report Details",
        isEnableSearchBtn: true,
        // setSearch: setSearch,
        subHeading: <BodyLarge py="2">{t("Spot Assessment")}</BodyLarge>,
      }}
      _appBar={{
        languages: ["en"],
        rightIcon: (
          <HStack>
            <IconByName
              name="ShareLineIcon"
              onPress={_handleSpotAssessmentFullReportShare}
            />
            <IconByName
              name="DownloadLineIcon"
              onPress={_handleSpotAssessmentFullReportDownload}
            />
          </HStack>
        ),
      }}
      subHeader={
        <VStack>
          <H2>Science</H2>
          <HStack alignItems={"center"}>
            <Caption>{t("Class VI")}</Caption>{" "}
            <Caption color={colors.lightGray0}> ●</Caption>{" "}
            <Caption> {t("Sec A")}</Caption>
          </HStack>
        </VStack>
      }
      _subHeader={{ bg: colors.reportDetailsSubheaderBg }}
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
        <Box>
          <VStack space={2}>
            <Box p={4} bg={colors.white}>
              <HStack alignItems="center" justifyContent="space-between">
                <H2>15, January 2022</H2>
                {/*<IconByName name="ListUnorderedIcon" pr="0" />*/}
              </HStack>
            </Box>

            <Box p={4} bg={colors.white}>
              <VStack space={6}>
                <Box>
                  <VStack space={2}>
                    <H2>Class Participation in Oral Assessments</H2>
                    <Box borderRadius="md">
                      <VStack>
                        <Box
                          px="4"
                          py={2}
                          bg={colors.scoreCardIcon2}
                          roundedTop="6"
                        >
                          <HStack alignItems="center">
                            <IconByName
                              name="EmotionSadLineIcon"
                              pr="0"
                              color={colors.white}
                            />
                            <Subtitle color={colors.white}>
                              {" "}
                              Poor overall performance!
                            </Subtitle>
                          </HStack>
                        </Box>
                        <Box p="4" bg={colors.QuationsBoxContentBg}>
                          <VStack flex="auto" alignContent={"center"}>
                            <ProgressBar
                              isTextShow
                              legendType="separated"
                              h="35px"
                              _bar={{ rounded: "md", mb: "2" }}
                              isLabelCountHide
                              data={progressAssessment}
                            />
                          </VStack>
                        </Box>
                        <Box
                          p="4"
                          bg={colors.QuationsBoxBg}
                          borderBottomRadius={6}
                          textAlign="center"
                        >
                          <Subtitle>
                            Average Class Score is <H2>18</H2> out of{" "}
                            <H2>25</H2>
                          </Subtitle>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </Box>

                <Box>
                  <VStack space={2}>
                    <H2>Class Participation in Written Assessments</H2>
                    <Box borderRadius="md">
                      <VStack>
                        <Box
                          px="4"
                          py={2}
                          bg={colors.scoreCardIcon2}
                          roundedTop="6"
                        >
                          <HStack alignItems="center">
                            <IconByName
                              name="EmotionSadLineIcon"
                              pr="0"
                              color={colors.white}
                            />
                            <Subtitle color={colors.white}>
                              {" "}
                              Poor overall performance!
                            </Subtitle>
                          </HStack>
                        </Box>
                        <Box p="4" bg={colors.QuationsBoxContentBg}>
                          <VStack flex="auto" alignContent={"center"}>
                            <ProgressBar
                              isTextShow
                              legendType="separated"
                              h="35px"
                              _bar={{ rounded: "md", mb: "2" }}
                              isLabelCountHide
                              data={progressAssessment}
                            />
                          </VStack>
                        </Box>
                        <Box
                          p="4"
                          bg={colors.QuationsBoxBg}
                          borderBottomRadius={6}
                          textAlign="center"
                        >
                          <Subtitle>
                            Average Class Score is <H2>18</H2> out of{" "}
                            <H2>25</H2>
                          </Subtitle>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            <Box p={4} bg={colors.white}>
              <VStack space={4}>
                <H2 mb={3}>100% Achievers</H2>
                <Box p={4} bg={colors.achiverBoxBg} rounded="10">
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
                        <Subtitle color={colors.gray}>Roll No 11</Subtitle>
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
                        <Subtitle color={colors.gray}>Roll No 11</Subtitle>
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
                        <Subtitle color={colors.gray}>Roll No 11</Subtitle>
                      </VStack>
                    </Box>
                  </HStack>
                </Box>
              </VStack>
            </Box>

            <Box p={4} px="0px" bg={colors.white}>
              <Collapsible
                defaultCollapse={true}
                header={
                  <VStack>
                    <H2>{t("Student Wise Assessment")}</H2>
                    <HStack alignItems={"center"}>
                      <Caption color={colors.gray}>{t("3 Students")} </Caption>
                      <Caption color={colors.lightGray0}> ● </Caption>
                      <Caption color={colors.gray}>
                        {" "}
                        {t("Max Score : " + 25)}
                      </Caption>
                    </HStack>
                  </VStack>
                }
                fontSize="2px"
              >
                <Box>
                  <VStack pt={6} space={4}>
                    <Box>
                      <VStack space={4}>
                        {
                          //code comes here
                        }
                        <Box
                          bg={colors.QuationsBoxContentBg}
                          roundedTop="10px"
                          px="4"
                          py="2"
                        >
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
                                      <Caption color={colors.lightGray0}>
                                        {t("Roll No. 23")}{" "}
                                      </Caption>
                                      <Caption color={colors.lightGray0}>
                                        {" "}
                                        ●{" "}
                                      </Caption>
                                      <Caption color={colors.lightGray0}>
                                        {" "}
                                        {t("Mr. Father's Name")}
                                      </Caption>
                                    </HStack>
                                  </VStack>
                                </Box>
                              </HStack>
                            </Box>
                            <Box>
                              <VStack>
                                <Box position="relative">
                                  <RoundedProgressBar
                                    values={[18, 6]}
                                    colors={[
                                      colors.successBarColor,
                                      colors.circleProgressBarcolor,
                                    ]}
                                    // legend={{ text: "Total Score", fontSize: "14px" }}
                                    cutout={"80%"}
                                    size="45px"
                                  />
                                  <Text
                                    position="absolute"
                                    top="50%"
                                    left="50%"
                                    style={{
                                      transform: "translate(-50%, -25%)",
                                    }}
                                  >
                                    18
                                  </Text>
                                </Box>
                                <Caption color={colors.lightGray0}>
                                  Total Score
                                </Caption>
                              </VStack>
                            </Box>
                          </HStack>
                        </Box>

                        <Box
                          borderWidth="1"
                          borderColor={colors.borderColor}
                          borderRadius="10px"
                        >
                          <HStack
                            alignItems="center"
                            justifyContent="space-between"
                            p={4}
                          >
                            <H2>Written Assessment</H2>
                            <Box>
                              <VStack>
                                <Box position="relative">
                                  <RoundedProgressBar
                                    values={[18, 6]}
                                    colors={[
                                      colors.successBarColor,
                                      colors.circleProgressBarcolor,
                                    ]}
                                    // legend={{ text: "Total Score", fontSize: "14px" }}
                                    cutout={"80%"}
                                    size="45px"
                                  />
                                  <Text
                                    position="absolute"
                                    top="50%"
                                    left="50%"
                                    style={{
                                      transform: "translate(-50%, -25%)",
                                    }}
                                  >
                                    18
                                  </Text>
                                </Box>
                                <Caption color={colors.lightGray0}>
                                  Total Score
                                </Caption>
                              </VStack>
                            </Box>
                          </HStack>
                          <HStack
                            justifyContent="space-between"
                            flexWrap="wrap"
                          >
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
                                      <Caption>Q-{question}</Caption>
                                      {/*<IconByName name="CheckboxCircleLineIcon" color={"#0D921B"} p={0} _icon={{ size: 20 }} mx={"auto"} />*/}
                                      <IconByName
                                        name="CloseCircleLineIcon"
                                        color={colors.scoreCardIcon2}
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

                        <Box
                          borderWidth="1"
                          borderColor={colors.borderColor}
                          borderRadius="10px"
                          p={4}
                        >
                          <VStack space={4}>
                            <H2>{t("Oral Assessment")}</H2>
                            <HStack
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <Box>
                                <VStack>
                                  <Box position="relative">
                                    <RoundedProgressBar
                                      values={[18, 6]}
                                      colors={[
                                        colors.successBarColor,
                                        colors.circleProgressBarcolor,
                                      ]}
                                      // legend={{ text: "Total Score", fontSize: "14px" }}
                                      cutout={"80%"}
                                      size="45px"
                                    />
                                    <Text
                                      position="absolute"
                                      top="50%"
                                      left="50%"
                                      style={{
                                        transform: "translate(-50%, -25%)",
                                      }}
                                    >
                                      18
                                    </Text>
                                  </Box>
                                  <Caption color={colors.lightGray0}>
                                    Words Read
                                  </Caption>
                                </VStack>
                              </Box>
                              <Box>
                                <VStack>
                                  <Box position="relative">
                                    <RoundedProgressBar
                                      values={[18, 6]}
                                      colors={[
                                        colors.successBarColor,
                                        colors.circleProgressBarcolor,
                                      ]}
                                      // legend={{ text: "Total Score", fontSize: "14px" }}
                                      cutout={"80%"}
                                      size="45px"
                                    />
                                    <Text
                                      position="absolute"
                                      top="50%"
                                      left="50%"
                                      style={{
                                        transform: "translate(-50%, -25%)",
                                      }}
                                    >
                                      18
                                    </Text>
                                  </Box>
                                  <Caption color={colors.lightGray0}>
                                    Numbers Read
                                  </Caption>
                                </VStack>
                              </Box>
                            </HStack>
                          </VStack>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                  <Box py="2">
                    <Button colorScheme="button" variant="outline" py={3}>
                      {t("See all students")}
                    </Button>
                  </Box>
                </Box>
              </Collapsible>
            </Box>
          </VStack>
        </Box>
      </Stack>
    </Layout>
  );
}
