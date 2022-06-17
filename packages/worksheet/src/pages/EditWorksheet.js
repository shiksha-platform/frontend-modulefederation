import {
  IconByName,
  Loading,
  worksheetRegistryService,
} from "@shiksha/common-lib";
import React from "react";
import { getQuestionByIds } from "../services";
import { useParams } from "react-router-dom";
import ListOfWorksheet from "../components/WorksheetEdit/ListOfWorksheet";
import UpdateDescriptionPage from "../components/WorksheetEdit/UpdateDescriptionPage";
import FormWorksheet from "components/WorksheetEdit/FormWorksheet";
import { Actionsheet, Box, HStack, Stack, Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";

export default function EditWorksheet({ footerLinks, appName }) {
  const [pageName, setPageName] = React.useState();
  const [questions, setQuestions] = React.useState([]);
  const [selectData, setSelectData] = React.useState([]);
  const [worksheet, setWorksheet] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [questionObject, setQuestionObject] = React.useState({});
  const { id } = useParams();

  React.useEffect(async () => {
    const worksheetData = await worksheetRegistryService.getOne({ id });
    const questionIds =
      worksheetData && Array.isArray(worksheetData.questions)
        ? worksheetData.questions
        : [];
    const questions = await getQuestionByIds(questionIds);
    setWorksheet(worksheetData);
    setQuestions(questions);
    setSelectData(questions);
    setLoading(false);
  }, []);

  const handleSubmit = () => {
    const newWorksheetObject = {
      ...worksheet,
      questions: selectData.map((e) => e.questionId),
    };
    console.log(newWorksheetObject);
    setQuestions(selectData);
    setWorksheet(newWorksheetObject);
    setPageName("success");
    worksheetRegistryService.update(newWorksheetObject);
  };

  if (loading) {
    return <Loading />;
  } else if (pageName === "AddDescriptionPage") {
    return (
      <UpdateDescriptionPage
        {...{
          setPageName,
          formObject: worksheet,
          setFormObject: setWorksheet,
          handleSubmit,
          footerLinks,
          appName,
        }}
      />
    );
  } else if (pageName === "ListOfWorksheet") {
    return (
      <>
        <ListOfWorksheet
          {...{
            setQuestions,
            selectData,
            setSelectData,
            handleSubmit,
            setPageName,
            setQuestionObject,
            footerLinks,
            appName,
            worksheet,
          }}
        />
        <ActionsheetQuestion {...{ questionObject, setQuestionObject }} />
      </>
    );
  } else {
    return (
      <>
        <FormWorksheet
          {...{
            questions,
            selectData,
            setSelectData,
            handleSubmit,
            pageName,
            setPageName,
            setQuestionObject,
            footerLinks,
            appName,
            formObject: worksheet,
            setFormObject: setWorksheet,
          }}
        />
        <ActionsheetQuestion {...{ questionObject, setQuestionObject }} />
      </>
    );
  }
}

const ActionsheetQuestion = ({ questionObject, setQuestionObject }) => {
  const { t } = useTranslation();

  return (
    <Actionsheet
      isOpen={questionObject?.questionId}
      onClose={() => setQuestionObject({})}
    >
      <Actionsheet.Content alignItems={"left"}>
        <Stack p={5} pt={2} pb="25px" textAlign="center">
          <Text fontSize="12px" fontWeight={"500"} color="gray.400">
            {t("Maps of the world")}
          </Text>
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
  );
};
