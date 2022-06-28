import {
  FilterButton,
  H1,
  IconByName,
  Layout,
  Loading,
  useWindowSize,
  BodyLarge,
  BodyMedium,
  H2,
  Caption,
  Subtitle,
  overrideColorTheme,
} from "@shiksha/common-lib";
import QuestionBox from "components/QuestionBox";
import WorksheetBox from "components/WorksheetBox";
import {
  HStack,
  Stack,
  Button,
  Text,
  Actionsheet,
  Box,
  Pressable,
  VStack,
  FormControl,
  Input,
  ScrollView,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { getAllQuestions } from "services";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const defaultInputs = [
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
  {
    name: "Source",
    attributeName: "source",
    data: ["source 1", "source 2"],
  },
];

const autoGenerateInputs = [
  {
    name: "Number of Questions",
    attributeName: "number_of_questions",
    data: ["10", "20", "30", "40", "50"],
  },
  {
    name: "Add Question type",
    attributeName: "add_question_type",
    data: ["MCQ", "SA"],
  },
];

export default function CreateWorksheet({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [pageName, setPageName] = React.useState();
  const [questions, setQuestions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [formObject, setFormObject] = React.useState({});
  const [width, height] = useWindowSize();
  const [worksheetName, setWorksheetName] = React.useState("Untitled");
  const [search, setSearch] = React.useState();

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
    return (
      <Layout
        _appBar={{
          onPressBackButton: handleBackButton,
          languages: manifest.languages,
          color: colors.successAlertText,
          _box: { bg: colors.successAlert },
        }}
      >
        <Loading
          width={width}
          height={height - 230}
          customComponent={
            <VStack space="2" flex="1" width={width}>
              <VStack bg={colors.successAlert} pb="100px" pt="32px">
                <IconByName
                  alignSelf="center"
                  name="CheckboxCircleLineIcon"
                  color={colors.successAlertText}
                  _icon={{ size: 100 }}
                />
                <Box alignSelf="center">
                  <H1 color={colors.successAlertText}>Worksheet Published</H1>
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
          bottom="0"
          shadow={2}
          width={width}
        >
          <Button
            colorScheme="button"
            _text={{ color: "white" }}
            px="5"
            flex="1"
            onPress={handleBackButton}
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
        setSearch,
        isEnableSearchBtn: pageName === "ListOfWorksheet",
      }}
      subHeader={
        <H2 textTransform="inherit">
          {pageName === "ListOfWorksheet"
            ? worksheetName
              ? t("Your worksheet has been created.")
              : t("You can see all questions here")
            : pageName === "AddDescriptionPage"
            ? t("Enter Worksheet Details")
            : t("Show questions based on")}
        </H2>
      }
      _subHeader={{
        bg: colors.cardBg,
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
          <BodyLarge>{t(item.name)}</BodyLarge>
          <Button
            {...(formObject[attributeName]
              ? { _text: { color: "white", textTransform: "inherit" } }
              : item?.buttonVariant
              ? { variant: item.buttonVariant }
              : {
                  variant: "outline",
                  _text: { color: colors.primary, textTransform: "inherit" },
                })}
            rounded="full"
            colorScheme="button"
            px="5"
            rightIcon={
              <IconByName
                color={
                  formObject[attributeName]
                    ? "white"
                    : item?.buttonVariant
                    ? colors.primary
                    : colors.primary
                }
                name="ArrowDownSLineIcon"
                isDisabled
              />
            }
            onPress={(e) => setFormData(item)}
          >
            {formObject[attributeName]
              ? formObject[attributeName][0]
              : `Select ${t(item.name)}`}
          </Button>
        </HStack>
      );
    })
  );
};

const FormPage = ({ formObject, setFormObject, setPageName, setLoading }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = React.useState({});
  const [inputs, setInputs] = React.useState(defaultInputs);

  const attributeName = formData.attributeName
    ? formData.attributeName
    : formData?.name;
  const valueArr = formObject[attributeName] ? formObject[attributeName] : [];

  const handelAddQuestion = () => {
    setLoading(true);
    setPageName("ListOfWorksheet");
  };

  return (
    <Stack space={1} mb="2">
      <FormInput
        {...{ formObject, setFormObject, formData, setFormData }}
        data={inputs}
      />
      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        <Button.Group>
          {!inputs.filter((e) => e.attributeName === "number_of_questions")
            .length ? (
            <Button
              flex="1"
              variant="outline"
              onPress={(e) =>
                setInputs([...defaultInputs, ...autoGenerateInputs])
              }
            >
              {t("Auto Generate")}
            </Button>
          ) : (
            <></>
          )}
          <Button
            colorScheme="button"
            _text={{ color: "white" }}
            px="5"
            flex="1"
            onPress={handelAddQuestion}
          >
            {t("Search Questions")}
          </Button>
        </Button.Group>
      </Box>
      <Actionsheet isOpen={formData?.name} onClose={() => setFormData({})}>
        <Stack width={"100%"} maxH="100%">
          <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="25px">
                <H2>{t(`Select ${formData?.name}`)}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                onPress={(e) => setFormData({})}
              />
            </HStack>
          </Actionsheet.Content>
          <ScrollView bg="white" width={"100%"}>
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
                      formObject[attributeName]?.includes(value)
                        ? "gray.100"
                        : ""
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
          </ScrollView>
        </Stack>
      </Actionsheet>
    </Stack>
  );
};

const ListOfWorksheet = ({
  questions,
  setQuestions,
  pageName,
  setPageName,
  filterObject,
  setFilterObject,
  worksheetName,
  setWorksheetName,
}) => {
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const [selectData, setSelectData] = React.useState([]);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [showModule, setShowModule] = React.useState(false);
  const [questionObject, setQuestionObject] = React.useState({});
  const [isAnswerFilter, setIsAnswerFilter] = React.useState(false);
  const [inputData, setInputData] = React.useState();

  React.useEffect(() => {
    setInputData(worksheetName);
  }, [worksheetName, pageName]);

  const handleWorksheetSubmit = () => {
    setQuestions(selectData);
    setPageName("filterData");
    setIsSuccess(true);
    setWorksheetName(inputData);
    setShowModule(false);
  };

  const handelInput = (event) => {
    if (event.target.value) setInputData(event.target.value);
  };

  const handelAddQuestionButton = () => {
    setPageName("ListOfWorksheet");
    setIsSuccess(false);
  };

  const callBackFilterObject = React.useCallback((e) => {
    setFilterObject();
  }, []);

  return (
    <Stack>
      {pageName === "filterData" && isSuccess ? (
        <Box bg={colors.successAlert} p="5">
          <HStack justifyContent="space-between">
            <BodyLarge color={colors.successAlertText}>
              ({questions.length}) New Questions Added
            </BodyLarge>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.successAlertText}
              p="0"
              onPress={(e) => setIsSuccess(false)}
            />
          </HStack>
        </Box>
      ) : (
        <></>
      )}
      {pageName === "ListOfWorksheet" ? (
        <Box>
          <FilterButton
            getObject={callBackFilterObject}
            object={filterObject}
            _actionSheet={{ bg: colors.cardBg }}
            _box={{ pt: 5, px: 5 }}
            _button={{ bg: colors.primaryLight, px: "15px", py: "2" }}
            _filterButton={{
              rightIcon: "",
              bg: "white",
            }}
            resetButtonText={t("COLLAPSE")}
            filters={defaultInputs}
          />
          <Box bg="white" px="5">
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
                    onPress={(e) =>
                      setSelectData(
                        selectData.filter(
                          (e) => e.questionId !== item.questionId
                        )
                      )
                    }
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
          bg="white"
          onPress={handelAddQuestionButton}
        >
          {t("Add more questions")}
        </Button>
      )}

      <Box bg="white" p="5">
        <ScrollView maxH={Height}>
          <VStack space="5">
            {questions.map((question, index) => (
              <QuestionBox
                isAnswerHide={!isAnswerFilter}
                _box={{ py: "12px", px: "16px" }}
                key={index}
                questionObject={question}
                {...(pageName !== "ListOfWorksheet"
                  ? {}
                  : { selectData, setSelectData })}
                infoIcon={
                  <IconByName
                    name="InformationLineIcon"
                    _icon={{ size: 15 }}
                    color={colors.primary}
                    onPress={(e) => setQuestionObject(question)}
                  />
                }
              />
            ))}
          </VStack>
        </ScrollView>
      </Box>
      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        {pageName === "filterData" ? (
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
            <Caption py="4" pb="1">
              <Text fontWeight="700">Attention:</Text>
              You have selected {selectData.length} questions to add to the
              worksheet.
            </Caption>
            <Pressable onPress={(e) => setIsAnswerFilter(!isAnswerFilter)}>
              <HStack alignItems="center" space="1" pt="1" py="4">
                <IconByName
                  isDisabled
                  color={isAnswerFilter ? colors.primary : colors.grayLight}
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
                  setShowModule(true);
                }}
              >
                {t("ADD_TO_WORKSHEET")}
              </Button>
            </Button.Group>
          </>
        )}
        <Actionsheet
          isOpen={questionObject?.questionId}
          onClose={() => setQuestionObject({})}
        >
          <Actionsheet.Content alignItems={"left"}>
            <Stack p={5} pt={2} pb="25px" textAlign="center">
              <Subtitle color={colors.grayLight}>
                {t("Maps of the world")}
              </Subtitle>
              {/* <H2>
              {t("Learning Made Easy")}
            </H2> */}
            </Stack>
            <IconByName
              color={colors.grayLight}
              position="absolute"
              top="10px"
              right="10px"
              name="CloseCircleLineIcon"
              onPress={(e) => setQuestionObject({})}
            />
          </Actionsheet.Content>
          <Box bg="white" width={"100%"} p="5">
            <VStack space="5">
              <BodyMedium color={colors.grayLight} textTransform="inherit">
                <div
                  dangerouslySetInnerHTML={{ __html: questionObject?.question }}
                />
              </BodyMedium>
              <VStack space="4">
                <HStack space="50px">
                  <VStack space="4">
                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="AccountBoxFillIcon"
                        _icon={{ size: 12 }}
                        p="0"
                      />
                      <Caption>{`Class: ${questionObject?.class}`}</Caption>
                    </HStack>

                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="FileInfoLineIcon"
                        _icon={{ size: 12 }}
                        p="0"
                      />
                      <Caption>{`Topics: ${questionObject?.topic}`}</Caption>
                    </HStack>

                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="SurveyLineIcon"
                        _icon={{ size: 12 }}
                        p="0"
                      />
                      <Caption>{"Source: Reasoning"}</Caption>
                    </HStack>

                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="SurveyLineIcon"
                        _icon={{ size: 12 }}
                        p="0"
                      />
                      <Caption>
                        {`Language: ${questionObject?.languageCode}`}
                      </Caption>
                    </HStack>
                  </VStack>
                  <VStack space="4">
                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="SurveyLineIcon"
                        _icon={{ size: 12 }}
                        p="0"
                      />
                      <Caption>{`Subject: ${questionObject?.subject}`}</Caption>
                    </HStack>

                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="BarChart2LineIcon"
                        _icon={{ size: 12 }}
                        p="0"
                      />
                      <Caption>{"Level: Intermediate"}</Caption>
                    </HStack>

                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="BarChart2LineIcon"
                        _icon={{ size: 12 }}
                        p="0"
                      />
                      <Caption>{"Outcome: Intermediate"}</Caption>
                    </HStack>
                  </VStack>
                </HStack>
              </VStack>
            </VStack>
          </Box>
        </Actionsheet>
        <Actionsheet isOpen={showModule} onClose={() => setShowModule(false)}>
          <Actionsheet.Content alignItems={"left"}>
            <Stack p={5} pt={2} pb="25px" textAlign="center">
              <Subtitle color={colors.grayLight}>
                {t("Enter Worksheet Details")}
              </Subtitle>
            </Stack>
          </Actionsheet.Content>
          <Box bg="white" width={"100%"} p="5">
            <FormControl isRequired>
              <FormControl.Label mb="10px">
                <BodyMedium>{t("NAME")}</BodyMedium>
              </FormControl.Label>
              <Input
                rounded="lg"
                height="48px"
                bg="white"
                variant="unstyled"
                p={"10px"}
                placeholder={t("ENTER") + " " + t("NAME")}
                onChange={handelInput}
                value={inputData ? inputData : ""}
              />
            </FormControl>
            <Button.Group>
              <Button
                colorScheme="button"
                px="5"
                flex="1"
                variant="outline"
                onPress={handleWorksheetSubmit}
              >
                {t("Skip")}
              </Button>
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
                px="5"
                flex="1"
                onPress={handleWorksheetSubmit}
              >
                {t("Save")}
              </Button>
            </Button.Group>
          </Box>
        </Actionsheet>
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
                <BodyLarge>{item.label}</BodyLarge>
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
