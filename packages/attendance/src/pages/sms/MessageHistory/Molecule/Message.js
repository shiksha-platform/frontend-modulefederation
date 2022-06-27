import React from "react";
import moment from "moment";
import { Box, Button, HStack, VStack } from "native-base";
import { useTranslation } from "react-i18next";
import {
  IconByName,
  H3,
  H4,
  capture,
  telemetryFactory,
  overrideColorTheme,
} from "@shiksha/common-lib";
import colorTheme from "../../../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const Message = ({ item, isDisableRetry }) => {
  const { t } = useTranslation();
  return (
    <Box p="5" borderBottomWidth="1" borderBottomColor={colors.coolGray}>
      <VStack space="2">
        <HStack space="1" justifyContent="space-between">
          <HStack space="1" alignItems="center">
            <IconByName
              isDisabled
              name={
                item.status === "Send" ? "CheckDoubleLineIcon" : "SpamLineIcon"
              }
              color={item.status === "Send" ? colors.present : colors.absent}
            />
            <H3 fontWeight="500">
              {item.status === "Send" ? t("SENT") : t("FAILED")}
            </H3>
          </HStack>
          {item.status !== "Send" && !isDisableRetry ? (
            <Button
              variant="ghost"
              colorScheme="button"
              py="0"
              onPress={(e) => {
                const telemetryData = telemetryFactory.interact({
                  appName,
                  type: "Attendance-Notification-Message-Retried",
                  sentCount: 10,
                  failedCount: 5,
                });
                capture("INTERACT", telemetryData);
              }}
            >
              {t("RETRY")}
            </Button>
          ) : (
            ""
          )}
        </HStack>
        <H4 color={colors.grayInLight}>
          {moment(item.date).format("Do MMM, hh:ssa")}
        </H4>
        <H3>{item.message}</H3>
      </VStack>
    </Box>
  );
};

export default Message;
