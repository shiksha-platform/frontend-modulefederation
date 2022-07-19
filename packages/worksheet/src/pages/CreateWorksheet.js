import {
  capture,
  telemetryFactory,
  Loading,
  Layout,
  H2,
  questionRegistryService,
  overrideColorTheme,
  getApiConfig,
} from "@shiksha/common-lib";
import React from "react";
import { useTranslation } from "react-i18next";
import manifestLocal from "../manifest.json";
import SuccessPage from "../components/CreateWorksheet/SuccessPage";
import FormPage from "../components/CreateWorksheet/Form";
import AddDescriptionPage from "../components/CreateWorksheet/AddDescriptionPage";
import WorksheetTemplate from "../components/CreateWorksheet/WorksheetTemplate";
import ListOfQuestions from "../components/CreateWorksheet/ListOfQuestions";
import { defaultInputs, autoGenerateInputs } from "../config/worksheetConfig";
import { useNavigate } from "react-router-dom";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function CreateWorksheet({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [pageName, setPageName] = React.useState();
  const [questions, setQuestions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [formObject, setFormObject] = React.useState({});
  const [limit, setLimit] = React.useState({});
  const [alertMessage, setAlertMessage] = React.useState();
  const [createType, setCreateType] = React.useState("create");
  const [worksheetStartTime, setWorksheetStartTime] = React.useState();
  const [manifest, setManifest] = React.useState();
  const [worksheetConfig, setWorksheetConfig] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Create",
    });
    capture("INTERACT", telemetryData);
  }, []);

  React.useEffect(async () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Create",
    });
    capture("INTERACT", telemetryData);

    const newManifest = await getApiConfig({ modules: { eq: "Worksheet" } });
    setWorksheetConfig(
      Array.isArray(newManifest?.["worksheet.worksheetMetadata"])
        ? newManifest?.["worksheet.worksheetMetadata"]
        : newManifest?.["worksheet.worksheetMetadata"]
        ? JSON.parse(newManifest?.["worksheet.worksheetMetadata"])
        : []
    );
    setManifest(newManifest);
  }, []);

  React.useEffect(async () => {
    if (pageName === "ListOfQuestions" || pageName === "WorksheetTemplate") {
      setLoading(true);
      const newAttribute = [...defaultInputs, ...autoGenerateInputs];
      const attribute = newAttribute.map((e) =>
        !["source", "number_of_questions"].includes(e.attributeName)
          ? e.attributeName
          : null
      );
      if (!formObject.source) {
        setAlertMessage(t("PLEASE_SELECT_SOURCE"));
        setPageName();
      } else if (!limit?.limit && createType === "auto") {
        setAlertMessage(t("PLEASE_SELECT_LIMIT"));
        setPageName();
      } else {
        let data = {
          adapter: formObject.source,
          limit: 10,
        };
        attribute.forEach((item, index) => {
          if (formObject[item]) data = { ...data, [item]: formObject[item] };
        });
        const newQuestions = await questionRegistryService.getAllQuestions(
          data
        );
        setQuestions(newQuestions);
        if (newQuestions.length <= 0) {
          setAlertMessage(
            <H2 textTransform="none">{t("QUESTION_NOT_FOUND")}</H2>
          );
          setPageName();
        } else {
          setAlertMessage();
        }
      }
      setLoading(false);
    }
  }, [formObject, ["ListOfQuestions", "WorksheetTemplate"].includes(pageName)]);

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
      setPageName("ListOfQuestions");
    } else if (["ListOfQuestions", "WorksheetTemplate"].includes(pageName)) {
      setPageName("");
    } else {
      navigate(-1);
    }
  };

  const handleWorksheetTemplateOnPress = () => {
    setFormObject({ ...formObject, state: "Publish" });
    setPageName("AddDescriptionPage");
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Template-Choose",
    });
    capture("INTERACT", telemetryData);
  };

  if (pageName === "success") {
    return (
      <SuccessPage
        appName={appName}
        handleBackButton={handleBackButton}
        formObject={formObject}
        worksheetConfig={worksheetConfig}
      />
    );
  }

  return (
    <Layout
      _header={{
        title:
          pageName === "ListOfQuestions"
            ? t("Add Questions")
            : pageName === "filterData"
            ? formObject.name
            : pageName === "AddDescriptionPage"
            ? t("Add Description")
            : t("CREATE_NEW_WORKSHEET"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
      }}
      _appBar={{
        languages: manifestLocal.languages,
        onPressBackButton: handleBackButton,
      }}
      subHeader={
        <H2 textTransform="inherit">
          {pageName === "ListOfQuestions"
            ? formObject.name
              ? t("YOUR_WORKSHEET_HAS_BEEN_CREATED")
              : t("YOU_CAN_SEE_ALL_QUESTIONS_HERE")
            : pageName === "AddDescriptionPage"
            ? t("ENTER_WORKSHEET_DETAILS")
            : t("SHOW_QUESTIONS_BASED_ON")}
        </H2>
      }
      _subHeader={{
        bg: colors.cardBg,
      }}
      _footer={footerLinks}
    >
      {["ListOfQuestions", "filterData"].includes(pageName) && !alertMessage ? (
        <ListOfQuestions
          {...{
            manifest,
            appName,
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
          <WorksheetTemplate onPress={handleWorksheetTemplateOnPress} />
        ) : (
          ""
        )
      ) : pageName === "AddDescriptionPage" && !alertMessage ? (
        <AddDescriptionPage
          {...{
            appName,
            worksheetStartTime,
            createType,
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
            manifest,
            appName,
            setWorksheetStartTime,
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
