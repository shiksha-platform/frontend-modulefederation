import React from "react";
import { Box, VStack, HStack, Avatar, Divider, Spacer } from "native-base";
import {
  H2,
  IconByName,
  Collapsible,
  BodyMedium,
  H3,
} from "@shiksha/common-lib";
function PastVisitCard() {
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
      <>
        <Divider mb={4} />
        <VStack space={6}>
          {/*bordered box*/}
          <Box
            p={6}
            borderColor={"schools.lightGray3"}
            bg={"schools.lightGray5"}
            borderWidth={1}
            rounded={10}
          >
            <VStack space={6}>
              {/*row 1 box*/}
              <Box>
                <HStack alignItems="center" justifyContent="space-between">
                  {/*Image and name box*/}
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
                        <H3
                          color={"schools.bodyText"}
                          _dark={{
                            color: "schools.lightGray4",
                          }}
                          bold
                        >
                          Snehal Verma
                        </H3>
                        <BodyMedium color={"schools.gray"}>
                          Class Teacher: VI A
                        </BodyMedium>
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
                      30/5/2022
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
                      Kritika Kumar Gupta
                    </BodyMedium>
                  </Box>
                </HStack>
              </Box>
            </VStack>
          </Box>

          {/*bordered box*/}
          <Box
            p={6}
            borderColor={"schools.lightGray3"}
            bg={"schools.lightGray5"}
            borderWidth={1}
            rounded={10}
          >
            <VStack space={6}>
              {/*row 1 box*/}
              <Box>
                <HStack alignItems="center" justifyContent="space-between">
                  {/*Image and name box*/}
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
                        <H3
                          color={"schools.bodyText"}
                          _dark={{
                            color: "warmGray.50",
                          }}
                          bold
                        >
                          Snehal Verma
                        </H3>
                        <BodyMedium color={"schools.gray"}>
                          Class Teacher: VI A
                        </BodyMedium>
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
                      30/5/2022
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
                      Kritika Kumar Gupta
                    </BodyMedium>
                  </Box>
                </HStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </>
    </Collapsible>
  );
}
export default PastVisitCard;
