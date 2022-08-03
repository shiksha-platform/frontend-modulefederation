import React from "react";
import {
  Box,
  Center,
  VStack,
  Text,
  HStack,
  Avatar,
  Divider,
  Spacer,
  Pressable,
  Button,
} from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible,
  ProgressBar,
  Tab,
  overrideColorTheme,
  BodyLarge,
  H4,
  BodyMedium,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);

function SectionWiseSubjectProgress() {
  const { t } = useTranslation();
  const [progressData, setProgressData] = React.useState([
    {
      name: "22 Present",
      color: colors.green,
      value: 22,
    },
    {
      name: "4 Absent",
      color: colors.absent,
      value: 4,
    },
    {
      name: "1 Unmarked",
      color: colors.unmarked,
      value: 1,
    },
  ]);

  const [progressData2, setProgressData2] = React.useState([
    {
      name: "16 Assessed",
      color: colors.green,
      value: 16,
    },
    {
      name: "4 Pending",
      color: colors.gray,
      value: 4,
    },
  ]);

  return (
    <React.Fragment>
      <VStack space={6}>
        <HStack alignItems="center" justifyContent="space-between">
          <BodyMedium>Performance</BodyMedium>
          <Box flexGrow={1} ml={4}>
            <ProgressBar data={progressData} />
          </Box>
        </HStack>

        <HStack alignItems="center" justifyContent="space-between">
          <HStack alignItems="center">
            <Box bg={colors.green} w="15px" h="15px" rounded={4} />
            <BodyMedium mx={2}>Passed</BodyMedium>
          </HStack>
          <HStack alignItems="center">
            <Box bg={colors.absent} w="15px" h="15px" rounded={4} />
            <BodyMedium mx={2}>Failed</BodyMedium>
          </HStack>
          <HStack alignItems="center">
            <Box bg={colors.unmarked} w="15px" h="15px" rounded={4} />
            <BodyMedium mx={2}>Not attempted</BodyMedium>
          </HStack>
        </HStack>

        <Divider />
        <Box>
          <VStack space={4}>
            <BodyLarge>
              Average Class Score is <H2>18</H2>
              <H4>/25"</H4>
            </BodyLarge>
            <ProgressBar
              isTextShow
              legendType="separated"
              h="35px"
              _bar={{ rounded: "md" }}
              isLabelCountHide
              data={progressData2}
            />
          </VStack>
        </Box>
      </VStack>
    </React.Fragment>
  );
}
export default SectionWiseSubjectProgress;
