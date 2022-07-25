import {
  H1,
  H3,
  IconByName,
  overrideColorTheme,
  telemetryFactory,
  capture,
} from "@shiksha/common-lib";
import { HStack, Stack, Button, Box, VStack, Pressable } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function WorksheetTemplate({ onPress }) {
  const { t } = useTranslation();
  const [selected, setSelectData] = React.useState();

  const handleTemplateSelect = (value) => {
    setSelectData(value);
  };

  return (
    <Box>
      <Box bg={colors.worksheetCardBg} p="5">
        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          renderIndicator={(nextFun, value) => {
            return (
              <IconByName
                onPress={(e) => nextFun()}
                display="inline-block"
                name={
                  value ? "RecordCircleFillIcon" : "CheckboxBlankCircleLineIcon"
                }
                color={colors.primary}
                p="1"
              />
            );
          }}
        >
          {["", "", ""].map((item, index) => {
            const color =
              selected === index ? colors.primaryNormal : colors.lightGray3;
            return (
              <Pressable
                key={index}
                m="10px"
                mb="10"
                onPress={(e) => handleTemplateSelect(index)}
              >
                <Box bg={colors.white} p="5" alignItems="center">
                  <VStack w="100%" space="5">
                    <HStack w="100%" space="5">
                      <Box bg={color} w="44px" h="44px" />
                      <Stack space="2" flex="1">
                        <Box bg={color} h="13px" />
                        <Box bg={color} h="22px" />
                      </Stack>
                    </HStack>
                    {["", "", ""].map((subItem, index) => (
                      <VStack key={index} w="100%" space="2">
                        <Box bg={color} w="18px" h="10px" />
                        <Box bg={color} h="32px" />
                      </VStack>
                    ))}
                    <VStack w="100%" space="2">
                      <Box bg={color} h="10px" w="25%" />
                      {["", "", ""].map((subItem, index) => (
                        <HStack key={index} space="4">
                          <Box bg={color} h="10px" flex="1" />
                          <Box bg={color} h="10px" flex="1" />
                        </HStack>
                      ))}
                    </VStack>
                  </VStack>
                </Box>
                <VStack p="5">
                  <H1>Template No. {index + 1}</H1>
                  <H3 textTransform="none">
                    Worksheet with answers along with each question.
                  </H3>
                </VStack>
              </Pressable>
            );
          })}
        </Carousel>
      </Box>
      <Box bg={colors.white} p="5" position="sticky" bottom="85" shadow={2}>
        <Button.Group>
          <Button
            isDisabled={selected >= 0 ? false : true}
            flex="1"
            colorScheme="button"
            _text={{ color: colors.white }}
            px="5"
            onPress={onPress}
          >
            {t("CONTINUE")}
          </Button>
        </Button.Group>
      </Box>
    </Box>
  );
}
