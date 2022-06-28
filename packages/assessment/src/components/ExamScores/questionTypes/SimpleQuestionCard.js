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
  Button, Divider, Actionsheet, Checkbox, Radio, Input
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const SimpleQuestionCard = ({ questionNumber, question}) => {
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
              <Text bold mt={4} mr={2}>Q{questionNumber}. </Text>
              <div dangerouslySetInnerHTML={{__html: question?.question}}></div>
              <IconByName name="InformationFillIcon" p={0} color={'#F87558'} mt={3} />
            </HStack>
          </Box>
          <Box p="4" bg={"#FFF8F7"} borderBottomRadius={6}>
            <VStack space={3}>
              <Input placeholder={'Enter Marks'} bgColor="white" />
              <Text fontSize="xs" color="#666666">Max marks: 2</Text>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default SimpleQuestionCard;
