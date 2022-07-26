// Lib
import * as React from "react";
import { VStack, Button } from "native-base";
import { Caption } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { colorTheme } from "utils/functions/ColorTheme";

export const MultipleAttendanceFooter = ({
  modalClose,
  navigate,
  classObject,
}) => {
  const { t } = useTranslation();
  return (
    <VStack space={"15px"} alignItems={"center"}>
      <Caption textAlign={"center"}>
        {t("ATTENDANCE_WILL_AUTOMATICALLY_SUBMIT")}
      </Caption>
      <Button.Group width="100%">
        <Button
          flex={1}
          variant="outline"
          colorScheme="button"
          // @ts-ignore
          onPress={(e) => modalClose()}
        >
          {t("CLOSE")}
        </Button>
        <Button
          flex={1}
          colorScheme="button"
          _text={{ color: colorTheme.white }}
          // @ts-ignore
          onPress={(e) =>
            navigate(
              "/attendance/report/" +
                (classObject?.id?.startsWith("1-")
                  ? classObject?.id?.replace("1-", "")
                  : classObject?.id) +
                "/days"
            )
          }
        >
          {t("SEE_FULL_REPORT")}
        </Button>
      </Button.Group>
    </VStack>
  );
};
