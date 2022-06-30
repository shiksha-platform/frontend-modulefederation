// Lib
import * as React from "react";
import { useState, useEffect } from "react";
import { H2, Caption, calendar, overrideColorTheme } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { Box, HStack, Text, useToast, VStack } from "native-base";
import { IconByName } from "@shiksha/common-lib";
import moment from "moment";

// Utilities
import { MomentType, MomentUnionType } from "utils/types/types";
import { FormatDate } from "utils/functions/FormatDate";

// Misc
import colorTheme from "colorTheme";
const colors = overrideColorTheme(colorTheme);

// Display Helper
export const Display: React.FC<any> = ({
  children,
  activeColor,
  page,
  setPage,
  nextDisabled,
  previousDisabled,
  rightErrorText,
  leftErrorText,
  _box,
}) => {
  const toast = useToast();
  return (
    <Box bg="white" p="1" {..._box}>
      <HStack justifyContent="space-between" alignItems="center" space={4}>
        <HStack space="4" alignItems="center">
          <IconByName
            size="50"
            color={
              typeof previousDisabled === "undefined" ||
              previousDisabled === false
                ? activeColor
                  ? activeColor
                  : colors.primary
                : // @ts-ignore
                  colors.grayInLight
            }
            name="ArrowLeftSLineIcon"
            onPress={(e) => {
              if (leftErrorText) {
                toast.show(leftErrorText);
              } else if (
                typeof previousDisabled === "undefined" ||
                previousDisabled === false
              ) {
                setPage(page - 1);
              }
            }}
          />
        </HStack>
        <HStack space="4" alignItems="center">
          <Text fontSize="md" bold>
            {children}
          </Text>
        </HStack>
        <HStack space="2">
          <IconByName
            size="50"
            color={
              typeof nextDisabled === "undefined" || nextDisabled === false
                ? activeColor
                  ? activeColor
                  : colorTheme.gray
                : colorTheme.grayIndark
            }
            name="ArrowRightSLineIcon"
            onPress={(e) => {
              if (rightErrorText) {
                toast.show(rightErrorText);
              } else if (
                typeof nextDisabled === "undefined" ||
                nextDisabled === false
              ) {
                setPage(page + 1);
              }
            }}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

const Children: React.FC<{
  type: string;
  date: MomentUnionType;
  page?: number;
}> = ({ type, date, page }) => {
  const { t } = useTranslation();
  switch (true) {
    case type === "month":
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
export const TimeBar: React.FC<any> = (props) => {
  // Type decides if array or not
  // etc
  const [date, setDate] =
    props.type === "days" ? useState<MomentType>() : useState<MomentUnionType>();
  useEffect(() => {
    if (props.type === "days") setDate(moment().add(props.page, "days"));
    else setDate(calendar(props.page, props.type));
    if (props.setActiveColor) {
      // @ts-ignore
      // TODO: remove this color discrepancy
      setActiveColor(page === 0 ? colors.primary : colorTheme.gray);
    }
  }, [props.page, props.setActiveColor]);

  return (
    <Display {...props}>
      <Children type={props.type} date={date} />
    </Display>
  );
};
