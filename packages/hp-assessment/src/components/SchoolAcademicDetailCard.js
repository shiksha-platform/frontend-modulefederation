import React, { useState } from "react";
import {
  Box,
  Center,
  VStack,
  Text,
  HStack,
  Avatar,
  Divider,
  Actionsheet,
  Stack,
  Pressable
} from "native-base";
import {
  DEFAULT_THEME,
  H2,
  IconByName,
  Collapsible,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const _handleGradeSelect = () => {
  localStorage.setItem('hp-assessment-groupId', '300bd6a6-ee1f-424a-a763-9db8b08a19e9');
}

const TileBasedOnStatus = ({status, children}) => {
  const navigate = useNavigate();
  if(status === 'ongoing'){
    return <Pressable onPress={() => {_handleGradeSelect(); navigate('/class-details');}}>
      <Box
        bg={'#ffc3694d'}
        p={4}
        borderColor={"#FFC369"}
        borderWidth={1}
        rounded={10}
      >
        {children}
      </Box>
    </Pressable>
  }
  if(status === 'complete' || status === 'completeWithNipun'){
    return <Pressable onPress={() => {_handleGradeSelect(); navigate('/class-details');}}>
      <Box
        bg={"#ECF7EB"}
        p={4}
        borderColor={"#C5DCC3"}
        borderWidth={1}
        rounded={10}
      >
        {children}
      </Box>
    </Pressable>
  }
  return <Pressable onPress={() => {_handleGradeSelect(); navigate('/class-details');}}>
    <Box
      p={4}
      borderColor={"#eee"}
      borderWidth={1}
      rounded={10}
    >
      {children}
    </Box>
  </Pressable>
}

export default function SchoolAcademicDetailCard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [academicDetailModal, setAcademicDetailModal] = useState(false);
  return (
    <>
      <Collapsible
        defaultCollapse={true}
        header={
          <Box py={4}>
            <H2>Academic Details</H2>
          </Box>
        }
      >
        <>
          {/*<Divider mb={4} />*/}
          <VStack space={4}>
            <TileBasedOnStatus status={'pending'}>
              <HStack alignItems="center" justifyContent="space-between">
                <Box>
                  <VStack>
                    <Text bold>Grade I</Text>
                    <Text color="#666">65 Students</Text>
                  </VStack>
                </Box>
                <IconByName
                  name="ArrowRightSLineIcon"
                  isDisabled={true}
                />
              </HStack>
            </TileBasedOnStatus>

            <TileBasedOnStatus status={'ongoing'}>
              <HStack alignItems="center" justifyContent="space-between">
                <Box>
                  <VStack>
                    <Text bold>Grade II</Text>
                    <Text color="#666">69 Students</Text>
                  </VStack>
                </Box>
                <IconByName
                  name="ArrowRightSLineIcon"
                  isDisabled={true}
                />
              </HStack>
            </TileBasedOnStatus>

            <TileBasedOnStatus status={'complete'}>
              <HStack alignItems="center" justifyContent="space-between">
                <Box>
                  <VStack>
                    <Text bold>Grade III</Text>
                    <Text color="#666">69 Students</Text>
                  </VStack>
                </Box>
                <IconByName
                  name="ArrowRightSLineIcon"
                  isDisabled={true}
                />
              </HStack>
            </TileBasedOnStatus>
          </VStack>
        </>
      </Collapsible>
    </>
  );
}
