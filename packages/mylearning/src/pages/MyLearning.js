import React from "react";
import { Layout, Tab, H2, overrideColorTheme } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Box, VStack } from "native-base";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
import MyLearningRoute from "../components/MyLearningRoute";
const colors = overrideColorTheme(colorTheme);

export default function App({ footerLinks, appName }) {
  const { t } = useTranslation();

  return (
    <Layout
      _header={{
        title: t("MY_LEARNING"),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <H2 textTransform="inherit">{t("ACCESS_ALL_TRAINING_COURSES")}</H2>
      }
      _subHeader={{ bg: colors.cardBg }}
      _footer={footerLinks}
    >
      <VStack>
        <Box bg={colors.white} p="5" mb="4" roundedBottom={"xl"} shadow={2}>
          <Tab
            routes={[
              {
                title: t("MY_LEARNING"),
                component: <MyLearningRoute {...{ appName }} />,
              },
              { title: t("MY_VIDEOS"), component: <MyVideos /> },
            ]}
          />
        </Box>
      </VStack>
    </Layout>
  );
}

const MyVideos = () => {
  return <h4>MyVideos</h4>;
};
