import {
    IconByName,
    commentRegistryService,
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
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
const colors = overrideColorTheme(colorTheme);

export default function CommentActionSheet({
    setShowModuleComments,
    showModuleComments,
    lessonPlan,
    comments,
    setCommets,
}) {
    const { t } = useTranslation();
    const [comment, setCommet] = React.useState("");
    const [error, setError] = React.useState();

    const handleInput = (event) => {
        const value = event.target.value;
        setCommet(value);
        if (!value) {
            setError(t("ENTER_COMMENT"));
        } else {
            setError();
        }
    };
    const handleSubmit = async () => {
        if (comment && comment !== "") {
            let newData = {
                contextId: lessonPlan?.id,
                context: "Lessonplan",
                status: "Publish",
                comment,
            };
            const { osid } = await commentRegistryService.create(newData);
            setCommets([...comments, { ...newData, id: osid }]);
            setCommet("");
        } else {
            setError(t("ENTER_COMMENT"));
        }
    };

    return (
        <Actionsheet
            isOpen={showModuleComments}
            onClose={() => setShowModuleComments(false)}
        >
            <Actionsheet.Content alignItems={"left"} bg="worksheetCard.500">
                <HStack justifyContent={"space-between"}>
                    <Stack p={5} pt={1} pb="20px">
                        <H2>{t("Comments")}</H2>
                    </Stack>
                    <IconByName
                        name="CloseCircleLineIcon"
                        color="worksheetCard.900"
                        onPress={(e) => setShowModuleComments(false)}
                    />
                </HStack>
            </Actionsheet.Content>
            <VStack width={"100%"} space="1px">
                {comments.map((item, index) => (
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
                                <BodyLarge>{t("Mrs. Jina Jain")}</BodyLarge>
                                <Subtitle color="gray.400">{t("12 January, 4:00PM")}</Subtitle>
                            </VStack>
                        </HStack>
                        <Subtitle p="5">{item.comment}</Subtitle>
                    </Box>
                ))}
                <Box bg="white" p="5">
                    <HStack space="2" alignItems="center" w={"100%"}>
                        <FormControl isInvalid={error}>
                            <InputGroup>
                                <Input
                                    h="48px"
                                    bg={"coolGray.100"}
                                    size={"full"}
                                    placeholder={t("WRITE_COMMENT")}
                                    value={comment}
                                    onChange={handleInput}
                                />
                                <InputRightAddon
                                    children={
                                        <Box rounded="full" bg="button.500">
                                            <IconByName
                                                _icon={{ size: "15" }}
                                                color="white"
                                                name="SendPlane2LineIcon"
                                                onPress={handleSubmit}
                                            />
                                        </Box>
                                    }
                                />
                            </InputGroup>
                            {error ? (
                                <FormControl.ErrorMessage>
                                    <BodySmall color={colors.eventError}>{error}</BodySmall>
                                </FormControl.ErrorMessage>
                            ) : (
                                <></>
                            )}
                        </FormControl>
                    </HStack>
                </Box>
            </VStack>
        </Actionsheet>
    );
}
