import {
  IconByName,
  overrideColorTheme,
  H2,
  Subtitle,
  H4,
  Caption,
} from "@shiksha/common-lib";
import {
  Avatar,
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
  VStack,
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
  const [showButtonArray, setShowButtonArray] = React.useState([]);

  React.useEffect(async (e) => {
    setRandom(Math.floor(Math.random() * (4 - 1) + 1) - 1);
    setShowButtonArray(["Like", "Share", "Download"]);
  }, []);

  const handleShare = () => {
    const telemetryData = telemetryFactory.interact({
      appName,
      type: "Lessonplan-Video-Share",
      worksheetId: item?.id,
      subject: item?.subject,
      grade: item?.grade,
      topic: item?.topic,
    });
    capture("INTERACT", telemetryData);
    navigate(`/video/${item.id}/share`);
  };

  return (
    <HStack bg={colors.cardBgLight} rounded="10px" maxH={"140px"} space="5">
      <Box flex={3 / 4}>
        <Pressable
          onPress={() =>
            url
              ? navigate(url, {
                  state: {
                    videoURL:
                      "https://www.shutterstock.com/video/clip-24689849-water-droplets-falling-on-green-plant-ultra-slow",
                  },
                })
              : ""
          }
          width="100%"
          flex="1"
        >
          <Box flex={1} justifyContent="center" alignItems="center">
            <Image
              maxH={"140px"}
              rounded="10px"
              w={"100%"}
              h={"100%"}
              source={{
                uri: item.url,
              }}
              alt="image"
            />
            <Box bg={"rgba(0, 0, 0, 0.6)"} position="absolute" rounded="full">
              <IconByName name="PlayFillIcon" color={colors.white} />
            </Box>
          </Box>
        </Pressable>
        <Center
          bg={"rgba(0, 0, 0, 0.6)"}
          rounded="lg"
          position="absolute"
          bottom="8px"
          right="8px"
          px="3"
          py="1.5"
        >
          03:00
        </Center>
      </Box>
      <Stack flex="1">
        <VStack space={"2"}>
          <Pressable
            onPress={() => (url ? navigate(url) : "")}
            width="100%"
            flex="1"
          >
            <H4 color="#373839" pt={"3"}>
              {item.title}
            </H4>
          </Pressable>
          <Caption color="#838BA8">{item.description}</Caption>
          <Caption color="#373839">Source: {item.source}</Caption>
          {!showButtonArray || showButtonArray.includes("Share") ? (
            <HStack space="4" pb={"3"}>
              {/* <Box shadow="2" p="2" rounded="full" background="white">
                                <IconByName
                                    name="Download2LineIcon"
                                    _icon={{ size: 16 }}
                                    color="warmGray.700"
                                    p="0"
                                />
                            </Box> */}
              <Box shadow="2" p="2" rounded="full" background="white">
                <IconByName
                  name="ShareLineIcon"
                  _icon={{ size: 16 }}
                  color="warmGray.700"
                  p="0"
                  onPress={handleShare}
                />
              </Box>
            </HStack>
          ) : (
            ""
          )}
        </VStack>
      </Stack>
    </HStack>
  );
}
