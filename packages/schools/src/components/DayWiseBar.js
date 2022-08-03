import {
  Collapsible,
  H2,
  IconByName,
  Layout,
  Caption,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  HStack,
  Text,
  VStack,
  Button,
  Actionsheet,
  Stack,
  Divider,
  Avatar,
  Spacer,
  useToast,
} from "native-base";
import moment from "moment";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const DayWiseBar = ({ activeColor, setActiveColor, page, setPage, _box }) => {
  const [date, setDate] = React.useState();
  const { t } = useTranslation();

  React.useEffect(() => {
    setDate(moment().add(page, "days"));
    if (setActiveColor) {
      setActiveColor(page === 0 ? "button.500" : "coolGray.500");
    }
  }, [page, setActiveColor]);

  return (
    <Display
      {...{
        activeColor,
        setActiveColor,
        page,
        setPage,
        _box,
      }}
    >
      <VStack textAlign="center">
        <H2>
          {page === 0
            ? t("Today")
            : page === 1
            ? t("Tomorrow")
            : page === -1
            ? t("Yesterday")
            : moment(date).format("dddd")}
        </H2>
        <Caption>
          <FormatDate date={date} />
        </Caption>
      </VStack>
    </Display>
  );
};

const FormatDate = ({ date, type }) => {
  if (type === "Month") {
    return moment(date[0]).format("MMMM Y");
  } else if (type === "Week") {
    return (
      moment(date[0]).format("D MMM") +
      " - " +
      moment(date[date.length - 1]).format("D MMM")
    );
  } else if (type === "Today") {
    return moment(date).format("D MMM, ddd, HH:MM");
  } else if (type === "Tomorrow") {
    return moment(date).format("D MMM, ddd");
  } else if (type === "Yesterday") {
    return moment(date).format("D MMM, ddd");
  } else {
    return moment(date).format("D MMMM, Y");
  }
};

const Display = ({
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
            size="sm"
            color={
              typeof previousDisabled === "undefined" ||
              previousDisabled === false
                ? activeColor
                  ? activeColor
                  : "gray.500"
                : "gray.400"
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
            size="sm"
            color={
              typeof nextDisabled === "undefined" || nextDisabled === false
                ? activeColor
                  ? activeColor
                  : "gray.500"
                : "gray.400"
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

export default DayWiseBar;
