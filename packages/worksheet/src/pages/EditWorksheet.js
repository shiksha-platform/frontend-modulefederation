import {
  IconByName,
  Layout,
  Loading,
  useWindowSize,
} from "@shiksha/common-lib";
import {
  Actionsheet,
  Avatar,
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import { getAllQuestions } from "services";
import QuestionBox from "components/QuestionBox";

const styles = {
  addQuestionsBox: {
    bg: "white",
    p: "5",
    position: "sticky",
    bottom: "0",
    styles: {
      boxShadow:
        "0px -4px 25px rgba(0, 0, 0, 0.05), inset 0px 1px 0px #F2F2F2;",
    },
  },
};

export default function EditWorksheet({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [pageName, setPageName] = React.useState();
  const [questions, setQuestions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(async () => {
    const questions = await getAllQuestions({ qType: "MCQ" }, { limit: 10 });
    setQuestions(questions);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }

  console.log(pageName);

  return (
    <Layout
      _header={{
        title: t("Quick Algebra"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
        iconComponent: (
          <Button
            _text={{ color: "white" }}
            px="15px"
            py="10px"
            fontSize="12px"
            fontWeight="600"
            onPress={(e) => setPageName("success")}
          >
            {t("SAVE")}
          </Button>
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
            onPress={(e) => console.log(true)}
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
      {pageName === "AddDescriptionPage" ? (
        <AddDescriptionPage {...{ questions, setQuestions, setPageName }} />
      ) : (
        <ListOfWorksheet {...{ questions, pageName, setPageName }} />
      )}
    </Layout>
  );
}

const ListOfWorksheet = ({ questions, pageName, setPageName }) => {
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const [selectData, setSelectData] = React.useState(questions);
  const [isDataFilter, setIsDataFilter] = React.useState(false);
  const [showModule, setShowModule] = React.useState(false);

  return (
    <Box>
      {selectData.length < questions.length ||
      ["success", "descriptionUpdated"].includes(pageName) ? (
        <Box
          bg={pageName === "success" ? "successAlert.500" : "warningAlert.500"}
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
                : `(${questions.length - selectData.length}) Questions Removed`}
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
        <VStack space="5">
          {questions.map((question, index) => (
            <QuestionBox
              _box={{ py: "12px", px: "16px" }}
              key={index}
              questionObject={question}
              {...(isDataFilter ? {} : { selectData, setSelectData })}
            />
          ))}
        </VStack>
      </Box>
      <Box {...styles.addQuestionsBox}>
        <VStack space="5">
          <Text fontWeight="400" fontSize="10px">
            <Text fontWeight="700">Note:</Text> You can add new questions to the
            worksheet.
          </Text>
          <Button.Group>
            <Button
              flex="1"
              colorScheme="button"
              _text={{ color: "white" }}
              px="5"
              onPress={(e) => setShowModule(true)}
            >
              {t("Add Questions")}
            </Button>
          </Button.Group>
        </VStack>
      </Box>

      <Actionsheet isOpen={showModule} onClose={() => setShowModule(false)}>
        <Actionsheet.Content alignItems={"left"}>
          <Stack p={5} pt={0} pb="4" textAlign="center">
            <Text fontSize="12px" fontWeight={"500"} color="gray.300">
              {t("Chapter 01")}
            </Text>
            <Text fontSize="16px" fontWeight={"600"}>
              {t("Learning Made Easy")}
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
              He is an entrepreneur, educator, and investor who believes that
              each of us has the power to makes.
            </Text>
            <HStack space="50px" alignItems="center" justifyContent={"center"}>
              <VStack space="4">
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="AccountBoxFillIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="500" fontSize="14px">
                    {"Grade: VI"}
                  </Text>
                </HStack>

                <HStack space="1" alignItems="center">
                  <IconByName
                    name="ArticleLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="500" fontSize="14px">
                    {"Chapter: 01"}
                  </Text>
                </HStack>

                <HStack space="1" alignItems="center">
                  <IconByName
                    name="QuestionLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="500" fontSize="14px">
                    {"Questions: 30"}
                  </Text>
                </HStack>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="SurveyLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="500" fontSize="14px">
                    {"Skills: Reasoning"}
                  </Text>
                </HStack>
              </VStack>
              <VStack space="4">
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="SurveyLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="500" fontSize="14px">
                    {"Subject: Math"}
                  </Text>
                </HStack>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="FileInfoLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="500" fontSize="14px">
                    {"Topics: Algebra"}
                  </Text>
                </HStack>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="BarChart2LineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="500" fontSize="14px">
                    {"Level: Intermediate"}
                  </Text>
                </HStack>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="LightbulbFlashLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="500" fontSize="14px">
                    {"Outcome: Improve IQ"}
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
                    <Avatar
                      size="xs"
                      bg="green.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    >
                      AJ
                    </Avatar>
                    <Avatar
                      size="xs"
                      bg="cyan.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                      }}
                    >
                      TE
                    </Avatar>
                    <Avatar
                      size="xs"
                      bg="indigo.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    >
                      JB
                    </Avatar>
                    <Avatar
                      size="xs"
                      bg="amber.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                      }}
                    >
                      TS
                    </Avatar>
                    <Avatar
                      size="xs"
                      bg="green.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                      }}
                    >
                      AJ
                    </Avatar>
                    <Avatar
                      size="xs"
                      bg="cyan.500"
                      source={{
                        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
                      }}
                    >
                      TE
                    </Avatar>
                  </Avatar.Group>
                  <Text fontWeight="600" fontSize="10px" color="button.500">
                    {"6 comments"}
                  </Text>
                </HStack>
              </Pressable>
            </HStack>
            <Button
              variant="outline"
              onPress={(e) => setPageName("AddDescriptionPage")}
            >
              Edit Description
            </Button>
          </VStack>
        </Box>
      </Actionsheet>
    </Box>
  );
};

const AddDescriptionPage = ({ setPageName }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({});
  const formInput = [
    {
      name: "title",
      placeholder: "Enter Title",
      label: "Title",
      defaultValue: "Maps of the World",
    },
    {
      name: "description",
      placeholder: "Enter Description",
      label: "Description",
      defaultValue: "Nightmare for kids. They’ll beg before you.",
    },
    {
      name: "difficulty_level",
      placeholder: "Enter Difficulty level",
      label: "Difficulty level",
      defaultValue: "Expert",
    },
    {
      name: "topics",
      placeholder: "Enter Topics",
      label: "Topics",
      defaultValue: "Surprise Text",
    },
    {
      name: "subject",
      placeholder: "Enter Subject",
      label: "Subject",
      defaultValue: "Physics",
    },
    {
      name: "level",
      placeholder: "Enter Level",
      label: "Level",
      defaultValue: "Advance",
    },
    {
      name: "skills",
      placeholder: "Enter Skills",
      label: "Skills",
      defaultValue: "Thought Process",
    },
  ];
  return (
    <Box>
      {formInput.map((item, index) => {
        return (
          <Box key={index + item.name} p="5" bg="white">
            <FormControl>
              <FormControl.Label>
                <Text fontSize={"14px"} fontWeight="500">
                  {item.label}
                </Text>
              </FormControl.Label>
              <Input variant="filled" p={2} {...item} key={index + item.name} />
            </FormControl>
          </Box>
        );
      })}

      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        <Button
          colorScheme="button"
          _text={{ color: "white" }}
          px="5"
          flex="1"
          onPress={(e) => setPageName("descriptionUpdated")}
        >
          {t("Save and Publish")}
        </Button>
      </Box>
    </Box>
  );
};
