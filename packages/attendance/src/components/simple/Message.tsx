import React from "react";
import moment from "moment";
import { Box, Button, HStack, VStack } from "native-base";
import { useTranslation } from "react-i18next";
import { IconByName, H3, H4, capture } from "@shiksha/common-lib";
// Utils
import { colors, colorTheme } from "utils/functions/ColorTheme";
import * as TelemetryFactory from "utils/functions/TelemetryFactoryMapper";

const Message = ({ item, isDisableRetry }) => {
  const { t } = useTranslation();
  return (
    <Box p="5" borderBottomWidth="1" borderBottomColor={colorTheme.coolGray}>
      <VStack space="2">
        <HStack space="1" justifyContent="space-between">
          <HStack space="1" alignItems="center">
            {/*@ts-ignore*/}
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
                const telemetryData = TelemetryFactory.interact({
                  //@ts-ignore
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
        <H4 color={colorTheme.grayInLight}>
          {moment(item.date).format("Do MMM, hh:ssa")}
        </H4>
        <H3>{item.message}</H3>
      </VStack>
    </Box>
  );
};

export default Message;
