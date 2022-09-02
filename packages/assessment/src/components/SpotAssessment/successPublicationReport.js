import {
  H1,
  IconByName,
  Layout,
  Loading,
  useWindowSize,
  H2,
  H3,
  ProgressBar,
  BodyLarge,
  Caption,
  Subtitle,
  capture,
  telemetryFactory,
  assessmentRegistryService,
  studentRegistryService,
  classRegistryService,
} from "@shiksha/common-lib";
import {
  Button,
  Box,
  VStack,
  Text,
  HStack,
  Avatar,
  useTheme,
} from "native-base";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import manifest from "../../manifest.json";
import { useNavigate } from "react-router-dom";
import report from "utils/report";

const ORAL_ASSESSMENT = "Oral Assessment";
const WRITTEN_ASSESSMENT = "Written Assessment";

export default function SuccessPublicationReport({
  appName,
  classId,
  subject,
}) {
  const { colors } = useTheme();
  console.log({ colors });
  const [width, height] = useWindowSize();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [studentlist, setStudentlist] = useState([]);
  const [classObject, setClassObject] = useState({});
  const [achieverStudents, setAchieverStudents] = React.useState([]);
  const [progressAssessmentWritten, setProgressAssessmentWritten] =
    React.useState([]);
  const [progressAssessmentOral, setProgressAssessmentOral] = React.useState(
    []
  );

  useEffect(() => {
    getStudentsList();
  }, []);

  const getStudentsList = async () => {
    let classObj = await classRegistryService.getOne({ id: classId });
    setClassObject(classObj);
    const studentData = await studentRegistryService.getAll({ classId });
    setStudentlist(studentData);
    const data = await assessmentRegistryService.getAllAssessment({
      filters: { groupId: classId, subject: subject },
    });

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
  };

  const _handleSpotAssessmentNotificationSend = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Spot-Assessment-Notification-Send",
    });
    capture("INTERACT", telemetryData);
    navigate("notification/create?module=Assessment");
  };

  const handleFullReportClick = () => {
    navigate(`/assessment/assessment-detailed-report/${classId}/${subject}`);
  };

  const FailureCard = ({ type, progressAssessmentData }) => {
    return (
      <Box borderRadius="md">
        <VStack>
          <Box px="4" py={2} bg={"assessment.danger"} roundedTop="6">
            <HStack alignItems="center">
              <IconByName
                name="EmotionSadLineIcon"
                pr="0"
                color={"assessment.white"}
              />
              <Subtitle color={"assessment.white"}>
                Poor overall performance!
              </Subtitle>
            </HStack>
          </Box>
          <Box p="4" bg={"assessment.primaryLight"}>
            <VStack flex="auto" alignContent={"center"}>
              <ProgressBar
                isTextShow
                legendType="separated"
                h="35px"
                _bar={{ rounded: "md", mb: "2" }}
                isLabelCountHide
                _legendType={{ color: "assessment.gray" }}
                data={progressAssessmentData}
              />
            </VStack>
          </Box>
          <Box
            p="4"
            bg={"assessment.QuationsBoxBg"}
            borderBottomRadius={6}
            textAlign="center"
          >
            {type === ORAL_ASSESSMENT ? (
              <Subtitle>
                Average correct words/minute is <H2>12</H2>
              </Subtitle>
            ) : (
              <Subtitle>
                Average Class Score is <H2 bold>18</H2> out of <H2>25</H2>
              </Subtitle>
            )}
          </Box>
        </VStack>
      </Box>
    );
  };

  return (
    <Layout
      _appBar={{
        languages: manifest.languages,
        color: "assessment.success",
        _box: { bg: "assessment.successAlert" },
      }}
    >
      <Loading
        width={width}
        height={height - 230}
        customComponent={
          <VStack space="0" flex="1" width={width}>
            <VStack bg={"assessment.successAlert"} pb="100px" pt="32px">
              <IconByName
                alignSelf="center"
                name="CheckboxCircleFillIcon"
                color={"assessment.success"}
                _icon={{ size: 100 }}
              />
              <Box alignItems="center">
                <H1 color={"assessment.success"}>Completed</H1>
                <BodyLarge color={"assessment.success"}>
                  Your spot assessment successfully
                </BodyLarge>
              </Box>
            </VStack>
            <Box
              {...{
                p: 4,
                mt: -30,
                position: "relative",
                bg: "assessment.reportDetailsSubheaderBg",
                roundedTop: "20",
                _text: { textTransform: "inherit" },
              }}
            >
              <VStack>
                <H2>{subject}</H2>
                <HStack alignItems={"center"}>
                  <Caption color={"assessment.gray"}>
                    Class {classObject && classObject?.name}
                  </Caption>
                  {classObject && classObject?.section && (
                    <>
                      <Caption color={"assessment.lightGray0"}> ●</Caption>{" "}
                      <Caption color={"assessment.gray"}>
                        {classObject?.section}
                      </Caption>
                    </>
                  )}
                </HStack>
              </VStack>
            </Box>

            <Box>
              <VStack space={2}>
                <Box p={4} bg={"assessment.white"}>
                  <VStack space={6}>
                    <Box>
                      <VStack space={2}>
                        <H2>Class Participation in Oral Assessments</H2>
                        <FailureCard
                          type={ORAL_ASSESSMENT}
                          progressAssessmentData={progressAssessmentOral}
                        />
                      </VStack>
                    </Box>

                    <Box>
                      <VStack space={2}>
                        <H2>Class Participation in Written Assessments</H2>
                        <FailureCard
                          type={WRITTEN_ASSESSMENT}
                          progressAssessmentData={progressAssessmentWritten}
                        />
                      </VStack>
                    </Box>
                  </VStack>
                </Box>

                <Box p={4} justifyContent="center" bg={"assessment.white"}>
                  <H2>20 Students Assessed</H2>
                  <Subtitle color={"assessment.gray"} mb="4">
                    Assessment SMS will be sent to selected students
                  </Subtitle>

                  <Box py="2">
                    <HStack justifyContent={"space-between"}>
                      <Button
                        colorScheme="button"
                        variant="outline"
                        w="45%"
                        onPress={() =>
                          navigate("/notification?module=Assessment")
                        }
                      >
                        {t("View Message")}
                      </Button>

                      <Button
                        colorScheme="button"
                        w="50%"
                        _text={{
                          color: "assessment.white",
                        }}
                        onPress={() => {
                          _handleSpotAssessmentNotificationSend();
                        }}
                      >
                        {t("Send Another message")}
                      </Button>
                    </HStack>
                  </Box>
                </Box>

                <Box bg={"assessment.white"} p={5}>
                  <Box bg={"assessment.achiverBoxBg"} rounded={"md"} p="4">
                    <VStack space={5}>
                      <H2 mb={3}>100% Achievers</H2>
                      <HStack space={2} justifyContent="space-between">
                        {achieverStudents.map((student, index) => (
                          <Box textAlign={"center"} key={index}>
                            <VStack space={1} alignItems={"center"}>
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
                                <Subtitle color={"assessment.gray"}>
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
              </VStack>
            </Box>
          </VStack>
        }
      />
    </Layout>
  );
}
