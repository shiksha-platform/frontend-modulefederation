import {
  IconByName,
  Loading,
  worksheetRegistryService,
  questionRegistryService,
  overrideColorTheme,
} from "@shiksha/common-lib";
import React from "react";
import { useParams } from "react-router-dom";
import ListOfWorksheet from "../components/WorksheetEdit/ListOfWorksheet";
import UpdateDescriptionPage from "../components/WorksheetEdit/UpdateDescriptionPage";
import FormWorksheet from "components/WorksheetEdit/FormWorksheet";
import QuestionActionsheet from "../components/Actionsheet/QuestionActionsheet";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function EditWorksheet({ footerLinks, appName }) {
  const [pageName, setPageName] = React.useState();
  const [questions, setQuestions] = React.useState([]);
  const [selectData, setSelectData] = React.useState([]);
  const [worksheet, setWorksheet] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [questionObject, setQuestionObject] = React.useState({});
  const { id } = useParams();

  React.useEffect(async () => {
    const worksheetData = await worksheetRegistryService.getOne({ id });
    const questionIds =
      worksheetData && Array.isArray(worksheetData.questions)
        ? worksheetData.questions
        : [];
    const questions = await questionRegistryService.getQuestionByIds(
      questionIds
    );
    setWorksheet(worksheetData);
    setQuestions(questions);
    setSelectData(questions);
    setLoading(false);
  }, []);

  const handleSubmit = () => {
    const newWorksheetObject = {
      ...worksheet,
      questions: selectData.map((e) => e.questionId),
    };

    setQuestions(selectData);
    setWorksheet(newWorksheetObject);
    setPageName("success");
    worksheetRegistryService.update(newWorksheetObject);
  };

  if (loading) {
    return <Loading />;
  } else if (pageName === "UpdateDescriptionPage") {
    return (
      <UpdateDescriptionPage
        {...{
          setPageName,
          formObject: worksheet,
          setFormObject: setWorksheet,
          handleSubmit,
          footerLinks,
          appName,
        }}
      />
    );
  } else if (pageName === "ListOfWorksheet") {
    return (
      <>
        <ListOfWorksheet
          {...{
            setQuestions,
            selectData,
            setSelectData,
            handleSubmit,
            setPageName,
            setQuestionObject,
            footerLinks,
            appName,
            worksheet,
          }}
        />
        <QuestionActionsheet {...{ questionObject, setQuestionObject }} />
      </>
    );
  } else {
    return (
      <>
        <FormWorksheet
          {...{
            questions,
            selectData,
            setSelectData,
            handleSubmit,
            pageName,
            setPageName,
            setQuestionObject,
            footerLinks,
            appName,
            formObject: worksheet,
            setFormObject: setWorksheet,
          }}
        />
        <QuestionActionsheet {...{ questionObject, setQuestionObject }} />
      </>
    );
  }
}
