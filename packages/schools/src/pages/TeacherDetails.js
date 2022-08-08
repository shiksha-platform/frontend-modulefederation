import React from "react";
import {
  BodyLarge,
  BodyMedium,
  BodySmall,
  Collapsible,
  H1,
  H2,
  H3,
  IconByName,
  Layout,
  overrideColorTheme,
} from "@shiksha/common-lib";
import {
  Box,
  HStack,
  VStack,
  Avatar,
  Text,
  Divider,
  Button,
} from "native-base";
import { useNavigate } from "react-router-dom";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const TeacherDetails = () => {
  const navigate = useNavigate();
  return (
    <Layout
      _header={{
        customeComponent: (
          <HStack
            alignItems="center"
            justifyContent="space-between"
            py={4}
            px={5}
          >
            <Box>
              <HStack alignItems="center" space={3}>
                <Avatar
                  size="48px"
                  borderRadius="md"
                  source={{
                    uri: "https://via.placeholder.com/50x50.png",
                  }}
                />
                <VStack>
                  <Text color="white" bold>
                    Chandan Pandit
                  </Text>
                </VStack>
              </HStack>
            </Box>
          </HStack>
        ),
      }}
      _appBar={{ languages: ["en"] }}
    >
      <Box p={5} bg={"gray.100"}>
        <Collapsible header="Teacher Details">
          <Divider marginTop={6} />
          <VStack space={6} marginTop={6}>
            <Box>
              <H3 color={colors.subtitle}>Designation</H3>
              <BodyLarge>Assistant Officer</BodyLarge>
            </Box>
            <Box>
              <H3 color={colors.subtitle}>Qualification</H3>
              <BodyLarge>B.Com. Hons</BodyLarge>
            </Box>
            <Box>
              <H3 color={colors.subtitle}>Phone</H3>
              <BodyLarge>+91 1234 567 890</BodyLarge>
            </Box>
            <Box>
              <H3 color={colors.subtitle}>Date of Joining</H3>
              <BodyLarge>10 Aug, 2013</BodyLarge>
            </Box>
          </VStack>
        </Collapsible>
      </Box>
      <Box px={5} bg={"gray.100"}>
        <Collapsible header="Attendance">
          <Divider marginY={6} />
          <HStack
            background={colors.redLight}
            p={4}
            borderRadius={5}
            alignItems="center"
          >
            <Box pr={3}>
              <IconByName
                name="EmotionSadLineIcon"
                color={colors.absent}
                isDisabled
              />
            </Box>
            <Box>
              <H2 color={colors.absent}>Very Bad</H2>
              <BodySmall color={colors.absent}>
                You have been present all days this month
              </BodySmall>
            </Box>
          </HStack>
          <Box pt={6}>
            <HStack justifyContent="space-around">
              <VStack alignItems="center" space={3}>
                <Box w="100px" h="100px">
                  <CircularProgressbarWithChildren
                    value={51}
                    maxValue={100}
                    styles={buildStyles({
                      pathColor: colors.absent,
                      textColor: colors.absent,
                      trailColor: colors.redLight,
                    })}
                  >
                    <Box textAlign="center">
                      <H1 color={colors.absent}>51%</H1>
                    </Box>
                  </CircularProgressbarWithChildren>
                </Box>
                <BodyMedium>This Month</BodyMedium>
              </VStack>

              <VStack alignItems="center" space={3}>
                <Box w="100px" h="100px">
                  <CircularProgressbarWithChildren
                    value={90}
                    maxValue={100}
                    styles={buildStyles({
                      pathColor: colors.green,
                      textColor: colors.green,
                      trailColor: colors.lightGreen,
                    })}
                  >
                    <Box textAlign="center">
                      <H1 color={colors.green}>90%</H1>
                    </Box>
                  </CircularProgressbarWithChildren>
                </Box>
                <BodyMedium>Last Year</BodyMedium>
              </VStack>
            </HStack>
          </Box>
          <Divider marginY={6} />
          <Button
            width="100%"
            variant="outline"
            onPress={() => {
              navigate("/schools/teacher-attendance-report");
            }}
          >
            Attendance Report
          </Button>
        </Collapsible>
      </Box>
      <Box p={5} bg={"gray.100"}>
        <Collapsible header="Perfromance"></Collapsible>
      </Box>
      <Box px={5} bg={"gray.100"}>
        <Collapsible header="Class Result">
          <Divider marginY={6} />
          <HStack
            mx={2}
            borderColor="gray.100"
            borderWidth={1}
            borderRadius={10}
            p={4}
            justifyContent="space-between"
          >
            <Box>
              <H3>VI A</H3>
              <BodyMedium>65 Students</BodyMedium>
            </Box>
            <IconByName name="ArrowRightSLineIcon" color={colors.cheveron} />
          </HStack>
          <HStack
            mx={2}
            my={4}
            borderColor="gray.100"
            borderWidth={1}
            borderRadius={10}
            p={4}
            justifyContent="space-between"
          >
            <Box>
              <H3>VII A</H3>
              <BodyMedium>69 Students</BodyMedium>
            </Box>
            <IconByName name="ArrowRightSLineIcon" color={colors.cheveron} />
          </HStack>
        </Collapsible>
      </Box>
      <Box p={5} bg={"gray.100"}>
        <Collapsible header="Mentor Visit Details">
          <Divider marginY={6} />
          <HStack
            mx={2}
            borderColor="gray.100"
            borderWidth={1}
            borderRadius={10}
            p={4}
            justifyContent="space-between"
          >
            <Box>
              <HStack alignItems="center" space={3}>
                <Avatar
                  size="48px"
                  borderRadius="md"
                  source={{
                    uri: "https://via.placeholder.com/50x50.png",
                  }}
                />
                <VStack>
                  <H2>Chandan Pandit</H2>
                  <BodyMedium color={colors.gray}>
                    Class Teacher: VI A
                  </BodyMedium>
                </VStack>
              </HStack>
              <HStack mt={4}>
                <VStack mr={4}>
                  <BodyMedium color={colors.gray}>
                    <IconByName
                      name="CalendarEventLineIcon"
                      color={colors.gray}
                      size={4}
                      alignItems="center"
                    />{" "}
                    Last Visited on:
                  </BodyMedium>
                  <BodyMedium>30 May 2022</BodyMedium>
                </VStack>
                <VStack>
                  <BodyMedium color={colors.gray}>Last Visited by:</BodyMedium>
                  <BodyMedium>Kritika Kumar Gupta</BodyMedium>
                </VStack>
              </HStack>
            </Box>
            <IconByName name="ArrowRightSLineIcon" color={colors.cheveron} />
          </HStack>
          <HStack
            mx={2}
            my={4}
            borderColor="gray.100"
            borderWidth={1}
            borderRadius={10}
            p={4}
            justifyContent="space-between"
          >
            <Box>
              <HStack alignItems="center" space={3}>
                <Avatar
                  size="48px"
                  borderRadius="md"
                  source={{
                    uri: "https://via.placeholder.com/50x50.png",
                  }}
                />
                <VStack>
                  <H3>Chandan Pandit</H3>
                  <BodyMedium color={colors.gray}>
                    Class Teacher: VI A
                  </BodyMedium>
                </VStack>
              </HStack>
              <HStack mt={4}>
                <VStack mr={4}>
                  <BodyMedium color={colors.gray}>
                    <IconByName
                      name="CalendarEventLineIcon"
                      color={colors.gray}
                      size={4}
                      alignItems="center"
                    />{" "}
                    Last Visited on:
                  </BodyMedium>
                  <BodyMedium>30 May 2022</BodyMedium>
                </VStack>
                <VStack>
                  <BodyMedium color={colors.gray}>Last Visited by:</BodyMedium>
                  <BodyMedium>Kritika Kumar Gupta</BodyMedium>
                </VStack>
              </HStack>
            </Box>
            <IconByName name="ArrowRightSLineIcon" color={colors.cheveron} />
          </HStack>
        </Collapsible>
      </Box>
    </Layout>
  );
};

export default TeacherDetails;
