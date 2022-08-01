import React, { useState } from "react";
import {
  IconByName,
  ProgressBar,
  overrideColorTheme,
  BodyLarge,
  Subtitle,
  BodySmall,
} from "@shiksha/common-lib";
import { HStack, VStack, Box, Button, Divider } from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../colorTheme";
const colors = overrideColorTheme(colorTheme);

const ExamScoresCard = ({ setPageName }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [progressAssessment, setProgressAssessment] = React.useState([
    {
      name: "12 Assessed",
      color: colors.successBarColor,
      value: 12,
    },
    {
      name: "6 pending",
      color: colors.pendingBarColor,
      value: 6,
    },
  ]);

  /*React.useEffect(() => {
    const getData = async () => {
      let params = {
        fromDate: moment().format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
      };
      let attendanceData = await attendanceRegistryService.getAll(params);
      let lengthAttendance = 0;
      const data = [PRESENT, ABSENT, UNMARKED].map((item, index) => {
        const attendance = getUniqAttendance(attendanceData, item, students);
        let count = 0;
        lengthAttendance += attendance.length;
        if (item === UNMARKED) {
          count = attendance.length + (students.length - lengthAttendance);
        } else {
          count = attendance.length;
        }
        return {
          name: count + " " + item,
          color: `attendance${item}.500`,
          value: count,
        };
      });

      setProgressAttendance(data);
    };
    getData();
  }, [students]);*/

  return (
    <>
      <VStack space={2}>
        <BodyLarge>State Examinations</BodyLarge>
        <Box
          borderWidth="1"
          borderColor={colors.borderColor}
          borderRadius="10px"
        >
          <VStack space="4">
            <Box px="4" py={2} bg={colors.scoreCardIcon2} roundedTop="6">
              <HStack justifyContent={"center"} alignItems="center">
                <IconByName name="TimeLineIcon" pr="0" color={colors.white} />
                <Subtitle color={colors.white}>
                  {" "}
                  4 Days left! Submit assessment scores now.
                </Subtitle>
              </HStack>
            </Box>
            <Box px="4">
              <BodyLarge>Summative Assessment 1</BodyLarge>
              <BodySmall py="2" color={colors.gray}>
                Due Date - 27, May 2022
              </BodySmall>
              <VStack flex="auto" alignContent={"center"}>
                <ProgressBar
                  isTextShow
                  legendType="separated"
                  h="35px"
                  _bar={{ rounded: "md", my: "3" }}
                  isLabelCountHide
                  data={progressAssessment}
                />
              </VStack>
            </Box>
            <Divider my="1" mx="4" w="90%"></Divider>
            <Box p="4" pt="4px" borderBottomRadius={6}>
              <Button
                py={3}
                colorScheme="button"
                _text={{ color: colors.white }}
                onPress={() => navigate("/assessment/examscores")}
              >
                {t("continue")}
              </Button>
            </Box>
          </VStack>
        </Box>
      </VStack>
      <Subtitle my={2} textAlign={"center"} color={colors.primary}>
        {t("VIEW PAST ASSESSMENTS")}
      </Subtitle>
    </>
  );
};

export default ExamScoresCard;
