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
import { GetAttendance } from "../../components/AttendanceComponent";
import DayWiesBar from "../../components/CalendarBar";
import {
  IconByName,
  Layout,
  Collapsible,
  telemetryFactory,
  H2,
  H3,
  H4,
  H5,
  capture,
  calendar,
  getStudentsPresentAbsent,
  classRegistryService,
  studentRegistryService,
} from "@shiksha/common-lib";
import moment from "moment";

const PRESENT = "Present";
const ABSENT = "Absent";

export default function SendSMS({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [datePage, setDatePage] = useState(0);
  const { classId } = useParams();
  const [classObject, setClassObject] = useState({});
  const teacherId = localStorage.getItem("id");
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();
  const Card = React.lazy(() => import("students/Card"));
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const holidays = [moment().add(1, "days").format("YYYY-MM-DD")];

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      let classObj = await classRegistryService.getOne({ id: classId });
      if (!ignore) setClassObject(classObj);
      const studentData = await studentRegistryService.getAll({ classId });
      setStudents(studentData);
      await getAttendance();
      await getPresentStudents({ students: studentData });
      await getAbsentStudents({ students: studentData });
    };
    getData();
    return () => {
      ignore = true;
    };
  }, [classId]);

  const getAttendance = async (e) => {
    let weekdays = calendar(datePage, "week");
    let params = {
      fromDate: weekdays?.[0]?.format("YYYY-MM-DD"),
      toDate: weekdays?.[weekdays.length - 1]?.format("YYYY-MM-DD"),
      attendance: PRESENT,
    };
    const attendanceData = await GetAttendance(params);
    setAttendance(attendanceData);
  };

  const getPresentStudents = async ({ students }) => {
    let weekdays = calendar(-1, "week");
    let workingDaysCount = weekdays.filter(
      (e) => !(!e.day() || holidays.includes(e.format("YYYY-MM-DD")))
    )?.length;
    let params = {
      fromDate: weekdays?.[0]?.format("YYYY-MM-DD"),
      toDate: weekdays?.[weekdays.length - 1]?.format("YYYY-MM-DD"),
    };
    let attendanceData = await GetAttendance(params);
    const present = getStudentsPresentAbsent(
      attendanceData,
      students,
      workingDaysCount
    );
    let presentNew = students.filter((e) =>
      present.map((e) => e.id).includes(e.id)
    );
    setPresentStudents(
      await studentRegistryService.setDefaultValue(presentNew)
    );
  };

  const getAbsentStudents = async (students) => {
    let weekdays = calendar(-1, "week");
    let params = {
      fromDate: weekdays?.[0]?.format("Y-MM-DD"),
      toDate: weekdays?.[weekdays.length - 1]?.format("Y-MM-DD"),
      fun: "getAbsentStudents",
    };
    const attendanceData = await GetAttendance(params);
    const absent = getStudentsPresentAbsent(
      attendanceData,
      students,
      3,
      "Absent"
    );
    let absentNew = students.filter((e) =>
      absent.map((e) => e.id).includes(e.id)
    );
    setAbsentStudents(await studentRegistryService.setDefaultValue(absentNew));
  };

  return (
    <Layout
      _header={{
        title: t("Message Sent By Admin"),
        subHeading: classObject.name,
        _subHeading: { fontWeight: 500 },
      }}
      subHeader={
        <HStack space="4" justifyContent="space-between" alignItems="center">
          <DayWiesBar
            activeColor="gray.900"
            _box={{ p: 0, bg: "transparent" }}
            {...{ page: datePage, setPage: setDatePage }}
          />
          <IconByName name={"ListUnorderedIcon"} isDisabled />
        </HStack>
      }
      _subHeader={{ bg: "attendanceCard.500", mb: 1 }}
      _footer={footerLinks}
    >
      <Box bg="white" p="5">
      <HStack space="4" justifyContent="space-between" alignItems="center">
          <DayWiesBar
            activeColor="gray.900"
            _box={{ p: 0, bg: "transparent" }}
            {...{ page: datePage, setPage: setDatePage }}
          />
          <IconByName name={"ListUnorderedIcon"} isDisabled />
        </HStack>
      </Box>
      <VStack space="1">
        <Box bg="white" p="5">
          <H2 fontWeight="600">{classObject.name}</H2>
          <H5 fontWeight="300">
            {t("TOTAL")}: {students.length} {t("PRESENT")}:{attendance?.length}
          </H5>
        </Box>
        <Box bg="white" p={4}>
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
                    <H4>{presentStudents?.length + " " + t("STUDENTS")}</H4>
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
                        borderColor="presentCardBg.600"
                        bg="presentCardBg.500"
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
                                <Text color="gray.300"> • </Text>
                                <Text color="presentCardText.500">100%</Text>
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

        <Box bg="white" p={4} mb="4" roundedBottom={"2xl"}>
          <Stack space={2}>
            <Collapsible
              defaultCollapse={true}
              isHeaderBold={false}
              header={
                <>
                  <VStack>
                    <H2 bold={true}>{t("ABSENT_CONSECUTIVE_3_DAYS")}</H2>
                    <H4>{absentStudents?.length + " " + t("STUDENTS")}</H4>
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
                        borderColor="absentCardBg.600"
                        bg="absentCardBg.500"
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
                                <Text color="gray.300"> • </Text>
                                <Text color="absentCardText.500">
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
        <Box p="2" py="5" bg="white" mb="1">
          <VStack space={"15px"} alignItems={"center"}>
            <H5 textAlign={"center"} textTransform={"inherit"}>
              <Text bold color={"gray.700"}>
                {t("NOTES") + ": "}
              </Text>
              {t("SMS_WILL_AUTOMATICALLY_SENT")}
            </H5>
            <Button.Group>
              <Button variant="outline" colorScheme="button">
                {t("CLOSE")}
              </Button>
              <Button
                colorScheme="button"
                _text={{ color: "white" }}
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
