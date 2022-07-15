import {
  H1,
  IconByName,
  Layout,
  Loading,
  useWindowSize,
  overrideColorTheme,
} from "@shiksha/common-lib";
import WorksheetBox from "components/WorksheetBox";
import { Button, Box, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import manifest from "../../manifest.json";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function SuccessPage({
  handleBackButton,
  formObject,
  appName,
  worksheetConfig,
}) {
  const [width, height] = useWindowSize();
  const { t } = useTranslation();

  return (
    <Layout
      _appBar={{
        onPressBackButton: handleBackButton
          ? handleBackButton
          : (e) => console.log(e),
        languages: manifest.languages,
        color: colors.success,
        _box: { bg: colors.alertBackground },
      }}
    >
      <Loading
        width={width}
        height={height - 230}
        customComponent={
          <VStack space="2" flex="1" width={width}>
            <VStack bg={colors.alertBackground} pb="100px" pt="32px">
              <IconByName
                alignSelf="center"
                name="CheckboxCircleLineIcon"
                color={colors.success}
                _icon={{ size: 100 }}
              />
              <Box alignSelf="center">
                <H1 color={colors.success}>Worksheet Published</H1>
              </Box>
            </VStack>
            <Box p="5">
              <WorksheetBox
                worksheetConfig={worksheetConfig}
                appName={appName}
                {...{
                  item: {
                    id: 1,
                    image: "",
                    subHeading: "NCERT Workbook",
                    class: "V",
                    likes: "4",
                    comments: "0",
                    description:
                      "Worksheets help the kids in exploring multiple concepts and ideas. They develop fine motor skills and logical thinking.",
                    subject: "Math",
                    level: "Beginner",
                    grade: "VI",
                    chapter: "3",
                    downloads: "3",
                    ...{
                      ...formObject,
                      ["heading"]: formObject?.name,
                      ["description"]: formObject?.description,
                    },
                  },
                }}
              />
            </Box>
          </VStack>
        }
      />
      <Box
        bg="white"
        p="5"
        position="fixed"
        bottom="0"
        shadow={2}
        width={width}
      >
        <Button
          colorScheme="button"
          _text={{ color: "white" }}
          px="5"
          flex="1"
          onPress={handleBackButton}
        >
          {t("Back to Worksheets")}
        </Button>
      </Box>
    </Layout>
  );
}
