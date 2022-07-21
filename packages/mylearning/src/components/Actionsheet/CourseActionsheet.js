import React from "react";
import {
  BodyMedium,
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
import { useTranslation } from "react-i18next";
import colorTheme from "../../colorTheme";
import AttributeComponent from "components/AttributeComponent";
const colors = overrideColorTheme(colorTheme);

const AttributeData = [
  { icon: "TimeLineIcon", label: "DURATION", attribute: "duration" },
  { icon: "CalendarCheckLineIcon", label: "DUE_DATE", attribute: "dueDate" },
  { icon: "BookLineIcon", label: "SOURCE", attribute: "source" },
];

export default function CourseActionsheet({
  config,
  course,
  setCourse,
  handleCommentModuleOpen,
  handleLikeModuleOpen,
  likeCount,
  commentCount,
  footer,
}) {
  const { t } = useTranslation();
  return (
    <Actionsheet isOpen={Object.keys(course).length}>
      <Actionsheet.Content alignItems={"left"}>
        <Stack p={5} pt={2} pb="15px" textAlign="center">
          <H2>{course?.name ? course?.name : ""}</H2>
        </Stack>
        <IconByName
          color={colors.lightGray2}
          position="absolute"
          top="10px"
          right="10px"
          name="CloseCircleLineIcon"
          onPress={(e) => setCourse({})}
        />
      </Actionsheet.Content>
      <Box bg={colors.white} width={"100%"} p="5">
        <VStack space="4">
          <BodyMedium
            color={colors.messageInfo}
            textTransform="inherit"
            textAlign="center"
          >
            {course?.description}
          </BodyMedium>
          <AttributeComponent
            data={AttributeData.filter((e) => config.includes(e.attribute))}
            object={course}
          />

          {!footer ? (
            <HStack space={5} alignItems="center">
              <Pressable
                onPress={(e) =>
                  handleLikeModuleOpen
                    ? handleLikeModuleOpen()
                    : console.log("not found handleLikeModuleOpen")
                }
              >
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
              </Pressable>
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
