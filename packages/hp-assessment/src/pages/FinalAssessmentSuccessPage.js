import {
  H1,
  IconByName,
  Layout,
  Loading,
  useWindowSize,
  H2,
  H3,
  H4,
  ProgressBar,
  overrideColorTheme,
  Caption,
  BodyMedium,
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
import manifest from "../manifest.json";
import nipun_badge from "../stories/assets/nipun_badge.svg";
import nipun_kids from "../stories/assets/nipun_kids.svg";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import colorTheme from "../colorTheme";
import { useNavigate } from "react-router-dom";
const colors = overrideColorTheme(colorTheme);

export default function FinalAssessmentSuccessPage({
  handleBackButton,
  formObject,
}) {
  const [width, height] = useWindowSize();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "12 Assessed",
      color: "hpAssessment.success",
      value: 12,
    },
    {
      name: "6 pending",
      color: "hpAssessment.unmarked",
      value: 6,
    },
  ]);

  return (
    <Layout isDisabledAppBar={true}>
      <Loading
        width={width}
        height={height - 230}
        customComponent={
          <VStack space="0" flex="1" width={width}>
            <VStack
              bg="hpAssessment.successBackground"
              pb="100px"
              pt="32px"
              alignItems="center"
            >
              <img
                src={nipun_badge}
                alt="nipun badge"
                style={{ maxWidth: "150px", width: "30%" }}
              />
              <img
                src={nipun_kids}
                alt="nipun kids"
                style={{ maxWidth: "170px", width: "35%" }}
              />
            </VStack>
            <Box
              {...{
                mx: "auto",
                mt: "-40px",
                textAlign: "center",
                position: "relative",
                _text: { textTransform: "inherit" },
              }}
            >
              <VStack>
                <Avatar
                  size="80px"
                  borderRadius="md"
                  source={{
                    uri: "https://via.placeholder.com/50x50.png",
                  }}
                  mb={4}
                />
                <H2>Manoj</H2>
              </VStack>
            </Box>

            <Box p={4}>
              <VStack space={4}>
                <Box bg="white" rounded={10}>
                  <Box p={4} textAlign="center">
                    <H3>{t("Language")}</H3>
                  </Box>
                  <Divider />
                  <Box p={4}>
                    <HStack justifyContent="space-around">
                      <Box w="125px" h="125px">
                        <CircularProgressbarWithChildren
                          value={24}
                          maxValue={60}
                          styles={buildStyles({
                            // pathColor: "#43B13A",
                            pathColor: colors.success,
                            textColor: colors.success,
                            trailColor: colors.lightGray5,
                          })}
                        >
                          <Box textAlign="center">
                            <VStack>
                              <H2 color={colors.success}>
                                <H2 bold>24/</H2>
                                <BodyMedium>60</BodyMedium>
                              </H2>
                              <Caption>
                                Correct <br />  Words/Minute
                              </Caption>
                            </VStack>
                          </Box>
                        </CircularProgressbarWithChildren>
                      </Box>

                      <Box w="125px" h="125px">
                        <CircularProgressbarWithChildren
                          value={7}
                          maxValue={14}
                          styles={buildStyles({
                            // pathColor: "#D12F2F",
                            pathColor: colors.error,
                            textColor: colors.error,
                            trailColor: colors.lightGray5,
                          })}
                        >
                          <Box textAlign="center">
                            <VStack>
                              <H2 color={colors.error}>
                                <H2 bold>07/</H2>
                                <BodyMedium>14</BodyMedium>
                              </H2>
                              <Caption>
                                Correct
                                <br />
                                Answers
                              </Caption>
                            </VStack>
                          </Box>
                        </CircularProgressbarWithChildren>
                      </Box>
                    </HStack>
                  </Box>
                </Box>
                <Box bg="white" rounded={10}>
                  <Box p={4} textAlign="center">
                    <H3>{t("Numeracy")}</H3>
                  </Box>
                  <Divider />
                  <Box>
                    <HStack justifyContent="space-around" p={4}>
                      <Box w="125px" h="125px">
                        <CircularProgressbarWithChildren
                          value={24}
                          maxValue={60}
                          styles={buildStyles({
                            // pathColor: "#43B13A",
                            pathColor: colors.success,
                            textColor: colors.success,
                            trailColor: colors.lightGray5,
                          })}
                        >
                          <Box textAlign="center">
                            <VStack>
                              <H2 color={colors.success}>
                                <H2 bold>24/</H2>
                                <BodyMedium>60</BodyMedium>
                              </H2>
                              <Caption>
                                Correct <br />  Numbers Read
                              </Caption>
                            </VStack>
                          </Box>
                        </CircularProgressbarWithChildren>
                      </Box>

                      <Box w="125px" h="125px">
                        <CircularProgressbarWithChildren
                          value={7}
                          maxValue={14}
                          styles={buildStyles({
                            // pathColor: "#D12F2F",
                            pathColor: colors.error,
                            textColor: colors.error,
                            trailColor: colors.lightGray5,
                          })}
                        >
                          <Box textAlign="center">
                            <VStack>
                              <H2 color={colors.error}>
                                <H2 bold>07/</H2>
                                <BodyMedium>14</BodyMedium>
                              </H2>
                              <Caption>
                                Correct
                                <br />
                                Answers
                              </Caption>
                            </VStack>
                          </Box>
                        </CircularProgressbarWithChildren>
                      </Box>
                    </HStack>
                  </Box>
                </Box>
                <Box p="4">
                  <Button
                    colorScheme="button"
                    _text={{
                      color: colors.white,
                    }}
                    onPress={() => {
                      navigate("/hpAssessment/student-list");
                    }}
                  >
                    {t("Start Next Student Assessment")}
                  </Button>
                </Box>
              </VStack>
            </Box>
          </VStack>
        }
      />
    </Layout>
  );
}
