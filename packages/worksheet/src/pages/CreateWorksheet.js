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
import { defaultInputs, autoGenerateInputs } from "config/worksheetConfig";
import { useNavigate } from "react-router-dom";

export default function CreateWorksheet({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [pageName, setPageName] = React.useState();
  const [questions, setQuestions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [formObject, setFormObject] = React.useState({});
  const [limit, setLimit] = React.useState({});
  const [alertMessage, setAlertMessage] = React.useState();
  const [createType, setCreateType] = React.useState("create");
  const navigate = useNavigate();

  React.useEffect(async () => {
    if (pageName === "ListOfWorksheet" || pageName === "WorksheetTemplate") {
      setLoading(true);
      const newAttribute = [...defaultInputs, ...autoGenerateInputs];
      const attribute = newAttribute.map((e) =>
        !["source", "number_of_questions"].includes(e.attributeName)
          ? e.attributeName
          : null
      );
      if (!limit?.limit && createType === "auto") {
        setAlertMessage("Please select limit");
        setPageName();
      } else {
        let data = {};
        attribute.forEach((item, index) => {
          if (formObject[item]) data = { ...data, [item]: formObject[item] };
        });
        const newQuestions = await getAllQuestions(data, limit);
        setQuestions(newQuestions);
        if (newQuestions.length <= 0) {
          setAlertMessage("No question found for this filter");
          setPageName();
        } else {
          setAlertMessage();
        }
      }
      setLoading(false);
    }
  }, [formObject, ["ListOfWorksheet", "WorksheetTemplate"].includes(pageName)]);

  if (loading) {
    return <Loading />;
  }

  const handleBackButton = () => {
    if (pageName === "success") {
      setPageName();
      setQuestions([]);
      setFormObject({});
      setLimit({});
      setCreateType("create");
    } else if (pageName === "AddDescriptionPage") {
      setPageName("filterData");
    } else if (pageName === "filterData") {
      setPageName("ListOfWorksheet");
    } else if (["ListOfWorksheet", "WorksheetTemplate"].includes(pageName)) {
      setPageName("");
    } else {
      navigate(-1);
    }
  };

  console.log({ formObject });

  if (pageName === "success") {
    return (
      <SuccessPage
        handleBackButton={handleBackButton}
        formObject={formObject}
      />
    );
  }

  return (
    <Layout
      _header={{
        title:
          pageName === "ListOfWorksheet"
            ? t("Add Questions")
            : pageName === "filterData"
            ? formObject.name
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
          ? formObject.name
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
      {["ListOfWorksheet", "filterData"].includes(pageName) && !alertMessage ? (
        <ListOfWorksheet
          {...{
            questions,
            setQuestions,
            pageName,
            setPageName,
            formObject,
            setFormObject,
          }}
        />
      ) : pageName === "WorksheetTemplate" && !alertMessage ? (
        questions.length > 0 ? (
          <WorksheetTemplate
            onPress={(e) => {
              setFormObject({ ...formObject, state: "Publish" });
              setPageName("AddDescriptionPage");
            }}
          />
        ) : (
          ""
        )
      ) : pageName === "AddDescriptionPage" && !alertMessage ? (
        <AddDescriptionPage
          {...{
            formObject,
            setFormObject,
            questions,
            setQuestions,
            setPageName,
          }}
        />
      ) : (
        <FormPage
          {...{
            createType,
            setCreateType,
            formObject,
            setFormObject,
            setPageName,
            alertMessage,
            setAlertMessage,
            setLimit,
          }}
        />
      )}
    </Layout>
  );
}
