import React, { useState, useEffect } from "react";
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
  assessmentRegistryService,
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
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(
    localStorage.getItem("assessment-subject")
  );
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

  const getSubjectsList = async () => {
    const res = await assessmentRegistryService.getSubjectsList();
    setSubjects(res);
  };

  const handleSubjectSelection = (subject) => {
    setSelectedSubject(subject);
    localStorage.setItem("assessment-subject", subject);
  };

  const _handleSpotAssessmentStart = () => {
    setChooseSubjectModal(true);

    const telemetryData = telemetryFactory.start({
      appName,
      type: "Spot-Assessment-Start",
    });
    capture("START", telemetryData);
  };

  useEffect(() => {
    getSubjectsList();
  }, []);
  return (
    <>
      {/*========= box1 =============*/}
      <VStack space={4}>
        <BodyLarge>Spot Assessment</BodyLarge>
        <Box
          borderWidth="1"
          borderColor={colors.borderColor}
          borderRadius="10px"
        >
          <VStack space="4">
            <Box p="4" pb="4px" roundedTop="6">
              <VStack space={4}>
                <Box>
                  <BodyLarge py="2">{t("Written Spot Assessment")}</BodyLarge>
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
              </VStack>
            </Box>
          </VStack>
        </Box>

        <Box
          borderWidth="1"
          borderColor={colors.borderColor}
          borderRadius="10px"
        >
          <VStack space="4">
            <Box p="4" pb="4px" roundedTop="6">
              <VStack space={4}>
                <Box>
                  <BodyLarge py="2">{t("Oral Spot Assessment")}</BodyLarge>
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
              </VStack>
            </Box>
          </VStack>
        </Box>

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
          {subjects && subjects.length ? (
            subjects.map((subject) => {
              return (
                <Actionsheet.Item
                  key={subject}
                  onPress={() => {
                    handleSubjectSelection(subject);
                  }}
                >
                  <BodyLarge
                    color={selectedSubject === subject ? "black" : colors.gray}
                    textTransform="none"
                  >
                    {t(subject)}
                  </BodyLarge>
                </Actionsheet.Item>
              );
            })
          ) : (
            <>No Subjects</>
          )}

          <Box p="4">
            <Button
              colorScheme="button"
              _text={{
                color: colors.white,
              }}
              onPress={() => {
                setChooseSubjectModal(false);
                // setChooseAssessmentTypeModal(true);
                setPageName("assessmentStudentList");
              }}
              isDisabled={!selectedSubject}
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
