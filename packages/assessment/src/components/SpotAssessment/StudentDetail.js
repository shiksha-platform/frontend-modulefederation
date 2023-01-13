import React, { useState } from "react";
import {
  BodyLarge,
  BodyMedium,
  H1,
  H2,
  IconByName,
  overrideColorTheme,
} from "@shiksha/common-lib";
import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Button,
  Divider,
  Actionsheet,
} from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

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
            <H1 color="green.600" bold mb="0">
              72 %
            </H1>
            <BodyLarge color="muted.600">{t("Total Score")}</BodyLarge>
            {/* <HStack justifyContent={"center"} alignItems="center">
              <IconByName name="StarSFillIcon" p="0" color="green.600" />
              <IconByName name="StarSFillIcon" p="0" color="green.600" />
              <IconByName name="StarSFillIcon" p="0" color="green.600" />
              <IconByName name="StarSFillIcon" p="0" color="green.600" />
              <IconByName name="StarSFillIcon" p="0" color="green.600" />
            </HStack> */}
          </Box>
        </VStack>
      </Box>

      <Box p="4" pt="0">
        <Button
          colorScheme="button"
          _text={{
            color: colors.white,
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
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("What would you like to do next?")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setToDoNextModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={colors.white}>
          <Actionsheet.Item onPress={() => setNextOption("repeat")}>
            <BodyLarge>
              Continue another type of test with same student
            </BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setNextOption("repeat")}>
            <BodyLarge>Repeat test with another student</BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setNextOption("similar")}>
            <BodyLarge>Give similar test to another student</BodyLarge>
          </Actionsheet.Item>
          <Actionsheet.Item onPress={() => setNextOption("end")}>
            <BodyLarge>End assessment</BodyLarge>
          </Actionsheet.Item>
          <Divider my={4}></Divider>

          <Box p="4" pt="0">
            <Button
              colorScheme="button"
              _text={{
                color: colors.white,
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
        <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
          <HStack justifyContent={"space-between"}>
            <Stack p={5} pt={2} pb="15px">
              <H2>{t("Give similar test to another student")}</H2>
            </Stack>
            <IconByName
              name="CloseCircleLineIcon"
              color={colors.cardCloseIcon}
              onPress={(e) => setSimilarTestModal(false)}
            />
          </HStack>
        </Actionsheet.Content>
        <Box w="100%" p={4} justifyContent="center" bg={colors.white}>
          <BodyMedium my={3}>
            A similar test will consist of the same competencies with a
            different set of questions.
          </BodyMedium>
          <BodyMedium my={3}>Are you sure you want to continue?</BodyMedium>
          <Divider my={4}></Divider>

          <Box>
            <HStack justifyContent={"space-between"}>
              <Button
                colorScheme="button"
                _text={{
                  color: colors.white,
                }}
                // onPress={()=> setSelectedStudent()}
              >
                {t("Choose  COMPETENCIES")}
              </Button>

              <Button
                colorScheme="button"
                _text={{
                  color: colors.white,
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
