import React, { useState, useEffect } from "react";
import {
  Collapsible,
  IconByName,
  attendanceRegistryService,
  ProgressBar,
  getUniqAttendance, Loading, H1, H3, Layout, useWindowSize, telemetryFactory, capture
} from "@shiksha/common-lib";
import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Progress,
  Button, Divider, Actionsheet, Checkbox, Avatar, Spacer
} from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { H2 } from "@shiksha/common-lib";
import manifest from "../../manifest.json";
import RoundedProgressBar from "../RoundedProgressBar";

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


  const handleNextOption = () => {
    if(nextOption === 'similar'){
      setToDoNextModal(false);
      setSimilarTestModal(true);
    }
    else if(nextOption === 'repeat'){
      _handleSpotAssessmentRepeatTest();
      // setSimilarTestModal(true);
    }
    else if(nextOption === 'end'){
      // setSimilarTestModal(true);
    }
  }

  const handleContinueWithSimilarQuestion = () => {
    _handleSpotAssessmentSimilarTest();
  }

  const _handleSpotAssessmentRepeatTest = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Spot-Assessment-Repeating-Test",
    });
    capture("INTERACT", telemetryData);
  }

  const _handleSpotAssessmentSimilarTest = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Spot-Assessment-Similar-Test",
    });
    capture("INTERACT", telemetryData);
  }

  const _handleSpotAssessmentEnd = () => {
    const telemetryData = telemetryFactory.end({
      appName,
      type: "Spot-Assessment-End",
    });
    capture("END", telemetryData);
  }

  useEffect(()=> {
    _handleSpotAssessmentEnd();
  }, [])


  return (
    <Layout
      isDisabledAppBar={true}
    >
      <Loading
        width={width}
        height={height}
        customComponent={
          <VStack space="0" flex="1" width={width}>
            <VStack bg="successAlert.500" pb="100px" pt="32px">
              <IconByName
                alignSelf="center"
                name="EmotionHappyLineIcon"
                color="successAlertText.500"
                _icon={{ size: 100 }}
              />
              <Box alignItems="center">
                <H1
                  fontSize="22px"
                  fontWeight="600"
                  color="successAlertText.500"
                >
                  YAY!
                </H1>
                <Text color="successAlertText.500">You got most of the answers right.</Text>
              </Box>
            </VStack>
            <VStack space={50} bg="white">
              <Box alignItems="center">
                <Box textAlign="center" marginTop="-40px">
                  <VStack space={3}>
                    <Box mx="auto">
                      <Avatar size="80px" borderRadius="md" source={{
                        uri: 'https://via.placeholder.com/80x80.png'
                      }} />
                    </Box>
                    <Box>
                      <Text fontSize="18" fontWeight="600">Shah Rukh Khan</Text>
                      <Text color={"#757588"}>Mr. Father’s Name</Text>
                    </Box>
                  </VStack>
                </Box>
              </Box>
              <Box>
                <VStack>
                  <Box p="4" alignItems="center">
                    <RoundedProgressBar
                      values={[72,28]}
                      colors={['#0D921B','#F7F7FD',]}
                      title={{text: '72%', fontSize: '21px'}}
                      legend={{text: 'Total Score', fontSize: '14px'}}
                      cutout={'85%'}
                      size="80px"
                    />
                    <HStack justifyContent={"center"} alignItems="center">
                      <IconByName name="StarSFillIcon" p="0"  color="green.600" />
                      <IconByName name="StarSFillIcon" p="0"  color="green.600" />
                      <IconByName name="StarSFillIcon" p="0"  color="green.600" />
                      <IconByName name="StarSFillIcon" p="0"  color="green.600" />
                      <IconByName name="StarSFillIcon" p="0"  color="green.600" />
                    </HStack>
                  </Box>
                </VStack>
              </Box>
              <Box px="4">
                <Button
                  colorScheme="button"
                  _text={{
                    color: 'white'
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
      <Actionsheet isOpen={toDoNextModal} onClose={() => setToDoNextModal(false)}>
        <Actionsheet.Content alignItems={"left"} bg="#D9F0FC">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <Text fontSize="16px" fontWeight={"600"}>
                {t("What would you like to do next?")}
              </Text>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={"white"}
              onPress={(e) => setToDoNextModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg="white">
          <Actionsheet.Item onPress={()=> setNextOption('repeat')}>Repeat test with another student</Actionsheet.Item>
          <Actionsheet.Item onPress={()=> setNextOption('similar')}>Give similar test to another student</Actionsheet.Item>
          <Actionsheet.Item onPress={()=> setNextOption('end')}>End Assessment</Actionsheet.Item>
          <Divider my={4}></Divider>

          <Box p="4" pt="0">
            <Button
              colorScheme="button"
              _text={{
                color: 'white'
              }}
              // onPress={()=> setSelectedStudent()}
              onPress={()=> handleNextOption()}
            >
              {t("Continue")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>

      <Actionsheet isOpen={similarTestModal} onClose={() => setSimilarTestModal(false)}>
        <Actionsheet.Content alignItems={"left"} bg="#D9F0FC">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <Text fontSize="16px" fontWeight={"600"}>
                {t("Give similar test to another student")}
              </Text>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={"white"}
              onPress={(e) => setSimilarTestModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg="white">
          <Text my={3}>A similar test will consist of the same competencies with a different set of questions.</Text>
          <Text my={3}>Are you sure you want to continue?</Text>
          <Divider my={4}></Divider>

          <Box>
            <HStack justifyContent={'space-between'}>
              <Button
                colorScheme="button"
                _text={{
                  color: '#fff'
                }}
                // onPress={()=> setSelectedStudent()}
              >
                {t("Choose  COMPETENCIES")}
              </Button>

              <Button
                colorScheme="button"
                _text={{
                  color: '#fff'
                }}
                onPress={()=> handleContinueWithSimilarQuestion()}
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
