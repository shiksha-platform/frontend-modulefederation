import React, { useState } from "react";
import {
  IconByName,
  ProgressBar,
  overrideColorTheme,
  BodyLarge,
  Subtitle,
  BodySmall,
  H2,
} from "@shiksha/common-lib";
import {
  HStack,
  VStack,
  Box,
  Button,
  Divider,
  Actionsheet,
  Stack,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const ExamScoresCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  const [loadingExams, setLoadingExams] = useState(false);
  const [chooseExamModal, setChooseExamModal] = useState(false);
  const [exams, setExams] = useState([
    "State Exam",
    "Semester Exam",
    "Summative Assessment 1",
  ]);
  const [selectedExam, setSelectedExam] = useState();

  const handleExamSelection = (exam) => {
    setSelectedExam(exam);
  };

  return (
    <>
      <VStack space={2}>
        <BodyLarge>State Examinations</BodyLarge>
        <Box
          borderWidth="1"
          borderColor={colors.borderColor}
          borderRadius="10px"
        >
          <VStack space="4">
            <Box px="4" py={2} bg={colors.scoreCardIcon2} roundedTop="6">
              <HStack justifyContent={"center"} alignItems="center">
                <IconByName name="TimeLineIcon" pr="0" color={colors.white} />
                <Subtitle color={colors.white}>
                  4 Days left! Submit assessment scores now.
                </Subtitle>
              </HStack>
            </Box>
            <Box px="4">
              <BodyLarge>Summative Assessment 1</BodyLarge>
              <BodySmall py="2" color={colors.gray}>
                Due Date - 27, May 2022
              </BodySmall>
              <VStack flex="auto" alignContent={"center"}>
                <ProgressBar
                  isTextShow
                  legendType="separated"
                  h="35px"
                  _bar={{ rounded: "md", my: "3" }}
                  _legendType={{ color: colors.gray }}
                  isLabelCountHide
                  data={progressAssessment}
                />
              </VStack>
            </Box>
            <Divider my="1" mx="4" w="90%"></Divider>
            <Box p="4" pt="4px" borderBottomRadius={6}>
              <Button
                py={3}
                colorScheme="button"
                _text={{ color: colors.white }}
                onPress={() => setChooseExamModal(true)}
              >
                {t("continue")}
              </Button>
            </Box>
          </VStack>
        </Box>
      </VStack>
      <Subtitle
        my={2}
        textAlign={"center"}
        color={colors.primary}
        onPress={() => {
          setPageName("pastExaminations");
        }}
      >
        {t("VIEW PAST EXAMINATIONS")}
      </Subtitle>

      {/*choose examination modal*/}
      <Actionsheet
        isOpen={chooseExamModal}
        onClose={() => setChooseExamModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2 textTransform="none">{t("Choose the exam")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={() => setChooseExamModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={2} justifyContent="center" bg={colors.white}>
          {loadingExams ? (
            <>Loading Exams...</>
          ) : exams?.length ? (
            exams?.map((exam) => {
              return (
                <Actionsheet.Item
                  key={exam}
                  onPress={() => {
                    handleExamSelection(exam);
                  }}
                >
                  <BodyLarge
                    color={selectedExam === exam ? "black" : colors.gray}
                    textTransform="none"
                  >
                    {t(exam)}
                  </BodyLarge>
                </Actionsheet.Item>
              );
            })
          ) : (
            <>No Exams</>
          )}
          <Box p="4">
            <Button
              colorScheme="button"
              _text={{
                color: colors.white,
              }}
              onPress={() => {
                setChooseExamModal(false);
                navigate("/assessment/examscores");
              }}
              isDisabled={!selectedExam}
            >
              {t("Next")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>
    </>
  );
};

export default ExamScoresCard;
