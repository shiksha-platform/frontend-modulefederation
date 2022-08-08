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
  overrideColorTheme,
  BodyMedium,
} from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);
function ClassCollapsibleCard() {
  const navigate = useNavigate();
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
    <Collapsible
      defaultCollapse={true}
      header={
        <Box py={4}>
          <H2>Class I</H2>
        </Box>
      }
    >
      <>
        <Divider mb={4} />
        <VStack space={4}>
          {/*bordered box*/}
          <Box>
            <VStack space={6}>
              {/*row 1 box*/}
              <Box>
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
                      <BodyMedium mx={2}>Present</BodyMedium>
                    </HStack>
                    <HStack alignItems="center">
                      <Box bg={colors.absent} w="15px" h="15px" rounded={4} />
                      <BodyMedium mx={2}>Absent</BodyMedium>
                    </HStack>
                    <HStack alignItems="center">
                      <Box bg={colors.unmarked} w="15px" h="15px" rounded={4} />
                      <BodyMedium mx={2}>Unmarked</BodyMedium>
                    </HStack>
                  </HStack>

                  <Text>
                    <BodyMedium bold>Note:</BodyMedium>{" "}
                    <BodyMedium color={colors.bodyText}>
                      Monthly Report will be generated on the last day of every
                      month.
                    </BodyMedium>
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </>
    </Collapsible>
  );
}
export default ClassCollapsibleCard;
