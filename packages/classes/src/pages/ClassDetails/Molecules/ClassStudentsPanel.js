import React, { Suspense } from "react";
import { Collapsible } from "@shiksha/common-lib";
import { VStack, Box, FlatList } from "native-base";
import { useTranslation } from "react-i18next";
import ButtonWrapper from "atoms/ButtonWrapper";
import LinkWrapper from "atoms/LinkWrapper";

const ClassStudentsPanel = ({ classObject, students }) => {
  const { t } = useTranslation();
  const Card = React.lazy(() => import("students/Card"));

  return (
    <Collapsible defaultCollapse={true} header={t("STUDENTS")}>
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
                <Suspense fallback="loading">
                  <Card item={item} href={`/students/${item.id}`} />
                </Suspense>
              </Box>
            )}
            keyExtractor={(item) => item.id}
          />
        </Box>
        <LinkWrapper
          style={{
            textDecoration: "none",
          }}
          to={`/class/students/${classObject?.id?.replace("1-", "")}`}
        >
          <ButtonWrapper mt="2" variant="outline" colorScheme="button">
            {t("SHOW_ALL_STUDENTS")}
          </ButtonWrapper>
        </LinkWrapper>
      </VStack>
    </Collapsible>
  );
};

export default ClassStudentsPanel;
