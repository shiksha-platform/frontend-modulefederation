import React from "react";
import {
  Layout,
  SubMenu,
  Tab,
  classRegistryService,
  overrideColorTheme,
  H2,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Actionsheet, Box, Button } from "native-base";
import { teachingMaterial } from "./../config/teachingMaterial";
import { useNavigate } from "react-router-dom";
import manifest from "../manifest.json";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function Teaching({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [clasess, setClasses] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const teacherId = localStorage.getItem("id");
  const schoolId = localStorage.getItem("schoolId");

  const navigate = useNavigate();
  React.useEffect(() => {
    let ignore = false;
    async function getData() {
      setClasses(
        await classRegistryService.getAllData({
          filters: {
            schoolId: { eq: schoolId },
            teacherId: { neq: teacherId },
          },
        })
      );
    }
    getData();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <Layout
      _header={{
        title: t("MY_TEACHING"),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <H2 textTransform="none">
          {t(
            "Access and plan your teaching material, like worksheets and lesson plans"
          )}
        </H2>
      }
      _subHeader={{ bg: colors.cardBg }}
      _footer={footerLinks}
    >
      <Box bg={colors.white} p="5" mb="4" roundedBottom={"xl"} shadow={2}>
        <Tab
          routes={[
            {
              title: t("Teaching Material"),
              component: <MyTeaching data={teachingMaterial} />,
            },
            { title: t("Schedule"), component: <Schedule /> },
          ]}
        />
        <Actionsheet isOpen={isOpen} onClose={(e) => setIsOpen(false)}>
          <Actionsheet.Content>
            {clasess.map((item, index) => (
              <Actionsheet.Item
                key={index}
                onPress={(e) => navigate(`/worksheet/${item?.id}/view`)}
              >
                {item?.name}
              </Actionsheet.Item>
            ))}
          </Actionsheet.Content>
        </Actionsheet>
        <Box p="5">
          <Button variant="outline" onPress={(e) => setIsOpen(true)}>
            {t("CHOOSE_ANOTHER_CLASS")}
          </Button>
        </Box>
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
          onPress: (e) => navigate(`/worksheet/${item.id}/view`),
        }}
      />
    );
  });
};

const Schedule = () => {
  return <h4>Schedule</h4>;
};
