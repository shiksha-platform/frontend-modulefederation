import { IconByName } from "@shiksha/common-lib";
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

export default function WorksheetBox({ item, url, canShare }) {
  const { t } = useTranslation();

  return (
    <Pressable onPress={() => (url ? navigate(url) : "")}>
      <Box p="5" borderWidth="1" borderColor="gray.300" rounded="lg">
        <VStack space={4}>
          <HStack justifyContent="space-between" alignItems="flex-start">
            <HStack space={2} alignItems="center">
              <Avatar bg="amber.500" size="57" rounded="md">
                {item.heading?.toUpperCase().substr(0, 2)}
              </Avatar>
              <Stack space="1">
                <VStack space="1px">
                  <Text fontWeight="600" fontSize="16px">
                    {item.heading}
                  </Text>
                  <HStack space={1} alignItems="center">
                    <Text fontWeight="400" fontSize="10px">
                      {item.subHeading} {"•"}
                    </Text>
                    <Text fontWeight="400" fontSize="10px">
                      {t("CLASS") + " " + item.class}
                    </Text>
                  </HStack>
                </VStack>

                <HStack space={1} alignItems="center">
                  <IconByName
                    name="Heart3FillIcon"
                    color="red.500"
                    _icon={{ size: 12 }}
                    isDisabled
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {item.likes + " likes"}
                  </Text>

                  <Text fontWeight="600" fontSize="10px">
                    {item.comments + " comments"}
                  </Text>
                </HStack>
              </Stack>
            </HStack>
            <IconByName
              name="AddCircleFillIcon"
              _icon={{ size: 30 }}
              color="button.500"
              p="0"
            />
          </HStack>
          <Text fontWeight="600" fontSize="10px">
            {item.description}
          </Text>
          <HStack
            space="2"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <HStack space="2">
              <VStack>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="SurveyLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {"Subject: " + item.subject}
                  </Text>
                </HStack>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="BarChart2LineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {"Level: " + item.level}
                  </Text>
                </HStack>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="QuestionLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {"Questions: " + item.questions}
                  </Text>
                </HStack>
              </VStack>
              <VStack>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="AccountBoxFillIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {"Grade: " + item.grade}
                  </Text>
                </HStack>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="ArticleLineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {"Chapter: " + item.chapter}
                  </Text>
                </HStack>
                <HStack space="1" alignItems="center">
                  <IconByName
                    name="Download2LineIcon"
                    _icon={{ size: 12 }}
                    p="0"
                  />
                  <Text fontWeight="600" fontSize="10px">
                    {"Downloads: " + item.downloads}
                  </Text>
                </HStack>
              </VStack>
            </HStack>
            {canShare ? (
              <HStack space="2">
                <Box shadow="2" p="2" rounded="full">
                  <IconByName name="ShareLineIcon" _icon={{ size: 30 }} p="0" />
                </Box>
                <Box shadow="2" p="2" rounded="full">
                  <IconByName
                    name="Heart3LineIcon"
                    _icon={{ size: 30 }}
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
    </Pressable>
  );
}
