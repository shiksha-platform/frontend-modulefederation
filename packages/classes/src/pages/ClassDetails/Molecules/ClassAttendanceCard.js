import React from "react";
import { Collapsible, IconByName } from "@shiksha/common-lib";
import { HStack, Text, VStack, Stack, Box, Progress } from "native-base";
import { useTranslation } from "react-i18next";
import LinkWrapper from "atoms/LinkWrapper";
import * as attendanceServiceRegistry from "./../../../services/attendanceServiceRegistry";
import moment from "moment";

const PRESENT = "Present";

const ClassAttendanceCard = ({ classId, students }) => {
  const { t } = useTranslation();
  const [attendance, setAttendance] = React.useState([]);
  const [presentAttendance, setPresentAttendance] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      let params = {
        fromDate: moment().format("YYYY-MM-DD"),
        toDate: moment().format("YYYY-MM-DD"),
      };
      let attendanceData = await attendanceServiceRegistry.getAll(params);
      setAttendance(attendanceData);
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
        <LinkWrapper
          style={{
            color: "rgb(63, 63, 70)",
            textDecoration: "none",
          }}
          to={`/attendance/${classId}`}
        >
          <Box
            rounded="xs"
            borderWidth="1"
            px={6}
            py={2}
            mt="2"
            textAlign={"center"}
            borderColor={"button.500"}
            _text={{ color: "button.500" }}
          >
            {t("ATTENDANCE_REGISTER")}
          </Box>
        </LinkWrapper>

        <Box
          bg="white"
          borderBottomWidth="1"
          borderBottomColor={"coolGray.200"}
        >
          <Stack space={2}>
            <Collapsible header={t("REPORTS")} />
          </Stack>
        </Box>

        <Box
          bg="white"
          borderBottomWidth="1"
          borderBottomColor={"coolGray.200"}
        >
          <Stack space={2}>
            <Collapsible header={t("SMS_REPORTS")} />
          </Stack>
        </Box>
      </VStack>
    </Collapsible>
  );
};

export default ClassAttendanceCard;
