import React, { useState } from "react";
import {
  IconByName,
  ProgressBar,
} from "@shiksha/common-lib";
import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Progress,
  Button, Divider, Actionsheet, Checkbox
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SpotAssessmentCard = ({ setPageName }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [chooseSubjectModal, setChooseSubjectModal] = useState(false);
  const [chooseCompetenciesModal, setChooseCompetenciesModal] = useState(false);
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

  /*React.useEffect(() => {
    const getData = async () => {
      let params = {
        fromDate: moment().format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
      };
      let attendanceData = await attendanceRegistryService.getAll(params);
      let lengthAttendance = 0;
      const data = [PRESENT, ABSENT, UNMARKED].map((item, index) => {
        const attendance = getUniqAttendance(attendanceData, item, students);
        let count = 0;
        lengthAttendance += attendance.length;
        if (item === UNMARKED) {
          count = attendance.length + (students.length - lengthAttendance);
        } else {
          count = attendance.length;
        }
        return {
          name: count + " " + item,
          color: `attendance${item}.500`,
          value: count,
        };
      });

      setProgressAttendance(data);
    };
    getData();
  }, [students]);*/

  return (
    <>
        {/*========= box1 =============*/}
        <VStack space={2}>
          <Text>Spot Assessment</Text>
          <Box borderWidth="1" borderColor={'#E2E2E2'} borderRadius="md">
            <VStack space="4">
              <Box p="4" roundedTop="6">
                <VStack space={8}>
                  <Box>
                    <Text bold fontSize="lg">{t("Spot Assessment 1")}</Text>
                    <Text color="muted.600">27, May 2022</Text>
                  </Box>

                  <ProgressBar
                    isTextShow
                    legendType="separated"
                    h="35px"
                    _bar={{ rounded: "md" }}
                    isLabelCountHide
                    data={progressAssessment}
                  />
                  {/*<HStack justifyContent={"space-between"} alignItems="center">
                  <IconByName name="More2LineIcon" pr="0" />
                </HStack>*/}
                </VStack>
              </Box>
              {/*<Box px="4">
                <Text bold mb="3">Assessment 1</Text>
                <HStack justifyContent={"space-between"} alignItems="center" py={3}>
                  <Text flexGrow={1} flexBasis={'100px'} color="muted.600" fontSize={'xs'}>{t("students Assessed")}</Text>
                  <ProgressBar
                    flexGrow={2}
                    flexBasis={'100px'}
                    data={progressAssessment}
                  />
                </HStack>
                <HStack justifyContent={"space-between"} alignItems="center" py={3}>
                  <Text flexGrow={1}  flexBasis={'100px'} color="muted.600" fontSize={'xs'}>{t("Average Score")}</Text>
                  <ProgressBar
                    flexGrow={2}
                    flexBasis={'100px'}
                    data={progressAssessment}
                  />
                </HStack>
              </Box>*/}
              <Divider></Divider>
              <Box p="4" pt="0">
                <Button
                  py={3}
                  // colorScheme="button"
                  _text={{color: "#fff"}}
                  onPress={() => setChooseSubjectModal(true)}
                >
                  {t("Continue")}
                </Button>
              </Box>
            </VStack>
          </Box>
          <Text my={2} textAlign={"center"} color={"#F87558"} fontSize={12} bold cursor={"pointer"}>{t('VIEW PAST ASSESSMENTS')}</Text>
        </VStack>

        {/*========= drawer1 =============*/}
        <Actionsheet isOpen={chooseSubjectModal} onClose={() => setChooseSubjectModal(false)}>
          <Actionsheet.Content alignItems={"left"} bg="#D9F0FC">
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="25px">
                <Text fontSize="16px" fontWeight={"600"}>
                  {t("Choose the subject")}
                </Text>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={"white"}
                onPress={() => setChooseSubjectModal(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box w="100%" p={4} justifyContent="center" bg="white">
            <Actionsheet.Item>Mathematics</Actionsheet.Item>
            <Actionsheet.Item>Science</Actionsheet.Item>
            <Actionsheet.Item>English</Actionsheet.Item>
            <Actionsheet.Item>History</Actionsheet.Item>
            <Actionsheet.Item>Geography</Actionsheet.Item>

            <Divider my={4}></Divider>

            <Box p="4" pt="0">
              <Button
                colorScheme="button"
                _text={{
                  color: 'white'
                }}
                onPress={() => {setChooseSubjectModal(false); setChooseCompetenciesModal(true)}}
              >
                {t("Next")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>

        {/*========= drawer2 =============*/}
        <Actionsheet isOpen={chooseCompetenciesModal} onClose={() => setChooseCompetenciesModal(false)}>
          <Actionsheet.Content alignItems={"left"} bg="#D9F0FC">
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="25px">
                <Text fontSize="16px" fontWeight={"600"}>
                  {t("Select the competencies")}
                </Text>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={"white"}
                onPress={(e) => setChooseCompetenciesModal(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box w="100%" p={4} justifyContent="center" bg="white">
            <HStack justifyContent={"space-between"} p={4}>
              <Text fontSize={16}>
                {t("Reasoning")}
              </Text>
              <Checkbox colorScheme="orange" />
            </HStack>

            <HStack justifyContent={"space-between"} p={4}>
              <Text fontSize={16}>
                {t("Cognitive")}
              </Text>
              <Checkbox colorScheme="orange" />
            </HStack>

            <HStack justifyContent={"space-between"} p={4}>
              <Text fontSize={16}>
                {t("Critical Thinking")}
              </Text>
              <Checkbox colorScheme="orange" />
            </HStack>

            <HStack justifyContent={"space-between"} p={4}>
              <Text fontSize={16}>
                {t("Enterprenurial")}
              </Text>
              <Checkbox colorScheme="orange" />
            </HStack>

            <Divider my={4}></Divider>

            <Box p="4" pt="0">
              <Button
                colorScheme="button"
                _text={{
                  color: 'white'
                }}
                onPress={() => setPageName('assessmentStudentList')}
              >
                {t("Next")}
              </Button>
            </Box>
          </Box>
        </Actionsheet>
    </>
  );
};

export default SpotAssessmentCard;
