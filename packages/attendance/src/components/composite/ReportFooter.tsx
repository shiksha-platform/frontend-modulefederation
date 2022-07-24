// Lib
import * as React from "react";
import { Box, VStack, Button, Text } from "native-base";
import { Collapsible, H2, Caption, Subtitle } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

// Components
import { ReportSummary } from "components/simple/ReportSummary";

// Utils
import { colorTheme } from "utils/functions/ColorTheme";

export const ReportFooter = ({
  classes,
  page,
  calendarView,
  students,
  attendance,
  navigate,
  getAttendance,
  makeDefaultCollapse,
}) => {
  const { t } = useTranslation();
  return (
    <Box bg={colorTheme.white} mb="4" roundedBottom={"xl"} shadow={2}>
      {classes.map((item, index) => (
        <Box
          key={index}
          borderBottomWidth={1}
          borderBottomColor={colorTheme.coolGray}
        >
          <Collapsible
            defaultCollapse={!index ? true : makeDefaultCollapse}
            onPressFuction={(e) => getAttendance(item.id)}
            // @ts-ignore
            header={
              <VStack>
                <H2>{item.name}</H2>
                <Caption>
                  {index % 2 === 0 ? t("MORNING") : t("MID_DAY_MEAL")}
                </Caption>
              </VStack>
            }
          >
            <VStack py="4">
              <ReportSummary
                {...{
                  page,
                  calendarView,
                  students: students[item.id] ? students[item.id] : [],
                  attendance: attendance[item.id] ? [attendance[item.id]] : [],
                }}
              />
              <Subtitle py="5" px="10px" color={colorTheme.grayInLight}>
                <Text bold color={colorTheme.darkGray}>
                  {t("NOTES")}
                  {": "}
                </Text>
                {t("MONTHLY_REPORT_WILL_GENERATED_LAST_DAY_EVERY_MONTH")}
              </Subtitle>
              <Button
                variant="outline"
                colorScheme={"button"}
                // @ts-ignore
                onPress={(e) =>
                  navigate(
                    "/attendance/report/" +
                      (item.id.startsWith("1-")
                        ? item.id.replace("1-", "")
                        : item.id) +
                      "/" +
                      calendarView
                  )
                }
              >
                {t("SEE_FULL_REPORT")}
              </Button>
            </VStack>
          </Collapsible>
        </Box>
      ))}
    </Box>
  );
};
