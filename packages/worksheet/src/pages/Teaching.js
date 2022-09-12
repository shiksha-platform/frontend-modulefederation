import React from "react";
import {
  Layout,
  SubMenu,
  Tab,
  classRegistryService,
  H2,
  IconByName,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import {
  Actionsheet,
  Box,
  Button,
  HStack,
  Pressable,
  ScrollView,
  Stack,
} from "native-base";
import { useNavigate } from "react-router-dom";
import manifest from "../manifest.json";

export default function Teaching({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [otherClasses, setOtherClasses] = React.useState([]);
  const [clasess, setClasses] = React.useState([]);

  const [isOpen, setIsOpen] = React.useState(false);
  const teacherId = localStorage.getItem("id");
  const schoolId = localStorage.getItem("schoolId");

  const navigate = useNavigate();
  React.useEffect(() => {
    let ignore = false;
    async function getData() {
      setOtherClasses(
        await classRegistryService.getGradeSubjectsQuery({
          schoolId: { eq: schoolId },
          teacherId: { neq: teacherId },
        })
      );
      setClasses(
        await classRegistryService.getGradeSubjects({
          teacherId: teacherId,
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
      _subHeader={{ bg: "worksheet.cardBg" }}
      _footer={footerLinks}
    >
      <Box bg={"worksheet.white"} p="5" mb="4" roundedBottom={"xl"} shadow={2}>
        <Tab
          routes={[
            {
              title: t("Teaching Material"),
              component: <MyTeaching data={clasess} />,
            },
            { title: t("Schedule"), component: <Schedule /> },
          ]}
        />
        <Actionsheet isOpen={isOpen} onClose={(e) => setIsOpen(false)}>
          <Actionsheet.Content alignItems={"left"} bg={"worksheet.cardBg"}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="15px">
                <H2 textTransform="none">{t("CHOOSE_ANOTHER_CLASS")}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={"worksheet.gray"}
                onPress={() => setIsOpen(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box bg={"white"} width={"100%"} maxH="80%">
            <ScrollView>
              {otherClasses.map((item, index) => (
                <Pressable
                  key={index}
                  p="5"
                  onPress={(e) =>
                    navigate(`/worksheet/${item?.id}/${item?.subjectName}`)
                  }
                >
                  {`${item.name} • Sec ${item.section} • ${item.subjectName}`}
                </Pressable>
              ))}
            </ScrollView>
          </Box>
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
        _icon={{ isDisabled: true }}
        item={{
          title: `${item.name} • Sec ${item.section} • ${item.subjectName}`,
          onPress: (e) =>
            navigate(`/worksheet/${item?.id}/${item?.subjectName}`),
        }}
      />
    );
  });
};

const Schedule = () => {
  return <h4>Schedule</h4>;
};
