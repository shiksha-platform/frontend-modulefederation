import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Layout,
  useWindowSize,
  IconByName,
  worksheetRegistryService,
  Loading,
} from "@shiksha/common-lib";
import QuestionBox from "components/QuestionBox";
import {
  Actionsheet,
  Avatar,
  Box,
  Button,
  HStack,
  Input,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import manifest from "../manifest.json";
import { useNavigate, useParams } from "react-router-dom";

export default function WorksheetQuestionBank({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const [questions, setQuestions] = React.useState([]);
  const [worksheet, setWorksheet] = React.useState({});
  const [showModule, setShowModule] = useState(false);
  const [showModuleComments, setShowModuleComments] = useState(false);
  const [like, setLike] = useState(false);
  const [state, setState] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [questionObject, setQuestionObject] = React.useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(async () => {
    const worksheetData = await worksheetRegistryService.getOne({ id });
    const questionIds =
      worksheetData && Array.isArray(worksheetData.questions)
        ? worksheetData.questions
        : [];
    const newQuestions = await worksheetRegistryService.getQuestionByIds(
      questionIds
    );
    setWorksheet(worksheetData);
    setState(worksheetData?.state && worksheetData.state === "Publish");
    setQuestions(newQuestions);
    setLoading(false);
  }, []);

  const handleCommentModuleClose = () => {
    setShowModuleComments(false);
    setShowModule(true);
  };

  const handleCommentModuleOpen = () => {
    setShowModuleComments(true);
    setShowModule(false);
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
              onPress={(e) => setShowModule(true)}
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
      bg="white"
      _appBar={{
        languages: manifest.languages,
        rightIcon: state ? (
          <HStack>
            <IconByName
              name={like ? "Heart3FillIcon" : "Heart3LineIcon"}
              color={like ? "button.500" : "black.500"}
              onPress={(e) => setLike(!like)}
            />
            <IconByName name="ShareLineIcon" />
            <IconByName
              onPress={(e) => navigate("/worksheet/template")}
              name="DownloadLineIcon"
            />
          </HStack>
        ) : (
          <React.Fragment />
        ),
      }}
      _footer={footerLinks}
    >
      <Box bg="white" p="5">
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
                      color="button.500"
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
              bg="viewNotification.600"
            >
              Question Not Found
            </Box>
          )}
        </VStack>
      </Box>
      {!state ? (
        <Box bg="white" p="5" position="sticky" bottom="84" shadow={2}>
          <Button.Group>
            <Button
              flex="1"
              colorScheme="button"
              _text={{ color: "white" }}
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
      <Actionsheet isOpen={showModule} onClose={() => setShowModule(false)}>
        <Actionsheet.Content alignItems={"left"}>
          <Stack p={5} pt={2} pb="25px" textAlign="center">
            <Text fontSize="16px" fontWeight={"600"}>
              {worksheet?.name}
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
          <VStack space="4">
            <Text
              fontSize="14px"
              fontWeight={"400"}
              color="gray.400"
              textTransform="inherit"
            >
              {worksheet?.description}
            </Text>

            <HStack space="2">
              <VStack space="3">
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="SurveyLineIcon"
                    _icon={{ size: 12 }}
                    color="worksheetBoxText.400"
                    p="0"
                  />
                  <Text
                    fontWeight="400"
                    fontSize="14px"
                    color="worksheetBoxText.400"
                  >
                    {"Subject: " + worksheet?.subject}
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
                    fontSize="14px"
                    color="worksheetBoxText.400"
                  >
                    {"Level: " + worksheet?.level}
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
                    fontSize="14px"
                    color="worksheetBoxText.400"
                  >
                    {"Questions: " +
                      (Array.isArray(worksheet?.questions)
                        ? worksheet?.questions.length
                        : worksheet?.questions)}
                  </Text>
                </HStack>
              </VStack>
              <VStack space="3">
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="AccountBoxFillIcon"
                    _icon={{ size: 12 }}
                    color="worksheetBoxText.400"
                    p="0"
                  />
                  <Text
                    fontWeight="400"
                    fontSize="14px"
                    color="worksheetBoxText.400"
                  >
                    {"Grade: " + worksheet?.grade}
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
                    fontSize="14px"
                    color="worksheetBoxText.400"
                  >
                    {t("TOPIC") + ": " + worksheet?.topic}
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
                    fontSize="14px"
                    color="worksheetBoxText.400"
                  >
                    {"Downloads: " + worksheet?.downloads}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            <HStack space={5} alignItems="center">
              <HStack alignItems="center">
                <IconByName
                  name="Heart3FillIcon"
                  color="red.500"
                  _icon={{ size: 12 }}
                  isDisabled
                />
                <Text fontWeight="600" fontSize="10px">
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
          </VStack>
        </Box>
      </Actionsheet>
      <Actionsheet
        isOpen={showModuleComments}
        onClose={() => handleCommentModuleClose()}
      >
        <Actionsheet.Content alignItems={"left"} bg="worksheetCard.500">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={1} pb="20px">
              <Text fontSize="16px" fontWeight={"600"}>
                {t("Comments")}
              </Text>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color="worksheetCard.900"
              onPress={(e) => handleCommentModuleClose()}
            />
          </HStack>
        </Actionsheet.Content>
        <VStack width={"100%"} space="1px">
          <Box bg="white" p="5">
            <HStack space="2" alignItems="center">
              <Avatar
                size="md"
                bg="green.500"
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              >
                AJ
              </Avatar>
              <VStack>
                <Text fontSize="14px" fontWeight={"500"}>
                  {t("Mrs. Jina Jain")}
                </Text>
                <Text fontSize="12px" fontWeight={"500"} color="gray.400">
                  {t("12 January, 4:00PM")}
                </Text>
              </VStack>
            </HStack>
            <Text p="5" fontSize="12px" fontWeight={"500"}>
              A courtyard 50m long and 198m broad is to be paved with bricks of
              length 10m and breadth 18cm. Find the number of bricks required.
            </Text>
          </Box>
          <Box bg="white" p="5">
            <HStack space="2" alignItems="center">
              <Avatar
                size="md"
                bg="green.500"
                source={{
                  uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                }}
              >
                AJ
              </Avatar>
              <VStack>
                <Text fontSize="14px" fontWeight={"500"}>
                  {t("Mrs. Jina Jain")}
                </Text>
                <Text fontSize="12px" fontWeight={"500"} color="gray.400">
                  {t("12 January, 4:00PM")}
                </Text>
              </VStack>
            </HStack>
            <Text p="5" fontSize="12px" fontWeight={"500"}>
              A courtyard 50m long and 198m broad is to be paved with bricks of
              length 10m and breadth 18cm. Find the number of bricks required.
            </Text>
          </Box>
          <Box bg="white" p="5">
            <HStack space="2" alignItems="center">
              <Input
                bg={"coolGray.100"}
                size={"full"}
                placeholder="Write a comment..."
              />
              <Box rounded="full" bg="button.500" p="1">
                <IconByName
                  size="sm"
                  color="white"
                  name="SendPlane2LineIcon"
                  onPress={(e) => console.log("false")}
                />
              </Box>
            </HStack>
          </Box>
        </VStack>
      </Actionsheet>
      <Actionsheet
        isOpen={questionObject?.questionId}
        onClose={() => setQuestionObject({})}
      >
        <Actionsheet.Content alignItems={"left"}>
          <Stack p={5} pt={2} pb="25px" textAlign="center">
            <Text fontSize="12px" fontWeight={"500"} color="gray.400">
              {t("Question")}
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
                      {`Source: ${questionObject?.source}`}
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
                      {`Level: ${questionObject?.level}`}
                    </Text>
                  </HStack>

                  <HStack space="1" alignItems="center">
                    <IconByName
                      name="BarChart2LineIcon"
                      _icon={{ size: 12 }}
                      p="0"
                    />
                    <Text fontWeight="600" fontSize="10px">
                      {`Outcome: ${questionObject?.outcome}`}
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
            </VStack>
          </VStack>
        </Box>
      </Actionsheet>
    </Layout>
  );
}
