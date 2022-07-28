import { IconByName, overrideColorTheme, H2, Subtitle, Caption, BodyMedium } from "@shiksha/common-lib";
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

export default function LessonPlansCard({ item, url, canShare }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [random, setRandom] = React.useState();

  React.useEffect(async (e) => {
    setRandom(Math.floor(Math.random() * (4 - 1) + 1) - 1);
  }, [])
  return (
    <Box p="5" borderWidth="1" borderColor={colors.grayLight} rounded="lg">
      <VStack space={4}>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <Pressable onPress={() => (url ? navigate(url) : "")}>
            <HStack space={2} alignItems="center">
              <Avatar bg={colors[random]} size="57" rounded="md">
                <H2 color="white">{item.name?.toUpperCase().substr(0, 1)}</H2>
              </Avatar>
              <Stack space="1">
                <VStack space="1px">
                  <H2>
                    {item?.name}
                  </H2>
                </VStack>

                <HStack space={1} alignItems="center">
                  <IconByName
                    name="Heart3FillIcon"
                    color="red.500"
                    _icon={{ size: 12 }}
                    isDisabled
                  />
                  <Caption>
                    {item?.likes + " likes"}
                  </Caption>

                  <Caption>
                    ({item?.comments + " comments"})
                  </Caption>
                </HStack>
              </Stack>
            </HStack>
          </Pressable>
        </HStack>
        <BodyMedium
          color={colors.worksheetText}
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
          }}
        >
          {item?.description}
        </BodyMedium>
        <HStack space="2" justifyContent="space-between" alignItems="baseline">

          <VStack space="2">
            <HStack space="1" alignItems="baseline" flex={1}>
              <IconByName name="GitRepositoryLineIcon" _icon={{ size: 12 }} p="0" />
              <Subtitle>
                {"Source: " + item?.source}
              </Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="SurveyLineIcon"
                _icon={{ size: 12 }}
                p="0"
              />
              <Subtitle>
                {"Topic: " + item?.topic}
              </Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="ArticleLineIcon"
                _icon={{ size: 12 }}
                p="0"
              />
              <Subtitle>
                {"Downloads: " + item?.downloads}
              </Subtitle>
            </HStack>
          </VStack>
          <VStack space="2">
            <HStack space="1" alignItems="center">
              <IconByName
                name="TimeLineIcon"
                _icon={{ size: 12 }}
                p="0"
              />
              <Subtitle>
                {"Duration: " + item?.duration}
              </Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName name="LightbulbFlashLineIcon" _icon={{ size: 12 }} p="0" />
              <Subtitle>
                {"Grade: " + item?.gradeLevel}
              </Subtitle>
            </HStack>
          </VStack>
        </HStack>
        {canShare ? (
          <HStack space="2">
            <Box shadow="2" p="2" rounded="full">
              <IconByName
                name="Download2LineIcon"
                _icon={{ size: 20 }}
                color="warmGray.700"
                p="0"
              />
            </Box>
            <Box shadow="2" p="2" rounded="full">
              <IconByName
                name="ShareLineIcon"
                _icon={{ size: 20 }}
                color="warmGray.700"
                p="0"
              />
            </Box>
            <Box shadow="2" p="2" rounded="full">
              <IconByName
                name="Heart3LineIcon"
                _icon={{ size: 20 }}
                color="button.500"
                p="0"
              />
            </Box>
          </HStack>
        ) : (
          ""
        )}
      </VStack>
    </Box>
  );
}
