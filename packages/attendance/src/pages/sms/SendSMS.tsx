import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FlatList,
  HStack,
  Stack,
  Text,
  VStack,
} from "native-base";
import {
  GetAllStudents,
  GetAttendance,
  GetOneClass,
} from "../../services/calls/registryCalls";
import { TimeBar } from "components/simple/TimeBar/TimeBar";
import {
  IconByName,
  Layout,
  Collapsible,
  telemetryFactory,
  H2,
  H3,
  H4,
  capture,
  calendar,
  Caption,
  Subtitle,
  BodyLarge,
} from "@shiksha/common-lib";

// Components
// @ts-ignore
const Card = React.lazy(() => import("students/Card"));

// Utils
import { colorTheme } from "utils/functions/ColorTheme";
import { PRESENT, ABSENT } from "utils/functions/Constants";
import { usePAStudents } from "utils/customhooks/usePAStudents";

export default function SendSMS({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [datePage, setDatePage] = useState(0);
  const { classId } = useParams();
  const [classObject, setClassObject] = useState({});
  const teacherId = localStorage.getItem("id");
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [presentStudents] = usePAStudents({
    students,
    attendance,
    type: "present",
  });
  const [absentStudents] = usePAStudents({
    students,
    attendance,
    type: "absent",
  });

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      let classObj = await GetOneClass(classId);
      if (!ignore) setClassObject(classObj);
      const studentData = await GetAllStudents(classId);
      setStudents(studentData);
      await getAttendance();
    };
    getData();
    return () => {
      ignore = true;
    };
  }, [classId]);

  const getAttendance = async () => {
    let weekdays = calendar(datePage, "week");
    let params = {
      fromDate: weekdays?.[0]?.format("YYYY-MM-DD"),
      toDate: weekdays?.[weekdays.length - 1]?.format("YYYY-MM-DD"),
      attendance: PRESENT,
    };
    const attendanceData = await GetAttendance(params);
    setAttendance(attendanceData);
  };

  return (
    <Layout
      _header={{
        title: t("Message Sent By Admin"),
        subHeading: (
          <BodyLarge>
            {(classObject?.name ? "Class " + classObject?.name : "") +
              " • " +
              (classObject?.section ? " Sec " + classObject?.section : "")}
          </BodyLarge>
        ),
        _subHeading: { fontWeight: 500 },
      }}
      subHeader={
        <HStack space="4" justifyContent="space-between" alignItems="center">
          <TimeBar
            activeColor={colorTheme.grayIndark}
            _box={{ p: 0, bg: "transparent" }}
            {...{ page: datePage, setPage: setDatePage }}
            type="days"
          />
          <IconByName name={"ListUnorderedIcon"} isDisabled />
        </HStack>
      }
      _subHeader={{ bg: colorTheme.attendanceCardBg, mb: 1 }}
      _footer={footerLinks}
    >
      <VStack space="1">
        <Box bg={colors.white} p="5">
          <BodyLarge>
            {(classObject?.name ? "Class " + classObject?.name : "") +
              " • " +
              (classObject?.section ? " Sec " + classObject?.section : "")}
          </BodyLarge>
          <Caption>
            {t("TOTAL")}: {students.length} • {t("PRESENT")}:
            {attendance?.length}
          </Caption>
        </Box>
        <Box bg={colorTheme.white} p={4}>
          <Stack space={2}>
            <Collapsible
              defaultCollapse={true}
              isHeaderBold={false}
              header={
                <>
                  <VStack>
                    <H2 bold={true} fontSize={"md"}>
                      100% {t("THIS_WEEK")}
                    </H2>
                    <Caption>
                      {presentStudents?.length + " " + t("STUDENTS")}
                    </Caption>
                  </VStack>
                </>
              }
            >
              <VStack space={2} pt="2">
                <Box>
                  <FlatList
                    data={presentStudents}
                    renderItem={({ item }) => (
                      <Box
                        borderWidth="1"
                        borderColor={colorTheme.presentCardBorder}
                        bg={colorTheme.presentCardBg}
                        p="10px"
                        rounded="lg"
                        my="10px"
                      >
                        <Card
                          item={item}
                          type="rollFather"
                          hidePopUpButton
                          textTitle={
                            <VStack alignItems="center">
                              <H3 fontWeight="500">
                                <Text>{item.fullName}</Text>
                                <Text color={colorTheme.lightGray}> • </Text>
                                <Text color={colorTheme.presentCardText}>
                                  100%
                                </Text>
                              </H3>
                            </VStack>
                          }
                        />
                      </Box>
                    )}
                    keyExtractor={(item, index) => index}
                  />
                </Box>
              </VStack>
            </Collapsible>
          </Stack>
        </Box>

        <Box bg={colorTheme.white} p={4} mb="4" roundedBottom={"2xl"}>
          <Stack space={2}>
            <Collapsible
              defaultCollapse={true}
              isHeaderBold={false}
              header={
                <>
                  <VStack>
                    <H2 bold={true}>{t("ABSENT_CONSECUTIVE_3_DAYS")}</H2>
                    <Caption>
                      {absentStudents?.length + " " + t("STUDENTS")}
                    </Caption>
                  </VStack>
                </>
              }
            >
              <VStack space={2} pt="2">
                <Box>
                  <FlatList
                    data={absentStudents}
                    renderItem={({ item }) => (
                      <Box
                        borderWidth="1"
                        borderColor={colorTheme.absentCardBorder}
                        bg={colorTheme.absentCardBg}
                        p="10px"
                        rounded="lg"
                        my="10px"
                      >
                        <Card
                          item={item}
                          type="rollFather"
                          hidePopUpButton
                          textTitle={
                            <VStack alignItems="center">
                              <H3 fontWeight="500">
                                <Text>{item.fullName}</Text>
                                <Text color={colorTheme.lightGray}> • </Text>
                                <Text color={colorTheme.absentCardText}>
                                  3 {t("DAYS")}
                                </Text>
                              </H3>
                            </VStack>
                          }
                        />
                      </Box>
                    )}
                    keyExtractor={(item, index) => index}
                  />
                </Box>
              </VStack>
            </Collapsible>
          </Stack>
        </Box>
        <Box bg={colorTheme.white} p="5" position="sticky" shadow={2}>
          <VStack space={"15px"} alignItems={"center"}>
            <Subtitle py="5" px="10px" color={colorTheme.grayInLight}>
              <Text bold color={colorTheme.darkGray}>
                {t("NOTES") + ": "}
              </Text>
              {t("SMS_WILL_AUTOMATICALLY_SENT")}
            </Subtitle>
            <Button.Group width="100%">
              <Button flex="1" variant="outline" colorThemecheme="button">
                {t("CLOSE")}
              </Button>
              <Button
                flex="1"
                colorThemecheme="button"
                _text={{ color: colorTheme.white }}
                onPress={(e) => {
                  const telemetryData = telemetryFactory.interact({
                    appName,
                    type: "Attendance-Notification-View-Message",
                  });
                  capture("INTERACT", telemetryData);
                  navigate("/notification/create");
                }}
              >
                {t("SEND_ANOTHER_MESSAGE")}
              </Button>
            </Button.Group>
          </VStack>
        </Box>
      </VStack>
    </Layout>
  );
}
