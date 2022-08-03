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
  BodyMedium,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);

function ClassWiseSubjectProgress() {
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

  return (
    <React.Fragment>
      <VStack space={6}>
        <HStack alignItems="center" justifyContent="space-between">
          <BodyMedium w={"20%"}>Girls</BodyMedium>
          <Box w={"80%"}>
            <ProgressBar data={progressData} />
          </Box>
        </HStack>

        <HStack alignItems="center" justifyContent="space-between">
          <BodyMedium w={"20%"}>Boys</BodyMedium>
          <Box w={"80%"}>
            <ProgressBar data={progressData} />
          </Box>
        </HStack>

        <HStack alignItems="center" justifyContent="space-between">
          <BodyMedium w={"20%"}>Total</BodyMedium>
          <Box w={"80%"}>
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
      </VStack>
    </React.Fragment>
  );
}
export default ClassWiseSubjectProgress;
