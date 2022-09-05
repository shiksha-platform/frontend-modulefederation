import React from "react";
import { Box, VStack, HStack, Divider } from "native-base";
import { BodyLarge, H2, H4 } from "@shiksha/common-lib";

function SchoolAddressCard({ schoolData }) {
  return (
    schoolData && (
      <>
        <VStack space={6}>
          <Box
            bg={"schools.lightGray5"}
            borderRadius={10}
            borderColor={"schools.lightGray3"}
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
                    {typeof schoolData?.address == "string" &&
                      schoolData?.address}
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
                      }}
                    >
                      <H4 color={"schools.gray"}>District</H4>
                      <BodyLarge>{schoolData?.district}</BodyLarge>
                    </Box>
                    <Box
                      style={{
                        flex: "0 0 50%",
                        maxWidth: "50%",
                      }}
                    >
                      <H4 color={"schools.gray"}>Block</H4>
                      <BodyLarge>{schoolData?.block}</BodyLarge>
                    </Box>
                    <Box
                      style={{
                        flex: "0 0 50%",
                        maxWidth: "50%",
                        marginTop: "10px",
                      }}
                    >
                      <H4 color={"schools.gray"}>Cluster</H4>
                      <BodyLarge>{schoolData?.cluster}</BodyLarge>
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
                        maxWidth: "50%"
                      }}
                    >
                      <H4 color={"schools.gray"}>Headmaster</H4>
                      <BodyLarge>{schoolData?.headMaster}</BodyLarge>
                    </Box>

                    <Box
                      style={{
                        flex: "0 0 50%",
                        maxWidth: "50%",
                      }}
                    >
                      <H4 color={"schools.gray"}>Contact</H4>
                      <BodyLarge>{schoolData?.phoneNumber}</BodyLarge>
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
                      }}
                    >
                      <H4 color={"schools.gray"}>Medium</H4>
                      <BodyLarge>{schoolData?.mediumOfInstruction}</BodyLarge>
                    </Box>
                    <Box
                      style={{
                        flex: "0 0 50%",
                        maxWidth: "50%",
                      }}
                    >
                      <H4 color={"schools.gray"}>Board</H4>
                      <BodyLarge>{schoolData?.board}</BodyLarge>
                    </Box>
                  </HStack>
                </Box>
              </VStack>
            </Box>
          </Box>
        </VStack>
      </>
    )
  );
}
export default SchoolAddressCard;
