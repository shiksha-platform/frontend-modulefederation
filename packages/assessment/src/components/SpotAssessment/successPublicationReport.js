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
import { Button, Box, VStack, HStack, Avatar } from "native-base";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import manifest from "../../manifest.json";
import { useNavigate } from "react-router-dom";
import report, { getTotalAvarage } from "utils/report";
import AssessmentAchieverCard from "./AssessmentAchieverCard";

const ORAL_ASSESSMENT = "Oral Assessment";
const WRITTEN_ASSESSMENT = "Written Assessment";

export default function SuccessPublicationReport({
  appName,
  classId,
  subject,
}) {
  const [width, height] = useWindowSize();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [presentStudentCount, setPresentStudentCount] = useState([]);
  const [classObject, setClassObject] = useState({});
  const [achieverStudents, setAchieverStudents] = React.useState([]);
  const [average, setAverage] = React.useState(0);
  const [total, setTotal] = React.useState(0);
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
    const data = await assessmentRegistryService.getAllAssessment({
      groupId: classId,
      subject: subject,
    });
    const calculateData = getTotalAvarage(data);
    setTotal(calculateData?.total);
    setAverage(calculateData?.score);

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
    const reportData = report(studentData, data, WRITTEN_ASSESSMENT, true);
    setPresentStudentCount(reportData?.presentCount);
    setProgressAssessmentWritten(reportData?.data);
    setProgressAssessmentOral(report(studentData, data, ORAL_ASSESSMENT));
  };

  const _handleSpotAssessmentNotificationSend = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Spot-Assessment-Notification-Send",
    });
    capture("INTERACT", telemetryData);
    navigate("/notification/create?module=Assessment");
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
                Average Class Score is <H2 bold>{average}</H2> out of
                <H2>{total}</H2>
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
                    {classObject && classObject?.name}
                  </Caption>
                  {classObject && classObject?.section && (
                    <>
                      <Caption color={"assessment.lightGray0"}> ● Sec </Caption>
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
                  <H2>{presentStudentCount} Students Assessed</H2>
                  <Subtitle color={"assessment.gray"} mb="4">
                    Assessment SMS will be sent to selected students
                  </Subtitle>

                  <Box py="2">
                    {/* <HStack justifyContent={"space-between"}> */}
                    {/* <Button
                        colorScheme="button"
                        variant="outline"
                        onPress={() =>
                          navigate("/notification?module=Assessment")
                        }
                      >
                        {t("View Message")}
                      </Button> */}

                    <Button
                      onPress={() => {
                        _handleSpotAssessmentNotificationSend();
                      }}
                    >
                      {t("Send Another message")}
                    </Button>
                    {/* </HStack> */}
                  </Box>
                </Box>

                <AssessmentAchieverCard students={achieverStudents} />

                <Box bg={"assessment.white"} p={5}>
                  <Button.Group>
                    <Button
                      flex="1"
                      variant="outline"
                      // onPress={()=> setSelectedStudent()}
                    >
                      {t("Close")}
                    </Button>

                    <Button flex="1" onPress={handleFullReportClick}>
                      {t("See full report")}
                    </Button>
                  </Button.Group>
                </Box>
              </VStack>
            </Box>
          </VStack>
        }
      />
    </Layout>
  );
}
