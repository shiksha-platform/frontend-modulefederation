import React from "react";
import { Text, Box, Pressable } from "native-base";
import { useTranslation } from "react-i18next";
import {
  capture,
  Layout,
  Tab,
  overrideColorTheme,
  H3,
} from "@shiksha/common-lib";
import moment from "moment";
import manifest from "../manifest.json";
const colors = overrideColorTheme();

const MyClassRoute = React.lazy(() => import("classes/MyClassRoute"));
const TimeTableRoute = React.lazy(() => import("calendar/TimeTableRoute"));

const MyClasses = ({ footerLinks }) => {
  const { t } = useTranslation();

  React.useEffect(() => {
    capture("PAGE");
  }, []);

  return (
    <Layout
      _header={{
        title: t("MY_CLASS"),
        subHeading: moment().format("hh:mm A"),
        avatar: true,
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={<H3 textTransform="none">{t("THE_CLASS_YOU_TAKE")}</H3>}
      _subHeader={{
        bg: colors?.cardBg,
        _text: {
          fontSize: "16px",
          fontWeight: "600",
          textTransform: "inherit",
        },
      }}
      _footer={footerLinks}
    >
      <Box bg="white" p="5" mb="4" roundedBottom={"xl"} shadow={2}>
        <Tab
          routes={[
            { title: t("MY_CLASS"), component: <MyClassRoute /> },
            { title: t("TIME_TABLE"), component: <TimeTableRoute /> },
          ]}
        />
      </Box>
    </Layout>
  );
};

export default MyClasses;
