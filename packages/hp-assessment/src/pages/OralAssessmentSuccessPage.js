import {
  classRegistryService,
  H3,
  IconByName,
  Layout,
  overrideColorTheme,
  useWindowSize,
  BodyLarge,
  questionRegistryService,
  questionIdService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { Avatar, VStack, Box, Button, HStack, Text } from "native-base";
import StudentListCard from "../components/StudentListCard";
import colorTheme from "../colorTheme";
import { useNavigate } from "react-router-dom";

const colors = overrideColorTheme(colorTheme);

export default function OralAssessmentSuccessPage({
  classId,
  setPageName,
  handleBackButton,
  chooseAssessmentTypeModal,
  handleSelectedStudent,
  selectedStudent,
  handleStudentPageNext,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [width, height] = useWindowSize();
  const limit = 4;

  const fetchQuestionsForWrittenAssessment = async () => {
    let data = {
      type: "NA",
      grade: localStorage.getItem("hp-assessment-groupName"),
    };
    // const result = await questionIdService.getQuestionIds(data);
    // console.log({ result });
    const questions = await questionIdService.getQuestionIds(data);
    if (localStorage.getItem("hp-assessment-groupName") == 3) {
      data = {
        type: "RC",
        grade: localStorage.getItem("hp-assessment-groupName"),
      };
    }
    const readingComprehensionIds = await questionIdService.getQuestionIds(data);
    let questionSet = questions[Math.floor((Math.random() * questions.length))];
    let readingComprehensionSet = readingComprehensionIds[Math.floor((Math.random() * readingComprehensionIds.length))];

    localStorage.setItem("hp-assessment-written-questionIds", questionSet);
    localStorage.setItem("hp-assessment-written-reading-comprehension", readingComprehensionSet);
  };

  useEffect(() => {
    fetchQuestionsForWrittenAssessment();
  }, [])

  return (
    <Layout isDisabledAppBar={false}>
      <Box
        p={4}
        h={height}
        bg="hpAssessment.completed"
        alignItems="center"
        justifyContent="center"
      >
        <VStack space={4} maxW="200px" mx="auto" textAlign="center">
          <IconByName
            alignSelf="center"
            name="CheckboxCircleFillIcon"
            color="hpAssessment.success"
            _icon={{ size: 50 }}
          />
          <BodyLarge color="hpAssessment.success">
            Your ORF assessment is complete. Click next to continue the
            assessment.
          </BodyLarge>
          <Button
            colorScheme="hBbutton"
            variant="outline"
            onPress={() => {
              navigate("/hpAssessment/quml-test");
              // navigate("/hpAssessment/final-assessment-success");
            }}
          >
            {t("Next")}
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
}
