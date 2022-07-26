import React from "react";
import { Layout, Tab, H2, overrideColorTheme } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Box, VStack } from "native-base";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
import MyCoursesRoute from "../components/MyCoursesRoute";
import MyVideosRoute from "../components/MyVideosRoute";
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
        <Box mb="4" roundedBottom={"xl"} shadow={2}>
          <Tab
            _box={{ bg: colors.white, px: "5", pt: "5" }}
            routes={[
              {
                title: t("MY_COURSES"),
                component: <MyCoursesRoute {...{ appName }} />,
              },
              { title: t("MY_VIDEOS"), component: <MyVideosRoute /> },
            ]}
          />
        </Box>
      </VStack>
    </Layout>
  );
}
