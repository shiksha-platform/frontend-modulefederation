import React from "react";
import { Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";


const InfoSection = ({ items, isLastBorderEnable }) => {
    const { t } = useTranslation();
    return items.map((item, index) => (
      <VStack
        space="3"
        py="5"
        borderBottomWidth={
          items.length - 1 !== index || isLastBorderEnable ? "1" : "0"
        }
        borderColor={"coolGray.200"}
        key={index}
      >
        <Text fontSize={"14px"} fontWeight="500" color={"coolGray.400"}>
          {item.title}
        </Text>
        {item.value ? (
          <Text>{item.value}</Text>
        ) : (
          <Text italic>{t("NOT_ENTERED")}</Text>
        )}
      </VStack>
    ));
  };
  
  export default InfoSection;