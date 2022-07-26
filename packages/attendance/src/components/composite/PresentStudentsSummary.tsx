// Lib
import * as React from "react";
import { Box, VStack, Text } from "native-base";
import { H2, Caption, Collapsible, Subtitle } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

// Components
import { ReportSummary } from "components/simple/ReportSummary";

// Utils
import { colorTheme } from "utils/functions/ColorTheme";

export const PresentStudentsSummary = ({
  students,
  attendance,
  compareAttendance,
  thisTitle,
  lastTitle,
  page,
  compare,
  presentCount,
}) => {
  const { t } = useTranslation();
  return (
    <Box bg={colorTheme.white} p="5">
      <Box>
        <Collapsible
          defaultCollapse={true}
          // @ts-ignore
          header={
            <VStack>
              <H2>{t("SUMMARY")}</H2>
              <Caption>
                {t("TOTAL")}: {students.length} {t("PRESENT")}:{presentCount}
              </Caption>
            </VStack>
          }
        >
          <VStack pt="5">
            <ReportSummary
              {...{
                students,
                title: [
                  { name: thisTitle },
                  {
                    name: lastTitle,
                    _text: { color: "presentCardCompareText.500" },
                  },
                ],
                attendance: [attendance, compareAttendance],
                page: [page, page - 1],
                calendarView: compare,
              }}
            />
            <Subtitle py="5" px="10px" color={colorTheme.grayInLight}>
              <Text bold color={colorTheme.darkGray}>
                {t("NOTES")}
                {": "}
              </Text>
              {t("MONTHLY_REPORT_WILL_GENERATED_LAST_DAY_EVERY_MONTH")}
            </Subtitle>
          </VStack>
        </Collapsible>
      </Box>
    </Box>
  );
};
