import { IconByName } from "@shiksha/common-lib";
import { Actionsheet, Box, HStack, Stack, Text, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Question({ questionObject }) {
  const { t } = useTranslation();
  return (
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
  );
}
