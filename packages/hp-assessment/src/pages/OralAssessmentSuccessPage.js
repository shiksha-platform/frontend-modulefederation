import {
  classRegistryService,
  H3,
  IconByName,
  Layout,
  overrideColorTheme,
  useWindowSize,
  BodyLarge, questionRegistryService
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
  const [questionIds, setQuestionIds] = useState([]);


  const fetchQuestionsForWrittenAssessment = async () => {
    const limit = 2;
    let data = {
      adapter: "diksha",
      limit,
      subject: "Mathematics",
      // bloomsLevel: selectedCompetencies || "application",
      className: localStorage.getItem('hp-assessment-groupName')
    };
    const questions = await questionRegistryService.getAllQuestions(data);
    let questionIds = questions.map((question) => {
      return question.questionId;
    });
    setQuestionIds(questionIds);
    localStorage.setItem('hp-assessment-written-questionIds', questionIds);
  };

  return (
    <Layout isDisabledAppBar={true}>
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
              fetchQuestionsForWrittenAssessment();
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
