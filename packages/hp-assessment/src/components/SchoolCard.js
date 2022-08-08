import React from "react";
import {
  Box,
  Center,
  VStack,
  Text,
  HStack,
  Avatar,
  Divider,
  Pressable
} from "native-base";
import { DEFAULT_THEME, H2, IconByName, overrideColorTheme } from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";
import colorTheme from "../colorTheme";
import nipun_badge from "../stories/assets/nipun_badge.svg"
const colors = overrideColorTheme(colorTheme);

const CardBasedOnStatus = ({status, children}) => {
  if(status === 'ongoing'){
    return <Box bg={'#ffc3694d'} borderRadius={10}>{children}</Box>
  }
  if(status === 'complete' || status === 'completeWithNipun'){
    return <Box bg={"#ECF7EB"} borderRadius={10}>{children}</Box>
  }
  return <Box bg={"white"} borderRadius={10}>{children}</Box>
}

function SchoolCard({ status }) {
  const navigate = useNavigate();
  return (
    <>
      <VStack space={6}>
        <Pressable onPress={()=> {navigate('/school-profile')}}>
          <CardBasedOnStatus status={status}>
            <>
              <Box p={4}>
                <HStack alignItems="center" justifyContent="space-between">
                  <Box>
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
                        <Text bold fontSize={14}>
                          Delhi Public School, Ghaziabad
                        </Text>
                        <Text bold fontSize={12} color="#666">
                          Ghaziabad, Uttar Pradesh
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  {
                    status === 'completeWithNipun' && <Box alignItems='end'>
                      <img src={nipun_badge} alt="nipun" style={{maxWidth: '45px'}} />
                    </Box>
                  }
                </HStack>
              </Box>
              <Divider bg={status === 'ongoing' ? '#ffc369' : (status === 'complete' || status === 'completeWithNipun' ? '#C5DCC3' : '#EEEEEE')} />
              <Box p={4}>
                <HStack
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  flexWrap={"wrap"}
                >
                  <Box w={'50%'}>
                    <VStack>
                      <HStack alignItems="center">
                        <IconByName size="12px" mr={2} name="MapPinLineIcon" />
                        <Text color="#666" fontSize="12">
                          District
                        </Text>
                      </HStack>
                      <Text fontSize="12">Ghaziabad</Text>
                    </VStack>
                  </Box>

                  <Box w={'50%'}>
                    <VStack>
                      <HStack alignItems="center">
                        <IconByName size="12px" mr={2} name="GovernmentLineIcon" />
                        <Text color="#666" fontSize="12">
                          Block
                        </Text>
                      </HStack>
                      <Text fontSize="12">Not Available</Text>
                    </VStack>
                  </Box>

                  <Box w={'50%'} mt={4}>
                    <VStack>
                      <HStack alignItems="center">
                        <IconByName
                          size="12px"
                          mr={2}
                          name="CalendarEventLineIcon"
                        />
                        <Text color="#666" fontSize="12">
                          Cluster
                        </Text>
                      </HStack>
                      <Text fontSize="12">Gandhi Nagar</Text>
                    </VStack>
                  </Box>

                  <Box w={'50%'} mt={4}>
                    <VStack>
                      <HStack alignItems="center">
                        <IconByName
                          size="12px"
                          mr={2}
                          name="CalendarEventLineIcon"
                        />
                        <Text color="#666" fontSize="12">
                          Enrollment in Grade 1-3
                        </Text>
                      </HStack>
                      <Text fontSize="12">200</Text>
                    </VStack>
                  </Box>

                  <Box w={'50%'} mt={4}>
                    <VStack>
                      <HStack alignItems="center">
                        <IconByName
                          size="12px"
                          mr={2}
                          name="CalendarEventLineIcon"
                        />
                        <Text color="#666" fontSize="12">
                          Reference ID/UDISE
                        </Text>
                      </HStack>
                      <Text fontSize="12">213456</Text>
                    </VStack>
                  </Box>
                </HStack>
              </Box>
            </>
          </CardBasedOnStatus>
        </Pressable>
      </VStack>
    </>
  );
}
export default SchoolCard;
