import {
  BodyMedium,
  Caption,
  IconByName,
  Subtitle,
  overrideColorTheme,
  H2,
} from "@shiksha/common-lib";
import { Actionsheet, Box, HStack, Stack, Text, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function Question({ questionObject, setQuestionObject }) {
  const { t } = useTranslation();
  return (
    <Actionsheet
      isOpen={questionObject?.questionId}
      onClose={() => setQuestionObject({})}
    >
      <Actionsheet.Content bg={colors.white} alignItems={"left"}>
        <Stack p={5} pt={2} pb="15px" textAlign="center">
          <H2 color={colors.gray}>{t("Question")}</H2>
        </Stack>
        <IconByName
          color={colors.lightGray2}
          position="absolute"
          top="10px"
          right="10px"
          name="CloseCircleLineIcon"
          onPress={(e) => setQuestionObject({})}
        />
      </Actionsheet.Content>
      <Box bg={colors.white} width={"100%"} p="5">
        <VStack space="5">
          <BodyMedium
            color={colors.messageInfo}
            textTransform="inherit"
            textAlign="center"
          >
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
                    _icon={{ size: 14 }}
                    p="0"
                  />
                  <BodyMedium>
                    {t("CLASS")}: {questionObject?.class}
                  </BodyMedium>
                </HStack>

                <HStack space="1" alignItems="center">
                  <IconByName
                    name="FileInfoLineIcon"
                    _icon={{ size: 14 }}
                    p="0"
                  />
                  <BodyMedium>
                    {t("TOPICS")}: {questionObject?.topic}
                  </BodyMedium>
                </HStack>

                <HStack space="1" alignItems="center">
                  <IconByName
                    name="SurveyLineIcon"
                    _icon={{ size: 14 }}
                    p="0"
                  />
                  <BodyMedium>
                    {t("SOURCE")}: {questionObject?.source}
                  </BodyMedium>
                </HStack>

                <HStack space="1" alignItems="center">
                  <IconByName
                    name="SurveyLineIcon"
                    _icon={{ size: 14 }}
                    p="0"
                  />
                  <BodyMedium>
                    {t("LANGUAGE")}:{questionObject?.languageCode}
                  </BodyMedium>
                </HStack>
              </VStack>
              <VStack space="4">
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="SurveyLineIcon"
                    _icon={{ size: 14 }}
                    p="0"
                  />
                  <BodyMedium>
                    {t("SUBJECT")}: {questionObject?.subject}
                  </BodyMedium>
                </HStack>

                <HStack space="1" alignItems="center">
                  <IconByName
                    name="BarChart2LineIcon"
                    _icon={{ size: 14 }}
                    p="0"
                  />
                  <BodyMedium>
                    {t("LEVEL")}: {questionObject?.level}
                  </BodyMedium>
                </HStack>

                <HStack space="1" alignItems="center">
                  <IconByName
                    name="BarChart2LineIcon"
                    _icon={{ size: 14 }}
                    p="0"
                  />
                  <BodyMedium>
                    {t("OUTCOME")}: {questionObject?.outcome}
                  </BodyMedium>
                </HStack>
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Actionsheet>
  );
}
