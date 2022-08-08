import React, { useEffect } from "react";
import {
  Box,
  Center,
  VStack,
  Text,
  HStack,
  Avatar,
  Divider,
} from "native-base";
import {
  BodyLarge,
  BodyMedium,
  DEFAULT_THEME,
  H2,
  H3,
  IconByName,
  overrideColorTheme,
} from "@shiksha/common-lib";
import { visitedCard } from "../colorTheme";

let colors = DEFAULT_THEME;

function MySchoolsCard({ isVisited }) {
  useEffect(() => {
    if (isVisited) {
      colors = overrideColorTheme(visitedCard);
    }
  }, [isVisited]);
  return (
    <>
      <VStack space={6}>
        <Box
          bg="#dff5dd9e"
          borderRadius={10}
          borderColor={colors.visitedCardBorderColor}
        >
          <Box p={4}>
            <VStack space={6}>
              <HStack alignItems="center">
                <Avatar
                  size="60px"
                  mr={4}
                  borderRadius="md"
                  source={{
                    uri: "https://via.placeholder.com/50x50.png",
                  }}
                />
                <VStack>
                  <H3>Delhi Public School, Ghaziabad</H3>
                  <BodyMedium color={colors.subtitle}>
                    Ghaziabad, Uttar Pradesh
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
                  <BodyMedium>Ghaziabad</BodyMedium>
                </VStack>
              </div>

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
                  <BodyMedium>Not Available</BodyMedium>
                </VStack>
              </div>

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
                  <BodyMedium>30 May 2022</BodyMedium>
                </VStack>
              </div>
            </HStack>
          </Box>
        </Box>
      </VStack>
    </>
  );
}
export default MySchoolsCard;
