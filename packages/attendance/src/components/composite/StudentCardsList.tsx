// Lib
import * as React from "react";
import {
  HStack,
  VStack,
  Box,
  FlatList,
  Button,
  useTypeahead,
} from "native-base";
import { BodyLarge, Caption } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

// Components
// @ts-ignore
const Card = React.lazy(() => import("students/Card"));

// Utils
import { GetPercentage } from "utils/functions/GetPercentage";
import { colorTheme } from "utils/functions/ColorTheme";

export const StudentCardsList = ({
  thisTitle,
  lastTitle,
  data,
  appName,
  attendance,
  compareAttendance,
  _bgColor,
  _textColor,
  _textCompareColor,
}) => {
  const { t } = useTranslation();
  return (
    <VStack space={2} pt="2">
      <Box>
        <FlatList
          // @ts-ignore
          data={data}
          renderItem={({ item }) => (
            <Box
              borderWidth="1"
              borderColor={colorTheme.presentCardCompareBorder}
              bg={_bgColor}
              p="10px"
              rounded="lg"
              my="10px"
            >
              <React.Suspense fallback="loading">
                <Card
                  appName={appName}
                  item={item}
                  href={"/students/" + item.id}
                  hidePopUpButton
                  rightComponent={
                    <HStack space="2">
                      <VStack alignItems="center">
                        <BodyLarge color={_textColor}>
                          {GetPercentage(attendance, item) + "%"}
                        </BodyLarge>
                        <Caption color={_textColor}>{thisTitle}</Caption>
                      </VStack>
                      <VStack alignItems="center">
                        <BodyLarge color={_textCompareColor}>
                          {GetPercentage(compareAttendance, item) + "%"}
                        </BodyLarge>
                        <Caption color={_textCompareColor}>{lastTitle}</Caption>
                      </VStack>
                    </HStack>
                  }
                />
              </React.Suspense>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </Box>
      <Button mt="2" variant="outline" colorThemecheme="button" rounded="lg">
        {t("SEE_MORE")}
      </Button>
    </VStack>
  );
};
