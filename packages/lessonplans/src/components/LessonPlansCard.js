import { IconByName, overrideColorTheme, H2 } from "@shiksha/common-lib";
import {
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
    <Box p="5" borderWidth="1" borderColor="gray.300" rounded="lg">
      <VStack space={4}>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <Pressable onPress={() => (url ? navigate(url) : "")}>
            <HStack space={2} alignItems="center">
              {/* <IconByName
                name="BookOpenLineIcon"
                color="#373839"
                _icon={{ size: 57 }}
                isDisabled
              /> */}
              <Avatar bg={colors[random]} size="57" rounded="md">
                <H2 color="white">{item.name?.toUpperCase().substr(0, 1)}</H2>
              </Avatar>
              <Stack space="1">
                <VStack space="1px">
                  <Text fontWeight="600" fontSize="16px">
                    {item?.name}
                  </Text>
                  {/* <HStack space={1} alignItems="center">
                    <Text fontWeight="400" fontSize="10px">
                      {item.subHeading} {"•"}
                    </Text>
                    <Text fontWeight="400" fontSize="10px">
                      {t("CLASS") + " " + item.class}
                    </Text>
                  </HStack> */}
                </VStack>

                <HStack space={1} alignItems="center">
                  <IconByName
                    name="Heart3FillIcon"
                    color="red.500"
                    _icon={{ size: 12 }}
                    isDisabled
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {item?.likes + " likes"}
                  </Text>

                  <Text fontWeight="600" fontSize="10px">
                    {item?.comments + " comments"}
                  </Text>
                </HStack>
              </Stack>
            </HStack>
          </Pressable>
          {/* <IconByName
            name="AddCircleFillIcon"
            _icon={{ size: 30 }}
            color="button.500"
            p="0"
          /> */}
        </HStack>
        <Text fontWeight="600" fontSize="10px">
          {item.description}
        </Text>
        <HStack space="2" justifyContent="space-between" alignItems="flex-end">
          <HStack space="2">
            <VStack>
              <HStack space="1" alignItems="center">
                <IconByName name="GitRepositoryLineIcon" _icon={{ size: 12 }} p="0" />
                <Text fontWeight="600" fontSize="10px">
                  {"Source: " + item?.source}
                </Text>
              </HStack>
              <HStack space="1" alignItems="center">
                <IconByName
                  name="SurveyLineIcon"
                  _icon={{ size: 12 }}
                  p="0"
                />
                <Text fontWeight="600" fontSize="10px">
                  {"Topic: " + item?.topic}
                </Text>
              </HStack>
              <HStack space="1" alignItems="center">
                <IconByName
                  name="ArticleLineIcon"
                  _icon={{ size: 12 }}
                  p="0"
                />
                <Text fontWeight="600" fontSize="10px">
                  {"Downloads: " + item?.downloads}
                </Text>
              </HStack>
            </VStack>
            <VStack>
              <HStack space="1" alignItems="center">
                <IconByName
                  name="TimeLineIcon"
                  _icon={{ size: 12 }}
                  p="0"
                />
                <Text fontWeight="600" fontSize="10px">
                  {"Duration: " + item?.duration}
                </Text>
              </HStack>
              <HStack space="1" alignItems="center">
                <IconByName name="LightbulbFlashLineIcon" _icon={{ size: 12 }} p="0" />
                <Text fontWeight="600" fontSize="10px">
                  {"Grade: " + item?.gradeLevel}
                </Text>
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
        </HStack>
      </VStack>
    </Box>
  );
}
