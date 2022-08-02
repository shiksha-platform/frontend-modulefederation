import moment from "moment";
import {
  Actionsheet,
  Box,
  Button,
  FlatList,
  HStack,
  Pressable,
  Stack,
  Text,
  VStack,
} from "native-base";
import React, { useState, useEffect, Suspense } from "react";
import { useTranslation } from "react-i18next";
import {
  IconByName,
  Layout,
  Collapsible,
  getPercentageStudentsPresentAbsent,
  getStudentsPresentAbsent,
  getUniqAttendance,
  capture,
  telemetryFactory,
  calendar,
  classRegistryService,
  studentRegistryService,
  overrideColorTheme,
  H2,
  Caption,
  Subtitle,
  BodyLarge,
} from "@shiksha/common-lib";
import AttendanceComponent, {
  GetAttendance,
} from "../../components/AttendanceComponent";
import CalendarBar from "components/CalendarBar/CalendarBar";
import ReportSummary from "../../components/ReportSummary";
import manifest from "../../manifest.json";
import colorTheme from "../../colorTheme";
import { useNavigate, useParams } from "react-router-dom";

const colors = overrideColorTheme(colorTheme);

export default function ClassReportDetail({ footerLinks, appName }) {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classObject, setClassObject] = useState({});
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [compare, setCompare] = useState();
  const [compareAttendance, setCompareAttendance] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [presentStudents, setPresentStudents] = useState([]);
  const [absentStudents, setAbsentStudents] = useState([]);
  const [presentCount, setPresentCount] = useState(0);
  const [thisTitle, setThisTitle] = useState("");
  const [lastTitle, setLastTitle] = useState("");
  const Card = React.lazy(() => import("students/Card"));
  const teacherId = localStorage.getItem("id");

  useEffect(() => {
    let ignore = false;

    const getData = async () => {
      if (!ignore && compare) {
        setThisTitle(compare === "week" ? t("THIS_WEEK") : t("THIS_MONTH"));
        setLastTitle(compare === "week" ? t("LAST_WEEK") : t("LAST_MONTH"));
        let classObj = await classRegistryService.getOne({ id: classId });
        const studentData = await studentRegistryService.getAll({ classId });
        setClassObject(classObj);
        setStudents(studentData);
        const { attendanceData, workingDaysCount } = await getAttendance(
          0,
          true
        );
        setAttendance(attendanceData);
        setPresentCount(
          getUniqAttendance(attendanceData, "Present", studentData).length
        );
        const newCompareAttendance = await getAttendance(-1);
        setCompareAttendance(newCompareAttendance);

        setPresentStudents(
          await studentRegistryService.setDefaultValue(
            getStudentsPresentAbsent(
              attendanceData,
              studentData,
              workingDaysCount
            )
          )
        );
        setAbsentStudents(
          await studentRegistryService.setDefaultValue(
            getStudentsPresentAbsent(attendanceData, studentData, 3, "Absent")
          )
        );
      }
    };
    getData();
    return () => {
      ignore = true;
    };
  }, [classId, compare, page, t]);

  const getAttendance = async (newPage = 0, withCount = false) => {
    let weekdays = calendar(
      newPage ? newPage + page : page,
      ["days", "week"].includes(compare) ? "week" : compare
    );
    let workingDaysCount = weekdays.filter((e) => e.day())?.length;
    let params = {
      fromDate: weekdays?.[0]?.format("Y-MM-DD"),
      toDate: weekdays?.[weekdays.length - 1]?.format("Y-MM-DD"),
    };
    if (withCount) {
      return { attendanceData: await GetAttendance(params), workingDaysCount };
    } else {
      return await GetAttendance(params);
    }
  };

  const getPercentage = (
    attendances,
    student,
    count,
    status = "Present",
    type = "percentage"
  ) => {
    let weekdays = calendar(
      page,
      ["days", "week"].includes(compare) ? "week" : compare
    );
    let workingDaysCount = count
      ? count
      : weekdays.filter((e) => e.day())?.length;
    let percentage = getPercentageStudentsPresentAbsent(
      attendances,
      student,
      workingDaysCount,
      status
    );
    return percentage?.[type];
  };

  return (
    <Layout
      _header={{
        title: t("MY_CLASS"),
        subHeading: moment().format("hh:mm A"),
        _subHeading: { fontWeight: 500 },
        iconComponent: (
          <Box rounded={"full"} px="5" py="2" bg={colors.primary}>
            <HStack space="2">
              <BodyLarge color={colors.white}>{lastTitle}</BodyLarge>
              <IconByName
                color={colors.white}
                name="ArrowDownSLineIcon"
                isDisabled
              />
            </HStack>
          </Box>
        ),
      }}
      _appBar={{ languages: manifest.languages }}
      subHeader={
        <Stack>
          <H2>{classObject.name}</H2>
          <Caption>
            {t("TOTAL")}: {students.length} {t("PRESENT")}:{presentCount}
          </Caption>
        </Stack>
      }
      _subHeader={{ bg: colors.bgReportCard, mb: 1 }}
      _footer={footerLinks}
    >
      {compare ? (
        <VStack space="1">
          <Box bg={colors.white} p="5">
            <HStack
              space="4"
              justifyContent="space-between"
              alignItems="center"
            >
              <CalendarBar
                _box={{ p: 0 }}
                {...{ page, setPage }}
                view={compare}
              />
              <IconByName name={"ListUnorderedIcon"} isDisabled />
            </HStack>
          </Box>
          <Box bg={colors.white} p="5">
            <Box>
              <Collapsible
                defaultCollapse={true}
                header={
                  <VStack>
                    <H2>{t("SUMMARY")}</H2>
                    <Caption>
                      {t("TOTAL")}: {students.length} {t("PRESENT")}:
                      {presentCount}
                    </Caption>
                  </VStack>
                }
              >
                <VStack pt="5">
                  <ReportSummary
                    {...{
                      students,
                      title: [
                        { name: thisTitle },
                        {
                          name: lastTitle,
                          _text: { color: "presentCardCompareText.500" },
                        },
                      ],
                      attendance: [attendance, compareAttendance],
                      page: [page, page - 1],
                      calendarView: compare,
                    }}
                  />
                  <Subtitle py="5" px="10px" color={colors.grayInLight}>
                    <Text bold color={colors.darkGray}>
                      {t("NOTES")}
                      {": "}
                    </Text>
                    {t("MONTHLY_REPORT_WILL_GENRRATED_LAST_DAY_EVERY_MONTH")}
                  </Subtitle>
                </VStack>
              </Collapsible>
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
                        100% {thisTitle}
                      </Text>
                      <Text fontSize={"xs"}>
                        {presentStudents?.length + " " + t("STUDENTS")}
                      </Text>
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
                          borderColor={colors.presentCardCompareBorder}
                          bg={colors.presentCardCompareBg}
                          p="10px"
                          rounded="lg"
                          my="10px"
                        >
                          <Suspense fallback="loading">
                            <Card
                              appName={appName}
                              item={item}
                              href={"/students/" + item.id}
                              hidePopUpButton
                              rightComponent={
                                <HStack space="2">
                                  <VStack alignItems="center">
                                    <BodyLarge color={colors.presentCardText}>
                                      {getPercentage(attendance, item) + "%"}
                                    </BodyLarge>
                                    <Caption color={colors.presentCardText}>
                                      {thisTitle}
                                    </Caption>
                                  </VStack>
                                  <VStack alignItems="center">
                                    <BodyLarge
                                      color={colors.presentCardCompareText}
                                    >
                                      {getPercentage(compareAttendance, item) +
                                        "%"}
                                    </BodyLarge>
                                    <Caption
                                      color={colors.presentCardCompareText}
                                    >
                                      {lastTitle}
                                    </Caption>
                                  </VStack>
                                </HStack>
                              }
                            />
                          </Suspense>
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
              </Collapsible>
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
              >
                <VStack space={2} pt="2">
                  <Box>
                    <FlatList
                      data={absentStudents}
                      renderItem={({ item }) => (
                        <Box
                          borderWidth="1"
                          borderColor={colors.absentCardCompareBorder}
                          bg={colors.absentCardCompareBg}
                          p="10px"
                          rounded="lg"
                          my="10px"
                        >
                          <Suspense fallback="loading">
                            <Card
                              appName={appName}
                              item={item}
                              href={"/students/" + item.id}
                              hidePopUpButton
                              rightComponent={
                                <HStack space="2">
                                  <VStack alignItems="center">
                                    <BodyLarge color={colors.absentCardText}>
                                      {getPercentage(
                                        attendance,
                                        item,
                                        6,
                                        "Absent",
                                        "count"
                                      ) +
                                        " " +
                                        t("DAYS")}
                                    </BodyLarge>
                                    <Caption color={colors.absentCardText}>
                                      {thisTitle}
                                    </Caption>
                                  </VStack>
                                  <VStack alignItems="center">
                                    <BodyLarge
                                      color={colors.absentCardCompareText}
                                    >
                                      {getPercentage(
                                        compareAttendance,
                                        item,
                                        6,
                                        "Absent",
                                        "count"
                                      ) +
                                        " " +
                                        t("DAYS")}
                                    </BodyLarge>
                                    <Caption
                                      color={colors.absentCardCompareText}
                                    >
                                      {lastTitle}
                                    </Caption>
                                  </VStack>
                                </HStack>
                              }
                            />
                          </Suspense>
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
              </Collapsible>
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
              >
                <FlatList
                  data={students}
                  renderItem={({ item, index }) => (
                    <AttendanceComponent
                      isEditDisabled
                      type={compare === "monthInDays" ? "month" : "weeks"}
                      _weekBox={[{}, { bg: colors.weekCardCompareBg }]}
                      page={[page, page - 1]}
                      student={item}
                      withDate={1}
                      attendanceProp={[...attendance, ...compareAttendance]}
                      getAttendance={getAttendance}
                      _card={{ hidePopUpButton: true }}
                    />
                  )}
                  keyExtractor={(item) => item.id}
                />
              </Collapsible>
            </Stack>
          </Box>
        </VStack>
      ) : (
        <Actionsheet
          isOpen={showModal}
          _backdrop={{ opacity: "0.9", bg: "gray.500" }}
        >
          <Actionsheet.Content
            p="0"
            alignItems={"left"}
            bg={colors.reportCardBackg}
          >
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="25px">
                <H2 color={colors.black}>
                  {t("SELECT_CLASS_MARK_ATTENDANCE")}
                </H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.reportCardCloseIcon}
                onPress={(e) => setShowModal(false)}
              />
            </HStack>
          </Actionsheet.Content>

          <Box w="100%" bg={colors.white}>
            {[
              { name: t("PREVIOUS_WEEK"), value: "week" },
              { name: t("PREVIOUS_MONTH"), value: "monthInDays" },
              // { name: t("BEST_PERFORMANCE"), value: "best-performance" },
              // { name: t("ANOTHER_SCHOOL"), value: "another-school" },
              {
                name: t("DONT_SHOW_COMPARISON"),
                value: "dont-show-comparison",
              },
            ].map((item, index) => {
              return (
                <Pressable
                  p="5"
                  borderBottomWidth={1}
                  borderBottomColor={colors.coolGray}
                  key={index}
                  onPress={(e) => {
                    if (item?.value === "dont-show-comparison") {
                      navigate(-1);
                    } else {
                      setCompare(item.value);
                      setShowModal(false);
                      const telemetryData = telemetryFactory.interact({
                        appName,
                        type: "Attendance-Compare-Report",
                        groupID: classId,
                        typeOfComparison: item.name,
                      });
                      capture("INTERACT", telemetryData);
                    }
                  }}
                >
                  <Text>{item.name}</Text>
                </Pressable>
              );
            })}
          </Box>
        </Actionsheet>
      )}
    </Layout>
  );
}
