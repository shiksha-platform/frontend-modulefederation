import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Layout,
  useWindowSize,
  Collapsible,
  IconByName,
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
  ScrollView,
  Stack,
  Text,
  VStack,
} from "native-base";
import manifest from "../manifest.json";

const questions = [
  {
    question: `Q1. Choose the correct option to fill in the blank. 7g = ____ dag`,
    options: [
      { value: { body: "70" } },
      { value: { body: "0.7" } },
      { value: { body: "7000" } },
      { value: { body: "700" } },
    ],
  },
  {
    question: `Q2. A courtyard 50m long and 198m broad is to be paved with bricks of length 10m and breadth 18cm. Find the number of bricks required.`,
    options: [
      { value: { body: "550000" } },
      { value: { body: "1100000" } },
      { value: { body: "99000000" } },
      { value: { body: "180" } },
    ],
  },
  {
    question: `Q3. A wire of length 20m is to be folded in the form of a square. If each side of a square has to be an integer (measured in meters), what is the maximum number of squares that can be formed by folding the wire.`,
    options: [
      { value: { body: "4" } },
      { value: { body: "2" } },
      { value: { body: "5" } },
      { value: { body: "6" } },
    ],
  },
];
const questionsTwo = [
  {
    question: `Q4. A factory produces 9643243 toys every month. It sends 1438228 toys to the town market, 1657539
  toys to markets in other states and 1413931 to the markets in other countries. ________ toys are left in the factory.`,
  },
  {
    question: `Q5. The place value of the underlined digit in 65872546 is _______ .`,
  },
  {
    question: `Q6. Alisha celebrated her birthday with 14 of her friends. If she and each of her friend ordered 2 muffins and 5 toffees, they ordered _______ items in total.`,
  },
];
const questionsThree = [
  {
    question: `Q7. Convert 3l into dal.`,
  },
  {
    question: `Q8. The place value of the underlined digit in 65872546 is _______ .`,
  },
  {
    question: `Q9. Convert 4kg, 9 hg, 7dag, 2g into grams.`,
  },
];
export default function WorksheetQuestionBank({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const [showModule, setShowModule] = useState(false);
  const [showModuleComments, setShowModuleComments] = useState(false);

  const translationCheck = (name, title) => {
    return (t(name) !== name && t(name)) || title;
  };

  const handleCommentModuleClose = () => {
    setShowModuleComments(false);
    setShowModule(true);
  };

  const handleCommentModuleOpen = () => {
    setShowModuleComments(true);
    setShowModule(false);
  };

  return (
    <Layout
      _header={{
        title: translationCheck("MY_CLASSES", "Question Bank"),
        avatar: true,
      }}
      bg="white"
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <HStack alignItems="center" justifyContent="space-between">
          <Text fontSize="16px" fontWeight={"600"}>
            {t("Chapter 1 : Learning Made Easy")}
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
      <Collapsible
        header="Choose correct answer(s) from the given choices"
        _header={{ py: 5 }}
      >
        <ScrollView maxH={Height}>
          <Box bg="white" p="5">
            <VStack space="5">
              {questions &&
                questions.map((question, index) => (
                  <QuestionBox
                    _box={{ py: "12px", px: "16px" }}
                    key={index}
                    questionObject={question}
                    options={question?.options}
                  />
                ))}
            </VStack>
          </Box>
        </ScrollView>
      </Collapsible>
      <Collapsible header="Fill in the blanks" _header={{ py: 5 }}>
        <ScrollView maxH={Height}>
          <Box bg="white" p="5">
            <VStack space="5">
              {questionsTwo &&
                questionsTwo.map((question, index) => (
                  <QuestionBox
                    _box={{ py: "12px", px: "16px" }}
                    key={index}
                    questionObject={question}
                  />
                ))}
            </VStack>
          </Box>
        </ScrollView>
      </Collapsible>
      <Collapsible header="Answer the questions" _header={{ py: 5 }}>
        <ScrollView maxH={Height}>
          <Box bg="white" p="5">
            <VStack space="5">
              {questionsThree &&
                questionsThree.map((question, index) => (
                  <QuestionBox
                    _box={{ py: "12px", px: "16px" }}
                    key={index}
                    questionObject={question}
                  />
                ))}
            </VStack>
          </Box>
        </ScrollView>
      </Collapsible>
      <Box bg="white" p="5" position="sticky" bottom="0" shadow={2}>
        <Button.Group>
          <Button
            flex="1"
            colorScheme="button"
            variant="outline"
            px="5"
            onPress={(e) => {
              console.log(e);
            }}
          >
            {t("Save As Draft")}
          </Button>
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
      <Actionsheet isOpen={showModule} onClose={() => setShowModule(false)}>
        <Actionsheet.Content alignItems={"left"}>
          <Stack p={5} pt={2} pb="25px" textAlign="center">
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
          <VStack space="4">
            <Text fontSize="14px" fontWeight={"400"} color="gray.400">
              He is an entrepreneur, educator, and investor who believes that
              each of us has the power to makes.
            </Text>
            <Stack space="2">
              <HStack space="4">
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="AccountBoxFillIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {"Grade: VI"}
                  </Text>
                </HStack>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="SurveyLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {"Subject: Math"}
                  </Text>
                </HStack>
              </HStack>
              <HStack space="4">
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="ArticleLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {"Chapter: 01"}
                  </Text>
                </HStack>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="FileInfoLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {"Topics: Algebra"}
                  </Text>
                </HStack>
              </HStack>
              <HStack space="4">
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="QuestionLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {"Questions: 30"}
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
              </HStack>
              <HStack space="4">
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="SurveyLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {"Skills: Reasoning"}
                  </Text>
                </HStack>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="LightbulbFlashLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {"Outcome: Improve IQ"}
                  </Text>
                </HStack>
              </HStack>
            </Stack>
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
    </Layout>
  );
}
