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
  Button, Divider, Actionsheet, Checkbox
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ExamScoresCard = ({ setPageName }) => {
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
        <Text>State Examinations</Text>
        <Box borderRadius="md">
          <VStack space="4">
            <Box px="4" py={2} bg={"#F57B7B"} roundedTop="6">
              <HStack justifyContent={"center"} alignItems="center">
                <IconByName name="TimeLineIcon" pr="0" color="white" />
                <Text color="white" bold fontSize="xs"> 4 Days left! Submit assessment scores now.</Text>
              </HStack>
            </Box>
            <Box px="4" bg={"#FFF8F7"}>
              <Text bold mb="3">Summative Assessment 1</Text>
              <Text mb="5" fontSize={"xs"} color={'muted.600'}>Due Date - 27, May 2022</Text>
              <VStack flex="auto" alignContent={"center"}>
                <ProgressBar
                  isTextShow
                  legendType="separated"
                  h="35px"
                  _bar={{ rounded: "md" }}
                  isLabelCountHide
                  data={progressAssessment}
                />
              </VStack>
            </Box>
            <Box p="4" bg={"#FCF3F3"} borderBottomRadius={6}>
              <Button
                py={3}
                colorScheme="button"
                _text={{color: "#fff"}}
                onPress={()=> navigate('/examscores')}
              >
                {t("continue")}
              </Button>
            </Box>
          </VStack>
        </Box>
      </VStack>
      <Text my={2} textAlign={"center"} color={"#F87558"} fontSize={12} bold cursor={"pointer"}>{t('VIEW PAST ASSESSMENTS')}</Text>
    </>
  );
};

export default ExamScoresCard;
