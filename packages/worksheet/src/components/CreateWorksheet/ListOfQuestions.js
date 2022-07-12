import {
  FilterButton,
  IconByName,
  capture,
  telemetryFactory,
  BodyLarge,
  BodyMedium,
  Caption,
  overrideColorTheme,
  Subtitle,
} from "@shiksha/common-lib";
import QuestionBox from "components/QuestionBox";
import {
  HStack,
  Stack,
  Button,
  Text,
  Actionsheet,
  Box,
  Pressable,
  VStack,
  ScrollView,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { defaultInputs } from "../../config/worksheetConfig";
import AlertValidationModal from "../AlertValidationModal";
import InputFormActionsheet from "../Actionsheet/CreateWorksheet/InputFormActionsheet";
import QuestionActionsheet from "../Actionsheet/QuestionActionsheet";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const newDefaultInputs = defaultInputs.map((e) => {
  return {
    ...e,
    ["attributeName"]: ["gradeLevel"].includes(e.attributeName)
      ? "grade"
      : e.attributeName,
    ["type"]: ["subject", "gradeLevel"].includes(e.attributeName)
      ? "stingValueArray"
      : "array",
  };
});

export default function ListOfQuestions({
  appName,
  questions,
  setQuestions,
  manifest,
  setPageName,
  formObject,
  setFormObject,
}) {
  const { t } = useTranslation();
  const [selectData, setSelectData] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [showQuestions, setShowQuestions] = React.useState([]);
  const [showModule, setShowModule] = React.useState(false);
  const [questionObject, setQuestionObject] = React.useState({});
  const [isAnswerFilter, setIsAnswerFilter] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState();
  const [filters, setFilters] = React.useState([]);
  const [questionConfig, setQuestionConfig] = React.useState([]);

  React.useEffect(() => {
    if (!isSuccess) {
      setPageName("ListOfQuestions");
      setShowQuestions(questions);
      const data = Array.isArray(
        manifest?.["question-bank.configureQuestionGetFilter"]
      )
        ? manifest?.["question-bank.configureQuestionGetFilter"]
        : manifest?.["question-bank.configureQuestionGetFilter"]
        ? JSON.parse(manifest?.["question-bank.configureQuestionGetFilter"])
        : [];
      setFilters(
        newDefaultInputs.filter((e) => data.includes(e.attributeName))
      );
      setQuestionConfig(
        Array.isArray(manifest?.["question-bank.questionMetadata"])
          ? manifest?.["question-bank.questionMetadata"]
          : manifest?.["question-bank.questionMetadata"]
          ? JSON.parse(manifest?.["question-bank.questionMetadata"])
          : []
      );
    }
  }, [formObject]);

  const handleWorksheetSubmit = (inputData) => {
    setShowQuestions(selectData);
    setPageName("filterData");
    setIsSuccess("message");
    setFormObject({ ...formObject, name: inputData });
    setShowModule(false);
  };

  const handelAddQuestionButton = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Add-More-Questions",
    });
    capture("INTERACT", telemetryData);
    setShowQuestions(questions);
    setIsSuccess(false);
  };

  const handelToggleQuestion = (item) => {
    if (selectData.filter((e) => e.questionId === item?.questionId).length) {
      handelUnSelectQuestion(item);
    } else {
      setSelectData([...selectData, item]);
    }
  };

  const handelUnSelectQuestion = (item) => {
    setSelectData(selectData.filter((e) => e.questionId !== item.questionId));
  };

  const handelSaveAndDraft = () => {
    setQuestions(selectData);
    setPageName("AddDescriptionPage");
    setFormObject({ ...formObject, state: "Draft" });
  };

  const handelPublish = () => {
    setQuestions(selectData);
    setPageName("AddDescriptionPage");
    setFormObject({ ...formObject, state: "Publish" });
  };

  const handleAddToWorksheet = () => {
    if (selectData.length <= 0) {
      setAlertMessage(t("PLEASE_SELECT_ATLIST_ONE_QUESTION"));
    } else {
      setShowModule(true);
      const telemetryData = telemetryFactory.interact({
        appName,
        type: "Worksheet-Question-Add",
      });
      capture("INTERACT", telemetryData);
    }
  };

  const handleFilter = (obejct) => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Question-Filter",
      filterObject: obejct,
    });
    capture("INTERACT", telemetryData);
    setFormObject(obejct);
  };

  const handleAnswerKey = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Worksheet-Show-Answer",
      answerKey: !isAnswerFilter,
    });
    capture("INTERACT", telemetryData);
    setIsAnswerFilter(!isAnswerFilter);
  };

  return (
    <Stack>
      <AlertValidationModal {...{ alertMessage, setAlertMessage }} />
      {isSuccess === "message" ? (
        <Box bg={colors.alertBackground} p="5">
          <HStack justifyContent="space-between">
            <BodyLarge color={colors.green}>
              ({selectData.length}) New Questions Added
            </BodyLarge>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.green}
              p="0"
              onPress={(e) => setIsSuccess("filterData")}
            />
          </HStack>
        </Box>
      ) : (
        <></>
      )}
      {!isSuccess ? (
        <Box>
          <FilterButton
            getObject={handleFilter}
            object={formObject}
            _actionSheet={{ bg: colors.worksheetCardBg }}
            _box={{ pt: 5, px: 5 }}
            _button={{ bg: "button.50", px: "15px", py: "2" }}
            _filterButton={{
              rightIcon: "",
              bg: colors.white,
            }}
            resetButtonText={t("COLLAPSE")}
            filters={filters}
          />
          <Box bg={colors.white} px="5">
            <ScrollView horizontal={true}>
              {selectData.map((item, index) => (
                <Box key={index}>
                  <Box
                    bg={colors.viewNotificationDark}
                    w="192px"
                    h="87px"
                    m="2"
                    p="3"
                    borderWidth="1"
                    borderColor={colors.viewNotificationNormal}
                    rounded="lg"
                    overflow="hidden"
                  >
                    <div
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "3",
                        WebkitBoxOrient: "vertical",
                      }}
                      dangerouslySetInnerHTML={{ __html: item.question }}
                    />
                  </Box>
                  <IconByName
                    name="CloseCircleFillIcon"
                    position="absolute"
                    top="0"
                    right="0"
                    p="0"
                    color={colors.primary}
                    _icon={{ size: 24 }}
                    onPress={(e) => handelUnSelectQuestion(item)}
                  />
                </Box>
              ))}
            </ScrollView>
          </Box>
        </Box>
      ) : (
        <Button
          flex="1"
          variant="ghost"
          leftIcon={<IconByName name="AddFillIcon" isDisabled />}
          bg={colors.white}
          onPress={handelAddQuestionButton}
        >
          {t("Add more questions")}
        </Button>
      )}

      <Box bg={colors.white} p="5">
        <VStack space="5">
          {showQuestions.map((item, index) => {
            const isExist = selectData.filter(
              (e) => e.questionId === item?.questionId
            ).length;
            return (
              <QuestionBox
                isAnswerHide={!isAnswerFilter}
                _box={{ py: "12px", px: "16px" }}
                key={index}
                questionObject={item}
                infoIcon={
                  <HStack space={1} alignItems="center">
                    <IconByName
                      name="InformationFillIcon"
                      p="1"
                      color={colors.primary}
                      onPress={(e) => setQuestionObject(item)}
                    />
                    {!isSuccess ? (
                      <IconByName
                        p="1"
                        color={isExist ? colors.primary : colors.lightGray2}
                        name={
                          isExist ? "CheckboxLineIcon" : "CheckboxBlankLineIcon"
                        }
                        onPress={(e) => handelToggleQuestion(item)}
                      />
                    ) : (
                      ""
                    )}
                  </HStack>
                }
              />
            );
          })}
        </VStack>
      </Box>
      <Box bg={colors.white} p="5" position="sticky" bottom="84" shadow={2}>
        {!isSuccess ? (
          <>
            <Caption py="4" pb="1">
              <Caption fontWeight="700">Attention:</Caption>
              You have selected {selectData.length} questions to add to the
              worksheet.
            </Caption>
            {questionConfig.includes("correct-answer") ? (
              <Pressable onPress={handleAnswerKey}>
                <HStack alignItems="center" space="1" pt="1" py="4">
                  <IconByName
                    isDisabled
                    color={isAnswerFilter ? "button.500" : "gray.300"}
                    name={
                      isAnswerFilter
                        ? "CheckboxLineIcon"
                        : "CheckboxBlankLineIcon"
                    }
                  />
                  <Subtitle>{t("INCLUDE_ANSWER_KEY")}</Subtitle>
                </HStack>
              </Pressable>
            ) : (
              <React.Fragment />
            )}
            <Button.Group>
              <Button
                colorScheme="button"
                px="5"
                flex="1"
                variant="outline"
                onPress={(e) => setPageName("FormPage")}
              >
                {t("CANCEL")}
              </Button>
              <Button
                colorScheme="button"
                _text={{ color: colors.white }}
                px="5"
                flex="1"
                onPress={handleAddToWorksheet}
              >
                {t("ADD_TO_WORKSHEET")}
              </Button>
            </Button.Group>
          </>
        ) : (
          <Button.Group>
            <Button
              colorScheme="button"
              px="5"
              flex="1"
              variant="outline"
              onPress={handelSaveAndDraft}
            >
              {t("Save As Draft")}
            </Button>
            <Button
              colorScheme="button"
              _text={{ color: colors.white }}
              px="5"
              flex="1"
              onPress={handelPublish}
            >
              {t("Publish")}
            </Button>
          </Button.Group>
        )}
        <QuestionActionsheet
          {...{
            questionObject,
            setQuestionObject,
            metadataConfig: questionConfig,
          }}
        />
        <InputFormActionsheet
          {...{
            showModule,
            setShowModule,
            handleWorksheetSubmit,
          }}
        />
      </Box>
    </Stack>
  );
}
