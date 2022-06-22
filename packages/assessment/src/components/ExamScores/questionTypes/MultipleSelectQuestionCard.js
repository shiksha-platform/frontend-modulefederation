import React, { useState } from "react";
import {
  IconByName,
  ProgressBar,
} from "@shiksha/common-lib";
import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Progress,
  Button, Divider, Actionsheet, Checkbox, Radio
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const MultipleSelectQuestionCard = ({ questionNumber}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "12 Assessed",
      color: "#0D921B",
      value: 12,
    },
    {
      name: "6 pending",
      color: "#DDDDDD",
      value: 6,
    }
  ]);


  return (
    <>
      <Box borderRadius="md">
        <VStack>
          <Box px="4" py={2} bg={"#FEF1EE"} roundedTop="6">
            <HStack>
              <Text color={"#373839"} textAlign="justify" whiteSpace="initial" mr={2}>
                <Text bold>Q{questionNumber}. </Text>
                <Text>A factory produces 9643243 toys every month. It sends 1438228 toys to the town market, 1657539 toys to markets in other states and 1413931 to the markets in other countries. 15 toys are left in the factory.</Text>
              </Text>
              <Text><IconByName name="InformationFillIcon" p={0} color={'#F87558'} /></Text>
            </HStack>
          </Box>
          <Box p="4" bg={"#FFF8F7"} borderBottomRadius={6}>
            <VStack space={4}>
              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Text flexGrow={1} flexBasis={'50px'}>a. 70</Text>
                <Text flexGrow={1} flexBasis={'50px'}>b. 0.7</Text>
              </HStack>

              <HStack alignItems={'center'} justifyContent={'space-between'}>
                <Text flexGrow={1} flexBasis={'50px'}>c. 7000</Text>
                <Text flexGrow={1} flexBasis={'50px'}>d. 0.75</Text>
              </HStack>
              <Divider />
              <Box>
                <VStack space={3}>
                  <Text>Grade</Text>
                  <HStack alignItems={'center'} justifyContent={'space-between'}>
                    <Box borderWidth={2} borderColor={'#F87558'} borderRadius={'full'} w="30px" h="30px" alignItems={'center'} justifyContent="center">
                      <Text color={"#F87558"}>A</Text>
                    </Box>

                    <Box borderWidth={2} borderColor={'#F87558'} borderRadius={'full'} w="30px" h="30px" alignItems={'center'} justifyContent="center">
                      <Text color={"#F87558"}>B</Text>
                    </Box>

                    <Box borderWidth={2} borderColor={'#F87558'} borderRadius={'full'} w="30px" h="30px" alignItems={'center'} justifyContent="center">
                      <Text color={"#F87558"}>C</Text>
                    </Box>

                    <Box borderWidth={2} borderColor={'#F87558'} borderRadius={'full'} w="30px" h="30px" alignItems={'center'} justifyContent="center">
                      <Text color={"#F87558"}>D</Text>
                    </Box>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default MultipleSelectQuestionCard;
