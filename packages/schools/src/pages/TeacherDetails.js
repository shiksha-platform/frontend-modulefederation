// Route: {basePath}/schools/teacher-details/{id}

import React, { useEffect, useState } from "react";

// Imports for navigation and for extraction of params
import { useNavigate, useParams } from "react-router-dom";

// Import for translation
import { useTranslation } from "react-i18next";
import manifest from "manifest.json";

// Imports from common library functions and native base components
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
  Loading,
  mentorRegisteryService,
  userRegistryService,
} from "@shiksha/common-lib";
import { Box, HStack, VStack, Avatar, Divider, Button, useTheme } from "native-base";

// Imports for Circular Progressbar
import {
  buildStyles,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

const TeacherDetails = ({ footerLinks }) => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { teacherId } = useParams();
  const [teacherlist, setTeacherList] = useState();
  const [pastVisitDetails, setPastVisitDetails] = useState();

  useEffect(async () => {
    // Getting teacher list by teacher id
    const data = await userRegistryService.getUserById(teacherId);
    setTeacherList(data);

    // All the past visit details for the teacher
    const pastDetails = await mentorRegisteryService.getAllAllocatedSchools({
      teacherId: data?.id?.slice(2, data?.id?.length),
    });
    setPastVisitDetails(pastDetails);
  }, [teacherId]);

  return teacherlist ? (
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
                  uri: teacherlist.image ? teacherlist.image : "",
                }}
                bg={"schools.primary"}
              >
                <H2 color={"schools.white"}>
                  {teacherlist?.firstName?.slice(0, 2).toUpperCase()}
                </H2>
              </Avatar>
              <VStack>
                <H2>{`${teacherlist?.firstName} ${teacherlist?.lastName}`}</H2>
              </VStack>
            </HStack>
          </Box>
        </HStack>
      }
      _subHeader={{ bg: "schools.cardBg" }}
      _appBar={{ languages: manifest.languages }}
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
              <BodyLarge>{teacherlist?.designation}</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.gray"}>Qualification</H3>
              <BodyLarge>{teacherlist?.profQualification}</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.gray"}>Phone</H3>
              <BodyLarge>{teacherlist?.phoneNumber}</BodyLarge>
            </Box>
            <Box>
              <H3 color={"schools.gray"}>Date of Joining</H3>
              <BodyLarge>{teacherlist?.joiningDate}</BodyLarge>
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
                      pathColor: colors?.["schools"]?.["absent"],
                      textColor: colors?.["schools"]?.["absent"],
                      trailColor: colors?.["schools"]?.["darkGray5"],
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
                      pathColor: colors?.["schools"]?.["green"],
                      textColor: colors?.["schools"]?.["green"],
                      trailColor: colors?.["schools"]?.["darkGray5"],
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
        <Collapsible header="Past Visit Details">
          <Divider marginY={6} />
          {pastVisitDetails && pastVisitDetails.length > 0 ? (
            pastVisitDetails.map((pastDetails) => (
              <HStack
                mx={2}
                marginBottom={5}
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
                        uri: teacherlist.image ? teacherlist.image : "",
                      }}
                      bg={"schools.primary"}
                    >
                      <H2 color={"schools.white"}>
                        {pastDetails?.teacherData?.firstName
                          ?.slice(0, 2)
                          .toUpperCase()}
                      </H2>
                    </Avatar>
                    <VStack>
                      <H2>{`${pastDetails?.teacherData?.firstName} ${pastDetails?.teacherData?.lastName}`}</H2>
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
                      <BodyMedium>{pastDetails?.lastVisited}</BodyMedium>
                    </VStack>
                    <VStack>
                      <BodyMedium color={"schools.gray"}>
                        Last Visited by:
                      </BodyMedium>
                      <BodyMedium>
                        {pastDetails?.mentorData?.firstName}
                      </BodyMedium>
                    </VStack>
                  </HStack>
                </Box>
              </HStack>
            ))
          ) : (
            <Box bg={"schools.dangerAlert"} p={"4"} rounded={10}>
              No past visit details available for this teacher.
            </Box>
          )}
        </Collapsible>
      </Box>
    </Layout>
  ) : (
    <Loading />
  );
};

export default TeacherDetails;
