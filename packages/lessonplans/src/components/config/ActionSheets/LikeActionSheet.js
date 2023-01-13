import {
  IconByName,
  likeRegistryService,
  overrideColorTheme,
  BodySmall,
  BodyLarge,
  Subtitle,
  H2,
  userRegistryService,
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
  Text,
} from "native-base";
import React from "react";
import { Likes } from "../Likes";
import moment from "moment";
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
        {likes.map((item, index) => (
          <Box bg="white" p="5" key={index}>
            <HStack space="2" alignItems="center">
              <Avatar
                size="md"
                bg="blue.500"
                source={{
                  uri: item?.userData?.image,
                }}
              >
                {`${item?.userData?.firstName} ${item?.userData?.lastName}`
                  .toUpperCase()
                  .substring(0, 2)}
              </Avatar>
              <VStack>
                <HStack>
                  <BodyLarge>
                    {item.userId === localStorage.getItem("id")
                      ? "You"
                      : `${item?.userData?.firstName} ${item?.userData?.lastName}`}
                  </BodyLarge>
                  <Text>{t("LIKED_THIS")}</Text>
                </HStack>
                <Subtitle color="gray.400">
                  {moment(item?.createdAt).format("DD MMMM, hh:mma")}
                </Subtitle>
              </VStack>
            </HStack>
          </Box>
        ))}
      </VStack>
    </Actionsheet>
  );
}
