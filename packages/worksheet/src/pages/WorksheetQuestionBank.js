import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import jwt_decode from "jwt-decode";
import {
  capture,
  telemetryFactory,
  Layout,
  IconByName,
  worksheetRegistryService,
  questionRegistryService,
  Loading,
  likeRegistryService,
  getApiConfig,
  overrideColorTheme,
} from "@shiksha/common-lib";
import QuestionBox from "components/QuestionBox";
import { Button, Box, HStack, VStack } from "native-base";
import manifestLocal from "../manifest.json";
import { useNavigate, useParams } from "react-router-dom";
import CommentActionsheet from "components/Actionsheet/CommentActionsheet";
import QuestionActionsheet from "components/Actionsheet/QuestionActionsheet";
import WorksheetActionsheet from "components/Actionsheet/WorksheetActionsheet";
import moment from "moment";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);
const DRAFT = "Draft";

export default function WorksheetQuestionBank({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [questions, setQuestions] = React.useState([]);
  const [worksheet, setWorksheet] = React.useState({});
  const [showModuleWorksheet, setShowModuleWorksheet] = useState(false);
  const [showModuleComments, setShowModuleComments] = useState(false);
  const [like, setLike] = useState({});
  const [likes, setLikes] = useState([]);
  const [state, setState] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [questionObject, setQuestionObject] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const { sub } = jwt_decode(localStorage.getItem("token"));
  const [comments, setCommets] = React.useState([]);
  const [worksheetStartTime, setWorksheetStartTime] = useState();
  const [questionConfig, setQuestionConfig] = React.useState([]);
  const [worksheetConfig, setWorksheetConfig] = React.useState([]);
  const [showButtonArray, setShowButtonArray] = React.useState([]);

  React.useEffect(async () => {
    const newManifest = await getApiConfig(["worksheet"]);
    setQuestionConfig(
      Array.isArray(newManifest?.["question-bank.questionMetadata"])
        ? newManifest?.["question-bank.questionMetadata"]
        : newManifest?.["question-bank.questionMetadata"]
        ? JSON.parse(newManifest?.["question-bank.questionMetadata"])
        : []
    );
    setWorksheetConfig(
      Array.isArray(newManifest?.["worksheet.worksheetMetadata"])
        ? newManifest?.["worksheet.worksheetMetadata"]
        : newManifest?.["worksheet.worksheetMetadata"]
        ? JSON.parse(newManifest?.["worksheet.worksheetMetadata"])
        : []
    );
    let buttons = [];
    if (newManifest["worksheet.allow-download-worksheet"] === "true") {
      buttons = [...buttons, "Download"];
    }
    if (newManifest["worksheet.allow-sharing-worksheet"] === "true") {
      buttons = [...buttons, "Share"];
    }
    if (worksheet.state === DRAFT) {
      setShowButtonArray(["Like"]);
    } else {
      setShowButtonArray([...buttons, "Like"]);
    }
    const worksheetData = await worksheetRegistryService.getOne({ id });
    const questionIds =
      worksheetData && Array.isArray(worksheetData.questions)
        ? worksheetData.questions
        : [];
    const newQuestions = await questionRegistryService.getQuestionByIds(
      questionIds
    );
    setWorksheet(worksheetData);
    setState(worksheetData?.state && worksheetData.state === "Publish");
    setQuestions(newQuestions);
    getLikes();
    const data = await worksheetRegistryService.getWorksheetComments(id, {
      status: { eq: "Publish" },
    });
    setCommets(data);
    setLoading(false);
  }, []);

  const handleCommentModuleClose = () => {
    setShowModuleComments(false);
    setShowModuleWorksheet(true);
  };

  const handleCommentModuleOpen = () => {
    setShowModuleComments(true);
    setShowModuleWorksheet(false);
  };

  const getLikes = async () => {
    const result = await worksheetRegistryService.getWorksheetLikes(id);
    const newData = result.find((e, index) => e.userId === sub);
    setLike(newData ? newData : {});
    setLikes(result);
  };

  const handleLike = async () => {
    if (like.id) {
      const result = await likeRegistryService.distory({
        id: like.id,
      });
      setLike({});
    } else {
      let newData = {
        contextId: id,
        context: "Worksheet",
        type: "like",
      };
      const { osid } = await likeRegistryService.create(newData);
      setLike({ ...newData, id: osid });
    }
  };
  const handleShare = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Share",
      worksheetId: worksheet?.id,
      subject: worksheet?.subject,
      grade: worksheet?.grade,
      topic: worksheet?.topic,
    });
    capture("INTERACT", telemetryData);
    navigate(`/worksheet/${worksheet.id}/share`);
  };

  React.useEffect(() => {
    const telemetryData = telemetryFactory.start({
      appName,
      type: "Worksheet-View-Start",
      worksheetId: worksheet?.id,
      subject: worksheet?.subject,
      grade: worksheet?.grade,
      topic: worksheet?.topic,
    });
    capture("START", telemetryData);
    setWorksheetStartTime(moment());
  }, []);

  const handleBackButton = () => {
    const telemetryData = telemetryFactory.end({
      appName,
      type: "Worksheet-View-End",
      worksheetId: worksheet?.id,
      subject: worksheet?.subject,
      grade: worksheet?.grade,
      topic: worksheet?.topic,
      duration: worksheetStartTime
        ? moment().diff(worksheetStartTime, "seconds")
        : 0,
    });
    capture("END", telemetryData);
    navigate(-1);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout
      _header={{
        title: worksheet?.name,
        iconComponent: (
          <HStack>
            <IconByName
              name="InformationLineIcon"
              onPress={(e) => setShowModuleWorksheet(true)}
            />
            {!state ? (
              <IconByName
                name="EditBoxLineIcon"
                onPress={(e) => navigate(`/worksheet/${worksheet?.id}/edit`)}
              />
            ) : (
              <React.Fragment />
            )}
          </HStack>
        ),
      }}
      bg={colors.white}
      _appBar={{
        onPressBackButton: handleBackButton,
        languages: manifestLocal.languages,
        rightIcon: state ? (
          <HStack>
            {!showButtonArray || showButtonArray.includes("Like") ? (
              <IconByName
                name={like.id ? "Heart3FillIcon" : "Heart3LineIcon"}
                color={like.id ? colors.primary : colors.black}
                onPress={handleLike}
              />
            ) : (
              <React.Fragment />
            )}
            {!showButtonArray || showButtonArray.includes("Share") ? (
              <IconByName name="ShareLineIcon" onPress={handleShare} />
            ) : (
              <React.Fragment />
            )}
            {!showButtonArray || showButtonArray.includes("Download") ? (
              <IconByName
                onPress={(e) => navigate("/worksheet/template/" + id)}
                name="DownloadLineIcon"
              />
            ) : (
              <React.Fragment />
            )}
          </HStack>
        ) : (
          <React.Fragment />
        ),
      }}
      _footer={footerLinks}
    >
      <Box bg={colors.white} p="5">
        <VStack space="5">
          {questions && questions.length > 0 ? (
            questions.map((question, index) => (
              <QuestionBox
                _box={{ py: "12px", px: "16px" }}
                key={index}
                questionObject={question}
                infoIcon={
                  <HStack space={1} alignItems="center">
                    <IconByName
                      name="InformationFillIcon"
                      p="1"
                      color={colors.primary}
                      onPress={(e) => setQuestionObject(question)}
                    />
                  </HStack>
                }
              />
            ))
          ) : (
            <Box
              p="10"
              my="5"
              alignItems={"center"}
              rounded="lg"
              bg={colors.viewNotificationDark}
            >
              Question Not Found
            </Box>
          )}
        </VStack>
      </Box>
      {!state ? (
        <Box bg={colors.white} p="5" position="sticky" bottom="84" shadow={2}>
          <Button.Group>
            <Button
              flex="1"
              colorScheme="button"
              _text={{ color: colors.white }}
              px="5"
              onPress={(e) => console.log(e)}
            >
              {t("Publish")}
            </Button>
          </Button.Group>
        </Box>
      ) : (
        <React.Fragment />
      )}
      <CommentActionsheet
        {...{
          worksheet,
          setShowModuleComments: handleCommentModuleClose,
          showModuleComments,
          comments,
          setCommets,
        }}
      />
      <QuestionActionsheet
        {...{
          questionObject,
          setQuestionObject,
          metadataConfig: questionConfig,
        }}
      />
      <WorksheetActionsheet
        {...{
          worksheetConfig,
          worksheet,
          showModuleWorksheet,
          setShowModuleWorksheet,
          handleCommentModuleOpen,
          commentCount: comments?.length,
          likeCount: likes?.length,
        }}
      />
    </Layout>
  );
}
