import { IconByName, H2, Caption, Subtitle } from "@shiksha/common-lib";
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

export default function WorksheetBox({ item, url, canShare, _addIconButton }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const colors = ["lightBlue.800", "indigo.900", "fuchsia.700", "rose.600"];
  const random = Math.floor(Math.random() * (4 - 1) + 1) - 1;

  return (
    <Box p="5" borderWidth="1" borderColor="gray.300" rounded="lg">
      <VStack space={4}>
        <HStack justifyContent="space-between" alignItems="flex-start">
          <Pressable onPress={() => (url ? navigate(url) : "")}>
            <HStack space={2} alignItems="center">
              <Avatar bg={colors[random]} size="57" rounded="md">
                <H2 color="white">
                  {item.heading?.toUpperCase().substr(0, 1)}
                </H2>
              </Avatar>
              <Stack space="1">
                <VStack space="1px">
                  <H2>{item.heading}</H2>
                  {/*<HStack space={1} alignItems="center">
                     <Caption>
                      {item.subHeading} {"•"}
                    </Caption> 
                    <Caption>
                      {t("CLASS") + " " + item.class}
                    </Caption>
                    
                  </HStack>*/}
                </VStack>

                <HStack space={1} alignItems="center">
                  <IconByName
                    name="Heart3FillIcon"
                    color="red.500"
                    _icon={{ size: 12 }}
                    isDisabled
                  />
                  <Caption>{item.likes + " likes"}</Caption>
                  <Caption>({item.comments + " comments"})</Caption>
                </HStack>
              </Stack>
            </HStack>
          </Pressable>
          <IconByName
            name="AddCircleFillIcon"
            _icon={{ size: 30 }}
            color="button.500"
            p="0"
            {..._addIconButton}
          />
        </HStack>
        <Subtitle color="worksheetBoxText.500">{item.description}</Subtitle>
        <HStack space="2">
          <VStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="SurveyLineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Subtitle color="worksheetBoxText.400">
                {"Subject: " + item.subject}
              </Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="BarChart2LineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Subtitle color="worksheetBoxText.400">
                {"Level: " + item.level}
              </Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="QuestionLineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Subtitle color="worksheetBoxText.400">
                {"Questions: " + item.questions}
              </Subtitle>
            </HStack>
          </VStack>
          <VStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="AccountBoxFillIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Subtitle color="worksheetBoxText.400">
                {"Grade: " + item.grade}
              </Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="ArticleLineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Subtitle color="worksheetBoxText.400">
                {t("TOPIC") + ": " + item.chapter}
              </Subtitle>
            </HStack>
            <HStack space="1" alignItems="center">
              <IconByName
                name="Download2LineIcon"
                _icon={{ size: 12 }}
                color="worksheetBoxText.400"
                p="0"
              />
              <Subtitle color="worksheetBoxText.400">
                {"Downloads: " + item.downloads}
              </Subtitle>
            </HStack>
          </VStack>
        </HStack>
        {canShare ? (
          <HStack space="5">
            <Box shadow="2" p="2" rounded="full">
              <IconByName
                name="Heart3LineIcon"
                _icon={{ size: 15 }}
                color="button.500"
                p="0"
              />
            </Box>
            <Box shadow="2" p="2" rounded="full">
              <IconByName
                name="ShareLineIcon"
                _icon={{ size: 15 }}
                p="0"
                onPress={(e) => navigate(`/worksheet/${item.id}/share`)}
              />
            </Box>
            <Box shadow="2" p="2" rounded="full">
              <IconByName
                onPress={(e) => navigate("/worksheet/template")}
                name="DownloadLineIcon"
                _icon={{ size: 15 }}
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
