import React, { useEffect, useState } from "react";
import { Box, VStack, HStack, Avatar, Divider, Spacer } from "native-base";
import {
  H2,
  IconByName,
  Collapsible,
  BodyMedium,
  H3,
  mentorRegisteryService,
} from "@shiksha/common-lib";

function PastVisitCard({ schoolId }) {
  const [pastDetails, setPastDetails] = useState(null);
  useEffect(async () => {
    const pastDetails = await mentorRegisteryService.getAllAllocatedSchools({
      schoolId,
    });
    setPastDetails(pastDetails);
  }, []);

  return (
    <Collapsible
      borderRadius={10}
      defaultCollapse={true}
      header={
        <Box py={4}>
          <H2>Past Visit Details</H2>
        </Box>
      }
    >
      {pastDetails && pastDetails?.length > 0 ? (
        pastDetails?.map((detail, index) => (
          <React.Fragment key={index}>
            <Divider mb={4} />
            <VStack space={6}>
              {/*bordered box*/}
              {detail?.teacherData?.firstName ? (
                <Box
                  p={4}
                  borderColor={"schools.lightGray3"}
                  bg={"schools.lightGray5"}
                  borderWidth={1}
                  rounded={10}
                >
                  <VStack space={6}>
                    {/*row 1 box*/}
                    <Box>
                      <HStack
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        {/*Image and name box*/}
                        <Box>
                          <HStack alignItems="center" space={3}>
                            <Avatar
                              size="48px"
                              borderRadius="md"
                              source={{
                                uri: detail?.teacherData?.image
                                  ? detail?.teacherData?.image
                                  : "",
                              }}
                              bg={"schools.primary"}
                            >
                              <H2 color={"schools.white"}>
                                {detail?.teacherData?.firstName
                                  ?.slice(0, 2)
                                  .toUpperCase()}
                              </H2>
                            </Avatar>
                            <VStack>
                              <H3
                                color={"schools.bodyText"}
                                _dark={{
                                  color: "schools.lightGray4",
                                }}
                                bold
                              >
                                {`${detail?.teacherData?.firstName} ${detail?.teacherData?.lastName}`}
                              </H3>
                            </VStack>
                            <Spacer />
                          </HStack>
                        </Box>
                        <IconByName
                          name="ArrowRightSLineIcon"
                          color={"schools.lightGray"}
                        />
                      </HStack>
                    </Box>
                    {/*row 2 box*/}
                    <Box>
                      <HStack
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        flexWrap={"wrap"}
                      >
                        <Box
                          style={{
                            flex: "0 0 50%",
                            maxWidth: "50%",
                          }}
                        >
                          <HStack alignItems="center">
                            <IconByName
                              size="12px"
                              mr={2}
                              name="CalendarEventLineIcon"
                              color={"schools.gray"}
                            />
                            <BodyMedium color={"schools.gray"}>
                              Last visited On:
                            </BodyMedium>
                          </HStack>
                          <BodyMedium color={"schools.bodyText"}>
                            {detail?.lastVisited}
                          </BodyMedium>
                        </Box>
                        <Box
                          style={{
                            flex: "0 0 50%",
                            maxWidth: "50%",
                          }}
                        >
                          <HStack alignItems="center">
                            <IconByName
                              size="12px"
                              mr={2}
                              name="BarChart2LineIcon"
                              color={"schools.gray"}
                            />
                            <BodyMedium color={"schools.gray"}>
                              Last visited By:
                            </BodyMedium>
                          </HStack>
                          <BodyMedium color={"schools.bodyText"}>
                            {detail?.mentorData?.firstName}
                          </BodyMedium>
                        </Box>
                      </HStack>
                    </Box>
                  </VStack>
                </Box>
              ) : (
                <Box bg={"schools.dangerAlert"} p={"4"} rounded={10}>
                  No past visit details available.
                </Box>
              )}
            </VStack>
          </React.Fragment>
        ))
      ) : (
        <Box bg={"schools.dangerAlert"} p={"4"} rounded={10}>
          No past visit details available.
        </Box>
      )}
    </Collapsible>
  );
}
export default PastVisitCard;
