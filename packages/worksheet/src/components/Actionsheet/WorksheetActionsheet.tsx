// Lib
import {
  BodyMedium,
  Caption,
  H2,
  IconByName,
  overrideColorTheme,
  Subtitle,
} from "@shiksha/common-lib";
import {
  Actionsheet,
  Avatar,
  Box,
  HStack,
  Pressable,
  Stack,
  VStack,
} from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";

// Components
import AvatarGroup from "components/AvatarGroup";

// Utils
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);
import { avatarObjProps } from "constants/avatarsData/avatarsData";
import { AttributeData } from "constants/attributeData/attributeData";

export default function Worksheet({
  worksheetConfig,
  worksheet,
  showModuleWorksheet,
  setShowModuleWorksheet,
  handleCommentModuleOpen,
  likeCount,
  commentCount,
  footer,
}) {
  const { t } = useTranslation();
  return (
    <Actionsheet
      isOpen={showModuleWorksheet}
      onClose={() => setShowModuleWorksheet(false)}
    >
      <Actionsheet.Content alignItems={"left"}>
        <Stack p={5} pt={2} pb="15px" textAlign="center">
          <H2>{worksheet?.name ? worksheet?.name : ""}</H2>
        </Stack>
        {/* @ts-ignore */}
        <IconByName
          color={"worksheet.lightGray2"}
          position="absolute"
          top="10px"
          right="10px"
          name="CloseCircleLineIcon"
          onPress={(e) => setShowModuleWorksheet(false)}
        />
      </Actionsheet.Content>
      <Box bg={"worksheet.white"} width={"100%"} p="5">
        <VStack space="4">
          <BodyMedium
            color={"worksheet.messageInfo"}
            textTransform="inherit"
            textAlign="center"
          >
            {worksheet?.description}
          </BodyMedium>
          <AttributeComponent
            data={AttributeData.filter((e) =>
              worksheetConfig.includes(e.attribute)
            )}
            object={worksheet}
          />

          {!footer ? (
            <HStack space={5} alignItems="center">
              <HStack alignItems="center">
                <IconByName
                  name="Heart3FillIcon"
                  color={"worksheet.error"}
                  _icon={{ size: 12 }}
                  isDisabled
                />
                <Subtitle>
                  {likeCount} {t("TEACHERS_LIKE_THIS")}
                </Subtitle>
              </HStack>
              <Pressable
                // @ts-ignore
                onPress={(e) =>
                  handleCommentModuleOpen
                    ? handleCommentModuleOpen()
                    : console.log("not found handleCommentModuleOpen")
                }
              >
                <HStack alignItems="center">
                  <AvatarGroup avatarList={avatarObjProps} />
                  <Subtitle color={colors.primary}>
                    {commentCount} {t("COMMENTS")}
                  </Subtitle>
                </HStack>
              </Pressable>
            </HStack>
          ) : (
            footer
          )}
        </VStack>
      </Box>
    </Actionsheet>
  );
}

const AttributeComponent = ({ data, object }) => {
  const { t } = useTranslation();

  const elements = data.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <VStack space="2">
      {elements.map((attributes, index) => (
        <HStack key={index}>
          {attributes.map((item, subIndex) => (
            <HStack
              key={subIndex}
              space="1"
              alignItems="center"
              w={100 / attributes.length + "%"}
            >
              <IconByName
                isDisabled
                name={item.icon}
                _icon={{ size: 14 }}
                color={"worksheet.darkGary4"}
                p="0"
              />
              <BodyMedium color={"worksheet.darkGary4"}>
                {t(item?.label) +
                  " : " +
                  (object?.[item.attribute]
                    ? Array.isArray(object?.[item.attribute])
                      ? object?.[item.attribute].length
                      : object?.[item.attribute]
                    : "")}
              </BodyMedium>
            </HStack>
          ))}
        </HStack>
      ))}
    </VStack>
  );
};
