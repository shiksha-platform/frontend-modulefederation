import { BodyMedium, Caption, H2, IconByName } from "@shiksha/common-lib";
import {
  Actionsheet,
  Avatar,
  Box,
  HStack,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Worksheet({
  worksheet,
  showModuleWorksheet,
  setShowModuleWorksheet,
  handleCommentModuleOpen,
  likeCount,
  commentCount,
}) {
  const { t } = useTranslation();
  return (
    <Actionsheet
      isOpen={showModuleWorksheet}
      onClose={() => setShowModuleWorksheet(false)}
    >
      <Actionsheet.Content alignItems={"left"}>
        <Stack p={5} pt={2} pb="25px" textAlign="center">
          <H2>{worksheet?.name}</H2>
        </Stack>
        <IconByName
          color="gray.300"
          position="absolute"
          top="10px"
          right="10px"
          name="CloseCircleLineIcon"
          onPress={(e) => setShowModuleWorksheet(false)}
        />
      </Actionsheet.Content>
      <Box bg="white" width={"100%"} p="5">
        <VStack space="4">
          <BodyMedium color="gray.400" textTransform="inherit">
            {worksheet?.description}
          </BodyMedium>

          <HStack space="2">
            <VStack space="3">
              <HStack space="1" alignItems="center">
                <IconByName
                  name="SurveyLineIcon"
                  _icon={{ size: 12 }}
                  color="worksheetBoxText.400"
                  p="0"
                />
                <BodyMedium color="worksheetBoxText.400">
                  {t("SUBJECT")}: {worksheet?.subject}
                </BodyMedium>
              </HStack>
              <HStack space="1" alignItems="center">
                <IconByName
                  name="BarChart2LineIcon"
                  _icon={{ size: 12 }}
                  color="worksheetBoxText.400"
                  p="0"
                />
                <BodyMedium color="worksheetBoxText.400">
                  {t("LEVEL")}: {worksheet?.level}
                </BodyMedium>
              </HStack>
              <HStack space="1" alignItems="center">
                <IconByName
                  name="QuestionLineIcon"
                  _icon={{ size: 12 }}
                  color="worksheetBoxText.400"
                  p="0"
                />
                <BodyMedium color="worksheetBoxText.400">
                  {t("QUESTIONS")}:
                  {Array.isArray(worksheet?.questions)
                    ? worksheet?.questions.length
                    : worksheet?.questions}
                </BodyMedium>
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
                <BodyMedium color="worksheetBoxText.400">
                  {t("GRADE")}: {worksheet?.grade}
                </BodyMedium>
              </HStack>
              <HStack space="1" alignItems="center">
                <IconByName
                  name="ArticleLineIcon"
                  _icon={{ size: 12 }}
                  color="worksheetBoxText.400"
                  p="0"
                />
                <BodyMedium color="worksheetBoxText.400">
                  {t("TOPIC")}: {worksheet?.topic}
                </BodyMedium>
              </HStack>
              <HStack space="1" alignItems="center">
                <IconByName
                  name="Download2LineIcon"
                  _icon={{ size: 12 }}
                  color="worksheetBoxText.400"
                  p="0"
                />
                <BodyMedium color="worksheetBoxText.400">
                  {t("DOWNLOADS")}: {worksheet?.downloads}
                </BodyMedium>
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
              <Caption>
                {likeCount} {t("TEACHERS_LIKE_THIS")}
              </Caption>
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
                </Avatar.Group>
                <Caption color="button.500">
                  {commentCount} {t("COMMENTS")}
                </Caption>
              </HStack>
            </Pressable>
          </HStack>
        </VStack>
      </Box>
    </Actionsheet>
  );
}
