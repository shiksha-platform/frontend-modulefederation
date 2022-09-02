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
  BodySmall,
  Subtitle,
  assessmentRegistryService,
  studentRegistryService,
  classRegistryService,
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
import report from "utils/report";
const colors = overrideColorTheme(colorTheme);
Chart.register(ArcElement, Tooltip, Legend);

const ORAL_ASSESSMENT = "Oral Assessment";
const WRITTEN_ASSESSMENT = "Written Assessment";

export default function ReportDetails({ footerLinks, appName, setAlert }) {
  const { t } = useTranslation();
  let { classId, subject, date } = useParams();
  classId = classId ? classId : "ce045222-52a8-4a0a-8266-9220f63baba7";
  subject = subject ? subject : "English";
  date = date
    ? moment(date).format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  const [classObject, setClassObject] = useState({});
  const [reportStartTime, setReportStartTime] = useState();
  const [students, setStudents] = React.useState([]);
  const [assessmentStudents, setAssessmentStudents] = React.useState([]);
  const [achieverStudents, setAchieverStudents] = React.useState([]);
  const [track, setTrack] = React.useState([]);
  const [progressAssessmentWritten, setProgressAssessmentWritten] =
    React.useState([]);
  const [progressAssessmentOral, setProgressAssessmentOral] = React.useState(
    []
  );

  const [averageScoreWritten, setaverageScoreWritten] = React.useState();
  const [averageScoreOral, setaverageScoreOral] = React.useState();

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
    let classObj = await classRegistryService.getOne({ id: classId });
    setClassObject(classObj);

    const param = {
      fromDate: date,
      toDate: date,
      groupId: classId,
      subject,
    };

    const data = await assessmentRegistryService
      .getAllAssessment(param)
      .catch((e) => setAlert(e.message));
    setTrack(data);
    const studentData = await studentRegistryService.getAll({
      classId,
    });
    setStudents(studentData);

    const assessmentStudentWritten = studentData.filter(
      (stu) =>
        data.filter((track) => {
          let scoreBoolean = false;
          if (track?.answersheet) {
            const data = JSON.parse(track.answersheet);
            scoreBoolean =
              track.totalScore ===
              data?.children.reduce((value, item) => value + item.score, 0);
          }
          return (
            stu.id === track.studentId &&
            track.type === WRITTEN_ASSESSMENT &&
            scoreBoolean
          );
        }).length
    );
    setAchieverStudents(assessmentStudentWritten);

    setProgressAssessmentWritten(report(studentData, data, WRITTEN_ASSESSMENT));
    setProgressAssessmentOral(report(studentData, data, ORAL_ASSESSMENT));

    const averageOral = data.reduce(
      (value, track) =>
        track.type === ORAL_ASSESSMENT
          ? parseInt(value) + parseInt(track.score)
          : 0,
      0
    );

    const averageWritten = data.reduce(
      (value, track) =>
        track.type === WRITTEN_ASSESSMENT
          ? parseInt(value) + parseInt(track.score)
          : 0,
      0
    );

    const averageTotalOral = data.reduce(
      (value, track) =>
        track.type === ORAL_ASSESSMENT
          ? parseInt(value) + parseInt(track.totalScore)
          : 0,
      0
    );

    const averageTotalWritten = data.reduce(
      (value, track) =>
        track.type === WRITTEN_ASSESSMENT
          ? parseInt(value) + parseInt(track.totalScore)
          : 0,
      0
    );
    setaverageScoreWritten(
      `Average Class Score is ${averageWritten} out of ${averageTotalWritten}`
    );
    setaverageScoreOral(
      `Average Class Score is ${averageOral} out of ${averageTotalOral}`
    );
  };

  useEffect(async () => {
    await getAssessments();
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
          <H2>{subject}</H2>
          <HStack alignItems={"center"}>
            <Caption>{classObject?.name}</Caption>
            <Caption color={colors.lightGray0}> ●</Caption>
            <Caption> {`Sec ${classObject?.section}`}</Caption>
          </HStack>
        </VStack>
      }
      _subHeader={{ bg: colors.reportDetailsSubheaderBg }}
      _footer={footerLinks}
    >
      <Stack space={1} mb="2" shadow={2}>
        <Box>
          <VStack space={2}>
            <Box p={4} bg={colors.white}>
              <HStack alignItems="center" justifyContent="space-between">
                <H2>{moment(date).format("DD MMM Y")}</H2>
              </HStack>
            </Box>

            <Box p={4} bg={colors.white}>
              <VStack space={6}>
                <Box>
                  <VStack space={2}>
                    <H2>{t("CLASS_PARTICIPATION_IN_ORAL_ASSESSMENTS")}</H2>
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
                              data={progressAssessmentOral}
                            />
                          </VStack>
                        </Box>
                        <Box
                          p="4"
                          bg={colors.QuationsBoxBg}
                          borderBottomRadius={6}
                          textAlign="center"
                        >
                          <Subtitle>{averageScoreOral}</Subtitle>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </Box>

                <Box>
                  <VStack space={2}>
                    <H2>{t("CLASS_PARTICIPATION_IN_WRITTEN_ASSESSMENTS")}</H2>
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
                              data={progressAssessmentWritten}
                            />
                          </VStack>
                        </Box>
                        <Box
                          p="4"
                          bg={colors.QuationsBoxBg}
                          borderBottomRadius={6}
                          textAlign="center"
                        >
                          <Subtitle>{averageScoreWritten}</Subtitle>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </Box>
              </VStack>
            </Box>

            <Box bg={colors.white} p={5}>
              <Box bg={colors.achiverBoxBg} rounded={"md"} p="4">
                <VStack space={5}>
                  <H2 mb={3}>100% Achievers</H2>
                  <HStack space={2} justifyContent="space-between">
                    {achieverStudents.map((student, index) => (
                      <Box textAlign={"center"} key={index}>
                        <VStack space={1}>
                          <Avatar
                            size="48px"
                            borderRadius="md"
                            mr={4}
                            bg="assessment.primary"
                          >
                            <H2 color="assessment.white">
                              {`${student.firstName} ${student.lastName}`
                                .toUpperCase()
                                .substr(0, 2)}
                            </H2>
                          </Avatar>
                          <VStack>
                            <H3>{`${student.firstName} ${student.lastName}`}</H3>
                            <Subtitle color={colors.gray}>
                              {t("Roll No. ") + student.admissionNo} ●
                            </Subtitle>
                          </VStack>
                        </VStack>
                      </Box>
                    ))}
                    {achieverStudents?.length <= 0 ? (
                      <Caption textTransform="inherit">
                        {t("NO_STUDENT_HAS_ACHIEVED")}
                      </Caption>
                    ) : (
                      <React.Fragment />
                    )}
                  </HStack>
                </VStack>
              </Box>
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
                        {t("Max Score : " + 25)}
                      </Caption>
                    </HStack>
                  </VStack>
                }
                fontSize="2px"
              >
                {assessmentStudents.map((student, key) => {
                  const trackStudent = track.find(
                    (e) => e.studentId === student.id
                  );
                  let questions = [];
                  let totalScore = 0,
                    score = 0;
                  if (trackStudent?.answersheet) {
                    const data = JSON.parse(trackStudent.answersheet);
                    questions = data.children;
                    totalScore = trackStudent.totalScore;
                    score = questions.reduce(
                      (value, item) => value + item.score,
                      0
                    );
                  }

                  return (
                    <VStack pt={6} space={4} key={key}>
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
                                bg="assessment.primary"
                              >
                                <H2 color="assessment.white">
                                  {`${student.firstName} ${student.lastName}`
                                    .toUpperCase()
                                    .substr(0, 2)}
                                </H2>
                              </Avatar>
                              <VStack>
                                <H2>{`${student.firstName} ${student.lastName}`}</H2>
                                <HStack alignItems={"center"}>
                                  <Caption color={colors.lightGray0}>
                                    {t("Roll No. ") + student.admissionNo} ●
                                  </Caption>
                                  <Caption color={colors.lightGray0}>
                                    {student.fathersName}
                                  </Caption>
                                </HStack>
                              </VStack>
                            </HStack>
                          </Box>
                          <Box>
                            <VStack>
                              <Box position="relative">
                                <RoundedProgressBar
                                  values={[score, totalScore]}
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
                                  {score}
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
                                  values={[score, totalScore]}
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
                                  {score}
                                </Text>
                              </Box>
                              <Caption color={colors.lightGray0}>
                                Total Score
                              </Caption>
                            </VStack>
                          </Box>
                        </HStack>
                        <HStack space={10} flexWrap="wrap" p="4">
                          {questions.map((question, index) => {
                            let iconProp = {
                              name: "CloseCircleLineIcon",
                              color: "assessment.error",
                            };

                            if (
                              question?.class &&
                              question?.class === "skipped"
                            ) {
                              iconProp = {
                                name: "CheckboxBlankCircleLineIcon",
                                color: "assessment.gray",
                              };
                            } else if (
                              question?.class &&
                              question?.class === "correct"
                            ) {
                              iconProp = {
                                name: "CheckboxCircleLineIcon",
                                color: "assessment.success",
                              };
                            }

                            return (
                              <Box key={`q-${index}`} textAlign="center" mb={8}>
                                <VStack justifyContent="center" space={2}>
                                  <BodySmall>Q-{question.index}</BodySmall>
                                  <IconByName
                                    {...iconProp}
                                    p={0}
                                    _icon={{ size: 25 }}
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
                  );
                })}
                <Box py="2">
                  <Button colorScheme="button" variant="outline" py={3}>
                    {t("See all students")}
                  </Button>
                </Box>
              </Collapsible>
            </Box>
          </VStack>
        </Box>
      </Stack>
    </Layout>
  );
}
