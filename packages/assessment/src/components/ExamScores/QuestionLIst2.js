import React, { useState, useEffect } from "react";
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
  Radio,
  Avatar,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SingleSelectQuestionCard from "./questionTypes/SingleSelectQuestionCard";
import MultipleSelectQuestionCard from "./questionTypes/MultipleSelectQuestionCard";
import SimpleQuestionCard from "./questionTypes/SimpleQuestionCard";
import {
  assessmentRegistryService,
  IconByName,
  Layout,
  Loading,
  useWindowSize,
} from "@shiksha/common-lib";

const QuestionList2 = ({ questionNumber }) => {
  const { t } = useTranslation();
  const [questionList, setQuestionList] = useState([
    {
      question: "<p>This is dummy question 1</p>",
      qType: "single",
    },
    {
      question: "<p>This is dummy question 2</p>",
      qType: "single",
    },
    {
      question: "<p>This is dummy question 3</p>",
      qType: "single",
    },
  ]);
  const [loading, setLoading] = React.useState(false);
  const [width, height] = useWindowSize();

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <Layout
      _header={{
        title: "Summative Assessment 1",
        isEnableSearchBtn: true,
        // setSearch: setSearch,
        subHeading: "State Examinations",
        iconComponent: (
          <Avatar
            size="48px"
            borderRadius="md"
            source={{
              uri: "https://via.placeholder.com/50x50.png",
            }}
          />
        ),
      }}
      _appBar={{ languages: ["en"] }}
      subHeader={
        <HStack space="4" justifyContent="space-between" alignItems="center">
          <VStack>
            <Text fontSize={"lg"}>Rahul</Text>
            <Text fontSize={"xs"} color={"muted.600"}>
              Mr. Father’s Name
            </Text>
          </VStack>
          <Avatar
            size="37px"
            borderRadius="md"
            source={{
              uri: "https://via.placeholder.com/50x50.png",
            }}
          />
        </HStack>
      }
      _subHeader={{ bg: "#D9F0FC" }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            module: "Registry",
            route: "/classes",
            routeparameters: {},
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
        ],
      }}
    >
      <Box p={4}>
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
              }
            })
          ) : (
            <></>
          )}
        </VStack>
      </Box>
      <Box bg="white" p="5" position="sticky" bottom="84" shadow={2}>
        <Button colorScheme="button" py={3} _text={{ color: "#fff" }}>
          {t("Save")}
        </Button>
      </Box>
    </Layout>
  );
};

export default QuestionList2;
