import React, { Suspense } from "react";
import { Collapsible, overrideColorTheme } from "@shiksha/common-lib";
import { VStack, Box, FlatList, Button, useNativeBase } from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../../colorTheme";

const colors = overrideColorTheme(colorTheme);

const ClassStudentsPanel = ({ classObject, students }) => {
  const { t } = useTranslation();
  const Card = React.lazy(() => import("students/Card"));
  const navigate = useNavigate();
  return (
    <Collapsible defaultCollapse={true} header={t("STUDENTS")}>
      <VStack space={2} pt="2">
        <Box>
          <FlatList
            data={students?.slice(0, 4)}
            renderItem={({ item }) => (
              <Box
                borderBottomWidth="1"
                _dark={{
                  borderColor: colors.coolGraydark,
                }}
                borderColor={colors.coolGray}
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
        <Box px="5">
          <Button
            mt="2"
            variant="outline"
            colorScheme="button"
            onPress={(e) =>
              navigate(`/class/students/${classObject?.id?.replace("1-", "")}`)
            }
          >
            {t("SHOW_ALL_STUDENTS")}
          </Button>
        </Box>
      </VStack>
    </Collapsible>
  );
};

export default ClassStudentsPanel;
