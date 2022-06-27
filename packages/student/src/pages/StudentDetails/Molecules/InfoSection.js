import React from "react";
import { Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";
import { BodySmall, H3, overrideColorTheme } from "@shiksha/common-lib";
import colorTheme from "../../../colorTheme";

const colors = overrideColorTheme(colorTheme);

const InfoSection = ({ items, isLastBorderEnable }) => {
  const { t } = useTranslation();
  return items.map((item, index) => (
    <VStack
      space="3"
      py="5"
      borderBottomWidth={
        items.length - 1 !== index || isLastBorderEnable ? "1" : "0"
      }
      borderColor={colors.coolGraylight}
      key={index}
    >
      <H3 color={colors.labelColor}>{item.title}</H3>
      {item.value ? (
        <BodySmall>{item.value}</BodySmall>
      ) : (
        <BodySmall italic>{t("NOT_ENTERED")}</BodySmall>
      )}
    </VStack>
  ));
};

export default InfoSection;
