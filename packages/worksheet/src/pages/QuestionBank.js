import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Layout,
  FilterButton,
  useWindowSize,
  Loading,
  overrideColorTheme,
  H2,
  questionRegistryService,
} from "@shiksha/common-lib";
import QuestionBox from "components/QuestionBox";
import { Box, ScrollView, VStack } from "native-base";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function QuestionBank({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const [questions, setQuestions] = useState([]);
  const [filterObject, setFilterObject] = useState({});
  const [loading, setLoading] = React.useState(true);

  useEffect(async () => {
    const questions = await questionRegistryService.getAllQuestions(
      filterObject
    );
    setQuestions(questions);
    setLoading(false);
  }, [filterObject]);

  const translationCheck = (name, title) => {
    return (t(name) !== name && t(name)) || title;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout
      _header={{
        title: translationCheck("MY_CLASSES", "Question Bank"),
        avatar: true,
      }}
      bg={colors.white}
      _appBar={{ languages: ["en"] }}
      subHeader={<H2 textTransform="inherit">{t("THE_CLASSES_YOU_TAKE")}</H2>}
      _subHeader={{
        bg: colors.cardBg,
      }}
      _footer={footerLinks}
    >
      <FilterButton
        getObject={setFilterObject}
        _box={{ p: 5 }}
        _actionSheet={{ bg: colors.cardBg }}
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
      {/* <QuestionHeading text="Fill in the blanks" /> */}
      <ScrollView maxH={Height}>
        <Box bg={colors.white} p="5">
          <VStack space="5">
            {questions &&
              questions.map((question, index) => (
                <QuestionBox
                  _box={{ py: "12px", px: "16px" }}
                  key={index}
                  questionObject={question}
                />
              ))}
          </VStack>
        </Box>
      </ScrollView>
    </Layout>
  );
}
