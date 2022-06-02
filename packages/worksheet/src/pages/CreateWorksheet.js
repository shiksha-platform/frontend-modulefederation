import { Layout, Loading } from "@shiksha/common-lib";
import React from "react";
import { useTranslation } from "react-i18next";
import { getAllQuestions } from "services";
import manifest from "../manifest.json";
import SuccessPage from "components/CreateWorksheet/SuccessPage";
import FormPage from "components/CreateWorksheet/Form";
import AddDescriptionPage from "components/CreateWorksheet/AddDescriptionPage";
import WorksheetTemplate from "components/CreateWorksheet/WorksheetTemplate";
import ListOfWorksheet from "components/CreateWorksheet/ListOfWorksheet";

export default function CreateWorksheet({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [pageName, setPageName] = React.useState();
  const [questions, setQuestions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [formObject, setFormObject] = React.useState({});
  const [worksheetName, setWorksheetName] = React.useState("Untitled");

  React.useEffect(async () => {
    if (pageName === "ListOfWorksheet") {
      const questions = await getAllQuestions(formObject);
      setQuestions(questions);
      setLoading(false);
    }
  }, [formObject, pageName === "ListOfWorksheet"]);

  if (loading) {
    return <Loading />;
  }

  const handleBackButton = () => {
    if (pageName === "success") {
      setFormObject({});
      setPageName();
      setWorksheetName("Untitled");
    } else if (pageName === "AddDescriptionPage") {
      setPageName("filterData");
    } else if (pageName === "filterData") {
      setPageName("ListOfWorksheet");
    } else if (pageName === "ListOfWorksheet") {
      setPageName("");
    } else {
      navigate(-1);
    }
  };

  if (pageName === "success") {
    return <SuccessPage handleBackButton={handleBackButton} />;
  }

  return (
    <Layout
      _header={{
        title:
          pageName === "ListOfWorksheet"
            ? t("Add Questions")
            : pageName === "filterData"
            ? worksheetName
            : pageName === "AddDescriptionPage"
            ? t("Add Description")
            : t("CREATE_NEW_WORKSHEET"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
      }}
      _appBar={{
        languages: manifest.languages,
        onPressBackButton: handleBackButton,
      }}
      subHeader={
        pageName === "ListOfWorksheet"
          ? worksheetName
            ? t("Your worksheet has been created.")
            : t("You can see all questions here")
          : pageName === "AddDescriptionPage"
          ? t("Enter Worksheet Details")
          : t("Show questions based on")
      }
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
      {["ListOfWorksheet", "filterData"].includes(pageName) ? (
        <ListOfWorksheet
          {...{
            questions,
            setQuestions,
            pageName,
            setPageName,
            filterObject: formObject,
            setFilterObject: setFormObject,
            worksheetName,
            setWorksheetName,
          }}
        />
      ) : pageName === "WorksheetTemplate" ? (
        <WorksheetTemplate onPress={(e) => setPageName("success")} />
      ) : pageName === "AddDescriptionPage" ? (
        <AddDescriptionPage {...{ questions, setQuestions, setPageName }} />
      ) : (
        <FormPage {...{ formObject, setFormObject, setPageName, setLoading }} />
      )}
    </Layout>
  );
}
