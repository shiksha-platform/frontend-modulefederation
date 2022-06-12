import {
  H1,
  IconByName,
  Layout,
  Loading,
  useWindowSize,
} from "@shiksha/common-lib";
import WorksheetBox from "components/WorksheetBox";
import { Button, Box, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import manifest from "../../manifest.json";

export default function SuccessPage({ handleBackButton, formObject }) {
  const [width, height] = useWindowSize();
  const { t } = useTranslation();

  return (
    <Layout
      _appBar={{
        onPressBackButton: handleBackButton
          ? handleBackButton
          : (e) => console.log(e),
        languages: manifest.languages,
        color: "successAlertText.500",
        _box: { bg: "successAlert.500" },
      }}
    >
      <Loading
        width={width}
        height={height - 230}
        customComponent={
          <VStack space="2" flex="1" width={width}>
            <VStack bg="successAlert.500" pb="100px" pt="32px">
              <IconByName
                alignSelf="center"
                name="CheckboxCircleLineIcon"
                color="successAlertText.500"
                _icon={{ size: 100 }}
              />
              <Box alignSelf="center">
                <H1
                  fontSize="22px"
                  fontWeight="600"
                  color="successAlertText.500"
                >
                  Worksheet Published
                </H1>
              </Box>
            </VStack>
            <Box p="5">
              <WorksheetBox
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
