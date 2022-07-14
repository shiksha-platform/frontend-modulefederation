import React, { useState } from "react";
import { HStack, Text, VStack, Box, Button, Avatar } from "native-base";
import { useTranslation } from "react-i18next";
import SimpleQuestionCard from "./questionTypes/SimpleQuestionCard";
import {
  BodyLarge,
  Layout,
  Loading,
  useWindowSize,
  overrideColorTheme,
  Caption,
} from "@shiksha/common-lib";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const QuestionList4 = ({ questionNumber }) => {
  const { t } = useTranslation();
  const [questionList, setQuestionList] = useState([
    {
      question: "<p>This is dummy question 1</p>",
      qType: "MCQ",
      options: [
        {
          value: { body: "<p>Option 1</p>" },
        },
        {
          value: { body: "<p>Option 2</p>" },
        },
        {
          value: { body: "<p>Option 3</p>" },
        },
        {
          value: { body: "<p>Option 4</p>" },
        },
      ],
    },
    {
      question: "<p>This is dummy question 2</p>",
      qType: "MCQ",
      options: [
        {
          value: { body: "<p>Option 1</p>" },
        },
        {
          value: { body: "<p>Option 2</p>" },
        },
        {
          value: { body: "<p>Option 3</p>" },
        },
        {
          value: { body: "<p>Option 4</p>" },
        },
      ],
    },
    {
      question: "<p>This is dummy question 3</p>",
      qType: "MCQ",
      options: [
        {
          value: { body: "<p>Option 1</p>" },
        },
        {
          value: { body: "<p>Option 2</p>" },
        },
        {
          value: { body: "<p>Option 3</p>" },
        },
        {
          value: { body: "<p>Option 4</p>" },
        },
      ],
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
        subHeading: <BodyLarge>{t("State Examinations")}</BodyLarge>,
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
            <BodyLarge>Rahul</BodyLarge>
            <Caption color={colors.lightGray0}>Mr. Father’s Name</Caption>
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
      _subHeader={{ bg: colors.cardBg }}
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
              if (question.qType === "MCQ") {
                return (
                  <SimpleQuestionCard
                    key={`q-${questionIndex}`}
                    questionNumber={questionIndex + 1}
                    question={""}
                  />
                );
              }
            })
          ) : (
            <></>
          )}
        </VStack>
      </Box>
      <Box bg={colors.white} p="5" position="sticky" bottom="84" shadow={2}>
        <Button colorScheme="button" py={3} _text={{ color: colors.white }}>
          {t("Save")}
        </Button>
      </Box>
    </Layout>
  );
};

export default QuestionList4;
