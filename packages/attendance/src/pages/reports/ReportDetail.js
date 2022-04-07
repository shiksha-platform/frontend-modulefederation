import moment from "moment";
import {
  Box,
  Button,
  FlatList,
  HStack,
  PresenceTransition,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import CalendarBar from "../../components/CalendarBar";
import * as classServiceRegistry from "../../services/classServiceRegistry";
import AttendanceComponent, {
  calendar,
  GetAttendance,
} from "../../components/AttendanceComponent";
import * as studentServiceRegistry from "../../services/studentServiceRegistry";
import ReportSummary from "../../components/ReportSummary";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/Card";

import {
  IconByName,
  Layout,
  getStudentsPresentAbsent,
  getUniqAttendance,
} from "@shiksha/common-lib";

export default function ReportDetail() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const { classId, view } = useParams();
  const [classObject, setClassObject] = useState({});
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [attendanceForReport, setAttendanceForReport] = useState([]);
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [calendarView] = useState(
    view
      ? ["month", "monthInDays"].includes(view)
        ? "monthInDays"
        : ["week", "weeks"].includes(view)
        ? "week"
        : "days"
      : "days"
  );

  useEffect(() => {
    let ignore = false;
    const getData = async () => {
      let classObj = await classServiceRegistry.getOne({ id: classId });
      if (!ignore) setClassObject(classObj);
      const studentData = await studentServiceRegistry.getAll({ classId });
      setStudents(studentData);
      await getPresentStudents(studentData);
      await getAbsentStudents(studentData);
      await getAttendance();
      await getAttendanceForReport();
    };
    getData();
    return () => {
      ignore = true;
    };
  }, [classId, page]);

  const getAttendance = async (e) => {
    let weekdays = calendar(page, "week");
    let params = {
      fromDate: weekdays?.[0]?.format("Y-MM-DD"),
      toDate: weekdays?.[weekdays.length - 1]?.format("Y-MM-DD"),
    };
    const attendanceData = await GetAttendance(params);
    setAttendance(attendanceData);
  };

  const getPresentStudents = async (students) => {
    let weekdays = calendar(
      page,
      ["days", "week"].includes(calendarView) ? "week" : calendarView
    );
    let workingDaysCount = weekdays.filter((e) => e.day())?.length;
    let params = {
      fromDate: weekdays?.[0]?.format("Y-MM-DD"),
      toDate: weekdays?.[weekdays.length - 1]?.format("Y-MM-DD"),
    };
    const attendanceData = await GetAttendance(params);
    const present = getStudentsPresentAbsent(
      attendanceData,
      students,
      workingDaysCount
    );
    setPresentStudents(await studentServiceRegistry.setDefaultValue(present));
  };

  const getAbsentStudents = async (students) => {
    let params = {
      fromDate: moment().add(-2, "days").format("Y-MM-DD"),
      toDate: moment().format("Y-MM-DD"),
    };
    const attendanceData = await GetAttendance(params);
    const absent = getStudentsPresentAbsent(
      attendanceData,
      students,
      3,
      "Absent"
    );
    setAbsentStudents(await studentServiceRegistry.setDefaultValue(absent));
  };

  const getAttendanceForReport = async (e) => {
    let weekdays = calendar(page, calendarView);
    let params = {
      fromDate: weekdays?.[0]?.format("Y-MM-DD"),
      toDate: weekdays?.[weekdays.length - 1]?.format("Y-MM-DD"),
    };
    const attendanceData = await GetAttendance(params);
    setAttendanceForReport(attendanceData);
  };

  return (
    <Layout
      _header={{
        title: t("MY_CLASSES"),
        icon: "Group",
        subHeading: moment().format("hh:mm a"),
        _subHeading: { fontWeight: 500 },
        iconComponent: (
          <Link
            to={"/attendance/reportCompare/" + classId}
            style={{ textDecoration: "none" }}
          >
            <Box
              rounded={"full"}
              px="5"
              py="2"
              borderColor="button.500"
              borderWidth={1}
            >
              <HStack space="2">
                <Text color="button.500" fontSize="14" fontWeight="500">
                  {t("COMPARE")}
                </Text>
                <IconByName
                  color="button.500"
                  name="ArrowDownSLineIcon"
                  isDisabled
                />
              </HStack>
            </Box>
          </Link>
        ),
      }}
      subHeader={
        <Stack>
          <Text fontSize="16" fontWeight="600">
            {classObject.name}
          </Text>
          <Text fontSize="10" fontWeight="300">
            {t("TOTAL")}: {students.length} {t("PRESENT")}:
            {
              attendanceForReport.filter((e) => e.attendance === "Present")
                .length
            }
          </Text>
        </Stack>
      }
      _subHeader={{ bg: "reportCard.500", mb: 1 }}
    >
      <VStack space="1">
        <Box bg="white" p="5">
          <HStack space="4" justifyContent="space-between" alignItems="center">
            <CalendarBar
              _box={{ p: 0 }}
              {...{ page, setPage }}
              view={calendarView}
            />
            <IconByName name={"ListUnorderedIcon"} isDisabled />
          </HStack>
        </Box>
        <Box bg="white" p="5">
          <Box borderBottomWidth={1} borderBottomColor="coolGray.200">
            <Collapsible
              defaultCollapse={true}
              header={
                <VStack>
                  <Text fontSize="16" fontWeight="600">
                    {t("SUMMARY")}
                  </Text>
                  <Text fontSize="10" fontWeight="300">
                    {t("TOTAL")}: {students.length} {t("PRESENT")}:
                    {
                      getUniqAttendance(
                        attendanceForReport,
                        "Present",
                        students
                      ).length
                    }
                  </Text>
                </VStack>
              }
              body={
                <VStack pt="5">
                  <ReportSummary
                    {...{
                      students,
                      attendance: [attendanceForReport],
                      calendarView,
                    }}
                  />
                  <Text py="5" px="10px" fontSize={12} color={"gray.400"}>
                    <Text bold color={"gray.700"}>
                      {t("NOTES")}
                      {": "}
                    </Text>
                    {t("MONTHLY_REPORT_WILL_GENRRATED_LAST_DAY_EVERY_MONTH")}
                  </Text>
                </VStack>
              }
            />
          </Box>
        </Box>
        <Box bg="white" p={4}>
          <Stack space={2}>
            <Collapsible
              defaultCollapse={true}
              isHeaderBold={false}
              header={
                <>
                  <VStack>
                    <Text bold fontSize={"md"}>
                      100%
                      {calendarView === "monthInDays"
                        ? t("THIS_MONTH")
                        : t("THIS_WEEK")}
                    </Text>
                    <Text fontSize={"xs"}>
                      {presentStudents?.length + " " + t("STUDENTS")}
                    </Text>
                  </VStack>
                </>
              }
              body={
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
                            textTitle={
                              <VStack alignItems="center">
                                <Text fontSize="14" fontWeight="500">
                                  <Text>{item.fullName}</Text>
                                  <Text color="gray.300"> • </Text>
                                  <Text color="presentCardText.500">100%</Text>
                                </Text>
                              </VStack>
                            }
                            href={"/students/" + item.id}
                            hidePopUpButton
                          />
                        </Box>
                      )}
                      keyExtractor={(item) => item.id}
                    />
                  </Box>
                  <Button
                    mt="2"
                    variant="outline"
                    colorScheme="button"
                    rounded="lg"
                  >
                    {t("SEE_MORE")}
                  </Button>
                </VStack>
              }
            />
          </Stack>
        </Box>

        <Box bg="white" p={4}>
          <Stack space={2}>
            <Collapsible
              defaultCollapse={true}
              isHeaderBold={false}
              header={
                <>
                  <VStack>
                    <Text bold fontSize={"md"}>
                      {t("ABSENT_CONSECUTIVE_3_DAYS")}
                    </Text>
                    <Text fontSize={"xs"}>
                      {absentStudents?.length + " " + t("STUDENTS")}
                    </Text>
                  </VStack>
                </>
              }
              body={
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
                            textTitle={
                              <VStack alignItems="center">
                                <Text fontSize="14" fontWeight="500">
                                  <Text>{item.fullName}</Text>
                                  <Text color="gray.300"> • </Text>
                                  <Text color="absentCardText.500">
                                    3 {t("DAYS")}
                                  </Text>
                                </Text>
                              </VStack>
                            }
                            href={"/students/" + item.id}
                            hidePopUpButton
                          />
                        </Box>
                      )}
                      keyExtractor={(item) => item.id}
                    />
                  </Box>
                  <Button
                    mt="2"
                    variant="outline"
                    colorScheme="button"
                    rounded="lg"
                  >
                    {t("SEE_MORE")}
                  </Button>
                </VStack>
              }
            />
          </Stack>
        </Box>

        <Box bg="white" p={4}>
          <Stack space={2}>
            <Collapsible
              defaultCollapse={true}
              isHeaderBold={false}
              header={
                <>
                  <VStack>
                    <Text bold fontSize={"md"}>
                      {t("STUDENT_WISE_ATTENDANCE")}
                    </Text>
                    <Text fontSize={"xs"}>
                      {students?.length + " " + t("STUDENTS")}
                    </Text>
                  </VStack>
                </>
              }
              body={
                <FlatList
                  data={students}
                  renderItem={({ item, index }) => (
                    <AttendanceComponent
                      isEditDisabled
                      page={page}
                      student={item}
                      withDate={1}
                      type={
                        calendarView === "monthInDays"
                          ? "month"
                          : calendarView === "days"
                          ? "day"
                          : "weeks"
                      }
                      attendanceProp={attendance}
                      getAttendance={getAttendance}
                      _card={{ hidePopUpButton: true }}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                />
              }
            />
          </Stack>
        </Box>
      </VStack>
    </Layout>
  );
}

const Collapsible = ({
  header,
  body,
  defaultCollapse,
  isHeaderBold,
  onPressFuction,
}) => {
  const [collaps, setCollaps] = useState(defaultCollapse);

  return (
    <>
      <Pressable
        onPress={() => {
          setCollaps(!collaps);
          onPressFuction();
        }}
      >
        <Box px={2} py={1}>
          <HStack alignItems={"center"} justifyContent={"space-between"}>
            <Text
              bold={typeof isHeaderBold === "undefined" ? true : isHeaderBold}
              fontSize={typeof isHeaderBold === "undefined" ? "md" : ""}
            >
              {header}
            </Text>
            <IconByName
              size="sm"
              isDisabled={true}
              color={!collaps ? "coolGray.400" : "coolGray.600"}
              name={!collaps ? "ArrowDownSLineIcon" : "ArrowUpSLineIcon"}
            />
          </HStack>
        </Box>
      </Pressable>
      <PresenceTransition visible={collaps}>{body}</PresenceTransition>
    </>
  );
};
