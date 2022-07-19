import {
  H1,
  H3,
  IconByName,
  Layout,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { Box, Button, HStack, Skeleton, Stack, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function WorksheetTemplate({ footerLinks, appName }) {
  const { t } = useTranslation();
  return (
    <Layout
      _header={{
        title: t("WORKSHEET_TEMPLATE"),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("SELECT_TEMPLATE")}
      _subHeader={{ bg: colors.cardBg }}
      _footer={footerLinks}
    >
      <Box bg={colors.cardBgLight} p="5">
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
          {["", "", ""].map((item, index) => (
            <Box key={index} m="10px" mb="10">
              <Box bg={colors.white} p="5" alignItems="center">
                <VStack w="100%" space="5">
                  <HStack w="100%" space="5">
                    <Box bg={colors.grayLight} w="44px" h="44px" />
                    <Stack space="2" flex="1">
                      <Box bg={colors.grayLight} h="13px" />
                      <Box bg={colors.grayLight} h="22px" />
                    </Stack>
                  </HStack>
                  {["", "", ""].map((subItem, index) => (
                    <VStack key={index} w="100%" space="2">
                      <Box bg={colors.grayLight} w="18px" h="10px" />
                      <Box bg={colors.grayLight} h="32px" />
                    </VStack>
                  ))}
                  <VStack w="100%" space="2">
                    <Box bg={colors.grayLight} h="10px" w="25%" />
                    {["", "", ""].map((subItem, index) => (
                      <HStack key={index} space="4">
                        <Box bg={colors.grayLight} h="10px" flex="1" />
                        <Box bg={colors.grayLight} h="10px" flex="1" />
                      </HStack>
                    ))}
                  </VStack>
                </VStack>
              </Box>
              <VStack p="5">
                <H1>Template No. {index + 1}</H1>
                <H3>Worksheet with answers along with each question.</H3>
              </VStack>
            </Box>
          ))}
        </Carousel>
      </Box>
      <Box bg={colors.white} p="5" position="sticky" bottom="85" shadow={2}>
        <Button.Group>
          <Button
            flex="1"
            colorScheme="button"
            _text={{ color: colors.white }}
            px="5"
          >
            {t("CONTINUE")}
          </Button>
        </Button.Group>
      </Box>
    </Layout>
  );
}
