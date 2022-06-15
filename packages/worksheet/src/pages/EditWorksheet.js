import { Loading, worksheetRegistryService } from "@shiksha/common-lib";
import React from "react";
import { getQuestionByIds } from "../services";
import { useParams } from "react-router-dom";
import ListOfWorksheet from "../components/WorksheetEdit/ListOfWorksheet";
import UpdateDescriptionPage from "../components/WorksheetEdit/UpdateDescriptionPage";

export default function EditWorksheet({ footerLinks, appName }) {
  const [pageName, setPageName] = React.useState();
  const [questions, setQuestions] = React.useState([]);
  const [selectData, setSelectData] = React.useState([]);
  const [worksheet, setWorksheet] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(async () => {
    const worksheetData = await worksheetRegistryService.getOne({ id });
    const questionIds =
      worksheetData && Array.isArray(worksheetData.questions)
        ? worksheetData.questions
        : [];
    const questions = await getQuestionByIds(questionIds);
    setWorksheet(worksheetData);
    setQuestions(questions);
    setSelectData(questions);
    setLoading(false);
  }, []);

  const handleSubmit = () => {
    worksheetRegistryService.update(worksheet);
    setPageName("success");
  };

  if (loading) {
    return <Loading />;
  } else if (pageName === "AddDescriptionPage") {
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
  } else {
    return (
      <ListOfWorksheet
        {...{
          questions,
          selectData,
          setSelectData,
          handleSubmit,
          pageName,
          setPageName,
          footerLinks,
          appName,
          formObject: worksheet,
          setFormObject: setWorksheet,
        }}
      />
    );
  }
}
