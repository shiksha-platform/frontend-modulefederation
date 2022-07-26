import {
    IconByName,
    likeRegistryService,
    overrideColorTheme,
    BodySmall,
    BodyLarge,
    Subtitle,
    H2,
} from "@shiksha/common-lib";
import colorTheme from "colorTheme";
import {
    Actionsheet,
    HStack,
    Stack,
    Avatar,
    Box,
    VStack,
    Input,
    FormControl,
    InputGroup,
    InputRightAddon,
    Text
} from "native-base";
import React from "react";
import { Likes } from "../Likes";
import { useTranslation } from "react-i18next";
const colors = overrideColorTheme(colorTheme);

export default function LikeActionSheet({
    setShowModuleLikes,
    showModuleLikes,
    lessonPlan,
    likes,
}) {
    const { t } = useTranslation();
    console.log("ShowModulelikes", showModuleLikes);
    console.log("setter", setShowModuleLikes);
    return (
        <Actionsheet
            isOpen={showModuleLikes}
            onClose={() => setShowModuleLikes(false)}
        >
            <Actionsheet.Content alignItems={"left"} bg="worksheetCard.500">
                <HStack justifyContent={"space-between"}>
                    <Stack p={5} pt={1} pb="20px">
                        <H2>{t("Likes")}</H2>
                    </Stack>
                    <IconByName
                        name="CloseCircleLineIcon"
                        color="worksheetCard.900"
                        onPress={(e) => setShowModuleLikes(false)}
                    />
                </HStack>
            </Actionsheet.Content>
            <VStack width={"100%"} space="1px">
                {Likes.map((item, index) => (
                    <Box bg="white" p="5" key={index}>
                        <HStack space="2" alignItems="center">
                            <Avatar
                                size="md"
                                bg="green.500"
                                source={{
                                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                                }}
                            >
                                AJ
                            </Avatar>
                            <VStack>
                                <HStack><BodyLarge>{t(item)}</BodyLarge><Text>{t(" LIKED_THIS")}</Text></HStack>
                                <Subtitle color="gray.400">{t("12 January, 4:00PM")}</Subtitle>
                            </VStack>
                        </HStack>
                        {/* <Subtitle p="5">{item.comment}</Subtitle> */}
                    </Box>
                ))}
            </VStack>
        </Actionsheet>
    );
}
