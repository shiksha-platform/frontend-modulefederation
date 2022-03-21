import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Layout } from "@shiksha/common-lib";
import { colourPalette } from "constants/colours";
import QuestionHeading from "components/Heading";
import QuestionBox from "components/QuestionBox";
import { getAllQuestions } from "services";

export default function QuestionBank() {
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
    <Layout
      _header={{
        title: translationCheck("MY_CLASSES", "Question Bank"),
        icon: "Group",
        subHeading: "Test",
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
        avatar: true,
      }}
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
      <QuestionHeading text="FILL IN THE BLANKS" />
      {questions &&
        questions.map((question, index) => (
          <QuestionBox key={index}>{question}</QuestionBox>
        ))}
    </Layout>
  );
}
