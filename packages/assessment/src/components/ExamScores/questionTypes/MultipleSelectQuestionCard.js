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

const MultipleSelectQuestionCard = ({ questionNumber, question}) => {
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
            <VStack space={4}>
              <HStack alignItems={'center'} justifyContent={'space-between'} flexWrap={'wrap'}>
                {
                  question && question.options && question.options.length && question.options.map((option, optionIndex)=> {
                    return <div style={{flex: '0 0 50%', maxWidth: '50%'}} key={`option-${optionIndex}`}>
                      <HStack>
                        <Text bold mt={4}>{optionIndex+1}. </Text>
                        <div dangerouslySetInnerHTML={{__html: option.value.body}}></div>
                      </HStack>
                    </div>
                  })
                }
                {/*<Text flexGrow={1} flexBasis={'50px'}>a. 70</Text>
                <Text flexGrow={1} flexBasis={'50px'}>b. 0.7</Text>*/}
              </HStack>

              {/*<HStack alignItems={'center'} justifyContent={'space-between'}>
                <Text flexGrow={1} flexBasis={'50px'}>c. 7000</Text>
                <Text flexGrow={1} flexBasis={'50px'}>d. 0.75</Text>
              </HStack>*/}
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
