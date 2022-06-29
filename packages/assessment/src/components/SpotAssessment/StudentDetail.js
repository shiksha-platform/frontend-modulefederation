import React, { useState } from "react";
import {
  Collapsible,
  IconByName,
  attendanceRegistryService,
  ProgressBar,
  getUniqAttendance,
} from "@shiksha/common-lib";
import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Progress,
  Button,
  Divider,
  Actionsheet,
  Checkbox,
  Avatar,
  Spacer,
} from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { H2 } from "@shiksha/common-lib";

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const StudentDetailCard = ({ setSelectedStudent }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [toDoNextModal, setToDoNextModal] = useState(false);
  const [similarTestModal, setSimilarTestModal] = useState(false);
  const [nextOption, setNextOption] = useState();

  const handleNextOption = () => {
    if (nextOption === "similar") {
      setToDoNextModal(false);
      setSimilarTestModal(true);
    } else if (nextOption === "repeat") {
      // setSimilarTestModal(true);
    } else if (nextOption === "end") {
      // setSimilarTestModal(true);
    }
  };

  return (
    <>
      <Box border="1" borderRadius="md" shadow={2} m={2} mb={4}>
        <VStack space="0">
          <Box p="4" bg="green.200" roundedTop="6">
            <HStack justifyContent={"center"} alignItems="center">
              <IconByName name="EmotionHappyLineIcon" p="0" color="green.600" />
              <Text color="green.600" bold>
                {" "}
                {t("YAY! you got most of the answers right!")}
              </Text>
            </HStack>
          </Box>
          <Box p="4" textAlign="center" bg="orange.100">
            <Text fontSize={24} color="green.600" bold mb="0">
              72 %
            </Text>
            <Text color="muted.600" fontSize="xs">
              {t("Total Score")}
            </Text>
            <HStack justifyContent={"center"} alignItems="center">
              <IconByName name="StarSFillIcon" p="0" color="green.600" />
              <IconByName name="StarSFillIcon" p="0" color="green.600" />
              <IconByName name="StarSFillIcon" p="0" color="green.600" />
              <IconByName name="StarSFillIcon" p="0" color="green.600" />
              <IconByName name="StarSFillIcon" p="0" color="green.600" />
            </HStack>
          </Box>
        </VStack>
      </Box>

      <Box p="4" pt="0">
        <Button
          colorScheme="button"
          _text={{
            color: "white",
          }}
          onPress={() => setToDoNextModal(true)}
        >
          {t("Return to teacher")}
        </Button>
      </Box>

      <Actionsheet
        isOpen={toDoNextModal}
        onClose={() => setToDoNextModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg="#D9F0FC">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <Text fontSize="16px" fontWeight={"600"}>
                {t("What would you like to do next?")}
              </Text>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={"white"}
              onPress={(e) => setToDoNextModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg="white">
          <Actionsheet.Item onPress={() => setNextOption("repeat")}>
            Repeat test with another student
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setNextOption("similar")}>
            Give similar test to another student
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setNextOption("end")}>
            End Assessment
          </Actionsheet.Item>
          <Divider my={4}></Divider>

          <Box p="4" pt="0">
            <Button
              colorScheme="button"
              _text={{
                color: "white",
              }}
              // onPress={()=> setSelectedStudent()}
              onPress={() => handleNextOption()}
            >
              {t("Continue")}
            </Button>
          </Box>
        </Box>
      </Actionsheet>

      <Actionsheet
        isOpen={similarTestModal}
        onClose={() => setSimilarTestModal(false)}
      >
        <Actionsheet.Content alignItems={"left"} bg="#D9F0FC">
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="25px">
              <Text fontSize="16px" fontWeight={"600"}>
                {t("Give similar test to another student")}
              </Text>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={"white"}
              onPress={(e) => setSimilarTestModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg="white">
          <Text my={3}>
            A similar test will consist of the same competencies with a
            different set of questions.
          </Text>
          <Text my={3}>Are you sure you want to continue?</Text>
          <Divider my={4}></Divider>

          <Box>
            <HStack justifyContent={"space-between"}>
              <Button
                colorScheme="button"
                _text={{
                  color: "#fff",
                }}
                // onPress={()=> setSelectedStudent()}
              >
                {t("Choose  COMPETENCIES")}
              </Button>

              <Button
                colorScheme="button"
                _text={{
                  color: "#fff",
                }}
                // onPress={()=> setSelectedStudent()}
              >
                {t("Yes, Continue")}
              </Button>
            </HStack>
          </Box>
        </Box>
      </Actionsheet>
    </>
  );
};

export default StudentDetailCard;
