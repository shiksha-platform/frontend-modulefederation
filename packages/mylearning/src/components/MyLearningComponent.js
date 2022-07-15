import React from "react";
import { BodyLarge, H2, overrideColorTheme } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Box, Button, HStack, Stack, VStack } from "native-base";
import { useNavigate } from "react-router-dom";
import CourseBox from "./CourseBox";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

export default function MyLearningComponent({
  data,
  leftTitle,
  rightTitle,
  seeButton,
  seeButtonText,
  _seeButton,
  _courseBox,
  appName,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Stack>
      <HStack justifyContent="space-between" py="5" alignItems="center">
        {leftTitle ? <H2>{leftTitle}</H2> : ""}
        {rightTitle ? (
          <Button variant="ghost" onPress={(e) => navigate("/mylearning/list")}>
            <BodyLarge color={colors.primary}>{rightTitle}</BodyLarge>
          </Button>
        ) : (
          <React.Fragment />
        )}
      </HStack>
      {data.length > 0 ? (
        <Stack>
          <VStack space={3}>
            {data.map((item, index) => {
              return (
                <CourseBox
                  appName={appName}
                  canShare={true}
                  key={index}
                  {...{ item, url: `/mylearning/${item.id}/view` }}
                  {..._courseBox}
                />
              );
            })}
          </VStack>
          {seeButton ? (
            seeButton
          ) : (
            <Button
              mt="2"
              variant="outline"
              colorScheme="button"
              rounded="lg"
              onPress={(e) => navigate("/mylearning/list")}
              {..._seeButton}
            >
              {seeButtonText}
            </Button>
          )}
        </Stack>
      ) : (
        <Box
          p="10"
          my="5"
          alignItems={"center"}
          rounded="lg"
          bg={colors.viewNotificationDark}
        >
          {t("LEARNING_NOT_FOUND")}
        </Box>
      )}
    </Stack>
  );
}
