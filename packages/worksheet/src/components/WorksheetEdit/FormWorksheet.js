import { IconByName, Layout, useWindowSize } from "@shiksha/common-lib";
import QuestionBox from "components/QuestionBox";
import {
  Actionsheet,
  Avatar,
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import manifest from "../../manifest.json";

const styles = {
  addQuestionsBox: {
    bg: "white",
    p: "5",
    position: "sticky",
    bottom: "85",
    styles: {
      boxShadow:
        "0px -4px 25px rgba(0, 0, 0, 0.05), inset 0px 1px 0px #F2F2F2;",
    },
  },
};

const students = [
  {
    name: "AJ",
    size: "xs",
    bg: "green.500",
    source: {
      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  },
  {
    name: "TE",
    size: "xs",
    bg: "cyan.500",
    source: {
      uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
  },
  {
    name: "JB",
    size: "xs",
    bg: "indigo.500",
    source: {
      uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  },
  {
    name: "TS",
    size: "xs",
    bg: "amber.500",
    source: {
      uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
  },
  {
    name: "AJ",
    size: "xs",
    bg: "green.500",
    source: {
      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  },
  {
    name: "TS",
    size: "xs",
    bg: "amber.500",
    source: {
      uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
  },
];

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
  appName,
}) => {
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const [isDataFilter, setIsDataFilter] = React.useState(false);
  const [showModule, setShowModule] = React.useState(false);
  const [showQuestions, setShowQuestions] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleEditDescription = () => {
    setFormObject({
      ...formObject,
      questions: selectData.map((e) => e.questionId),
    });
    setPageName("AddDescriptionPage");
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

  React.useEffect(() => {
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
              _text={{ color: "white" }}
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
          <Text fontSize="16px" fontWeight={"600"}>
            {t("Edit your draft worksheet")}
          </Text>
          <IconByName
            name="InformationLineIcon"
            onPress={(e) => setShowModule(true)}
          />
        </HStack>
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
      <Box>
        {selectData.length < showQuestions.length ||
        ["success", "descriptionUpdated", "QuestionAdded"].includes(
          pageName
        ) ? (
          <Box
            bg={
              pageName === "success" ? "successAlert.500" : "warningAlert.500"
            }
            p="5"
          >
            <HStack justifyContent="space-between">
              <Text
                fontSize="14px"
                fontWeight="500"
                color={
                  pageName === "success"
                    ? "successAlertText"
                    : "warningAlertText.500"
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
              </Text>
              <IconByName
                name="CloseCircleLineIcon"
                color={
                  pageName === "success"
                    ? "successAlertText"
                    : "warningAlertText.500"
                }
                p="0"
                onPress={(e) => setIsDataFilter(false)}
              />
            </HStack>
          </Box>
        ) : (
          ""
        )}
        <Box bg="white" p="5">
          <ScrollView maxH={Height}>
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
                          color="button.500"
                          onPress={(e) => setQuestionObject(question)}
                        />
                        {!isSuccess ? (
                          <IconByName
                            p="1"
                            color={isExist ? "button.500" : "gray.300"}
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
          </ScrollView>
        </Box>
        <Box {...styles.addQuestionsBox}>
          <VStack space="5">
            <Text fontWeight="400" fontSize="10px">
              <Text fontWeight="700">Note:</Text> You can add new questions to
              the worksheet.
            </Text>
            <Button.Group>
              <Button
                flex="1"
                colorScheme="button"
                _text={{ color: "white" }}
                px="5"
                onPress={handleAddQuestions}
              >
                {t("Add Questions")}
              </Button>
            </Button.Group>
          </VStack>
        </Box>

        <Actionsheet isOpen={showModule} onClose={() => setShowModule(false)}>
          <Actionsheet.Content alignItems={"left"}>
            <Stack p={5} pt={0} pb="4" textAlign="center">
              <Text fontSize="16px" fontWeight={"600"}>
                {formObject?.name}
              </Text>
            </Stack>
            <IconByName
              color="gray.300"
              position="absolute"
              top="10px"
              right="10px"
              name="CloseCircleLineIcon"
              onPress={(e) => setShowModule(false)}
            />
          </Actionsheet.Content>
          <Box bg="white" width={"100%"} p="5">
            <VStack space="30px">
              <Text
                fontSize="14px"
                fontWeight={"400"}
                color="gray.400"
                textAlign="center"
              >
                {formObject?.description}
              </Text>
              <HStack space="2">
                <VStack>
                  <HStack space="1" alignItems="center">
                    <IconByName
                      name="SurveyLineIcon"
                      _icon={{ size: 12 }}
                      color="worksheetBoxText.400"
                      p="0"
                    />
                    <Text
                      fontWeight="400"
                      fontSize="12px"
                      color="worksheetBoxText.400"
                    >
                      {"Subject: " + formObject?.subject}
                    </Text>
                  </HStack>
                  <HStack space="1" alignItems="center">
                    <IconByName
                      name="BarChart2LineIcon"
                      _icon={{ size: 12 }}
                      color="worksheetBoxText.400"
                      p="0"
                    />
                    <Text
                      fontWeight="400"
                      fontSize="12px"
                      color="worksheetBoxText.400"
                    >
                      {"Level: " + formObject?.level}
                    </Text>
                  </HStack>
                  <HStack space="1" alignItems="center">
                    <IconByName
                      name="QuestionLineIcon"
                      _icon={{ size: 12 }}
                      color="worksheetBoxText.400"
                      p="0"
                    />
                    <Text
                      fontWeight="400"
                      fontSize="12px"
                      color="worksheetBoxText.400"
                    >
                      {"Questions: " +
                        (Array.isArray(formObject?.questions)
                          ? formObject?.questions.length
                          : formObject?.questions)}
                    </Text>
                  </HStack>
                </VStack>
                <VStack>
                  <HStack space="1" alignItems="center">
                    <IconByName
                      name="AccountBoxFillIcon"
                      _icon={{ size: 12 }}
                      color="worksheetBoxText.400"
                      p="0"
                    />
                    <Text
                      fontWeight="400"
                      fontSize="12px"
                      color="worksheetBoxText.400"
                    >
                      {"Grade: " + formObject?.grade}
                    </Text>
                  </HStack>
                  <HStack space="1" alignItems="center">
                    <IconByName
                      name="ArticleLineIcon"
                      _icon={{ size: 12 }}
                      color="worksheetBoxText.400"
                      p="0"
                    />
                    <Text
                      fontWeight="400"
                      fontSize="12px"
                      color="worksheetBoxText.400"
                    >
                      {t("TOPIC") + ": " + formObject?.topic}
                    </Text>
                  </HStack>
                  <HStack space="1" alignItems="center">
                    <IconByName
                      name="Download2LineIcon"
                      _icon={{ size: 12 }}
                      color="worksheetBoxText.400"
                      p="0"
                    />
                    <Text
                      fontWeight="400"
                      fontSize="12px"
                      color="worksheetBoxText.400"
                    >
                      {"Downloads: " + formObject?.downloads}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              <HStack space="5" alignItems="center" justifyContent={"center"}>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="Heart3FillIcon"
                    color="red.500"
                    _icon={{ size: 18 }}
                    isDisabled
                  />
                  <Text fontWeight="600" fontSize="12px">
                    {"10 Teachers like this"}
                  </Text>
                </HStack>
                <Pressable onPress={(e) => handleCommentModuleOpen()}>
                  <HStack alignItems="center">
                    <Avatar.Group
                      _avatar={{
                        size: "md",
                      }}
                    >
                      {students.map((e, index) => (
                        <Avatar key={index} {...e}>
                          {e.name}
                        </Avatar>
                      ))}
                    </Avatar.Group>
                    <Text fontWeight="600" fontSize="10px" color="button.500">
                      {"6 comments"}
                    </Text>
                  </HStack>
                </Pressable>
              </HStack>
              <Button variant="outline" onPress={handleEditDescription}>
                Edit Description
              </Button>
            </VStack>
          </Box>
        </Actionsheet>
      </Box>
    </Layout>
  );
};

export default FormWorksheet;
