import { BodyMedium, Caption, H2, IconByName } from "@shiksha/common-lib";
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
import { Likes } from "../Likes";

export default function LessonPlansActionSheet({
    lessonPlan,
    showModuleLessonPlan,
    setShowModuleLessonPlan,
    handleCommentModuleOpen,
    handleLikeModuleOpen,
    likeCount,
    commentCount,
    footer,
}) {
    const { t } = useTranslation();
    return (
        <Actionsheet
            isOpen={showModuleLessonPlan}
            onClose={() => setShowModuleLessonPlan(false)}
        >
            <Actionsheet.Content alignItems={"left"}>
                <Stack p={5} pt={2} pb="25px" textAlign="center">
                    <H2>{lessonPlan?.name ? lessonPlan?.name : ""}</H2>
                </Stack>
                <IconByName
                    color="gray.300"
                    position="absolute"
                    top="10px"
                    right="10px"
                    name="CloseCircleLineIcon"
                    onPress={(e) => setShowModuleLessonPlan(false)}
                />
            </Actionsheet.Content>
            <Box bg="white" width={"100%"} p="5" textAlign="center" alignItems={"center"}>
                <VStack space="4">
                    <BodyMedium color="gray.400" textTransform="inherit">
                        {lessonPlan?.description}
                    </BodyMedium>

                    <HStack space="2">
                        <VStack space="3">
                            <HStack space="1" alignItems="center">
                                <IconByName
                                    name="TimeLineIcon"
                                    _icon={{ size: 12 }}
                                    color="worksheetBoxText.400"
                                    p="0"
                                />
                                <BodyMedium color="worksheetBoxText.400">
                                    {t("DURATION")}: {lessonPlan?.duration}
                                </BodyMedium>
                            </HStack>
                            <HStack space="1" alignItems="center">
                                <IconByName
                                    name="Compasses2LineIcon"
                                    _icon={{ size: 12 }}
                                    color="worksheetBoxText.400"
                                    p="0"
                                />
                                <BodyMedium color="worksheetBoxText.400">
                                    {t("SKILLS")}: {lessonPlan?.skills[0]}
                                </BodyMedium>
                            </HStack>
                        </VStack>
                        <VStack space="3">
                            <HStack space="1" alignItems="center">
                                <IconByName
                                    name="ArticleLineIcon"
                                    _icon={{ size: 12 }}
                                    color="worksheetBoxText.400"
                                    p="0"
                                />
                                <BodyMedium color="worksheetBoxText.400">
                                    {t("TOPICS")}: {lessonPlan?.topic[0]}
                                </BodyMedium>
                            </HStack>
                            <HStack space="1" alignItems="center">
                                <IconByName
                                    name="SurveyLineIcon"
                                    _icon={{ size: 12 }}
                                    color="worksheetBoxText.400"
                                    p="0"
                                />
                                <BodyMedium color="worksheetBoxText.400">
                                    {t("SUBJECT")}: {lessonPlan?.subject[0]}
                                </BodyMedium>
                            </HStack>
                        </VStack>
                    </HStack>
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
                                        color="red.500"
                                        _icon={{ size: 12 }}
                                        isDisabled
                                    />
                                    <Caption>
                                        {/* {likeCount} {t("TEACHERS_LIKE_THIS")} */}
                                        {Likes.length} {t("TEACHERS_LIKE_THIS")}
                                    </Caption>
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
                                    <Caption color="button.500">
                                        {commentCount} {t("COMMENTS")}
                                    </Caption>
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
