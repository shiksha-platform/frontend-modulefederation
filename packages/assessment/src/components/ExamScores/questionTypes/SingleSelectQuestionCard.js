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

const SingleSelectQuestionCard = ({ questionNumber}) => {
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
            <Radio.Group name="exampleGroup" defaultValue="1">
              <HStack alignItems={'center'} space={4}>
                <Radio value="1" colorScheme="green" size="sm">
                  Yes
                </Radio>

                <Radio value="0" colorScheme="green" size="sm">
                  No
                </Radio>
              </HStack>
            </Radio.Group>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default SingleSelectQuestionCard;
