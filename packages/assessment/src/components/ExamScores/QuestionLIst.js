import React, { useState, useEffect } from "react";
import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Progress,
  Button, Divider, Actionsheet, Checkbox, Radio
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SingleSelectQuestionCard from "./questionTypes/SingleSelectQuestionCard";
import MultipleSelectQuestionCard from "./questionTypes/MultipleSelectQuestionCard";
import SimpleQuestionCard from "./questionTypes/SimpleQuestionCard";

const QuestionList = ({ questionNumber}) => {
  const { t } = useTranslation();
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    setQuestionList([
      {
        type: 'single'
      },
      {
        type: 'multiple'
      },
      {
        type: 'simple'
      }
    ])
  }, [])


  return (
    <VStack space={4}>
      {
        questionList && questionList.length ? questionList.map((question, questionIndex) => {
          if(question.type === 'single'){
            return <SingleSelectQuestionCard key={`q-${questionIndex}`} questionNumber={questionIndex+1} />
          }else if(question.type === 'multiple'){
            return <MultipleSelectQuestionCard key={`q-${questionIndex}`} questionNumber={questionIndex+1} />
          }else if(question.type === 'simple'){
            return <SimpleQuestionCard key={`q-${questionIndex}`} questionNumber={questionIndex+1} />
          }
        }) : <></>
      }
    </VStack>
  );
};

export default QuestionList;
