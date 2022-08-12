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
  BodyLarge,
  H4,
  H3,
} from "@shiksha/common-lib";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);
function ClassParticipationCard() {
  const [progressData, setProgressData] = React.useState([
    {
      name: "22 Present",
      color: "schools.green",
      value: 22,
    },
    {
      name: "4 Absent",
      color: "schools.absent",
      value: 4,
    },
    {
      name: "1 Unmarked",
      color: "schools.unmarked",
      value: 1,
    },
  ]);
  const [progressData2, setProgressData2] = React.useState([
    {
      name: "16 Assessed",
      color: "schools.green",
      value: 16,
    },
    {
      name: "4 Pending",
      color: "schools.gray",
      value: 4,
    },
  ]);
  return (
    <Box bg="white" p={4} rounded={10}>
      <>
        <Text bold fontSize={"sm"}>
          <Box py={4}>
            <H2>Class Participation</H2>
          </Box>
        </Text>
        <Divider mb={4} />
        <VStack space={4}>
          {/*bordered box*/}
          <Box>
            <VStack space={6}>
              {/*row 1 box*/}
              <Box>
                <VStack space={6}>
                  <Box bg={"schools.dangerAlert"} rounded={5} p={2}>
                    <HStack alignItems={"center"}>
                      <IconByName
                        name="EmotionSadLineIcon"
                        color={"schools.absent"}
                        // onPress={() => setSortModal(false)}
                      />
                      <Box
                        borderLeftWidth={2}
                        borderLeftColor={"schools.absent"}
                        pl={2}
                      >
                        <VStack>
                          <H3 color={"schools.absent"}>Very Bad</H3>
                          <BodyMedium color={"schools.absent"}>
                            Below average performance
                          </BodyMedium>
                        </VStack>
                      </Box>
                    </HStack>
                  </Box>
                  <BodyLarge>
                    Average Class Score is <H2>18</H2>
                    <H4>/25</H4>
                  </BodyLarge>
                  <ProgressBar
                    isTextShow
                    legendType="separated"
                    h="35px"
                    _bar={{ rounded: "md" }}
                    isLabelCountHide
                    data={progressData2}
                  />

                  <HStack alignItems="center" justifyContent="space-between">
                    <HStack alignItems="center">
                      <Box bg={"schools.green"} w="15px" h="15px" rounded={4} />
                      <BodyMedium mx={2}>Present</BodyMedium>
                    </HStack>
                    <HStack alignItems="center">
                      <Box
                        bg={"schools.absent"}
                        w="15px"
                        h="15px"
                        rounded={4}
                      />
                      <BodyMedium mx={2}>Absent</BodyMedium>
                    </HStack>
                    <HStack alignItems="center">
                      <Box
                        bg={"schools.unmarked"}
                        w="15px"
                        h="15px"
                        rounded={4}
                      />
                      <BodyMedium mx={2}>Unmarked</BodyMedium>
                    </HStack>
                  </HStack>

                  <Text>
                    <Text bold>Note:</Text>{" "}
                    <BodyMedium color={"schools.gray"}>
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
    </Box>
  );
}
export default ClassParticipationCard;
