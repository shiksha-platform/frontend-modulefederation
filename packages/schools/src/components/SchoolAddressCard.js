import React from "react";
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
  DEFAULT_THEME,
  H2,
  H4,
  IconByName,
  overrideColorTheme,
} from "@shiksha/common-lib";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

function SchoolAddressCard({ isVisited }) {
  return (
    <>
      <VStack space={6}>
        <Box
          bg={isVisited ? colors.cardBackground : colors.white}
          borderRadius={10}
        >
          <Box p={4}>
            <H2>School Overview</H2>
          </Box>
          <Divider />
          <Box p={4}>
            <VStack space={6}>
              <Box>
                <H4 color={colors.subtitle}>Address</H4>
                <BodyLarge>
                  Silicon Hills, Near DLF Cybercity, Patia, Bhubaneswar, Odisha
                  751024.
                </BodyLarge>
              </Box>

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
                      marginBottom: 12,
                    }}
                  >
                    <H4 color={colors.subtitle}>District</H4>
                    <BodyLarge>Khordha</BodyLarge>
                  </Box>
                  <Box
                    style={{
                      flex: "0 0 50%",
                      maxWidth: "50%",
                      marginBottom: 12,
                    }}
                  >
                    <H4 color={colors.subtitle}>Block</H4>
                    <BodyLarge>East</BodyLarge>
                  </Box>
                  <Box
                    style={{
                      flex: "0 0 50%",
                      maxWidth: "50%",
                      marginBottom: 12,
                    }}
                  >
                    <H4 color={colors.subtitle}>Headmaster</H4>
                    <BodyLarge>Siddhant Chaturvedi</BodyLarge>
                  </Box>
                </HStack>
              </Box>

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
                      marginBottom: 12,
                    }}
                  >
                    <H4 color={colors.subtitle}>Contact</H4>
                    <BodyLarge>+91 9654788934</BodyLarge>
                  </Box>
                </HStack>
              </Box>

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
                      marginBottom: 12,
                    }}
                  >
                    <H4 color={colors.subtitle}>Medium</H4>
                    <BodyLarge>English</BodyLarge>
                  </Box>
                  <Box
                    style={{
                      flex: "0 0 50%",
                      maxWidth: "50%",
                      marginBottom: 12,
                    }}
                  >
                    <H4 color={colors.subtitle}>Board</H4>
                    <BodyLarge>CBSE</BodyLarge>
                  </Box>
                </HStack>
              </Box>
            </VStack>
          </Box>
        </Box>
      </VStack>
    </>
  );
}
export default SchoolAddressCard;
