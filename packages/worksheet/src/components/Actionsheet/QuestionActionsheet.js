import { BodyMedium, Caption, IconByName, Subtitle } from "@shiksha/common-lib";
import { Actionsheet, Box, HStack, Stack, Text, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Question({ questionObject, setQuestionObject }) {
  const { t } = useTranslation();
  return (
    <Actionsheet
      isOpen={questionObject?.questionId}
      onClose={() => setQuestionObject({})}
    >
      <Actionsheet.Content alignItems={"left"}>
        <Stack p={5} pt={2} pb="25px" textAlign="center">
          <Subtitle color="gray.400">{t("Question")}</Subtitle>
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
          <BodyMedium color="gray.400" textTransform="inherit">
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
                  <Caption>
                    {t("CLASS")}: {questionObject?.class}
                  </Caption>
                </HStack>

                <HStack space="1" alignItems="center">
                  <IconByName
                    name="FileInfoLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Caption>
                    {t("TOPICS")}: {questionObject?.topic}
                  </Caption>
                </HStack>

                <HStack space="1" alignItems="center">
                  <IconByName
                    name="SurveyLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Caption>
                    {t("SOURCE")}: {questionObject?.source}
                  </Caption>
                </HStack>

                <HStack space="1" alignItems="center">
                  <IconByName
                    name="SurveyLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Caption>
                    {t("LANGUAGE")}:{questionObject?.languageCode}
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
                  <Caption>
                    {t("SUBJECT")}: {questionObject?.subject}
                  </Caption>
                </HStack>

                <HStack space="1" alignItems="center">
                  <IconByName
                    name="BarChart2LineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Caption>
                    {t("LEVEL")}: {questionObject?.level}
                  </Caption>
                </HStack>

                <HStack space="1" alignItems="center">
                  <IconByName
                    name="BarChart2LineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Caption>
                    {t("OUTCOME")}: {questionObject?.outcome}
                  </Caption>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Actionsheet>
  );
}
