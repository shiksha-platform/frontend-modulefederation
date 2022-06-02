import { FilterButton, IconByName, useWindowSize } from "@shiksha/common-lib";
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
  FormControl,
  Input,
  ScrollView,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { defaultInputs } from "config/createWorksheet";

export default function ListOfWorksheet({
  questions,
  setQuestions,
  pageName,
  setPageName,
  filterObject,
  setFilterObject,
  worksheetName,
  setWorksheetName,
}) {
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

  return (
    <Stack>
      {pageName === "filterData" && isSuccess ? (
        <Box bg="successAlert.500" p="5">
          <HStack justifyContent="space-between">
            <Text fontSize="14px" fontWeight="500" color="successAlertText.500">
              ({questions.length}) New Questions Added
            </Text>
            <IconByName
              name="CloseCircleLineIcon"
              color="successAlertText.500"
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
            getObject={setFilterObject}
            object={filterObject}
            _actionSheet={{ bg: "worksheetCard.500" }}
            _box={{ pt: 5, px: 5 }}
            _button={{ bg: "button.50", px: "15px", py: "2" }}
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
                    bg="viewNotification.600"
                    w="192px"
                    h="87px"
                    m="2"
                    p="3"
                    borderWidth="1"
                    borderColor="viewNotification.500"
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
                    color="button.500"
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
                    color="button.500"
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
            <Text fontSize="10px" py="4" pb="1">
              <Text fontWeight="700">Attention:</Text>
              You have selected {selectData.length} questions to add to the
              worksheet.
            </Text>
            <Pressable onPress={(e) => setIsAnswerFilter(!isAnswerFilter)}>
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
                <Text fontSize="12px" fontWeight="600">
                  Include answer key in worksheet
                </Text>
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
              <Text fontSize="12px" fontWeight={"500"} color="gray.400">
                {t("Maps of the world")}
              </Text>
              {/* <Text fontSize="16px" fontWeight={"600"}>
                {t("Learning Made Easy")}
              </Text> */}
            </Stack>
            <IconByName
              color="gray.300"
              position="absolute"
              top="10px"
              right="10px"
              name="CloseCircleLineIcon"
              onPress={(e) => setQuestionObject({})}
            />
          </Actionsheet.Content>
          <Box bg="white" width={"100%"} p="5">
            <VStack space="5">
              <Text
                fontSize="14px"
                fontWeight={"400"}
                color="gray.400"
                textTransform="inherit"
              >
                <div
                  dangerouslySetInnerHTML={{ __html: questionObject?.question }}
                />
              </Text>
              <VStack space="4">
                <HStack space="50px">
                  <VStack space="4">
                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="AccountBoxFillIcon"
                        _icon={{ size: 12 }}
                        p="0"
                      />
                      <Text fontWeight="600" fontSize="10px">
                        {`Class: ${questionObject?.class}`}
                      </Text>
                    </HStack>

                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="FileInfoLineIcon"
                        _icon={{ size: 12 }}
                        p="0"
                      />
                      <Text fontWeight="600" fontSize="10px">
                        {`Topics: ${questionObject?.topic}`}
                      </Text>
                    </HStack>

                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="SurveyLineIcon"
                        _icon={{ size: 12 }}
                        p="0"
                      />
                      <Text fontWeight="600" fontSize="10px">
                        {"Source: Reasoning"}
                      </Text>
                    </HStack>

                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="SurveyLineIcon"
                        _icon={{ size: 12 }}
                        p="0"
                      />
                      <Text fontWeight="600" fontSize="10px">
                        {`Language: ${questionObject?.languageCode}`}
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
                      <Text fontWeight="600" fontSize="10px">
                        {`Subject: ${questionObject?.subject}`}
                      </Text>
                    </HStack>

                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="BarChart2LineIcon"
                        _icon={{ size: 12 }}
                        p="0"
                      />
                      <Text fontWeight="600" fontSize="10px">
                        {"Level: Intermediate"}
                      </Text>
                    </HStack>

                    <HStack space="1" alignItems="center">
                      <IconByName
                        name="BarChart2LineIcon"
                        _icon={{ size: 12 }}
                        p="0"
                      />
                      <Text fontWeight="600" fontSize="10px">
                        {"Outcome: Intermediate"}
                      </Text>
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
              <Text fontSize="12px" fontWeight={"500"} color="gray.400">
                {t("Enter Worksheet Details")}
              </Text>
            </Stack>
          </Actionsheet.Content>
          <Box bg="white" width={"100%"} p="5">
            <FormControl isRequired>
              <FormControl.Label
                _text={{ fontSize: "14px", fontWeight: "400" }}
                mb="10px"
              >
                {t("NAME")}
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
}
