import {
  H1,
  IconByName,
  Layout,
  Loading,
  useWindowSize,
  H2,
  H3,
  ProgressBar,
  telemetryFactory,
  capture,
  overrideColorTheme,
  BodyLarge,
  BodyMedium,
  H4,
  BodySmall,
} from "@shiksha/common-lib";
import {
  Button,
  Box,
  VStack,
  Text,
  HStack,
  Divider,
  Avatar,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function VisitSubmit({ handleBackButton, formObject }) {
  const [width, height] = useWindowSize();
  const { t } = useTranslation();

  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "12 Assessed",
      color: colors.green,
      value: 12,
    },
    {
      name: "6 pending",
      color: colors.gray,
      value: 6,
    },
  ]);

  const _handleSpotAssessmentNotificationSend = () => {
    /*const telemetryData = telemetryFactory.interact({
      appName,
      type: "Spot-Assessment-Notification-Send",
    });
    capture("INTERACT", telemetryData);*/
  };

  return (
    <Layout isDisabledAppBar={true} pageBgColor={colors.lightGreen}>
      <Loading
        width={width}
        height={height}
        customComponent={
          <VStack space="0" flex="1" width={width}>
            <VStack bg={colors.lightGreen} pb="100px" pt="32px">
              <IconByName
                alignSelf="center"
                name="CheckboxCircleFillIcon"
                color={colors.green}
                _icon={{ size: 40 }}
              />

              <Box alignItems="center">
                <H1 color={colors.green}>Submitted</H1>
                <H4 color={colors.green} mt={4}>
                  Your visit details has been sent successfully
                </H4>
              </Box>

              <Box textAlign="center" mt={10}>
                <VStack space={3}>
                  <Box mx="auto">
                    <Avatar
                      size="60px"
                      borderRadius="md"
                      source={{
                        uri: "https://via.placeholder.com/80x80.png",
                      }}
                    />
                  </Box>
                  <Box alignItems="center">
                    <H3>Chandan KrishnaKumar Pandit</H3>
                    <HStack align="middle">
                      <BodyMedium color={colors.bodyText}>VI A</BodyMedium>
                      <BodyMedium
                        fontSize="8px"
                        color={colors.attendanceUnmarked}
                        mx={2}
                      >
                        ●
                      </BodyMedium>
                      <BodyMedium color={colors.bodyText}>Maths</BodyMedium>
                    </HStack>
                  </Box>
                </VStack>
              </Box>
            </VStack>

            <Box px={4}>
              <Box bg={colors.bodyText} p={4} rounded={10} pb={100}>
                <>
                  <Text bold fontSize={"sm"}>
                    <Box py={4}>
                      <H2>Visit Review</H2>
                    </Box>
                  </Text>
                  <Divider mb={4} />
                  <VStack space={4}>
                    {/*bordered box*/}
                    <Box>
                      <VStack space={6}>
                        {/*row 1 box*/}
                        <Box>
                          <VStack space={6}>
                            <Box bg={colors.redLight} rounded={5} p={2}>
                              <HStack alignItems={"center"}>
                                <IconByName
                                  name="EmotionSadLineIcon"
                                  color={colors.red}
                                  // onPress={() => setSortModal(false)}
                                />
                                <Box
                                  borderLeftWidth={2}
                                  borderLeftColor={colors.red}
                                  pl={2}
                                >
                                  <BodySmall color={colors.red}>
                                    You spent only 10 minutes on this visit!
                                  </BodySmall>
                                </Box>
                              </HStack>
                            </Box>
                            <VStack space={8}>
                              <Box>
                                <H3>
                                  Q1. Is the teacher aware of nipun lakshyas for
                                  their respective subejct & grades?
                                </H3>
                                <BodyLarge>Whiteboard</BodyLarge>
                              </Box>

                              <Box>
                                <H3>
                                  Q2. Does the classroom have NIPUN Lakshya
                                  charts pasted on walls?
                                </H3>
                                <BodyLarge>Answer as in ODK</BodyLarge>
                              </Box>
                              <Box>
                                <H3>
                                  Q1. Is the teacher aware of nipun lakshyas for
                                  their respective subejct & grades?
                                </H3>
                                <BodyLarge>Whiteboard</BodyLarge>
                              </Box>

                              <Box>
                                <H3>
                                  Q2. Does the classroom have NIPUN Lakshya
                                  charts pasted on walls?
                                </H3>
                                <BodyLarge>Answer as in ODK</BodyLarge>
                              </Box>
                              <Box>
                                <H3>
                                  Q1. Is the teacher aware of nipun lakshyas for
                                  their respective subejct & grades?
                                </H3>
                                <BodyLarge>Whiteboard</BodyLarge>
                              </Box>

                              <Box>
                                <H3>
                                  Q2. Does the classroom have NIPUN Lakshya
                                  charts pasted on walls?
                                </H3>
                                <BodyLarge>Answer as in ODK</BodyLarge>
                              </Box>
                              <Box>
                                <H3>
                                  Q1. Is the teacher aware of nipun lakshyas for
                                  their respective subejct & grades?
                                </H3>
                                <BodyLarge>Whiteboard</BodyLarge>
                              </Box>

                              <Box>
                                <H3>
                                  Q2. Does the classroom have NIPUN Lakshya
                                  charts pasted on walls?
                                </H3>
                                <BodyLarge>Answer as in ODK</BodyLarge>
                              </Box>
                            </VStack>
                            <Box bg={colors.white} p="5" shadow={2}>
                              <HStack justifyContent={"space-between"}>
                                <Button
                                  colorScheme="button"
                                  variant="outline"
                                  _text={{
                                    fontSize: "14px",
                                    p: "1",
                                  }}
                                  // onPress={()=> setSelectedStudent()}
                                >
                                  {t("Close")}
                                </Button>

                                <Button
                                  colorScheme="button"
                                  _text={{
                                    color: colors.white,
                                    fontSize: "14px",
                                    p: "1",
                                  }}
                                >
                                  {t("Start Another Visit")}
                                </Button>
                              </HStack>
                            </Box>
                          </VStack>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </>
              </Box>
            </Box>
          </VStack>
        }
      />
    </Layout>
  );
}
