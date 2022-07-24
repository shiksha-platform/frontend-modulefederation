// Lib
import * as React from "react";
import { Box, Actionsheet, HStack, Stack, Pressable, Text } from "native-base";
import { H2, IconByName, capture } from "@shiksha/common-lib";

// Utils
import * as TelemetryFactory from "utils/functions/TelemetryFactoryMapper";
import { colorTheme } from "utils/functions/ColorTheme";
import { useTranslation } from "react-i18next";

export const CompareAttendanceModal = ({
  showModal,
  setShowModal,
  appName,
  navigate,
  setCompare,
  classId,
}) => {
  const { t } = useTranslation();
  return (
    <Actionsheet
      isOpen={showModal}
      _backdrop={{ opacity: "0.9", bg: "gray.500" }}
    >
      <Actionsheet.Content
        p="0"
        alignItems={"left"}
        bg={colorTheme.reportCardBackg}
      >
        <HStack justifyContent={"space-between"}>
          <Stack p={5} pt={2} pb="25px">
            <H2 color={colorTheme.black}>
              {t("SELECT_CLASS_MARK_ATTENDANCE")}
            </H2>
          </Stack>
          {
            // @ts-ignore
            <IconByName
              name="CloseCircleLineIcon"
              mr="5"
              mb="5"
              p="5px"
              color={colorTheme.reportCardCloseIcon}
              onPress={(e) => setShowModal(false)}
              _icon={{ size: "25" }}
            />
          }
        </HStack>
      </Actionsheet.Content>

      <Box w="100%" bg={colorTheme.white}>
        {[
          { name: t("PREVIOUS_WEEK"), value: "week" },
          { name: t("PREVIOUS_MONTH"), value: "monthInDays" },
          // { name: t("BEST_PERFORMANCE"), value: "best-performance" },
          // { name: t("ANOTHER_SCHOOL"), value: "another-school" },
          {
            name: t("DONT_SHOW_COMPARISON"),
            value: "dont-show-comparison",
          },
        ].map((item, index) => {
          return (
            <Pressable
              p="5"
              borderBottomWidth={1}
              borderBottomColor={colorTheme.coolGray}
              key={index}
              // @ts-ignore
              onPress={(e) => {
                if (item?.value === "dont-show-comparison") {
                  navigate(-1);
                } else {
                  setCompare(item.value);
                  setShowModal(false);
                  const telemetryData = TelemetryFactory.interact({
                    appName,
                    type: "Attendance-Compare-Report",
                    groupID: classId,
                    typeOfComparison: item.name,
                  });
                  capture("INTERACT", telemetryData);
                }
              }}
            >
              <Text>{item.name}</Text>
            </Pressable>
          );
        })}
      </Box>
    </Actionsheet>
  );
};
