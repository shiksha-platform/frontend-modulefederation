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
import AttributeComponent from "components/AttributeComponent";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const AttributeData = [
  { icon: "AccountBoxFillIcon", label: "CLASS", attribute: "class" },
  { icon: "FileInfoLineIcon", label: "TOPIC", attribute: "topic" },
  { icon: "SurveyLineIcon", label: "SOURCE", attribute: "source" },
  { icon: "SurveyLineIcon", label: "LANGUAGE", attribute: "language" },
  { icon: "SurveyLineIcon", label: "SUBJECT", attribute: "subject" },
  { icon: "BarChart2LineIcon", label: "LEVEL", attribute: "level" },
  { icon: "BarChart2LineIcon", label: "OUTCOME", attribute: "outcome" },
];

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
      {console.log(questionObject)}
      <Box bg={colors.white} width={"100%"} p="5">
        <VStack space="5">
          <BodyMedium color={colors.messageInfo} textTransform="inherit">
            <div
              dangerouslySetInnerHTML={{ __html: questionObject?.question }}
            />
          </BodyMedium>
          <AttributeComponent
            data={AttributeData.filter((e) =>
              metadataConfig.includes(e.attribute)
            )}
            object={questionObject}
          />
        </VStack>
      </Box>
    </Actionsheet>
  );
}
