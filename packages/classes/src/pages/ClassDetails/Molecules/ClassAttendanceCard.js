import React from "react";
import {
  Collapsible,
  IconByName,
  attendanceRegistryService,
  ProgressBar,
  getUniqAttendance,
  overrideColorTheme,
} from "@shiksha/common-lib";
import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Progress,
  Button,
} from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import colorTheme from "../../../colorTheme";

const colors = overrideColorTheme(colorTheme);

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

const ClassAttendanceCard = ({ classId, students }) => {
  const { t } = useTranslation();
  const [progressAttendance, setProgressAttendance] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getData = async () => {
      let params = {
        fromDate: moment().format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
        // groupId: classId,
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
  }, [students]);

  return (
    <Collapsible
      defaultCollapse={true}
      header={t("CLASS_ATTENDANCE")}
      fontSize="2px"
    >
      <VStack p="2" space={4}>
        <Box bg={colors.lightGrayBg} rounded={"md"} p="4">
          <VStack space={2}>
            <HStack justifyContent={"space-between"} alignItems="center">
              <Text bold>{t("STATUS")}</Text>
              <IconByName name="More2LineIcon" />
            </HStack>
            <ProgressBar
              isTextInBar
              h="50px"
              _bar={{ rounded: "" }}
              isLabelCountHide
              data={progressAttendance}
            />
            <HStack justifyContent={"space-between"} alignItems="center">
              {/* <Text>{t("GRADE") + ": " + t("GOOD")}</Text> */}
              <Text>
                {t("TOTAL") + `: ${students?.length} ` + t("STUDENTS")}
              </Text>
            </HStack>
          </VStack>
        </Box>
        <Box px="5">
          <Button
            flex="1"
            colorScheme="button"
            variant="outline"
            px="5"
            onPress={(e) => navigate(`/attendance/${classId}`)}
          >
            {t("ATTENDANCE_REGISTER")}
          </Button>
        </Box>
        <Stack space={2}>
          <Collapsible
            isDisableCollapse
            header={t("REPORTS")}
            onPressFuction={(e) => navigate("/attendance/report")}
          />
        </Stack>

        {/* <Box
          bg="white"
          borderBottomWidth="1"
          borderBottomColor={"coolGray.200"}
        >
          <Stack space={2}>
            <Collapsible header={t("SMS_REPORTS")} />
          </Stack>
        </Box> */}
      </VStack>
    </Collapsible>
  );
};

export default ClassAttendanceCard;
