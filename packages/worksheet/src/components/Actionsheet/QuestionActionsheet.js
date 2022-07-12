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

export default function Question({
  questionObject,
  setQuestionObject,
  metadataConfig,
}) {
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
          {metadataConfig?.includes("question") ? (
            <BodyMedium color="gray.400" textTransform="inherit">
              <div
                dangerouslySetInnerHTML={{ __html: questionObject?.question }}
              />
            </BodyMedium>
          ) : (
            <React.Fragment />
          )}
          <VStack space="4">
            <HStack space="50px">
              <VStack space="4">
                {metadataConfig?.includes("class") ? (
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
                ) : (
                  <React.Fragment />
                )}

                {metadataConfig?.includes("topic") ? (
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
                ) : (
                  <React.Fragment />
                )}

                {metadataConfig?.includes("source") ? (
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
                ) : (
                  <React.Fragment />
                )}

                {metadataConfig?.includes("language") ? (
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
                ) : (
                  <React.Fragment />
                )}
              </VStack>
              <VStack space="4">
                {metadataConfig?.includes("subject") ? (
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
                ) : (
                  <React.Fragment />
                )}

                {metadataConfig?.includes("level") ? (
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
                ) : (
                  <React.Fragment />
                )}

                {metadataConfig?.includes("outcome") ? (
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
                ) : (
                  <React.Fragment />
                )}
              </VStack>
            </HStack>
          </VStack>
        </VStack>
      </Box>
    </Actionsheet>
  );
}
