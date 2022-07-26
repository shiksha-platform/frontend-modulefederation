import { IconByName, overrideColorTheme, H2, Subtitle } from "@shiksha/common-lib";
import {
    Avatar,
    Box,
    HStack,
    Pressable,
    Stack,
    Text,
    VStack
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    LinkedinShareButton,
    LinkedinIcon,
    WhatsappIcon,
    WhatsappShareButton,
} from "react-share";
import colorTheme from "colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function VideoCard({ item, index, url, canShare }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [random, setRandom] = React.useState();

    React.useEffect(async (e) => {
        setRandom(Math.floor(Math.random() * (4 - 1) + 1) - 1);
    }, [])
    return (
        <Box
            key={index}
            borderWidth="1"
            borderColor={colors.cardBgLight}
            my="0"
            p="0"
            rounded="10"
            background={"#FEF1EE"}
        >
            <HStack space={"5"}>
                <Avatar
                    size="2xl"
                    bg="green.500"
                    rounded={"5px"}
                    source={{
                        uri: item.url,
                    }}
                >
                    AJ
                </Avatar>
                <Stack>
                    <VStack space={"2"}>
                        <H2 color="#373839" pt={"3"}>{item.title}</H2>
                        <Subtitle color="#838BA8">{item.description}</Subtitle>
                        <Subtitle color="#373839">Source: {item.source}</Subtitle>
                        {canShare ? (
                            <HStack space="4" pb={"3"}>
                                <Box shadow="2" p="2" rounded="full" background="white">
                                    <IconByName
                                        name="Download2LineIcon"
                                        _icon={{ size: 20 }}
                                        color="warmGray.700"
                                        p="0"
                                    />
                                </Box>
                                <Box shadow="2" p="2" rounded="full" background="white">
                                    <IconByName
                                        name="ShareLineIcon"
                                        _icon={{ size: 20 }}
                                        color="warmGray.700"
                                        p="0"
                                    />
                                </Box>
                            </HStack>
                        ) : (
                            ""
                        )}
                    </VStack>
                </Stack>
            </HStack>
        </Box>
    );
}
