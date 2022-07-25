import React, { useState, useEffect } from "react";
import { VStack } from "native-base";
import { useTranslation } from "react-i18next";
import SingleSelectQuestionCard from "./questionTypes/SingleSelectQuestionCard";
import MultipleSelectQuestionCard from "./questionTypes/MultipleSelectQuestionCard";
import SimpleQuestionCard from "./questionTypes/SimpleQuestionCard";
import {
  assessmentRegistryService,
  Loading,
  useWindowSize,
} from "@shiksha/common-lib";

const QuestionList = ({ questionNumber, questionType }) => {
  const { t } = useTranslation();
  const [questionList, setQuestionList] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [width, height] = useWindowSize();
  const limit = "20";

  const getQuestionList = async () => {
    const res = await assessmentRegistryService.getAllQuestions(
      { qType: questionType },
      { limit }
    );
    // console.log('res', res);
    setQuestionList(res);
    setLoading(false);
  };

  useEffect(() => {
    setQuestionList([
      {
        type: "single",
      },
      {
        type: "multiple",
      },
      {
        type: "simple",
      },
    ]);

    getQuestionList();
  }, []);

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <VStack space={4}>
      {questionList && questionList.length ? (
        questionList.map((question, questionIndex) => {
          if (question.qType === "single") {
            return (
              <SingleSelectQuestionCard
                key={`q-${questionIndex}`}
                questionNumber={questionIndex + 1}
                question={question}
              />
            );
          } else if (question.qType === "MCQ") {
            return (
              <MultipleSelectQuestionCard
                key={`q-${questionIndex}`}
                questionNumber={questionIndex + 1}
                question={question}
              />
            );
          } else if (question.qType === "SA") {
            return (
              <SimpleQuestionCard
                key={`q-${questionIndex}`}
                questionNumber={questionIndex + 1}
                question={question}
              />
            );
          }
        })
      ) : (
        <></>
      )}
    </VStack>
  );
};

export default QuestionList;
