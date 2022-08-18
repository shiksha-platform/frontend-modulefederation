import React, { useState } from "react";
import { Box, HStack, VStack, Text, Divider, Button } from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible,
  ProgressBar,
  overrideColorTheme,
  Caption,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);
export default function ClassParticipationCollapsibleCard() {
  const { t } = useTranslation();
  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "22 Present",
      color: colors.successBarColor,
      value: 22,
    },
    {
      name: "4 Absent",
      color: "#DF5B5B",
      value: 4,
    },
    {
      name: "1 Unmarked",
      color: colors.unmarked,
      value: 1,
    },
  ]);
  return (
    <>
      <Collapsible
        defaultCollapse={true}
        header={
          <Box py={4}>
            <H2>Class Participation</H2>
            <HStack alignItems={"center"}>
              <Caption color="#373839">
                {t("Total Students for Evaluation ") + 27}
              </Caption>{" "}
              <Caption color="#B5B5C8" fontSize={2}>
                {" "}
                •
              </Caption>{" "}
              <Caption color="#373839"> {t("Present ") + 26}</Caption>
            </HStack>
          </Box>
        }
      >
        <>
          <Box>
            <VStack space={4}>
              <HStack alignItems="center">
                <Box w={"20%"}>Total</Box>
                <Box w={"79%"}>
                  <ProgressBar flex="1" data={progressAssessment} />
                </Box>
              </HStack>
              <HStack alignItems="center" justifyContent="space-between">
                <HStack alignItems="center">
                  <Box
                    w="15px"
                    h="15px"
                    mr={2}
                    bg={colors.successBarColor}
                    rounded={4}
                  ></Box>
                  <Text>Present</Text>
                </HStack>
                <HStack alignItems="center">
                  <Box
                    w="15px"
                    h="15px"
                    mr={2}
                    bg={"#DF5B5B"}
                    rounded={4}
                  ></Box>
                  <Text>Absent</Text>
                </HStack>
                <HStack alignItems="center">
                  <Box
                    w="15px"
                    h="15px"
                    mr={2}
                    bg={colors.unmarked}
                    rounded={4}
                  ></Box>
                  <Text>Unmarked</Text>
                </HStack>
              </HStack>
            </VStack>
          </Box>
        </>
      </Collapsible>
    </>
  );
}
