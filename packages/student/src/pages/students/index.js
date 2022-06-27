import React, { useEffect, useState } from "react";
import { Stack, Box, VStack, FlatList, Button } from "native-base";
import { useTranslation } from "react-i18next";
import {
  Layout,
  H2,
  H4,
  capture,
  Collapsible,
  studentRegistryService,
  classRegistryService,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { useParams } from "react-router-dom";
import Card from "../../components/students/Card";
import manifest from "../../manifest.json";
import colorTheme from "../../colorTheme";

const colors = overrideColorTheme(colorTheme);

// Start editing here, save and see your changes.
const Student = ({ footerLinks }) => {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [classObject, setClassObject] = useState({});
  const { classId } = useParams();

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      setStudents(await studentRegistryService.getAll({ classId }));

      let classObj = await classRegistryService.getOne({ id: classId });

      if (!ignore) setClassObject(classObj);
    };
    getData();
  }, [classId]);

  useEffect(() => {
    capture("PAGE");
  }, []);

  return (
    <Layout
      _header={{
        title: classObject.name,
        subHeading: t("STUDENTS_DETAIL"),
        avatar: true,
      }}
      subHeader={<H2 fontWeight="400">{t("VIEW_ALL_STUDENTS")}</H2>}
      _subHeader={{ bg: colors.studentBg }}
      _appBar={{ languages: manifest.languages }}
      _footer={footerLinks}
    >
      <Box bg={colors.white} p={4}>
        <Stack space={2}>
          <Collapsible
            defaultCollapse={true}
            isHeaderBold={false}
            header={
              <>
                <VStack>
                  <H2 color={colors.darkGray}>{t("STUDENTS_LIST")}</H2>
                  <H4 fontSize={"xs"}>
                    {t("TOTAL") + ": " + students?.length}
                  </H4>
                </VStack>
              </>
            }
          >
            <VStack space={2} pt="2">
              <Box>
                <FlatList
                  data={students}
                  renderItem={({ item }) => (
                    <Box
                      borderBottomWidth="1"
                      _dark={{
                        borderColor: colors.darkGraylight,
                      }}
                      borderColor={colors.coolGraylight}
                      pr="1"
                      py="4"
                    >
                      <Card item={item} href={"/students/" + item.id} />
                    </Box>
                  )}
                  keyExtractor={(item) => item.id}
                />
              </Box>
            </VStack>
            {/* <Button mt="2" variant="outline" colorScheme="button">
              {t("SEE_ALL_STUDENTS")}
            </Button> */}
          </Collapsible>
        </Stack>
      </Box>
    </Layout>
  );
};

export default Student;
