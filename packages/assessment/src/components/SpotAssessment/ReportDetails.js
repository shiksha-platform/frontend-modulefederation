import {
  IconByName,
  Layout,
  ProgressBar,
  H2,
  telemetryFactory,
  capture,
  overrideColorTheme,
  BodyLarge,
  Caption,
  Subtitle,
  assessmentRegistryService,
  studentRegistryService,
  classRegistryService,
  getArray,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React from "react";
import { useParams } from "react-router-dom";
import { Box, HStack, Text, VStack, Stack, Avatar, Button } from "native-base";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import colorTheme from "../../colorTheme";
import moment from "moment";
import report, { achiever } from "utils/report";
import AssessmentAchieverCard from "./AssessmentAchieverCard";
import StudentQuestionsReport from "./StudentQuestionsReport";
import manifest from "../../manifest.json";

const colors = overrideColorTheme(colorTheme);
Chart.register(ArcElement, Tooltip, Legend);

const ORAL_ASSESSMENT = "Oral Assessment";
const WRITTEN_ASSESSMENT = "Written Assessment";

export default function ReportDetails({
  footerLinks,
  appName,
  setAlert,
  config,
}) {
  const { t } = useTranslation();
  let { classId, subject, date } = useParams();
  classId = classId ? classId : "ce045222-52a8-4a0a-8266-9220f63baba7";
  subject = subject ? subject : "english";
  date =
    date === "allDates"
      ? date
      : date
      ? moment(date).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");
  const [classObject, setClassObject] = React.useState({});
  const [reportStartTime, setReportStartTime] = React.useState();
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
  const [access, setAccess] = React.useState();

  // const _handleSpotAssessmentFullReportShare = () => {
  //   const telemetryData = telemetryFactory.interact({
  //     appName,
  //     type: "Spot-Assessment-Full-Report-Share",
  //   });
  //   capture("INTERACT", telemetryData);
  // };

  // const _handleSpotAssessmentFullReportDownload = () => {
  //   const telemetryData = telemetryFactory.interact({
  //     appName,
  //     type: "Spot-Assessment-Full-Report-Download",
  //   });
  //   capture("INTERACT", telemetryData);
  // };

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
    setAccess(getArray(config["spot-assessment.dataPoints"]));

    let classObj = await classRegistryService.getOne({ id: classId });
    setClassObject(classObj);
    let param = { groupId: classId, subject };
    if (date !== "allDates") {
      param = {
        ...param,
        fromDate: date,
        toDate: date,
      };
    }

    const data = await assessmentRegistryService
      .getAllAssessment(param)
      .catch((e) => setAlert(e.message));
    setTrack(data);
    const studentData = await studentRegistryService.getAll({
      classId,
    });
    setStudents(studentData);
    setAchieverStudents(achiever(studentData, data, 3));
    const reportData = report(studentData, data, WRITTEN_ASSESSMENT, "data");
    setAssessmentStudents(reportData?.presentStudents);
    setProgressAssessmentWritten(reportData?.data);
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

  React.useEffect(async () => {
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
        languages: manifest.languages,
        // rightIcon: (
        //   <HStack>
        //     <IconByName
        //       name="ShareLineIcon"
        //       onPress={_handleSpotAssessmentFullReportShare}
        //     />
        //     <IconByName
        //       name="DownloadLineIcon"
        //       onPress={_handleSpotAssessmentFullReportDownload}
        //     />
        //   </HStack>
        // ),
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
            {date !== "allDates" ? (
              <Box p={4} bg={colors.white}>
                <HStack alignItems="center" justifyContent="space-between">
                  <H2>{moment(date).format("DD MMM Y")}</H2>
                </HStack>
              </Box>
            ) : (
              <React.Fragment />
            )}
            {access && access.includes("overall-class-participation") ? (
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
            ) : (
              <React.Fragment />
            )}

            {access && access.includes("100%-achievers") ? (
              <AssessmentAchieverCard students={achieverStudents} />
            ) : (
              <React.Fragment />
            )}

            {access && access.includes("student-wise-assesment") ? (
              <StudentQuestionsReport
                students={assessmentStudents}
                track={track}
                {...{ classId, subject, date }}
                limit={2}
              />
            ) : (
              <React.Fragment />
            )}
          </VStack>
        </Box>
      </Stack>
    </Layout>
  );
}
