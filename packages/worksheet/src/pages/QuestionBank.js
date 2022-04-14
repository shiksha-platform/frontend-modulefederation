import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@shiksha/common-lib";
import { colourPalette } from "constants/colours";
import QuestionHeading from "components/Heading";
import QuestionBox from "components/QuestionBox";
import { getAllQuestions } from "services";
import { Box, Button, Text } from "native-base";

export default function QuestionBank({ footerLinks }) {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([]);
  useEffect(async () => {
    const questions = await getAllQuestions();
    setQuestions(questions);
  }, []);

  const translationCheck = (name, title) => {
    return (t(name) !== name && t(name)) || title;
  };

  return (
    <Box bg="white">
      <Layout
        _header={{
          title: translationCheck("MY_CLASSES", "Question Bank"),
          icon: "Group",
          subHeading: "Test",
          _subHeading: { fontWeight: 500, textTransform: "uppercase" },
          avatar: true,
        }}
        bg="white"
        _appBar={{ languages: ["en"] }}
        subHeader={t("THE_CLASSES_YOU_TAKE")}
        _subHeader={{
          bg: colourPalette.primary,
          _text: {
            fontSize: "16px",
            fontWeight: "600",
            textTransform: "inherit",
          },
        }}
        _footer={footerLinks}
      >
        <Box style={{ flex: "0" }}>
          <Button
            rounded="full"
            color={colourPalette.fontSecondary}
            bg={colourPalette.tertiary}
          >
            <Text>Success</Text>
          </Button>
          <Button
            rounded="full"
            color={colourPalette.fontSecondary}
            bg={colourPalette.tertiary}
          >
            <Text>Success</Text>
          </Button>
        </Box>
        <QuestionHeading text="FILL IN THE BLANKS" />
        {questions &&
          questions.map((question, index) => (
            <QuestionBox key={index}>{question}</QuestionBox>
          ))}
      </Layout>
    </Box>
  );
}
