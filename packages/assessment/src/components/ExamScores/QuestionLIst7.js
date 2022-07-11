import React, { useState, useEffect } from "react";
import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Progress,
  Button,
  Divider,
  Actionsheet,
  Checkbox,
  Radio,
  Avatar,
  Input,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SingleSelectQuestionCard from "./questionTypes/SingleSelectQuestionCard";
import MultipleSelectQuestionCard from "./questionTypes/MultipleSelectQuestionCard";
import SimpleQuestionCard from "./questionTypes/SimpleQuestionCard";
import {
  assessmentRegistryService,
  IconByName,
  Layout,
  Loading,
  useWindowSize,
} from "@shiksha/common-lib";

const QuestionList7 = ({ questionNumber }) => {
  const { t } = useTranslation();
  const [questionList, setQuestionList] = useState([
    {
      question: "<p>This is dummy question 1</p>",
      qType: "MCQ",
      options: [
        {
          value: { body: "<p>Option 1</p>" },
        },
        {
          value: { body: "<p>Option 2</p>" },
        },
        {
          value: { body: "<p>Option 3</p>" },
        },
        {
          value: { body: "<p>Option 4</p>" },
        },
      ],
    },
    {
      question: "<p>This is dummy question 2</p>",
      qType: "MCQ",
      options: [
        {
          value: { body: "<p>Option 1</p>" },
        },
        {
          value: { body: "<p>Option 2</p>" },
        },
        {
          value: { body: "<p>Option 3</p>" },
        },
        {
          value: { body: "<p>Option 4</p>" },
        },
      ],
    },
    {
      question: "<p>This is dummy question 3</p>",
      qType: "MCQ",
      options: [
        {
          value: { body: "<p>Option 1</p>" },
        },
        {
          value: { body: "<p>Option 2</p>" },
        },
        {
          value: { body: "<p>Option 3</p>" },
        },
        {
          value: { body: "<p>Option 4</p>" },
        },
      ],
    },
  ]);
  const [loading, setLoading] = React.useState(false);
  const [width, height] = useWindowSize();

  if (loading) {
    return <Loading height={height - height / 2} />;
  }

  return (
    <Layout
      _header={{
        title: "Summative Assessment 1",
        isEnableSearchBtn: true,
        // setSearch: setSearch,
        subHeading: "State Examinations",
        iconComponent: (
          <Avatar
            size="48px"
            borderRadius="md"
            source={{
              uri: "https://via.placeholder.com/50x50.png",
            }}
          />
        ),
      }}
      _appBar={{ languages: ["en"] }}
      subHeader={
        <HStack space="4" justifyContent="space-between" alignItems="center">
          <VStack>
            <Text fontSize={"lg"}>Rahul</Text>
            <Text fontSize={"xs"} color={"muted.600"}>
              Mr. Father’s Name
            </Text>
          </VStack>
          <Avatar
            size="37px"
            borderRadius="md"
            source={{
              uri: "https://via.placeholder.com/50x50.png",
            }}
          />
        </HStack>
      }
      _subHeader={{ bg: "#D9F0FC" }}
      _footer={{
        menues: [
          {
            title: "HOME",
            icon: "Home4LineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CLASSES",
            icon: "TeamLineIcon",
            module: "Registry",
            route: "/classes",
            routeparameters: {},
          },
          {
            title: "SCHOOL",
            icon: "GovernmentLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "MATERIALS",
            icon: "BookOpenLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
          {
            title: "CAREER",
            icon: "UserLineIcon",
            module: "Registry",
            route: "/",
            routeparameters: {},
          },
        ],
      }}
    >
      <Box p={4}>
        <Box shadow={2} rounded={6} p={4} pb={0}>
          <Box>
            <VStack space={8}>
              <Box>
                <VStack space={2}>
                  <Text fontSize="lg" bold>
                    Practical
                  </Text>
                  <HStack
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Box
                      borderWidth={2}
                      borderColor={"#F87558"}
                      borderRadius={"full"}
                      w="30px"
                      h="30px"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Text color={"#F87558"}>A</Text>
                    </Box>

                    <Box
                      borderWidth={2}
                      borderColor={"#F87558"}
                      borderRadius={"full"}
                      w="30px"
                      h="30px"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Text color={"#F87558"}>B</Text>
                    </Box>

                    <Box
                      borderWidth={2}
                      borderColor={"#F87558"}
                      borderRadius={"full"}
                      w="30px"
                      h="30px"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Text color={"#F87558"}>C</Text>
                    </Box>

                    <Box
                      borderWidth={2}
                      borderColor={"#F87558"}
                      borderRadius={"full"}
                      w="30px"
                      h="30px"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Text color={"#F87558"}>D</Text>
                    </Box>
                  </HStack>
                </VStack>
              </Box>

              <Divider />

              <Box>
                <VStack space={2}>
                  <Text fontSize="lg" bold>
                    Theory
                  </Text>
                  <HStack
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Box
                      borderWidth={2}
                      borderColor={"#F87558"}
                      borderRadius={"full"}
                      w="30px"
                      h="30px"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Text color={"#F87558"}>A</Text>
                    </Box>

                    <Box
                      borderWidth={2}
                      borderColor={"#F87558"}
                      borderRadius={"full"}
                      w="30px"
                      h="30px"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Text color={"#F87558"}>B</Text>
                    </Box>

                    <Box
                      borderWidth={2}
                      borderColor={"#F87558"}
                      borderRadius={"full"}
                      w="30px"
                      h="30px"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Text color={"#F87558"}>C</Text>
                    </Box>

                    <Box
                      borderWidth={2}
                      borderColor={"#F87558"}
                      borderRadius={"full"}
                      w="30px"
                      h="30px"
                      alignItems={"center"}
                      justifyContent="center"
                    >
                      <Text color={"#F87558"}>D</Text>
                    </Box>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </Box>

          <Box py="4">
            <Button
              colorScheme="button"
              py={3}
              _text={{ color: "#fff" }}
              onPress={() => setActiveStage(3)}
            >
              {t("Save")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default QuestionList7;
