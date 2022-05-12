import React, { useEffect, useState } from "react";
import { Stack, Box, VStack, FlatList } from "native-base";
import * as studentServiceRegistry from "../../services/studentServiceRegistry";
import * as classServiceRegistry from "../../services/classServiceRegistry";
import { useTranslation } from "react-i18next";
import { Layout, H2, H4 } from "@shiksha/common-lib";
import { useParams } from "react-router-dom";
import Card from "../../components/students/Card";
import manifest from "../../manifest.json";
import Collapsible from "./Molecules/Collapsible";
import ButtonWrapper from "atoms/ButtonWrapper";

// Start editing here, save and see your changes.
const Student = ({ footerLinks }) => {
  const { t } = useTranslation();
  const [students, setStudents] = useState([]);
  const [classObject, setClassObject] = useState({});
  const { classId } = useParams();

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      setStudents(await studentServiceRegistry.getAll({ classId }));

      let classObj = await classServiceRegistry.getOne({ id: classId });

      if (!ignore) setClassObject(classObj);
    };
    getData();
  }, [classId]);

  return (
    <Layout
      _header={{
        title: classObject.name,
        subHeading: t("STUDENTS_DETAIL"),
        avatar: true,
      }}
      subHeader={<H2 fontWeight="400">{t("VIEW_ALL_STUDENTS")}</H2>}
      _subHeader={{ bg: "studentCard.500" }}
      _appBar={{ languages: manifest.languages }}
      _footer={footerLinks}
    >
      <Box bg="white" p={4}>
        <Stack space={2}>
          <Collapsible
            defaultCollapse={true}
            isHeaderBold={false}
            header={
              <>
                <VStack>
                  <H2 fontWeight="600" color="gray.800">
                    {t("STUDENTS_LIST")}
                  </H2>
                  <H4 fontSize={"xs"}>
                    {t("TOTAL") + ": " + students?.length}
                  </H4>
                </VStack>
              </>
            }
            body={
              <VStack space={2} pt="2">
                <Box>
                  <FlatList
                    data={students}
                    renderItem={({ item }) => (
                      <Box
                        borderBottomWidth="1"
                        _dark={{
                          borderColor: "gray.600",
                        }}
                        borderColor="coolGray.200"
                        pr="1"
                        py="4"
                      >
                        <Card item={item} href={"/students/" + item.id} />
                      </Box>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </Box>
                <ButtonWrapper mt="2" variant="outline" colorScheme="button">
                  {t("SEE_ALL_STUDENTS")}
                </ButtonWrapper>
              </VStack>
            }
          />
        </Stack>
      </Box>
    </Layout>
  );
};

export default Student;
