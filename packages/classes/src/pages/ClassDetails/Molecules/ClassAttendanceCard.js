import React from "react";
import { Collapsible, IconByName } from "@shiksha/common-lib";
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
import * as attendanceServiceRegistry from "./../../../services/attendanceServiceRegistry";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const PRESENT = "Present";

const ClassAttendanceCard = ({ classId, students }) => {
  const { t } = useTranslation();
  const [presentAttendance, setPresentAttendance] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getData = async () => {
      let params = {
        fromDate: moment().format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
      };
      let attendanceData = await attendanceServiceRegistry.getAll(params);
      setPresentAttendance(
        attendanceData.filter((e) => e.attendance === PRESENT)
      );
    };
    getData();
  }, []);

  return (
    <Collapsible defaultCollapse={true} header={t("CLASS_ATTENDANCE")}>
      <VStack p="2" space={4}>
        <Box bg={"gray.100"} rounded={"md"} p="4">
          <VStack space={2}>
            <HStack justifyContent={"space-between"} alignItems="center">
              <Text bold>{t("STATUS")}</Text>
              <IconByName name="More2LineIcon" />
            </HStack>
            <Progress
              value={presentAttendance?.length}
              max={students?.length}
              my="4"
              size={"2xl"}
              colorScheme="green"
              bg="button.400"
            >
              {presentAttendance?.length ? (
                <Text color="white">
                  {presentAttendance?.length} {t("PRESENT")}
                </Text>
              ) : (
                ""
              )}
            </Progress>
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
