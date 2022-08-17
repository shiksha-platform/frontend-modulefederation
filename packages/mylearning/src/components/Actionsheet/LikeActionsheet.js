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
import moment from "moment";
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
                  {...(item?.userData?.image &&
                  item?.userData?.image !== "" &&
                  item?.userData?.image !== "string"
                    ? {
                        source: {
                          uri: item?.userData?.image,
                        },
                      }
                    : {})}
                >
                  <H2 color="white">
                    {`${item?.userData?.firstName} ${item?.userData?.lastName}`
                      ?.toUpperCase()
                      .trim()
                      .substr(0, 2)}
                  </H2>
                </Avatar>
                <VStack>
                  <BodyLarge>{`${item?.userData?.firstName} ${item?.userData?.lastName}`}</BodyLarge>
                  <Subtitle color={colors.lightGray2}>
                    {moment(item.createdAt).format("DD MMM YYYY")}
                  </Subtitle>
                </VStack>
              </HStack>
            </Box>
          ))}
      </VStack>
    </Actionsheet>
  );
}
