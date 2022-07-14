import React, { useState } from "react";
import {
  capture,
  IconByName,
  ProgressBar,
  telemetryFactory,
  overrideColorTheme,
  BodyLarge,
  BodySmall,
  Subtitle,
  H2,
  H3,
} from "@shiksha/common-lib";
import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Progress,
  Button,
  Divider,
  Actionsheet,
  Checkbox,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const SpotAssessmentCard = ({ setPageName, appName }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [chooseSubjectModal, setChooseSubjectModal] = useState(false);
  const [chooseCompetenciesModal, setChooseCompetenciesModal] = useState(false);
  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "12 Assessed",
      color: colors.successBarColor,
      value: 12,
    },
    {
      name: "6 pending",
      color: colors.pendingBarColor,
      value: 6,
    },
  ]);

  const _handleSpotAssessmentStart = () => {
    setChooseSubjectModal(true);

    const telemetryData = telemetryFactory.start({
      appName,
      type: "Spot-Assessment-Start",
    });
    capture("START", telemetryData);
  };

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
        <BodyLarge pb="2">Spot Assessment</BodyLarge>
        <Box
          borderWidth="1"
          borderColor={colors.borderColor}
          borderRadius="10px"
        >
          <VStack space="4">
            <Box p="4" pb="4px" roundedTop="6">
              <VStack space={4}>
                <Box>
                  <BodyLarge py="2">{t("Spot Assessment 1")}</BodyLarge>
                  <BodySmall color={colors.gray}>27, May 2022</BodySmall>
                </Box>

                <ProgressBar
                  isTextShow
                  legendType="separated"
                  h="35px"
                  _bar={{ rounded: "md", mb: "2" }}
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
            <Divider mx="4" w="90%"></Divider>
            <Box p="4" pt="4px">
              <Button
                py={3}
                // colorScheme="button"
                _text={{ color: colors.white }}
                onPress={_handleSpotAssessmentStart}
              >
                {t("Continue")}
              </Button>
            </Box>
          </VStack>
        </Box>
        <Subtitle my={2} textAlign={"center"} color={colors.primary}>
          {t("VIEW PAST ASSESSMENTS")}
        </Subtitle>
      </VStack>

      {/*========= drawer1 =============*/}
      <Actionsheet
        isOpen={chooseSubjectModal}
        onClose={() => setChooseSubjectModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("Choose the subject")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={() => setChooseSubjectModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={2} justifyContent="center" bg={colors.white}>
          <Actionsheet.Item>
            <BodyLarge color={colors.gray}>Mathematics</BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item>
            <BodyLarge color={colors.gray}>Science</BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item>
            <BodyLarge color={colors.gray}>English</BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item>
            <BodyLarge color={colors.gray}>History</BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item>
            <BodyLarge color={colors.gray}>Geography</BodyLarge>
          </Actionsheet.Item>

          <Box p="4">
            <Button
              colorScheme="button"
              _text={{
                color: colors.white,
              }}
              onPress={() => {
                setChooseSubjectModal(false);
                setChooseCompetenciesModal(true);
              }}
            >
              {t("Next")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>

      {/*========= drawer2 =============*/}
      <Actionsheet
        isOpen={chooseCompetenciesModal}
        onClose={() => setChooseCompetenciesModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("Select the competencies")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setChooseCompetenciesModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={5} justifyContent="center" bg="white">
          <HStack justifyContent={"space-between"} py={4}>
            <BodyLarge>{t("Reasoning")}</BodyLarge>
            <Checkbox
              colorScheme="button"
              borderColor={colors.primary}
              borderRadius="0"
              _text={{ color: colors.primary, fontSize: "14px" }}
            />
          </HStack>

          <HStack justifyContent={"space-between"} py={4}>
            <BodyLarge>{t("Cognitive")}</BodyLarge>
            <Checkbox
              colorScheme="button"
              borderColor={colors.primary}
              borderRadius="0"
              _text={{ color: colors.primary, fontSize: "14px" }}
            />
          </HStack>

          <HStack justifyContent={"space-between"} py={4}>
            <BodyLarge>{t("Critical Thinking")}</BodyLarge>
            <Checkbox
              colorScheme="button"
              borderColor={colors.primary}
              borderRadius="0"
              _text={{ color: colors.primary, fontSize: "14px" }}
            />
          </HStack>

          <HStack justifyContent={"space-between"} py={4}>
            <BodyLarge>{t("Enterprenurial")}</BodyLarge>
            <Checkbox
              colorScheme="button"
              borderColor={colors.primary}
              borderRadius="0"
              _text={{ color: colors.primary, fontSize: "14px" }}
            />
          </HStack>

          <Box p="5">
            <Button
              colorScheme="button"
              _text={{
                color: colors.white,
              }}
              onPress={() => setPageName("assessmentStudentList")}
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
