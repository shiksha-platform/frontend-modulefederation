import React, { useState, useEffect, useMemo } from "react";
import {
  IconByName,
  Loading,
  H1,
  H2,
  Layout,
  useWindowSize,
  telemetryFactory,
  capture,
  overrideColorTheme,
  BodyLarge,
  BodyMedium,
} from "@shiksha/common-lib";
import {
  HStack,
  VStack,
  Stack,
  Box,
  Button,
  Actionsheet,
  Avatar,
  Divider,
} from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import manifest from "../../manifest.json";
import RoundedProgressBar from "../RoundedProgressBar";
import colorTheme from "../../colorTheme";

const colors = overrideColorTheme(colorTheme);

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const SpotAssessmentResult = ({ appName }) => {
  const [width, height] = useWindowSize();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [toDoNextModal, setToDoNextModal] = useState(false);
  const [similarTestModal, setSimilarTestModal] = useState(false);
  const [nextOption, setNextOption] = useState();
  const scorePercent = Math.floor(
    (localStorage.getItem("assessment-score") /
      localStorage.getItem("assessment-totalScore")) *
      100
  );
  const studentDetails = JSON.parse(localStorage.getItem("assessment-student"));

  const handleNextOption = () => {
    if (nextOption === "typeSelection") {
    } else if (nextOption === "similar") {
      setToDoNextModal(false);
      setSimilarTestModal(true);
    } else if (nextOption === "repeat") {
      _handleSpotAssessmentRepeatTest();
    } else if (nextOption === "end") {
    }
  };

  const handleContinueWithSimilarQuestion = () => {
    _handleSpotAssessmentSimilarTest();
  };

  const _handleSpotAssessmentRepeatTest = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Spot-Assessment-Repeating-Test",
    });
    capture("INTERACT", telemetryData);
  };

  const _handleSpotAssessmentSimilarTest = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Spot-Assessment-Similar-Test",
    });
    capture("INTERACT", telemetryData);
  };

  const _handleSpotAssessmentEnd = () => {
    const telemetryData = telemetryFactory.end({
      appName,
      type: "Spot-Assessment-End",
    });
    capture("END", telemetryData);
  };

  useEffect(() => {
    _handleSpotAssessmentEnd();
  }, []);

  useEffect(() => {
    localStorage.setItem("assessment-nextOption", nextOption || "");
  }, [nextOption]);

  const SuccessComponent = () => {
    return (
      <>
        <VStack space="0" flex="1" width={width}>
          <VStack bg={colors.bgSuccessAlert} pb="100px" pt="32px">
            <IconByName
              alignSelf="center"
              name="EmotionHappyLineIcon"
              color={colors.success}
              _icon={{ size: 100 }}
            />
            <Box alignItems="center">
              <H1 color={colors.success}>YAY!</H1>
              <BodyLarge color={colors.success}>
                You got most of the answers right.
              </BodyLarge>
            </Box>
          </VStack>
          <VStack space={50} bg={colors.white}>
            <Box alignItems="center">
              <Box textAlign="center" marginTop="-40px">
                <VStack space={3}>
                  <Box mx="auto">
                    <Avatar
                      size="80px"
                      borderRadius="md"
                      source={{
                        // uri: "https://via.placeholder.com/80x80.png",
                        uri:
                          studentDetails.image && studentDetails.image !== ""
                            ? `${manifest.api_url}/files/${encodeURIComponent(
                                studentDetails.image
                              )}`
                            : `https://via.placeholder.com/80x80.png`,
                      }}
                    />
                  </Box>
                  <Box>
                    <H2>{studentDetails.fullName}</H2>
                    {studentDetails.fathersName && (
                      <BodyMedium color={colors.gray}>
                        `MR. ${studentDetails.fathersName}`
                      </BodyMedium>
                    )}
                  </Box>
                </VStack>
              </Box>
            </Box>
            <Box>
              <VStack>
                <Box p="4" alignItems="center">
                  <RoundedProgressBar
                    values={[scorePercent, 100 - scorePercent]}
                    colors={[
                      colors.scoreSuccessStarColor,
                      colors.circleProgressBarcolor,
                    ]}
                    title={{ text: `${scorePercent}%`, fontSize: "21px" }}
                    legend={{ text: "Total Score", fontSize: "14px" }}
                    cutout={"85%"}
                    size="80px"
                  />
                  {/* <HStack justifyContent={"center"} alignItems="center">
                      <IconByName name="StarFillIcon" p="0" color="green.600" />
                      <IconByName name="StarFillIcon" p="0" color="green.600" />
                      <IconByName name="StarFillIcon" p="0" color="green.600" />
                      <IconByName name="StarFillIcon" p="0" color="green.600" />
                      <IconByName
                        name="StarFillIcon"
                        p="0"
                        color={colors.scoreSuccessStarColor}
                      />
                      <IconByName
                        name="StarFillIcon"
                        p="0"
                        color={colors.scoreSuccessStarColor}
                      />
                      <IconByName
                        name="StarFillIcon"
                        p="0"
                        color={colors.scoreSuccessStarColor}
                      />
                      <IconByName
                        name="StarFillIcon"
                        p="0"
                        color={colors.scoreSuccessStarColor}
                      />
                      <IconByName
                        name="StarHalfFillIcon"
                        p="0"
                        color={colors.scoreSuccessStarColor}
                      />
                    </HStack> */}
                </Box>
              </VStack>
            </Box>
            <Box px="4">
              <Button
                colorScheme="button"
                _text={{
                  color: colors.white,
                }}
                onPress={() => setToDoNextModal(true)}
              >
                {t("Next")}
              </Button>
            </Box>
          </VStack>
        </VStack>
      </>
    );
  };

  const OKComponent = () => {
    return (
      <>
        <VStack space="0" flex="1" width={width}>
          <VStack bg={colors.scoreCardBg1} pb="100px" pt="32px">
            <IconByName
              alignSelf="center"
              name="EmotionNormalLineIcon"
              color={colors.scoreCardIcon1}
              _icon={{ size: 100 }}
            />
            <Box alignItems="center">
              <H1 color={colors.scoreCardIcon1}>NOT BAD!</H1>
              <BodyLarge color={colors.scoreCardIcon1}>
                You got most of the answers right.
              </BodyLarge>
            </Box>
          </VStack>
          <VStack space={50} bg="white">
            <Box alignItems="center">
              <Box textAlign="center" marginTop="-40px">
                <VStack space={3}>
                  <Box mx="auto">
                    <Avatar
                      size="80px"
                      borderRadius="md"
                      source={{
                        // uri: "https://via.placeholder.com/80x80.png",
                        uri:
                          studentDetails.image && studentDetails.image !== ""
                            ? `${manifest.api_url}/files/${encodeURIComponent(
                                studentDetails.image
                              )}`
                            : `https://via.placeholder.com/80x80.png`,
                      }}
                    />
                  </Box>
                  <Box>
                    <H2>{studentDetails.fullName}</H2>
                    {studentDetails.fathersName && (
                      <BodyMedium color={colors.gray}>
                        `MR. ${studentDetails.fathersName}`
                      </BodyMedium>
                    )}
                  </Box>
                </VStack>
              </Box>
            </Box>
            <Box>
              <VStack>
                <Box p="4" alignItems="center">
                  <RoundedProgressBar
                    values={[scorePercent, 100 - scorePercent]}
                    colors={[
                      colors.scoreCardIcon1,
                      colors.circleProgressBarcolor,
                    ]}
                    title={{ text: `${scorePercent}%`, fontSize: "21px" }}
                    legend={{ text: "Total Score", fontSize: "14px" }}
                    cutout={"85%"}
                    size="80px"
                  />
                  {/* <HStack justifyContent={"center"} alignItems="center">
                      <IconByName name="StarFillIcon" p="0" color="#E78D12" />
                      <IconByName name="StarFillIcon" p="0" color="#E78D12" />
                      <IconByName name="StarFillIcon" p="0" color="#E78D12" />
                      <IconByName
                        name="StarHalfFillIcon"
                        p="0"
                        color="#E78D12"
                      />
                      <IconByName name="StarLineIcon" p="0" color="#E78D12" />
                    </HStack> */}
                </Box>
              </VStack>
            </Box>
            <Box px="4">
              <Button
                colorScheme="button"
                _text={{
                  color: colors.white,
                }}
                onPress={() => setToDoNextModal(true)}
              >
                {t("Next")}
              </Button>
            </Box>
          </VStack>
        </VStack>
      </>
    );
  };
  const FailureComponent = () => {
    return (
      <>
        <VStack space="0" flex="1" width={width}>
          <VStack bg={colors.scoreCardBg2} pb="100px" pt="32px">
            <IconByName
              alignSelf="center"
              name="EmotionUnhappyLineIcon"
              color={colors.scoreCardIcon2}
              _icon={{ size: 100 }}
            />
            <Box alignItems="center">
              <H1 color={colors.scoreCardIcon2}>OHH NO!</H1>
              <BodyLarge color={colors.scoreCardIcon2}>
                Better luck next time
              </BodyLarge>
            </Box>
          </VStack>
          <VStack space={50} bg={colors.white}>
            <Box alignItems="center">
              <Box textAlign="center" marginTop="-40px">
                <VStack space={3}>
                  <Box mx="auto">
                    <Avatar
                      size="80px"
                      borderRadius="md"
                      source={{
                        // uri: "https://via.placeholder.com/80x80.png",
                        uri:
                          studentDetails.image && studentDetails.image !== ""
                            ? `${manifest.api_url}/files/${encodeURIComponent(
                                studentDetails.image
                              )}`
                            : `https://via.placeholder.com/80x80.png`,
                      }}
                    />
                  </Box>
                  <Box>
                    <H2>{studentDetails.fullName}</H2>
                    {studentDetails.fathersName && (
                      <BodyMedium color={colors.gray}>
                        `MR. ${studentDetails.fathersName}`
                      </BodyMedium>
                    )}
                  </Box>
                </VStack>
              </Box>
            </Box>
            <Box>
              <VStack>
                <Box p="4" alignItems="center">
                  <RoundedProgressBar
                    values={[scorePercent, 100 - scorePercent]}
                    colors={[
                      colors.scoreCardIcon2,
                      colors.circleProgressBarcolor,
                    ]}
                    title={{ text: `${scorePercent}%`, fontSize: "21px" }}
                    legend={{ text: "Total Score", fontSize: "14px" }}
                    cutout={"85%"}
                    size="80px"
                  />
                  {/* <HStack justifyContent={"center"} alignItems="center">
                      <IconByName name="StarFillIcon" p="0" color="#F57B7B" />
                      <IconByName
                        name="StarHalfFillIcon"
                        p="0"
                        color="#F57B7B"
                      />
                      <IconByName name="StarLineIcon" p="0" color="#F57B7B" />
                      <IconByName name="StarLineIcon" p="0" color="#F57B7B" />
                      <IconByName name="StarLineIcon" p="0" color="#F57B7B" />
                    </HStack> */}
                </Box>
              </VStack>
            </Box>
            <Box px="4">
              <Button
                colorScheme="button"
                _text={{
                  color: colors.white,
                }}
                onPress={() => setToDoNextModal(true)}
              >
                {t("Next")}
              </Button>
            </Box>
          </VStack>
        </VStack>
      </>
    );
  };

  scorePercent;
  return (
    <Layout isDisabledAppBar={true}>
      <Loading
        width={width}
        height={height}
        customComponent={
          scorePercent >= 75 ? (
            <SuccessComponent />
          ) : scorePercent < 75 && scorePercent >= 35 ? (
            <OKComponent />
          ) : (
            <FailureComponent />
          )
        }
      />
      <Actionsheet
        isOpen={toDoNextModal}
        onClose={() => setToDoNextModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("What would you like to do next?")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setToDoNextModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={colors.white}>
          <Actionsheet.Item onPress={() => setNextOption("typeSelection")}>
            <BodyLarge
              textTransform="none"
              color={nextOption === "typeSelection" ? "black" : colors.gray}
            >
              Continue another type of test with same student
            </BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setNextOption("repeat")}>
            <BodyLarge
              textTransform="none"
              color={nextOption === "repeat" ? "black" : colors.gray}
            >
              Repeat test with another student
            </BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setNextOption("similar")}>
            <BodyLarge
              textTransform="none"
              color={nextOption === "similar" ? "black" : colors.gray}
            >
              Give similar test to another student
            </BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setNextOption("end")}>
            <BodyLarge
              textTransform="none"
              color={nextOption === "end" ? "black" : colors.gray}
            >
              End Assessment
            </BodyLarge>
          </Actionsheet.Item>
          <Divider my={4}></Divider>

          <Box p="4" pt="0">
            <Button
              colorScheme="button"
              _text={{
                color: colors.white,
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
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("Give similar test to another student")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setSimilarTestModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={colors.white}>
          <BodyMedium my={3}>
            A similar test will consist of the same competencies with a
            different set of questions.
          </BodyMedium>
          <BodyMedium my={3}>Are you sure you want to continue?</BodyMedium>
          <Divider my={4}></Divider>

          <Box>
            <HStack justifyContent={"space-between"}>
              <Button
                colorScheme="button"
                _text={{
                  color: colors.white,
                }}
                // onPress={()=> setSelectedStudent()}
              >
                {t("Choose  COMPETENCIES")}
              </Button>

              <Button
                colorScheme="button"
                _text={{
                  color: colors.white,
                }}
                onPress={() => handleContinueWithSimilarQuestion()}
              >
                {t("Yes, Continue")}
              </Button>
            </HStack>
          </Box>
        </Box>
      </Actionsheet>
    </Layout>
  );
};

export default SpotAssessmentResult;
