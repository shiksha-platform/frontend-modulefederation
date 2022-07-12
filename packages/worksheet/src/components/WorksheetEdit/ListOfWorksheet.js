import {
  FilterButton,
  IconByName,
  Layout,
  questionRegistryService,
  overrideColorTheme,
  Subtitle,
} from "@shiksha/common-lib";
import QuestionBox from "components/QuestionBox";
import {
  HStack,
  Button,
  Text,
  Box,
  Pressable,
  VStack,
  ScrollView,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { defaultInputs } from "config/worksheetConfig";
import manifestLocal from "../../manifest.json";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const newDefaultInputs = defaultInputs.map((e) => {
  return {
    ...e,
    ["attributeName"]: ["gradeLevel"].includes(e.attributeName)
      ? "grade"
      : e.attributeName,
    ["type"]: "sting",
  };
});

export default function ListOfWorksheet({
  setQuestions,
  selectData,
  setSelectData,
  setQuestionObject,
  setPageName,
  worksheet,
  footerLinks,
}) {
  const { t } = useTranslation();
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [showQuestions, setShowQuestions] = React.useState([]);
  const [isAnswerFilter, setIsAnswerFilter] = React.useState(false);
  const [formObject, setFormObject] = React.useState(worksheet);

  React.useEffect(async () => {
    let data = { adapter: manifest["question-bank.questionResource"] };
    const attribute = defaultInputs
      .map((e) =>
        !["source"].includes(e.attributeName) ? e.attributeName : null
      )
      .filter((e) => e);
    attribute.forEach((item, index) => {
      if (formObject[item]) {
        data = {
          ...data,
          [item]: Array.isArray(formObject[item])
            ? formObject[item]
            : [formObject[item]],
        };
      } else if (item === "gradeLevel") {
        data = {
          ...data,
          ["gradeLevel"]: Array.isArray(formObject["grade"])
            ? formObject["grade"]
            : [formObject["grade"]],
        };
      }
    });
    const newQuestions = await questionRegistryService.getAllQuestions(data, {
      limit: 20,
    });
    setShowQuestions(newQuestions);
  }, [formObject]);

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
    setPageName("UpdateDescriptionPage");
    setFormObject({ ...formObject, state: "Draft" });
  };

  const handelPublish = () => {
    setQuestions(selectData);
    setPageName("UpdateDescriptionPage");
    setFormObject({ ...formObject, state: "Publish" });
  };

  const handelAddQuestion = () => {
    setPageName("QuestionAdded");
    setShowQuestions(selectData);
    setQuestions(selectData);
  };

  return (
    <Layout
      _header={{
        title: t("Add Questions"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
      }}
      _appBar={{ languages: manifestLocal.languages }}
      subHeader={formObject.name}
      _subHeader={{
        bg: colors.worksheetCardBg,
        _text: {
          fontSize: "16px",
          fontWeight: "600",
          textTransform: "inherit",
        },
      }}
      _footer={footerLinks}
    >
      {!isSuccess ? (
        <Box>
          <FilterButton
            getObject={setFormObject}
            object={formObject}
            _actionSheet={{ bg: colors.worksheetCardBg }}
            _box={{ pt: 5, px: 5 }}
            _button={{ bg: "button.50", px: "15px", py: "2" }}
            _filterButton={{
              rightIcon: "",
              bg: colors.white,
            }}
            resetButtonText={t("COLLAPSE")}
            filters={newDefaultInputs}
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
        <></>
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
            <Pressable onPress={(e) => setIsAnswerFilter(!isAnswerFilter)}>
              <HStack alignItems="center" space="1" pt="1" py="4">
                <IconByName
                  isDisabled
                  color={isAnswerFilter ? colors.primary : colors.lightGray2}
                  name={
                    isAnswerFilter
                      ? "CheckboxLineIcon"
                      : "CheckboxBlankLineIcon"
                  }
                />
                <Subtitle>Include answer key in worksheet</Subtitle>
              </HStack>
            </Pressable>
            <Button.Group>
              <Button
                colorScheme="button"
                px="5"
                flex="1"
                variant="outline"
                onPress={(e) => setPageName()}
              >
                {t("Cancel")}
              </Button>
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                px="5"
                flex="1"
                onPress={handelAddQuestion}
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
      </Box>
    </Layout>
  );
}
