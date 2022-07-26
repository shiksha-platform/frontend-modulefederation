// Lib
import * as React from "react";
import { Actionsheet, HStack, Stack, Box, Pressable, Text } from "native-base";
import { H2, IconByName } from "@shiksha/common-lib";
import { GetIcon } from "./GetIcon";

// Utils
import { GetStatusFromManifest } from "utils/functions/GetStatusFromManifest";
import { colorTheme } from "utils/functions/ColorTheme";
import { useTranslation } from "react-i18next";

export const MarkAttendanceModal = ({
  manifest,
  showModal,
  setShowModal,
  attendanceObject,
  markAttendance,
}) => {
  const status = GetStatusFromManifest(manifest);
  const { t } = useTranslation();
  return (
    <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
      <Actionsheet.Content alignItems={"left"} bg={colorTheme.bgMarkAttendance}>
        <HStack justifyContent={"space-between"}>
          <Stack p={5} pt={2} pb="25px">
            <H2 color={colorTheme.white}>{t("MARK_ATTENDANCE")}</H2>
          </Stack>
          {
            // @ts-ignore
            <IconByName
              name="CloseCircleLineIcon"
              color={colorTheme.white}
              onPress={(e) => setShowModal(false)}
            />
          }
        </HStack>
      </Actionsheet.Content>
      <Box w="100%" p={4} justifyContent="center" bg={colorTheme.white}>
        {status.map((item) => {
          return (
            <Pressable
              key={item}
              p={3}
              // @ts-ignore
              onPress={(e) => {
                if (attendanceObject.attendance !== item) {
                  markAttendance({
                    ...attendanceObject,
                    attendance: item,
                  });
                } else {
                  setShowModal(false);
                }
              }}
            >
              <HStack alignItems="center" space={2}>
                <GetIcon status={item} _box={{ p: 2 }} />
                <Text color={colorTheme.darkGray} bold fontSize="lg">
                  {t(item)}
                </Text>
              </HStack>
            </Pressable>
          );
        })}
      </Box>
    </Actionsheet>
  );
};
