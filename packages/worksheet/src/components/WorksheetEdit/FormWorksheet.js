import {
  BodyLarge,
  Caption,
  H2,
  IconByName,
  Layout,
} from "@shiksha/common-lib";
import QuestionBox from "components/QuestionBox";
import { Box, Button, HStack, Text, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import manifest from "../../manifest.json";
import WorksheetActionsheet from "../Actionsheet/WorksheetActionsheet";

const styles = {
  addQuestionsBox: {
    bg: "worksheet.white",
    p: "5",
    position: "sticky",
    bottom: "85",
    styles: {
      boxShadow:
        "0px -4px 25px rgba(0, 0, 0, 0.05), inset 0px 1px 0px #F2F2F2;",
    },
  },
};

const FormWorksheet = ({
  questions,
  selectData,
  setSelectData,
  handleSubmit,
  pageName,
  setPageName,
  formObject,
  setFormObject,
  setQuestionObject,
  footerLinks,
  worksheetConfig,
  appName,
}) => {
  const { t } = useTranslation();
  const [isDataFilter, setIsDataFilter] = React.useState(false);
  const [showModuleWorksheet, setShowModuleWorksheet] = React.useState(false);
  const [showQuestions, setShowQuestions] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleEditDescription = () => {
    setFormObject({
      ...formObject,
      questions: selectData.map((e) => e.questionId),
    });
    setPageName("UpdateDescriptionPage");
  };

  const handleAddQuestions = () => {
    setPageName("ListOfWorksheet");
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

  React.useEffect(async () => {
    setShowQuestions(questions);
  }, [formObject, questions]);

  return (
    <Layout
      _header={{
        title: formObject.name,
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
        iconComponent:
          pageName !== "success" ? (
            <Button
              _text={{ color: "worksheet.white" }}
              px="15px"
              py="10px"
              fontSize="12px"
              fontWeight="600"
              onPress={handleSubmit}
            >
              {t("SAVE")}
            </Button>
          ) : (
            <></>
          ),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <HStack alignItems="center" justifyContent="space-between">
          <H2>{t("Edit your draft worksheet")}</H2>
          <IconByName
            name="InformationLineIcon"
            onPress={(e) => setShowModuleWorksheet(true)}
          />
        </HStack>
      }
      _subHeader={{
        bg: "worksheet.cardBg",
        _text: {
          fontSize: "16px",
          fontWeight: "600",
          textTransform: "inherit",
        },
      }}
      _footer={footerLinks}
    >
      <Box>
        {selectData.length < showQuestions.length ||
        ["success", "descriptionUpdated", "QuestionAdded"].includes(
          pageName
        ) ? (
          <Box
            bg={
              pageName === "success"
                ? "worksheet.successAlert"
                : "worksheet.warningAlert"
            }
            p="5"
          >
            <HStack justifyContent="space-between">
              <BodyLarge
                color={
                  pageName === "success"
                    ? "worksheet.success"
                    : "worksheet.darkGray4"
                }
              >
                {pageName === "success"
                  ? "Changes Saved"
                  : pageName === "descriptionUpdated"
                  ? "Description Updated"
                  : pageName === "QuestionAdded"
                  ? `Total number of questions ${selectData.length}`
                  : `(${
                      showQuestions.length - selectData.length
                    }) Questions Removed`}
              </BodyLarge>
              <IconByName
                name="CloseCircleLineIcon"
                color={
                  pageName === "success"
                    ? "worksheet.success"
                    : "worksheet.darkGray4"
                }
                p="0"
                onPress={(e) => setIsDataFilter(false)}
              />
            </HStack>
          </Box>
        ) : (
          ""
        )}
        <Box bg={"worksheet.white"} p="5">
          <VStack space="5">
            {showQuestions.map((question, index) => {
              const isExist = selectData.filter(
                (e) => e.questionId === question?.questionId
              ).length;
              return (
                <QuestionBox
                  infoIcon={
                    <HStack space={1} alignItems="center">
                      <IconByName
                        name="InformationFillIcon"
                        p="1"
                        color={"worksheet.primary"}
                        onPress={(e) => setQuestionObject(question)}
                      />
                      {!isSuccess ? (
                        <IconByName
                          p="1"
                          color={
                            isExist ? "worksheet.primary" : worksheet.lightGray2
                          }
                          name={
                            isExist
                              ? "CheckboxLineIcon"
                              : "CheckboxBlankLineIcon"
                          }
                          onPress={(e) => handelToggleQuestion(question)}
                        />
                      ) : (
                        ""
                      )}
                    </HStack>
                  }
                  _box={{ py: "12px", px: "16px" }}
                  key={index}
                  questionObject={question}
                  {...(isDataFilter ? {} : { selectData, setSelectData })}
                />
              );
            })}
          </VStack>
        </Box>
        <Box {...styles.addQuestionsBox}>
          <VStack space="5">
            <Caption>
              <Text fontWeight="700">Note:</Text> You can add new questions to
              the worksheet.
            </Caption>
            <Button.Group>
              <Button
                flex="1"
                colorScheme="button"
                _text={{ color: "worksheet.white" }}
                px="5"
                onPress={handleAddQuestions}
              >
                {t("Add Questions")}
              </Button>
            </Button.Group>
          </VStack>
        </Box>
      </Box>
      <WorksheetActionsheet
        {...{
          worksheetConfig,
          worksheet: formObject,
          showModuleWorksheet,
          setShowModuleWorksheet,
          footer: (
            <Button variant="outline" onPress={handleEditDescription}>
              Edit Description
            </Button>
          ),
        }}
      />
    </Layout>
  );
};

export default FormWorksheet;
