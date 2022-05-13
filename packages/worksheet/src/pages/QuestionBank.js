import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Layout, FilterButton, useWindowSize } from "@shiksha/common-lib";
import { colourPalette } from "constants/colours";
import QuestionHeading from "components/Heading";
import QuestionBox from "components/QuestionBox";
import { getAllQuestions } from "services";
import { Box, Button, ScrollView, Text, VStack } from "native-base";

export default function QuestionBank({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const [questions, setQuestions] = useState([]);
  const [filterObject, setFilterObject] = useState({});
  useEffect(async () => {
    const questions = await getAllQuestions(filterObject);
    setQuestions(questions);
  }, [filterObject]);

  const translationCheck = (name, title) => {
    return (t(name) !== name && t(name)) || title;
  };

  return (
    <Layout
      _header={{
        title: translationCheck("MY_CLASSES", "Question Bank"),
        avatar: true,
      }}
      bg="white"
      _appBar={{ languages: ["en"] }}
      subHeader={t("THE_CLASSES_YOU_TAKE")}
      _subHeader={{
        bg: "worksheetCard.500",
        _text: {
          fontSize: "16px",
          fontWeight: "600",
          textTransform: "inherit",
        },
      }}
      _footer={footerLinks}
    >
      <FilterButton
        getObject={setFilterObject}
        _box={{ p: 5 }}
        _actionSheet={{ bg: "worksheetCard.500" }}
        filters={[
          {
            name: "Subject",
            attributeName: "subject",
            data: [
              "Social Science",
              "Science",
              "Mathematics",
              "Hindi",
              "English",
              "History",
              "Geography",
            ],
          },
          {
            name: "Class",
            attributeName: "gradeLevel",
            data: [
              "Class 1",
              "Class 2",
              "Class 3",
              "Class 4",
              "Class 5",
              "Class 6",
              "Class 7",
              "Class 8",
              "Class 9",
              "Class 10",
            ],
          },
          {
            name: "Topic",
            attributeName: "topic",
            data: [
              "भोजन के घटक",
              "भोजन: यह कहाँ से आता है?",
              "तंतु से वस्त्र तक",
              "संसाधन",
              "समानता",
              "संश्लेशित रेशे  और प्लास्टिक",
              "आखेट-खाद्य संग्राहक से भोजन उत्पादन तक",
            ],
          },
        ]}
      />
      <QuestionHeading text="FILL IN THE BLANKS" />
      <ScrollView maxH={Height}>
        <Box bg="white" p="5">
          <VStack space="5">
            {questions &&
              questions.map((question, index) => (
                <QuestionBox
                  _box={{ py: "12px", px: "16px" }}
                  key={index}
                  question={question.question}
                  options={question?.options}
                />
              ))}
          </VStack>
        </Box>
      </ScrollView>
    </Layout>
  );
}
