import React from "react";
import {
  BodyLarge,
  BodyMedium,
  capture,
  H1,
  H2,
  IconByName,
  Layout,
  StarRating,
  telemetryFactory,
} from "@shiksha/common-lib";
import {
  Actionsheet,
  Avatar,
  Box,
  Button,
  Divider,
  HStack,
  Stack,
  useTheme,
  VStack,
} from "native-base";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import RoundedProgressBar from "../components/RoundedProgressBar";

const AssessmentResult = ({
  appName,
  selectedStudent,
  setPageName,
  setSelectedStudent,
  setIsRepeat,
  setSimilarWithComp,
  setSimilarWithoutComp,
  setSelectedCompetencies,
  handleAssessmentEnd,
  setChooseAssessmentTypeModal,
  setSelectedAssessmentType,
  selectedAssessmentType,
}) => {
  const { t } = useTranslation();
  const [toDoNextModal, setToDoNextModal] = React.useState(false);
  const [similarTestModal, setSimilarTestModal] = React.useState(false);
  const [nextOption, setNextOption] = React.useState();
  const scorePercent = Math.floor(
    (localStorage.getItem("assessment-score") /
      localStorage.getItem("assessment-totalScore")) *
      100
  );
  const studentDetails = selectedStudent;

  const handleNextOption = () => {
    if (nextOption === "typeSelection") {
      setChooseAssessmentTypeModal(true);
      if (selectedAssessmentType === "Oral Assessment")
        setSelectedAssessmentType("Written Assessment");
      if (selectedAssessmentType === "Written Assessment") {
        setSelectedAssessmentType("Oral Assessment");
        setPageName("assessmentStudentList");
      }
    } else if (nextOption === "similar") {
      setToDoNextModal(false);
      if (selectedAssessmentType === "Oral Assessment") {
        setSelectedStudent();
        setSelectedCompetencies([]);
        setIsRepeat(false);
        setSimilarWithoutComp(true);
        setSimilarWithComp(false);
        setPageName("assessmentStudentList");
      } else {
        setSimilarTestModal(true);
      }
    } else if (nextOption === "repeat") {
      _handleSpotAssessmentRepeatTest();
    } else if (nextOption === "end") {
      handleAssessmentEnd();
    }
  };

  const handleCompSelectionWithSimilarQuestion = () => {
    setSelectedStudent();
    setSelectedCompetencies([]);
    setIsRepeat(false);
    setSimilarWithoutComp(false);
    setSimilarWithComp(true);
    setPageName("assessmentStudentList");
  };
  const handleContinueWithSimilarQuestion = () => {
    _handleSpotAssessmentSimilarTest();
    setSelectedStudent();
    setIsRepeat(false);
    setSimilarWithComp(false);
    setSimilarWithoutComp(true);
    setPageName("assessmentStudentList");
  };

  const _handleSpotAssessmentRepeatTest = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Spot-Assessment-Repeating-Test",
    });
    capture("INTERACT", telemetryData);
    setSelectedStudent();
    setIsRepeat(true);
    setSimilarWithComp(false);
    setSimilarWithoutComp(false);
    setPageName("assessmentStudentList");
  };

  const _handleSpotAssessmentSimilarTest = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Spot-Assessment-Similar-Test",
    });
    capture("INTERACT", telemetryData);
  };

  return (
    <Layout isDisabledAppBar={true}>
      <ResultOnPersantage
        {...{ studentDetails, scorePercent, setToDoNextModal }}
      />

      <Actionsheet
        isOpen={toDoNextModal}
        onClose={() => setToDoNextModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={"assessment.cardBg"}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("What would you like to do next?")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={"assessment.cardCloseIcon"}
              onPress={(e) => setToDoNextModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={"assessment.white"}>
          <Actionsheet.Item onPress={() => setNextOption("typeSelection")}>
            <BodyLarge
              textTransform="none"
              color={
                nextOption === "typeSelection" ? "black" : "assessment.gray"
              }
            >
              Continue another type of test with same student
            </BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setNextOption("repeat")}>
            <BodyLarge
              textTransform="none"
              color={nextOption === "repeat" ? "black" : "assessment.gray"}
            >
              Repeat test with another student
            </BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setNextOption("similar")}>
            <BodyLarge
              textTransform="none"
              color={nextOption === "similar" ? "black" : "assessment.gray"}
            >
              Give similar test to another student
            </BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setNextOption("end")}>
            <BodyLarge
              textTransform="none"
              color={nextOption === "end" ? "black" : "assessment.gray"}
            >
              End Assessment
            </BodyLarge>
          </Actionsheet.Item>
          <Divider my={4}></Divider>

          <Box p="4" pt="0">
            <Button
              colorScheme="button"
              _text={{
                color: "assessment.white",
              }}
              // onPress={()=> setSelectedStudent()}
              onPress={() => handleNextOption()}
              isDisabled={!nextOption}
            >
              {t("Continue")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>

      <Actionsheet
        isOpen={similarTestModal}
        onClose={() => setSimilarTestModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={"assessment.cardBg"}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("Give similar test to another student")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={"assessment.cardCloseIcon"}
              onPress={(e) => setSimilarTestModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={"assessment.white"}>
          <BodyMedium my={3}>
            A similar test will consist of the same competencies with a
            different set of questions.
          </BodyMedium>
          <BodyMedium my={3}>Are you sure you want to continue?</BodyMedium>
          <Divider my={4}></Divider>

          <Box>
            <VStack space={4}>
              <Button
                colorScheme="button"
                _text={{
                  color: "assessment.white",
                }}
                onPress={() => handleCompSelectionWithSimilarQuestion()}
              >
                {t("Continue with different COMPETENCIES")}
              </Button>

              <Button
                colorScheme="button"
                _text={{
                  color: "assessment.white",
                }}
                onPress={() => handleContinueWithSimilarQuestion()}
              >
                {t("Continue with same COMPETENCIES")}
              </Button>
            </VStack>
          </Box>
        </Box>
      </Actionsheet>
    </Layout>
  );
};

export default AssessmentResult;

const ResultOnPersantage = ({
  scorePercent,
  studentDetails,
  setToDoNextModal,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [bgColor, setBgColor] = React.useState();
  const [textColor, setTextColor] = React.useState();
  const [titleComponent, setTitleComponent] = React.useState();
  const [iconName, setIconName] = React.useState();

  React.useEffect(() => {
    if (scorePercent >= 75) {
      setBgColor(colors["assessment"]?.["successAlert"]);
      setTextColor(colors["assessment"]?.["success"]);
      setTitleComponent(
        <Box alignItems="center">
          <H1 color={"assessment.success"}>YAY!</H1>
          <BodyLarge color={"assessment.success"}>
            You got most of the answers right.
          </BodyLarge>
        </Box>
      );
      setIconName("EmotionHappyLineIcon");
    } else if (scorePercent < 75 && scorePercent >= 35) {
      setBgColor(colors["assessment"]?.["warningAlert"]);
      setTextColor(colors["assessment"]?.["warning"]);
      setTitleComponent(
        <Box alignItems="center">
          <H1 color={"assessment.warning"}>NOT BAD!</H1>
          <BodyLarge color={"assessment.warning"}>
            You got most of the answers right.
          </BodyLarge>
        </Box>
      );
      setIconName("EmotionNormalLineIcon");
    } else {
      setBgColor(colors["assessment"]?.["dangerAlert"]);
      setTextColor(colors["assessment"]?.["danger"]);
      setTitleComponent(
        <Box alignItems="center">
          <H1 color={"assessment.danger"}>OHH NO!</H1>
          <BodyLarge color={"assessment.danger"}>
            Better luck next time
          </BodyLarge>
        </Box>
      );
      setIconName("EmotionUnhappyLineIcon");
    }
  }, [scorePercent]);

  return (
    <Box>
      <VStack bg={bgColor} py="50px">
        <IconByName
          alignSelf="center"
          name={iconName}
          color={textColor}
          _icon={{ size: 100 }}
        />
        {titleComponent}
      </VStack>
      <VStack space={10} bg={"assessment.white"}>
        <Box alignItems="center">
          <Box textAlign="center" marginTop="-40px">
            <VStack space={3}>
              <Box mx="auto">
                <Avatar
                  size="80px"
                  {...(studentDetails?.image && studentDetails?.image !== ""
                    ? {
                        source: {
                          uri: `${manifest.api_url}/files/${encodeURIComponent(
                            studentDetails?.image
                          )}`,
                        },
                      }
                    : {})}
                >
                  <H1 color="assessment.white">
                    {studentDetails?.fullName?.toUpperCase().substr(0, 2)}
                  </H1>
                </Avatar>
              </Box>
              <Box>
                <H2>{studentDetails?.fullName}</H2>
                {studentDetails?.fathersName && (
                  <BodyMedium color={"assessment.gray"}>
                    `MR. ${studentDetails?.fathersName}`
                  </BodyMedium>
                )}
              </Box>
            </VStack>
          </Box>
        </Box>

        <VStack>
          <Box p="4" alignItems="center">
            <RoundedProgressBar
              values={[scorePercent, 100 - scorePercent]}
              colors={[textColor, colors?.assessment?.lightGray2]}
              title={{ text: `${scorePercent}%`, fontSize: "21px" }}
              legend={{ text: "Total Score", fontSize: "14px" }}
              cutout={"85%"}
              size="80px"
            />
          </Box>
        </VStack>
        <StarRating color={textColor} count={5} percentage={scorePercent} />
        <Box px="4">
          <Button
            colorScheme="button"
            _text={{
              color: "assessment.white",
            }}
            onPress={() => setToDoNextModal(true)}
          >
            {t("Next")}
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};
