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
} from "@shiksha/common-lib";
import { Box, HStack, VStack, Avatar, Divider, Button } from "native-base";
import { useNavigate } from "react-router-dom";
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

const TeacherDetails = ({ footerLinks }) => {
  const navigate = useNavigate();
  return (
    <Layout
      _header={{
        title: "Teacher Details",
      }}
      subHeader={
        <HStack alignItems="center" justifyContent="space-between">
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
              </VStack>
            </HStack>
          </Box>
        </HStack>
      }
      _subHeader={{ bg: "schools.cardBg" }}
      _appBar={{ languages: ["en"] }}
      _footer={footerLinks}
    >
      <Box p={5} bg={"schools.white"}>
        <Collapsible header="Teacher Details">
          <VStack
            space={6}
            marginTop={5}
            bg={"schools.lightGray5"}
            p={4}
            rounded={10}
          >
            <Box>
              <H3 color={"schools.gray"}>Designation</H3>
              <BodyLarge>Assistant Officer</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.gray"}>Qualification</H3>
              <BodyLarge>B.Com. Hons</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.gray"}>Phone</H3>
              <BodyLarge>+91 1234 567 890</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.gray"}>Date of Joining</H3>
              <BodyLarge>10 Aug, 2013</BodyLarge>
            </Box>
          </VStack>
        </Collapsible>
      </Box>
      <Box px={5} bg={"schools.white"} mt={4}>
        <Collapsible header="Attendance">
          <HStack
            background={"schools.dangerAlert"}
            p={4}
            marginTop={6}
            borderRadius={5}
            alignItems="center"
          >
            <Box pr={3}>
              <IconByName
                name="EmotionSadLineIcon"
                color={"schools.absent"}
                isDisabled
              />
            </Box>
            <Box>
              <H2 color={"schools.absent"}>Very Bad</H2>
              <BodySmall color={"schools.absent"}>
                You have been present all days this month
              </BodySmall>
            </Box>
          </HStack>
          <Box mt={6} bg={"schools.lightGray5"} p={4} rounded={10}>
            <HStack justifyContent="space-around">
              <VStack alignItems="center" space={3}>
                <Box w="100px" h="100px">
                  <CircularProgressbarWithChildren
                    value={51}
                    maxValue={100}
                    styles={buildStyles({
                      pathColor: "schools.absent",
                      textColor: "schools.absent",
                      trailColor: "schools.dangerAlert",
                    })}
                  >
                    <Box textAlign="center">
                      <H1 color={"schools.absent"}>51%</H1>
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
                      pathColor: "schools.green",
                      textColor: "schools.green",
                      trailColor: "schools.successAlert",
                    })}
                  >
                    <Box textAlign="center">
                      <H1 color={"schools.green"}>90%</H1>
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
      <Box px={5} bg={"schools.white"} mt={4}>
        <Collapsible header="Class Result">
          <Divider marginY={6} />
          <HStack
            mx={2}
            borderColor="schools.lightGray3"
            bg={"schools.lightGray5"}
            borderWidth={1}
            borderRadius={10}
            p={4}
            justifyContent="space-between"
          >
            <Box>
              <H3>VI A</H3>
              <BodyMedium>65 Students</BodyMedium>
            </Box>
            <IconByName name="ArrowRightSLineIcon" color={"schools.darkGray"} />
          </HStack>
          <HStack
            mx={2}
            my={4}
            borderColor="schools.lightGray3"
            bg={"schools.lightGray5"}
            borderWidth={1}
            borderRadius={10}
            p={4}
            justifyContent="space-between"
          >
            <Box>
              <H3>VII A</H3>
              <BodyMedium>69 Students</BodyMedium>
            </Box>
            <IconByName name="ArrowRightSLineIcon" color={"schools.darkGray"} />
          </HStack>
        </Collapsible>
      </Box>
      <Box p={5} bg={"schools.white"} mt={4}>
        <Collapsible header="Mentor Visit Details">
          <Divider marginY={6} />
          <HStack
            mx={2}
            borderColor="schools.lightGray3"
            bg={"schools.lightGray5"}
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
                  <BodyMedium color={"schools.gray"}>
                    Class Teacher: VI A
                  </BodyMedium>
                </VStack>
              </HStack>
              <HStack mt={4}>
                <VStack mr={4}>
                  <BodyMedium color={"schools.gray"}>
                    <IconByName
                      name="CalendarEventLineIcon"
                      color={"schools.gray"}
                      size={4}
                      alignItems="center"
                    />{" "}
                    Last Visited on:
                  </BodyMedium>
                  <BodyMedium>30 May 2022</BodyMedium>
                </VStack>
                <VStack>
                  <BodyMedium color={"schools.gray"}>
                    Last Visited by:
                  </BodyMedium>
                  <BodyMedium>Kritika Kumar Gupta</BodyMedium>
                </VStack>
              </HStack>
            </Box>
            <IconByName name="ArrowRightSLineIcon" color={"schools.darkGray"} />
          </HStack>
          <HStack
            mx={2}
            my={4}
            borderColor="schools.lightGray3"
            bg={"schools.lightGray5"}
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
                  <BodyMedium color={"schools.gray"}>
                    Class Teacher: VI A
                  </BodyMedium>
                </VStack>
              </HStack>
              <HStack mt={4}>
                <VStack mr={4}>
                  <BodyMedium color={"schools.gray"}>
                    <IconByName
                      name="CalendarEventLineIcon"
                      color={"schools.gray"}
                      size={4}
                      alignItems="center"
                    />{" "}
                    Last Visited on:
                  </BodyMedium>
                  <BodyMedium>30 May 2022</BodyMedium>
                </VStack>
                <VStack>
                  <BodyMedium color={"schools.gray"}>
                    Last Visited by:
                  </BodyMedium>
                  <BodyMedium>Kritika Kumar Gupta</BodyMedium>
                </VStack>
              </HStack>
            </Box>
            <IconByName name="ArrowRightSLineIcon" color={"schools.darkGray"} />
          </HStack>
        </Collapsible>
      </Box>
    </Layout>
  );
};

export default TeacherDetails;
