import {
  BodyMedium,
  Caption,
  H2,
  IconByName,
  overrideColorTheme,
  Subtitle,
} from "@shiksha/common-lib";
import {
  Actionsheet,
  Avatar,
  Box,
  HStack,
  Pressable,
  Stack,
  VStack,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const AttributeData = [
  { icon: "SurveyLineIcon", label: "SUBJECT", attribute: "subject" },
  { icon: "BarChart2LineIcon", label: "LEVEL", attribute: "level" },
  { icon: "QuestionLineIcon", label: "QUESTIONS", attribute: "questions" },
  { icon: "AccountBoxFillIcon", label: "GRADE", attribute: "grade" },
  { icon: "ArticleLineIcon", label: "TOPIC", attribute: "topic" },
  { icon: "Download2LineIcon", label: "DOWNLOADS", attribute: "downloads" },
];

export default function Worksheet({
  worksheetConfig,
  worksheet,
  showModuleWorksheet,
  setShowModuleWorksheet,
  handleCommentModuleOpen,
  likeCount,
  commentCount,
  footer,
}) {
  const { t } = useTranslation();
  return (
    <Actionsheet
      isOpen={showModuleWorksheet}
      onClose={() => setShowModuleWorksheet(false)}
    >
      <Actionsheet.Content alignItems={"left"}>
        <Stack p={5} pt={2} pb="15px" textAlign="center">
          <H2>{worksheet?.name ? worksheet?.name : ""}</H2>
        </Stack>
        <IconByName
          color={colors.lightGray2}
          position="absolute"
          top="10px"
          right="10px"
          name="CloseCircleLineIcon"
          onPress={(e) => setShowModuleWorksheet(false)}
        />
      </Actionsheet.Content>
      <Box bg={colors.white} width={"100%"} p="5">
        <VStack space="4">
          <BodyMedium
            color={colors.messageInfo}
            textTransform="inherit"
            textAlign="center"
          >
            {worksheet?.description}
          </BodyMedium>
          <AttributeComponent
            data={AttributeData.filter((e) =>
              worksheetConfig.includes(e.attribute)
            )}
            object={worksheet}
          />

          {!footer ? (
            <HStack space={5} alignItems="center">
              <HStack alignItems="center">
                <IconByName
                  name="Heart3FillIcon"
                  color={colors.eventError}
                  _icon={{ size: 12 }}
                  isDisabled
                />
                <Subtitle>
                  {likeCount} {t("TEACHERS_LIKE_THIS")}
                </Subtitle>
              </HStack>
              <Pressable
                onPress={(e) =>
                  handleCommentModuleOpen
                    ? handleCommentModuleOpen()
                    : console.log("not found handleCommentModuleOpen")
                }
              >
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
                  <Subtitle color={colors.primary}>
                    {commentCount} {t("COMMENTS")}
                  </Subtitle>
                </HStack>
              </Pressable>
            </HStack>
          ) : (
            footer
          )}
        </VStack>
      </Box>
    </Actionsheet>
  );
}

const AttributeComponent = ({ data, object }) => {
  const { t } = useTranslation();

  const elements = data.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <VStack space="2">
      {elements.map((attributes, index) => (
        <HStack key={index}>
          {attributes.map((item, subIndex) => (
            <HStack
              key={subIndex}
              space="1"
              alignItems="center"
              w={100 / attributes.length + "%"}
            >
              <IconByName
                isDisabled
                name={item.icon}
                _icon={{ size: 14 }}
                color={colors.worksheetBoxText}
                p="0"
              />
              <BodyMedium color={colors.worksheetBoxText}>
                {t(item?.label) +
                  " : " +
                  (object?.[item.attribute]
                    ? Array.isArray(object?.[item.attribute])
                      ? object?.[item.attribute].length
                      : object?.[item.attribute]
                    : "")}
              </BodyMedium>
            </HStack>
          ))}
        </HStack>
      ))}
    </VStack>
  );
};
