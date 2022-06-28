import {
  H1,
  IconByName,
  Layout,
  Loading,
  useWindowSize,
  H2, H3, ProgressBar, telemetryFactory, capture
} from "@shiksha/common-lib";
import { Button, Box, VStack, Text, HStack, Divider, Avatar } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import manifest from "../../manifest.json";
import { useNavigate } from "react-router-dom";
export default function SuccessPublicationReport({ handleBackButton, formObject }) {
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

  const _handleSpotAssessmentNotificationSend = () => {
    /*const telemetryData = telemetryFactory.interact({
      appName,
      type: "Spot-Assessment-Notification-Send",
    });
    capture("INTERACT", telemetryData);*/
  }

  return (
    <Layout
      _appBar={{
        onPressBackButton: handleBackButton
          ? handleBackButton
          : (e) => console.log(e),
        languages: manifest.languages,
        color: "successAlertText.500",
        _box: { bg: "successAlert.500" },
      }}
    >
      <Loading
        width={width}
        height={height - 230}
        customComponent={
          <VStack space="0" flex="1" width={width}>
            <VStack bg="successAlert.500" pb="100px" pt="32px">
              <IconByName
                alignSelf="center"
                name="CheckboxCircleFillIcon"
                color="successAlertText.500"
                _icon={{ size: 100 }}
              />
              <Box alignItems="center">
                <H1
                  fontSize="22px"
                  fontWeight="600"
                  color="successAlertText.500"
                >
                  Completed
                </H1>
                <Text color="successAlertText.500">Your spot assessment successfully</Text>
              </Box>
            </VStack>
            <Box
              {...{
                p: 4,
                mt:-30,
                position: 'relative',
                bg: '#FFCAAC',
                roundedTop: '20',
                _text: { textTransform: 'inherit' }
              }}
            >
              <VStack mb={3}>
                <H2 fontWeight="600">
                  {t("Science")}
                </H2>
                <HStack alignItems={'center'}>
                  <Text color={"#373839"} fontSize={"xs"}>{t("Class VI")}</Text> <Text fontSize='5px' color="#373839"> ●</Text> <Text color="#373839" fontSize={"xs"}> {t("Sec A")}</Text>
                </HStack>
              </VStack>
            </Box>

            <Box bg={"#EFEFEF"}>
              <VStack space={2}>
                <Box p={4} bg={"white"}>
                  <VStack space={2}>
                    <H2 bold>Class Participation</H2>
                    <Box borderRadius="md">
                      <VStack>
                        <Box px="4" py={2} bg={"#F57B7B"} roundedTop="6">
                          <HStack alignItems="center">
                            <IconByName name="EmotionSadLineIcon" pr="0" color="white" />
                            <Text color="white" bold fontSize="xs"> Poor overall performance!</Text>
                          </HStack>
                        </Box>
                        <Box p="4" bg={"#FFF8F7"}>
                          <VStack flex="auto" alignContent={"center"}>
                            <ProgressBar
                              isTextShow
                              legendType="separated"
                              h="35px"
                              _bar={{ rounded: "md" }}
                              isLabelCountHide
                              data={progressAssessment}
                            />
                          </VStack>
                        </Box>
                        <Box p="4" bg={"#FEF1EE"} borderBottomRadius={6} textAlign="center">
                          <Text>Average Class Score is <Text bold>18</Text> out of <Text bold>25</Text></Text>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </Box>
                <Box p={4} justifyContent="center" bg="white">
                  <H2 mb={3}>20 Students Assessed</H2>
                  <Text my={3}>Assessment SMS will be sent to selected students</Text>

                  <Box>
                    <HStack justifyContent={'space-between'}>
                      <Button
                        colorScheme="button"
                        variant="outline"
                        // onPress={()=> setSelectedStudent()}
                      >
                        {t("View Message")}
                      </Button>

                      <Button
                        colorScheme="button"
                        _text={{
                          color: '#fff'
                        }}
                        onPress={()=> {_handleSpotAssessmentNotificationSend()}}
                      >
                        {t("Send Another message")}
                      </Button>
                    </HStack>
                  </Box>
                </Box>
                <Box p={4} bg="white">
                  <H2 mb={3}>100% Achievers</H2>
                  <HStack space={2} justifyContent="space-between">
                    <Box textAlign={'center'}>
                      <VStack space={1}>
                        <Avatar size="48px" mx="auto" borderRadius="md" source={{
                          uri: 'https://via.placeholder.com/50x50.png'
                        }} />
                        <H3>Shivani Joshi</H3>
                        <Text fontSize="xs" color={"#373839"}>Roll No 11</Text>
                      </VStack>
                    </Box>

                    <Box textAlign={'center'}>
                      <VStack space={1}>
                        <Avatar size="48px" mx="auto" borderRadius="md" source={{
                          uri: 'https://via.placeholder.com/50x50.png'
                        }} />
                        <H3>Shivani Joshi</H3>
                        <Text fontSize="xs" color={"#373839"}>Roll No 11</Text>
                      </VStack>
                    </Box>

                    <Box textAlign={'center'}>
                      <VStack space={1}>
                        <Avatar size="48px" mx="auto" borderRadius="md" source={{
                          uri: 'https://via.placeholder.com/50x50.png'
                        }} />
                        <H3>Shivani Joshi</H3>
                        <Text fontSize="xs" color={"#373839"}>Roll No 11</Text>
                      </VStack>
                    </Box>
                  </HStack>

                  <Box mt={4}>
                    <HStack justifyContent={'space-between'}>
                      <Button
                        colorScheme="button"
                        variant="outline"
                        // onPress={()=> setSelectedStudent()}
                      >
                        {t("Close")}
                      </Button>

                      <Button
                        colorScheme="button"
                        _text={{
                          color: '#fff'
                        }}
                        onPress={()=> navigate('/assessment-detailed-report')}
                      >
                        {t("See full report")}
                      </Button>
                    </HStack>
                  </Box>
                </Box>
              </VStack>
            </Box>
          </VStack>
        }
      />
      {/*<Box
        bg="white"
        p="5"
        position="fixed"
        bottom="0"
        shadow={2}
        width={width}
      >
        <HStack justifyContent={'space-between'}>
                      <Button
                        colorScheme="button"
                        variant="outline"
                        _text={{
                          fontSize: '14px',
                          p:'1'
                        }}
                        // onPress={()=> setSelectedStudent()}
                      >
                        {t("View Message")}
                      </Button>

                      <Button
                        colorScheme="button"
                        _text={{
                          color: '#fff',
                          fontSize: '14px',
                          p:'1'
                        }}
                      >
                        {t("Send Another message")}
                      </Button>
                    </HStack>
      </Box>*/}
    </Layout>
  );
}
