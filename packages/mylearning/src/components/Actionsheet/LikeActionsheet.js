import {
  IconByName,
  commentRegistryService,
  overrideColorTheme,
  BodySmall,
  BodyLarge,
  Subtitle,
  H2,
} from "@shiksha/common-lib";
import colorTheme from "../../colorTheme";
import { Actionsheet, HStack, Stack, Avatar, Box, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
const colors = overrideColorTheme(colorTheme);

export default function LikeActionsheet({
  setShowModuleLike,
  showModuleLike,
  likeUsers,
}) {
  const { t } = useTranslation();

  return (
    <Actionsheet
      isOpen={showModuleLike}
      onClose={() => setShowModuleLike(false)}
    >
      <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
        <HStack justifyContent={"space-between"}>
          <Stack p={5} pt={1} pb="15px">
            <H2>{t("LIKES")}</H2>
          </Stack>
          <IconByName
            name="CloseCircleLineIcon"
            color={colors.cardIcon}
            onPress={(e) => setShowModuleLike(false)}
          />
        </HStack>
      </Actionsheet.Content>
      <VStack width={"100%"} space="1px">
        {likeUsers &&
          likeUsers.map((item, index) => (
            <Box bg={colors.white} p="5" key={index}>
              <HStack space="2" alignItems="center">
                <Avatar
                  size="md"
                  bg={colors.success}
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                >
                  AJ
                </Avatar>
                <VStack>
                  <BodyLarge>{t("Mrs. Jina Jain")}</BodyLarge>
                  <Subtitle color={colors.lightGray2}>
                    {t("12 January, 4:00PM")}
                  </Subtitle>
                </VStack>
              </HStack>
            </Box>
          ))}
      </VStack>
    </Actionsheet>
  );
}
