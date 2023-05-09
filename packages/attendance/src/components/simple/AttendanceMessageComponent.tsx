// Lib
import * as React from "react";
import { useTranslation } from "react-i18next";
import { VStack, Button } from "native-base";
import { BodyLarge, Caption } from "@shiksha/common-lib";
import { capture } from "@shiksha/common-lib";

// Utils
import * as TelemetryFactoryMapper from "utils/functions/TelemetryFactoryMapper";
import { colorTheme } from "utils/functions/ColorTheme";

export const AttendanceMessageComponent = ({
  navigate,
  appName,
  classObject,
}) => {
  const { t } = useTranslation();
  return (
    <VStack space={2}>
      <BodyLarge>
        {t("VIEW_SEND_ATTENDANCE_RELATED_MESSAGES_TO_STUDENTS")}
      </BodyLarge>
      <Caption>{t("STUDENTS_ABSENT")}</Caption>

      <Button.Group>
        <Button
          variant="outline"
          flex="1"
          // @ts-ignore
          onPress={(e) => {
            const telemetryData = TelemetryFactoryMapper.interact({
              appName,
              type: "Attendance-Notification-View-Message",
            });
            capture("INTERACT", telemetryData);
            navigate(
              "/attendance/sendSms/" +
                (classObject?.id?.startsWith("1-")
                  ? classObject?.id?.replace("1-", "")
                  : classObject?.id)
            );
          }}
        >
          {t("VIEW_MESSAGE")}
        </Button>
        <Button
          _text={{ color: colorTheme.white }}
          flex="1"
          // @ts-ignore
          onPress={(e) => {
            const telemetryData = TelemetryFactoryMapper.interact({
              appName,
              type: "Attendance-Notification-View-Message",
            });
            capture("INTERACT", telemetryData);
            navigate("/notification/create");
          }}
        >
          {t("SEND_ANOTHER_MESSAGE")}
        </Button>
      </Button.Group>
    </VStack>
  );
};
