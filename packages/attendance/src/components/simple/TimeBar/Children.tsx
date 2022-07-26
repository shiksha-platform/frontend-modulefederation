// Lib
import * as React from "react";
import { H2, Caption } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { VStack } from "native-base";
import moment from "moment";

// Utils
import { MomentUnionType } from "utils/types/types";
import { FormatDate } from "utils/functions/FormatDate";

export const Children: React.FC<{
  type: string;
  date: MomentUnionType;
  page?: number;
}> = ({ type, date, page }) => {
  const { t } = useTranslation();
  switch (true) {
    case type === "monthInDays":
      return (
        <VStack>
          <FormatDate date={date} type="Month" />
          {/* <Text fontSize="10" fontWeight="300">
			{t("THIS_MONTH")}
		  </Text> */}
        </VStack>
      );
    case type === "week":
      return (
        <VStack>
          <FormatDate date={date} type="Week" />
          <Caption>{t("THIS_WEEK")}</Caption>
        </VStack>
      );
    default:
      return (
        <VStack>
          <H2>
            {page === 0
              ? t("TODAY")
              : page === 1
              ? t("TOMORROW")
              : page === -1
              ? t("YESTERDAY")
              : // @ts-ignore
                moment(date).format("dddd")}
          </H2>
          <Caption>
            <FormatDate date={date} />
          </Caption>
        </VStack>
      );
  }
};
