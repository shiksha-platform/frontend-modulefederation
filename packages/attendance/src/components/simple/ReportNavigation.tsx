// Lib
import * as React from "react";
import { Menu, Button } from "native-base";
import { IconByName } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

// Utils
import { colorTheme } from "utils/functions/ColorTheme";

export const ReportNavigation = ({ calendarView, setCalendarView }) => {
  const { t } = useTranslation();
  return (
    <Menu
      w="120"
      placement="bottom right"
      trigger={(triggerProps) => {
        return (
          <Button
            {...triggerProps}
            rounded="20"
            px={5}
            py="7px"
            _text={{
              color: colorTheme.white,
              fontSize: "14px",
              lineHeight: "18px",
              fontWeight: "500",
              textTransform: "capitalize",
            }}
            rightIcon={
              // @ts-ignore
              <IconByName
                color={colorTheme.white}
                name="ArrowDownSLineIcon"
                isDisabled
                p="0"
              />
            }
          >
            {calendarView === "monthInDays"
              ? t("MONTH_VIEW")
              : calendarView === "week"
              ? t("WEEK_VIEW")
              : t("TODAY_VIEW")}
          </Button>
        );
      }}
    >
      <Menu.Item // @ts-ignore
        onPress={(item) => setCalendarView("days")}
      >
        {t("TODAY_VIEW")}
      </Menu.Item>
      <Menu.Item // @ts-ignore
        onPress={(item) => setCalendarView("week")}
      >
        {t("WEEK_VIEW")}
      </Menu.Item>
      <Menu.Item // @ts-ignore
        onPress={(item) => setCalendarView("monthInDays")}
      >
        {t("MONTH_VIEW")}
      </Menu.Item>
    </Menu>
  );
};
