import React from "react";
import { Text, Box, Pressable } from "native-base";
import { useTranslation } from "react-i18next";
import { capture, Layout, Tab } from "@shiksha/common-lib";
import moment from "moment";
import manifest from "../manifest.json";

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
        title: t("MY_CLASSES"),
        subHeading: moment().format("hh:mm A"),
        _subHeading: { fontWeight: 500, textTransform: "uppercase" },
        avatar: true,
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("THE_CLASSES_YOU_TAKE")}
      _subHeader={{
        bg: "classCard.500",
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
            { title: t("MY_CLASSES"), component: <MyClassRoute /> },
            { title: t("TIME_TABLE"), component: <TimeTableRoute /> },
          ]}
        />
      </Box>
    </Layout>
  );
};

export default MyClasses;
