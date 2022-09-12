import React, { useEffect } from "react";
import { Box, VStack, HStack, Avatar, Divider } from "native-base";
import {
  BodyMedium,
  DEFAULT_THEME,
  H2,
  H3,
  IconByName,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { visitedCard } from "../colorTheme";

let colors = DEFAULT_THEME;

function MySchoolsCard({ isVisited, schoolData, lastVisited }) {
  useEffect(() => {
    if (isVisited) {
      colors = overrideColorTheme(visitedCard);
    }
  }, [isVisited]);
  return (
    <>
      <VStack space={6}>
        <Box
          bg={isVisited ? "visits.visitedCard" : "visits.lightGray6"}
          borderRadius={10}
          borderColor={isVisited ? "visits.green" : "visits.lightGray3"}
        >
          <Box p={4}>
            <VStack space={6}>
              <HStack alignItems="center">
                <Avatar
                  size="60px"
                  mr={4}
                  borderRadius="md"
                  source={{
                    uri: schoolData?.image ? schoolData?.image : "",
                  }}
                  bg="schools.primary"
                >
                  <H2 color="schools.white">
                    {schoolData?.schoolName?.slice(0, 2).toUpperCase()}
                  </H2>
                </Avatar>
                <VStack>
                  <H3>{schoolData?.schoolName}</H3>
                  <BodyMedium color={"visits.gray"}>
                    {typeof schoolData?.address == "string" &&
                      schoolData?.address}
                  </BodyMedium>
                </VStack>
              </HStack>
            </VStack>
          </Box>
          <Divider />
          <Box p={4}>
            <HStack
              alignItems={"center"}
              justifyContent={"space-between"}
              flexWrap={"wrap"}
            >
              {schoolData?.district != "" && (
                <div
                  style={{
                    flex: "0 0 50%",
                    maxWidth: "50%",
                    marginBottom: "10px",
                  }}
                >
                  <VStack>
                    <HStack alignItems="center">
                      <IconByName size="12px" mr={2} name="MapPinLineIcon" />
                      <BodyMedium color="#666" fontSize="12">
                        District
                      </BodyMedium>
                    </HStack>
                    <BodyMedium>{schoolData?.district}</BodyMedium>
                  </VStack>
                </div>
              )}

              <div
                style={{
                  flex: "0 0 50%",
                  maxWidth: "50%",
                  marginBottom: "10px",
                }}
              >
                <VStack>
                  <HStack alignItems="center">
                    <IconByName size="12px" mr={2} name="GovernmentLineIcon" />
                    <BodyMedium color="#666">Block</BodyMedium>
                  </HStack>
                  <BodyMedium>
                    {schoolData?.block ? schoolData?.block : "Not Available"}
                  </BodyMedium>
                </VStack>
              </div>

              {schoolData?.cluster != "" && (
                <div
                  style={{
                    flex: "0 0 50%",
                    maxWidth: "50%",
                    marginBottom: "10px",
                  }}
                >
                  <VStack>
                    <HStack alignItems="center">
                      <IconByName
                        size="12px"
                        mr={2}
                        name="GovernmentLineIcon"
                      />
                      <BodyMedium color="#666" fontSize="12">
                        Cluster
                      </BodyMedium>
                    </HStack>
                    <BodyMedium>{schoolData?.cluster}</BodyMedium>
                  </VStack>
                </div>
              )}

              {lastVisited && (
                <div
                  style={{
                    flex: "0 0 50%",
                    maxWidth: "50%",
                    marginBottom: "10px",
                  }}
                >
                  <VStack>
                    <HStack alignItems="center">
                      <IconByName
                        size="12px"
                        mr={2}
                        name="CalendarEventLineIcon"
                      />
                      <BodyMedium color="#666">Last Visited</BodyMedium>
                    </HStack>
                    <BodyMedium>{lastVisited}</BodyMedium>
                  </VStack>
                </div>
              )}
            </HStack>
          </Box>
        </Box>
      </VStack>
    </>
  );
}
export default MySchoolsCard;
