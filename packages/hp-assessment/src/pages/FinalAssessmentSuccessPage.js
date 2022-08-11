import {
  H1,
  IconByName,
  Layout,
  Loading,
  useWindowSize,
  H2, H3, ProgressBar, overrideColorTheme
} from "@shiksha/common-lib";
import { Button, Box, VStack, Text, HStack, Divider, Avatar } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import nipun_badge from "../stories/assets/nipun_badge.svg"
import nipun_kids from "../stories/assets/nipun_kids.svg"
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import colorTheme from "../colorTheme";
import { useNavigate } from "react-router-dom";
const colors = overrideColorTheme(colorTheme);

export default function FinalAssessmentSuccessPage({ handleBackButton, formObject }) {
  const [width, height] = useWindowSize();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "12 Assessed",
      color: "#0D921B",
      value: 12,
    },
    {
      name: "6 pending",
      color: "#DDDDDD",
      value: 6,
    }
  ]);

  return (
    <Layout
      isDisabledAppBar={true}
    >
      <Loading
        width={width}
        height={height - 230}
        customComponent={
          <VStack space="0" flex="1" width={width}>
            <VStack bg="successAlert.500" pb="100px" pt="32px" alignItems="center">
              <img src={nipun_badge} alt="nipun badge" style={{maxWidth: '150px', width: '30%'}} />
              <img src={nipun_kids} alt="nipun kids" style={{maxWidth: '170px', width: '35%'}} />
            </VStack>
            <Box
              {...{
                mx:'auto',
                mt:'-40px',
                textAlign: 'center',
                position: 'relative',
                _text: { textTransform: 'inherit'}
              }}
            >
              <VStack>
                <Avatar
                  size="80px"
                  borderRadius="md"
                  source={{
                    uri: "https://via.placeholder.com/50x50.png",
                  }}
                />
                <H2>Manoj</H2>
              </VStack>
            </Box>

            <Box p={4}>
              <VStack space={4}>
                <Box bg="white" rounded={10}>
                  <Box p={4} textAlign="center">
                    <H2>{t('Language')}</H2>
                  </Box>
                  <Divider />
                  <Box p={4}>
                    <HStack justifyContent="space-around">
                      <Box w="125px" h="125px">
                        <CircularProgressbarWithChildren
                          value={24}
                          maxValue={60}
                          styles={buildStyles({
                            pathColor: "#43B13A",
                            textColor: "#f88",
                            trailColor: "#F3F3F3",
                          })}
                        >
                          <Box textAlign="center">
                            <VStack>
                              <Text color="#43B13A" fontSize={18}>
                                <Text fontSize={18} bold>
                                  24/
                                </Text>
                                <Text fontSize={15}>60</Text>
                              </Text>
                              <Text fontSize={10}>Correct <br/>  Words/Minute</Text>
                            </VStack>
                          </Box>
                        </CircularProgressbarWithChildren>
                      </Box>

                      <Box w="125px" h="125px">
                        <CircularProgressbarWithChildren
                          value={7}
                          maxValue={14}
                          styles={buildStyles({
                            pathColor: "#D12F2F",
                            textColor: "#f88",
                            trailColor: "#F3F3F3",
                          })}
                        >
                          <Box textAlign="center">
                            <VStack>
                              <Text color="#D12F2F" fontSize={18}>
                                <Text fontSize={18} bold>
                                  07/
                                </Text>
                                <Text fontSize={15}>14</Text>
                              </Text>
                              <Text fontSize={10}>
                                Correct
                                <br />
                                Answers
                              </Text>
                            </VStack>
                          </Box>
                        </CircularProgressbarWithChildren>
                      </Box>
                    </HStack>
                  </Box>
                </Box>
                <Box bg="white" rounded={10}>
                  <Box p={4} textAlign="center">
                    <H2>{t('Numeracy')}</H2>
                  </Box>
                  <Divider />
                  <Box>
                    <HStack justifyContent="space-around" p={4}>
                      <Box w="125px" h="125px">
                        <CircularProgressbarWithChildren
                          value={24}
                          maxValue={60}
                          styles={buildStyles({
                            pathColor: "#43B13A",
                            textColor: "#f88",
                            trailColor: "#F3F3F3",
                          })}
                        >
                          <Box textAlign="center">
                            <VStack>
                              <Text color="#43B13A" fontSize={18}>
                                <Text fontSize={18} bold>
                                  24/
                                </Text>
                                <Text fontSize={15}>60</Text>
                              </Text>
                              <Text fontSize={10}>Correct <br/>  Numbers Read</Text>
                            </VStack>
                          </Box>
                        </CircularProgressbarWithChildren>
                      </Box>

                      <Box w="125px" h="125px">
                        <CircularProgressbarWithChildren
                          value={7}
                          maxValue={14}
                          styles={buildStyles({
                            pathColor: "#D12F2F",
                            textColor: "#f88",
                            trailColor: "#F3F3F3",
                          })}
                        >
                          <Box textAlign="center">
                            <VStack>
                              <Text color="#D12F2F" fontSize={18}>
                                <Text fontSize={18} bold>
                                  07/
                                </Text>
                                <Text fontSize={15}>14</Text>
                              </Text>
                              <Text fontSize={10}>
                                Correct
                                <br />
                                Answers
                              </Text>
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
                    onPress={()=> {navigate('/student-list')}}
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
