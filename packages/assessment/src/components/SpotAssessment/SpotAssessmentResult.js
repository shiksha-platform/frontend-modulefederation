import React, { useState, useEffect } from "react";
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
  const score = localStorage.getItem("assessment-score");

  const handleNextOption = () => {
    if (nextOption === "similar") {
      setToDoNextModal(false);
      setSimilarTestModal(true);
    } else if (nextOption === "repeat") {
      _handleSpotAssessmentRepeatTest();
      // setSimilarTestModal(true);
    } else if (nextOption === "end") {
      // setSimilarTestModal(true);
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

  if (score > 0) {
    return (
      <Layout isDisabledAppBar={true}>
        <Loading
          width={width}
          height={height}
          customComponent={
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
                            uri: "https://via.placeholder.com/80x80.png",
                          }}
                        />
                      </Box>
                      <Box>
                        <H2>Shah Rukh Khan</H2>
                        <BodyMedium color={colors.gray}>
                          Mr. Father’s Name
                        </BodyMedium>
                      </Box>
                    </VStack>
                  </Box>
                </Box>
                <Box>
                  <VStack>
                    <Box p="4" alignItems="center">
                      <RoundedProgressBar
                        values={[63, 28]}
                        colors={[
                          colors.scoreCardIcon1,
                          colors.circleProgressBarcolor,
                        ]}
                        title={{ text: "63%", fontSize: "21px" }}
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
                    {t("Return to teachers")}
                  </Button>
                </Box>
              </VStack>
            </VStack>
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
            <Actionsheet.Item onPress={() => setNextOption("repeat")}>
              <BodyLarge>Repeat test with another student</BodyLarge>
            </Actionsheet.Item>
            <Actionsheet.Item onPress={() => setNextOption("similar")}>
              <BodyLarge>Give similar test to another student</BodyLarge>
            </Actionsheet.Item>
            <Actionsheet.Item onPress={() => setNextOption("end")}>
              <BodyLarge>End Assessment</BodyLarge>
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
  }

  return (
    <Layout isDisabledAppBar={true}>
      <Loading
        width={width}
        height={height}
        customComponent={
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
                          uri: "https://via.placeholder.com/80x80.png",
                        }}
                      />
                    </Box>
                    <Box>
                      <H2>Shah Rukh Khan</H2>
                      <BodyMedium color={colors.gray}>
                        Mr. Father’s Name
                      </BodyMedium>
                    </Box>
                  </VStack>
                </Box>
              </Box>
              <Box>
                <VStack>
                  <Box p="4" alignItems="center">
                    <RoundedProgressBar
                      values={[72, 28]}
                      colors={[
                        colors.scoreSuccessStarColor,
                        colors.circleProgressBarcolor,
                      ]}
                      title={{ text: "72%", fontSize: "21px" }}
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
                  {t("Return to teachers")}
                </Button>
              </Box>
            </VStack>
          </VStack>
        }
      />
      <Actionsheet
        isOpen={toDoNextModal}
        onClose={() => setToDoNextModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={3} pt={2} pb="15px">
              <H2>{t("What would you like to do next?")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setToDoNextModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={2} justifyContent="center" bg={colors.white}>
          <Actionsheet.Item onPress={() => setNextOption("repeat")}>
            <BodyLarge>Repeat test with another student</BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setNextOption("similar")}>
            <BodyLarge>Give similar test to another student</BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setNextOption("end")}>
            <BodyLarge>End Assessment</BodyLarge>
          </Actionsheet.Item>

          <Box p="4">
            <Button
              colorScheme="button"
              _text={{
                color: colors.white,
              }}
              // onPress={()=> setSelectedStudent()}
              onPress={() => handleNextOption()}
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
            <Stack p={2} pt={2} pb="15px">
              <H2>{t("Give similar test to another student")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setSimilarTestModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" px={5} py="1" justifyContent="center" bg={colors.white}>
          <BodyMedium py={4}>
            A similar test will consist of the same competencies with a
            different set of questions.
          </BodyMedium>
          <BodyMedium py={4}>Are you sure you want to continue?</BodyMedium>

          <Box py="5">
            <HStack justifyContent={"space-between"}>
              <Button
                colorScheme="button"
                variant="outline"

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
