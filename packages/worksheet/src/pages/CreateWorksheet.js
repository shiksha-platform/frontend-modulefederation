import {
  Collapsible,
  H1,
  IconByName,
  Layout,
  Loading,
  useWindowSize,
} from "@shiksha/common-lib";
import QuestionBox from "components/QuestionBox";
import WorksheetBox from "components/WorksheertBox";
import {
  HStack,
  Stack,
  Button,
  Text,
  Actionsheet,
  Box,
  Pressable,
  Checkbox,
  VStack,
  Center,
  ScrollView,
  FormControl,
  Input,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { getAllQuestions } from "services";
import manifest from "../manifest.json";

export default function CreateWorksheet({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [pageName, setPageName] = React.useState();
  const [questions, setQuestions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [formObject, setFormObject] = React.useState({});
  const [width, height] = useWindowSize();

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

  if (pageName === "success") {
    return (
      <Layout
        _appBar={{
          languages: manifest.languages,
          color: "successAlertText.500",
          _box: { bg: "successAlert.500" },
        }}
      >
        <Loading
          width={width}
          height={height - 230}
          customComponent={
            <VStack space="2" flex="1">
              <VStack bg="successAlert.500" pb="100px" pt="32px">
                <IconByName
                  alignSelf="center"
                  name="CheckboxCircleLineIcon"
                  color="successAlertText.500"
                  _icon={{ size: 100 }}
                />
                <Box alignSelf="center">
                  <H1
                    fontSize="22px"
                    fontWeight="600"
                    color="successAlertText.500"
                  >
                    Worksheet Published
                  </H1>
                </Box>
              </VStack>
              <Box p="5">
                <WorksheetBox
                  {...{
                    item: {
                      id: 1,
                      image: "",
                      heading: "Maps of the World",
                      subHeading: "NCERT Workbook",
                      class: "V",
                      likes: "4",
                      comments: "0",
                      description:
                        "Worksheets help the kids in exploring multiple concepts and ideas. They develop fine motor skills and logical thinking.",
                      subject: "Math",
                      level: "Beginner",
                      grade: "VI",
                      questions: "30",
                      chapter: "3",
                      downloads: "3",
                    },
                  }}
                />
              </Box>
            </VStack>
          }
        />
        <Box
          bg="white"
          p="5"
          position="fixed"
          width="100%"
          bottom="0"
          shadow={2}
        >
          <Button
            colorScheme="button"
            _text={{ color: "white" }}
            px="5"
            flex="1"
            onPress={(e) => {
              setPageName();
            }}
          >
            {t("Back to Worksheets")}
          </Button>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout
      _header={{
        title:
          pageName === "ListOfWorksheet"
            ? t("Add Questions")
            : pageName === "AddDescriptionPage"
            ? t("Add Description")
            : t("New Worksheet"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        pageName === "ListOfWorksheet"
          ? t("Chapter 1: The Fish Tail")
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
      {pageName === "ListOfWorksheet" ? (
        <ListOfWorksheet {...{ questions, setQuestions, setPageName }} />
      ) : pageName === "AddDescriptionPage" ? (
        <AddDescriptionPage {...{ questions, setQuestions, setPageName }} />
      ) : (
        <FormPage {...{ formObject, setFormObject, setPageName, setLoading }} />
      )}
    </Layout>
  );
}

const FormInput = ({
  data,
  formObject,
  setFormObject,
  formData,
  setFormData,
}) => {
  const { t } = useTranslation();
  return (
    data &&
    data.map((item, index) => {
      let attributeName = item.attributeName ? item.attributeName : item.name;
      return (
        <HStack
          key={index}
          bg="white"
          p="5"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontSize={"14px"} fontWeight="500">
            {t(item.name)}
          </Text>
          <Button
            {...(formObject[attributeName]
              ? { _text: { color: "white" } }
              : item?.buttonVariant
              ? { variant: item.buttonVariant }
              : { variant: "outline", _text: { color: "button.500" } })}
            rounded="full"
            colorScheme="button"
            px="5"
            rightIcon={
              <IconByName
                color={
                  formObject[attributeName]
                    ? "white"
                    : item?.buttonVariant
                    ? "button.500"
                    : "button.500"
                }
                name="ArrowDownSLineIcon"
                isDisabled
              />
            }
            onPress={(e) => setFormData(item)}
          >
            {formObject[attributeName]
              ? formObject[attributeName]
              : `Select ${t(attributeName)}`}
          </Button>
        </HStack>
      );
    })
  );
};

const FormPage = ({ formObject, setFormObject, setPageName, setLoading }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({});
  const handelAddQuestion = () => {
    setLoading(true);
    setPageName("ListOfWorksheet");
  };
  return (
    <Stack space={1} mb="2">
      <FormInput
        {...{ formObject, setFormObject, formData, setFormData }}
        data={[
          {
            name: "Subject",
            attributeName: "subject",
            data: [
              "Social Science",
              "Science",
              "Mathematics",
              "Hindi",
              "English",
              "History",
              "Geography",
            ],
          },
          {
            name: "Class",
            attributeName: "gradeLevel",
            data: [
              "Class 1",
              "Class 2",
              "Class 3",
              "Class 4",
              "Class 5",
              "Class 6",
              "Class 7",
              "Class 8",
              "Class 9",
              "Class 10",
            ],
          },
          {
            name: "Topic",
            attributeName: "topic",
            data: [
              "भोजन के घटक",
              "भोजन: यह कहाँ से आता है?",
              "तंतु से वस्त्र तक",
              "संसाधन",
              "समानता",
              "संश्लेशित रेशे  और प्लास्टिक",
              "आखेट-खाद्य संग्राहक से भोजन उत्पादन तक",
            ],
          },
        ]}
      />
      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        <Button.Group>
          <Button colorScheme="button" px="5" flex="1" variant="outline">
            {t("Auto Generate")}
          </Button>
          <Button
            colorScheme="button"
            _text={{ color: "white" }}
            px="5"
            flex="1"
            onPress={handelAddQuestion}
          >
            {t("Add Questions")}
          </Button>
        </Button.Group>
      </Box>
      <Actionsheet isOpen={formData?.name} onClose={() => setFormData({})}>
        <Actionsheet.Content alignItems={"left"} bg="classCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <Text fontSize="16px" fontWeight={"600"}>
                {t(`Select ${formData?.name}`)}
              </Text>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              onPress={(e) => setFormData({})}
            />
          </HStack>
        </Actionsheet.Content>
        <Box bg="white" width={"100%"}>
          {formData?.data &&
            formData.data.map((value, index) => {
              let attributeName = formData.attributeName
                ? formData.attributeName
                : formData.name;
              return (
                <Pressable
                  key={index}
                  p="5"
                  onPress={(e) =>
                    setFormObject({
                      ...formObject,
                      [attributeName]: [value],
                    })
                  }
                  bg={
                    formObject[attributeName]?.includes(value) ? "gray.100" : ""
                  }
                >
                  <Text colorScheme="button">{value}</Text>
                </Pressable>
              );
            })}
          <Box p="5">
            <Button
              colorScheme="button"
              _text={{ color: "white" }}
              onPress={(e) => setFormData({})}
            >
              {t("SELECT")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>
    </Stack>
  );
};

const ListOfWorksheet = ({ questions, setQuestions, setPageName }) => {
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  let fillInTheBlankQuestions = questions.filter((e) => e.qType === "SA");
  let mcqQuestions = questions.filter((e) => e.qType === "MCQ");
  let aqQuestions = questions.filter((e) => e.qType === "AQ");
  const [selectData, setSelectData] = React.useState([]);
  const [isDataFilter, setIsDataFilter] = React.useState(false);

  return (
    <Stack>
      {isDataFilter ? (
        <Box bg="successAlert.500" p="5">
          <HStack justifyContent="space-between">
            <Text fontSize="14px" fontWeight="500" color="successAlertText.500">
              ({questions.length}) New Questions Added
            </Text>
            <IconByName
              name="CloseCircleLineIcon"
              color="successAlertText.500"
              p="0"
              onPress={(e) => setIsDataFilter(false)}
            />
          </HStack>
        </Box>
      ) : (
        ""
      )}
      <Collapsible
        header="Choose correct answer(s) from the given choices"
        _header={{ py: 5 }}
      >
        <ScrollView maxH={Height}>
          <Box bg="white">
            <VStack space="5">
              {mcqQuestions.map((question, index) => (
                <QuestionBox
                  _box={{ py: "12px", px: "16px" }}
                  key={index}
                  questionObject={question}
                  {...(isDataFilter ? {} : { selectData, setSelectData })}
                />
              ))}
            </VStack>
          </Box>
        </ScrollView>
      </Collapsible>
      <Collapsible header="Fill in the blanks" _header={{ py: 5 }}>
        <ScrollView maxH={Height}>
          <Box bg="white">
            <VStack space="5">
              {fillInTheBlankQuestions.map((question, index) => (
                <QuestionBox
                  _box={{ py: "12px", px: "16px" }}
                  key={index}
                  questionObject={question}
                  {...(isDataFilter ? {} : { selectData, setSelectData })}
                />
              ))}
            </VStack>
          </Box>
        </ScrollView>
      </Collapsible>
      <Collapsible header="Answer the questions" _header={{ py: 5 }}>
        <ScrollView maxH={Height}>
          <Box bg="white">
            <VStack space="5">
              {aqQuestions.map((question, index) => (
                <QuestionBox
                  _box={{ py: "12px", px: "16px" }}
                  key={index}
                  questionObject={question}
                  {...(isDataFilter ? {} : { selectData, setSelectData })}
                />
              ))}
            </VStack>
          </Box>
        </ScrollView>
      </Collapsible>
      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        {isDataFilter ? (
          <Button.Group>
            <Button
              colorScheme="button"
              px="5"
              flex="1"
              variant="outline"
              onPress={(e) => setPageName("FormPage")}
            >
              {t("Save As Draft")}
            </Button>
            <Button
              colorScheme="button"
              _text={{ color: "white" }}
              px="5"
              flex="1"
              onPress={(e) => setPageName("AddDescriptionPage")}
            >
              {t("Publish")}
            </Button>
          </Button.Group>
        ) : (
          <>
            <Text fontSize="10px" fontWeight="700" py="4">
              Attention: You have selected 20 questions to add to the worksheet.
            </Text>
            <Button.Group>
              <Button
                colorScheme="button"
                px="5"
                flex="1"
                variant="outline"
                onPress={(e) => setPageName("FormPage")}
              >
                {t("Cancel")}
              </Button>
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                px="5"
                flex="1"
                onPress={(e) => {
                  setQuestions(selectData);
                  setIsDataFilter(true);
                }}
              >
                {t("Add Questions")}
              </Button>
            </Button.Group>
          </>
        )}
      </Box>
    </Stack>
  );
};

const AddDescriptionPage = ({ setPageName }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({});
  const formInput = [
    { name: "title", placeholder: "Enter Title", label: "Title" },
    {
      name: "description",
      placeholder: "Enter Description",
      label: "Description",
    },
    {
      name: "difficulty_level",
      placeholder: "Enter Difficulty level",
      label: "Difficulty level",
    },
    { name: "topics", placeholder: "Enter Topics", label: "Topics" },
    { name: "subject", placeholder: "Enter Subject", label: "Subject" },
    { name: "level", placeholder: "Enter Level", label: "Level" },
    { name: "skills", placeholder: "Enter Skills", label: "Skills" },
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
          onPress={(e) => setPageName("success")}
        >
          {t("Save and Publish")}
        </Button>
      </Box>
    </Box>
  );
};
