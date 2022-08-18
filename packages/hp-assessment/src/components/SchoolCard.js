import React, { useEffect, useState } from "react";
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
import { DEFAULT_THEME, H2, hpAssessmentRegistryService, IconByName, overrideColorTheme } from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";
import colorTheme from "../colorTheme";
import nipun_badge from "../stories/assets/nipun_badge.svg"
const colors = overrideColorTheme(colorTheme);

const CardBasedOnStatus = ({status, children}) => {
  if(status === 'ongoing'){
    return <Box bg={'#ffebd0'} borderRadius={10}>{children}</Box>
  }
  if(status === 'complete' || status === 'completeWithNipun'){
    return <Box bg={"#ECF7EB"} borderRadius={10}>{children}</Box>
  }
  return <Box bg={"white"} borderRadius={10}>{children}</Box>
}

function SchoolCard({ schoolId }) {
  const navigate = useNavigate();
  const [schoolDetail, setSchoolDetail] = useState({});

  const getSchoolDetail = async (id) => {
    const detail = await hpAssessmentRegistryService.getSchoolDetail(id);
    setSchoolDetail(detail);
  }

  const _handleSchoolSelect = () => {
    localStorage.setItem('hp-assessment-school', JSON.stringify(schoolDetail));
    navigate('/school-profile');
  }

  useEffect(() => {
    getSchoolDetail(schoolId);
  }, []);

  return (
    <>
      <VStack space={6}>
        <Pressable onPress={_handleSchoolSelect}>
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
                          {schoolDetail?.schoolName}
                        </Text>
                        <Text bold fontSize={12} color="#666">
                          {schoolDetail?.district}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  {
                    schoolDetail?.status === 'completeWithNipun' && <Box alignItems='end'>
                      <img src={nipun_badge} alt="nipun" style={{maxWidth: '45px'}} />
                    </Box>
                  }
                </HStack>
              </Box>
              <Divider bg={schoolDetail?.status === 'ongoing' ? colors.warning : (schoolDetail?.status === 'complete' || schoolDetail?.status === 'completeWithNipun' ? '#C5DCC3' : '#EEEEEE')} />
              <Box p={4}>
                <HStack
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  flexWrap={"wrap"}
                >
                  <Box w={'50%'}>
                    <VStack>
                      <HStack alignItems="center">
                        <IconByName size="12px" mr={2} ml="-7px" name="MapPinLineIcon" />
                        <Text color="#666" fontSize="12">
                          District
                        </Text>
                      </HStack>
                      <Text fontSize="12">{schoolDetail?.district}</Text>
                    </VStack>
                  </Box>

                  <Box w={'50%'}>
                    <VStack>
                      <HStack alignItems="center">
                        <IconByName size="12px" mr={2} ml="-7px" name="GovernmentLineIcon" />
                        <Text color="#666" fontSize="12">
                          Block
                        </Text>
                      </HStack>
                      <Text fontSize="12">{schoolDetail?.block}</Text>
                    </VStack>
                  </Box>

                  <Box w={'50%'} mt={4}>
                    <VStack>
                      <HStack alignItems="center">
                        <IconByName
                          size="12px"
                          mr={2}
                          ml="-7px"
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
                          ml="-7px"
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
                          ml="-7px"
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
