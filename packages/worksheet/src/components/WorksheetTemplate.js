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
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const HtmlPrint = ({ html }) => {
  const createMarkup = (markup) => {
    return { __html: markup };
  };
  return (
    <div style={{ questionDiv: { display: "flex" } }}>
      <div dangerouslySetInnerHTML={createMarkup(html)} />
    </div>
  );
};

export default function WorksheetTemplate({
  onPress,
  templates,
  _templateBox,
  _fullTemplateBox,
  _box,
}) {
  const { t } = useTranslation();
  const [selected, setSelectData] = React.useState();

  const handleTemplateSelect = (value) => {
    setSelectData(value);
  };

  const handleContinue = (e) => {
    onPress(selected, e);
  };

  return (
    <Box>
      <Box bg={colors.worksheetCardBg} p="5" {..._box}>
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
          {Array.isArray(templates) &&
            templates.map((item, index) => {
              const color =
                selected === item.id
                  ? _templateBox?.activeColor
                  : _templateBox?.bg;
              return (
                <Pressable
                  key={index}
                  mb="10"
                  onPress={(e) => handleTemplateSelect(item.id)}
                >
                  <Box {..._fullTemplateBox}>
                    <Box p="5" alignItems="center" {..._templateBox} bg={color}>
                      <HtmlPrint html={item?.body} />
                    </Box>
                    <VStack px="5" py="2">
                      <H1>
                        {t("TEMPLATE_NO")}. {index + 1}
                      </H1>
                    </VStack>
                  </Box>
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
            onPress={handleContinue}
          >
            {t("CONTINUE")}
          </Button>
        </Button.Group>
      </Box>
    </Box>
  );
}
