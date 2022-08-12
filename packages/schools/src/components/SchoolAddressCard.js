import React from "react";
import { Box, VStack, HStack, Divider } from "native-base";
import { BodyLarge, H2, H4 } from "@shiksha/common-lib";

function SchoolAddressCard({ isVisited }) {
  return (
    <>
      <VStack space={6}>
        <Box
          bg={isVisited ? "schools.successAlert" : "schools.lightGray5"}
          borderRadius={10}
          borderColor={isVisited ? "schools.green" : "schools.lightGray3"}
        >
          <Box p={4}>
            <H2>School Overview</H2>
          </Box>
          <Divider />
          <Box p={4}>
            <VStack space={6}>
              <Box>
                <H4 color={"schools.gray"}>Address</H4>
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
                    <H4 color={"schools.gray"}>District</H4>
                    <BodyLarge>Khordha</BodyLarge>
                  </Box>
                  <Box
                    style={{
                      flex: "0 0 50%",
                      maxWidth: "50%",
                      marginBottom: 12,
                    }}
                  >
                    <H4 color={"schools.gray"}>Block</H4>
                    <BodyLarge>East</BodyLarge>
                  </Box>
                  <Box
                    style={{
                      flex: "0 0 50%",
                      maxWidth: "50%",
                      marginBottom: 12,
                    }}
                  >
                    <H4 color={"schools.gray"}>Headmaster</H4>
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
                    <H4 color={"schools.gray"}>Contact</H4>
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
                    <H4 color={"schools.gray"}>Medium</H4>
                    <BodyLarge>English</BodyLarge>
                  </Box>
                  <Box
                    style={{
                      flex: "0 0 50%",
                      maxWidth: "50%",
                      marginBottom: 12,
                    }}
                  >
                    <H4 color={"schools.gray"}>Board</H4>
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
