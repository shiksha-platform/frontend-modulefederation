import React, { useState } from "react";
import {
  Collapsible,
  IconByName,
  attendanceRegistryService,
  ProgressBar,
  getUniqAttendance,
  overrideColorTheme,
  BodyMedium,
  BodyLarge,
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
  Pressable,
} from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { H2 } from "@shiksha/common-lib";
import RoundedProgressBar from "../../RoundedProgressBar";
import colorTheme from "../../../colorTheme";
const colors = overrideColorTheme(colorTheme);
// import StudentDetailCard from "./StudentDetail";

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const AssessmentScoreCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ]);

  return (
    <Box borderColor={colors.borderSeprator} borderWidth={1} rounded={10}>
      <Box p={4}>
        <HStack alignItems="center" justifyContent="space-between">
          <Box>
            <HStack>
              <Avatar
                size="48px"
                borderRadius="md"
                mr={4}
                source={{
                  uri: "https://via.placeholder.com/50x50.png",
                }}
              />
              <Box>
                <VStack>
                  <H2>Shah Rukh Khan</H2>
                  <HStack alignItems={"center"}>
                    <BodyLarge color={colors.bodyText}>
                      {t("Roll No. 23")}{" "}
                    </BodyLarge>
                  </HStack>
                </VStack>
              </Box>
            </HStack>
          </Box>
          <RoundedProgressBar
            values={[5, 2]}
            colors={["#43B13A", "#C1C0ED"]}
            title={{ text: "5", fontSize: "12px" }}
            legend={{ text: "Total Score", fontSize: "14px" }}
            cutout={"79%"}
            size="45px"
          />
        </HStack>
      </Box>
      <Divider />
      <Box borderColor={colors.borderSeprator} borderRadius={10} p={4}>
        <HStack justifyContent="space-between" flexWrap="wrap">
          {questions &&
            questions.length &&
            questions.map((question, index) => {
              return (
                <Box minW="20%" textAlign="center" mb={4} key={question.id}>
                  <VStack
                    justifyContent="center"
                    alignItems={"center"}
                    space={2}
                  >
                    <Box>
                      <BodyMedium color={colors.subtitle}>
                        Q-{index + 1}
                      </BodyMedium>
                    </Box>
                    <Box
                      w={"24px"}
                      h={"24px"}
                      rounded={5}
                      bg={colors.lightGray}
                    >
                      <Text style={{ lineHeight: "24px" }}>1</Text>
                    </Box>
                  </VStack>
                </Box>
              );
            })}
        </HStack>
      </Box>
    </Box>
  );
};

export default AssessmentScoreCard;
