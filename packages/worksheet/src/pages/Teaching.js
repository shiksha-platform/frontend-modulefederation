import React from "react";
import { Layout, SubMenu, Tab } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Box, Button } from "native-base";
import { teachingMaterial } from "./../config/teachingMaterial";
import { useNavigate } from "react-router-dom";
import manifest from "../manifest.json";

export default function Teaching({ footerLinks, appName }) {
  const { t } = useTranslation();

  return (
    <Layout
      _header={{
        title: t("MY_TEACHING"),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={t("ACCESS_AND_PLAN_YOUR_TEACHING_MATERIAL")}
      _subHeader={{ bg: "worksheetCard.500" }}
      _footer={footerLinks}
    >
      <Box bg="white" p="5" mb="4" roundedBottom={"xl"} shadow={2}>
        <Tab
          routes={[
            {
              title: t("Teaching Material"),
              component: <MyTeaching data={teachingMaterial} />,
            },
            { title: t("Schedule"), component: <Schedule /> },
          ]}
        />

        <Button _text={{ color: "white" }} p="3">
          {t("Choose another Class")}
        </Button>
      </Box>
    </Layout>
  );
}

const MyTeaching = ({ data }) => {
  const navigate = useNavigate();
  return data.map((item, index) => {
    return (
      <SubMenu
        _boxMenu={{ p: 5, borderLeftWidth: 0 }}
        key={index}
        item={{
          title: `${item.name} • ${item.subjectName}`,
          onPress: (e) => navigate("/teaching/:id"),
        }}
      />
    );
  });
};

const Schedule = () => {
  return <h4>Schedule</h4>;
};
