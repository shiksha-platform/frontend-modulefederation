import React, { useState, useEffect, Suspense } from "react";
import {
  VStack,
  Text,
  HStack,
  Box,
  Pressable,
  Actionsheet,
  Stack,
  Button,
  Badge,
  ScrollView,
} from "native-base";
import { useTranslation } from "react-i18next";
import { TouchableHighlight } from "react-native-web";
import moment from "moment";
import {
  IconByName,
  getStudentsPresentAbsent,
  capture,
  telemetryFactory,
  calendar,
  attendanceRegistryService,
  studentRegistryService,
  H2,
  BodySmall,
  Subtitle,
  H1,
  BodyLarge,
  Caption,
  BodyMedium,
  overrideColorTheme,
} from "@shiksha/common-lib";
import ReportSummary from "./ReportSummary";
import { useNavigate } from "react-router-dom";
import colorTheme from "../colorTheme";
const colors = overrideColorTheme(colorTheme);

const Card = React.lazy(() => import("students/Card"));
const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";

export const GetAttendance = async (params) => {
  return await attendanceRegistryService.getAll(params);
};

export const GetIcon = ({ status, _box, color, _icon }) => {
  let icon = <></>;
  let iconProps = { fontSize: "xl", isDisabled: true, ..._icon };
  switch (status) {
    case "Present":
      icon = (
        <Box {..._box} color={color ? color : colors.attendancePresent}>
          <IconByName name="CheckboxCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Absent":
      icon = (
        <Box {..._box} color={color ? color : colors.attendanceAbsent}>
          <IconByName name="CloseCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Late":
      icon = (
        <Box {..._box} color={color ? color : colors.checkBlankcircle}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Holiday":
      icon = (
        <Box {..._box} color={color ? color : colors.attendanceUnmarkedLight}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Unmarked":
      icon = (
        <Box {..._box} color={color ? color : colors.attendanceUnmarked}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Today":
      icon = (
        <Box {..._box} color={color ? color : colors.attendanceUnmarked}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    default:
      icon = (
        <Box {..._box} color={color ? color : colors.attendancedefault}>
          <IconByName name={status} {...iconProps} />
        </Box>
      );
      break;
  }
  return icon;
};

export const MultipalAttendance = ({
  students,
  attendance,
  getAttendance,
  setLoading,
  classObject,
  isEditDisabled,
  setIsEditDisabled,
  isWithEditButton,
  appName,
  lastAttedance,
  manifest,
}) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = React.useState(false);
  const [presentStudents, setPresentStudents] = React.useState([]);
  const navigate = useNavigate();
  const [startTime, setStartTime] = useState();
  const holidays = [];
  const fullName = localStorage.getItem("fullName");
  useEffect(() => {
    if (showModal) setStartTime(moment());
  }, [showModal]);

  React.useEffect(() => {
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
    getPresentStudents({ students });
  }, [students, attendance]);

  const groupExists = (classObject) => classObject?.id;
  const markAllAttendance = async () => {
    setLoading(true);
    if (
      typeof students === "object" &&
      students.length > 0 &&
      moment().format("HH:MM") <= manifest?.["class_attendance.submit_by"]
    ) {
      let student = students.find((e, index) => !index);

      const attendanceData = students.map((item, index) => {
        return {
          attendance: PRESENT,
          userId: item.id,
        };
      });
      let allData = {
        schoolId: student?.schoolId,
        userType: "Student",
        groupId: student?.currentClassID,
        attendanceDate: moment().format("YYYY-MM-DD"),
        attendanceData,
      };

      const result = await attendanceRegistryService.multipal(allData);
      if (getAttendance) {
        getAttendance();
      }

      if (groupExists(classObject)) {
        const telemetryData = telemetryFactory.interact({
          appName,
          type: "Attendance-Mark-All-Present",
          groupID: classObject.id,
        });
        capture("INTERACT", telemetryData);
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const modalClose = () => {
    setShowModal(false);
    setIsEditDisabled(true);
    const telemetryData = telemetryFactory.end({
      appName,
      type: "Attendance-Summary-End",
      groupID: classObject.id,
      duration: moment().diff(startTime, "seconds"),
    });
    capture("END", telemetryData);
    setStartTime(moment());
  };

  const saveViewReportHandler = () => {
    setShowModal(true);
    const telemetryData = telemetryFactory.start({
      appName,
      type: "Attendance-Summary-Start",
      groupID: classObject.id,
    });
    capture("START", telemetryData);
  };

  return (
    <>
      {isWithEditButton || !isEditDisabled ? (
        <Stack
          position={"sticky"}
          bottom={75}
          width={"100%"}
          style={{ boxShadow: "rgb(0 0 0 / 22%) 0px -2px 10px" }}
        >
          <Box p="5" bg="white">
            <VStack space={"15px"}>
              <VStack>
                <Subtitle textTransform={"inherit"}>
                  {t("LAST_UPDATED_AT") + " " + lastAttedance}
                </Subtitle>
                <BodySmall textTransform={"inherit"}>
                  {t("ATTENDANCE_WILL_AUTOMATICALLY_SUBMIT")}
                </BodySmall>
              </VStack>
              {!isEditDisabled ? (
                <Button.Group>
                  {manifest?.[
                    "class_attendance.mark_all_attendance_at_once"
                  ] === "true" ? (
                    <Button
                      flex={1}
                      variant="outline"
                      colorScheme="button"
                      isDisabled={
                        !(
                          moment().format("HH:MM") <=
                          manifest?.["class_attendance.submit_by"]
                        )
                      }
                      onPress={markAllAttendance}
                      _text={{ fontSize: "12px", fontWeight: "600" }}
                    >
                      {t("MARK_ALL_PRESENT")}
                    </Button>
                  ) : (
                    <React.Fragment />
                  )}
                  <Button
                    flex={1}
                    colorScheme="button"
                    onPress={saveViewReportHandler}
                    _text={{
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {t("SUBMIT")}
                  </Button>
                </Button.Group>
              ) : (
                <HStack alignItems={"center"} space={4}>
                  <Button
                    variant="outline"
                    colorScheme="button"
                    onPress={(e) => setIsEditDisabled(false)}
                  >
                    {t("EDIT")}
                  </Button>
                </HStack>
              )}
            </VStack>
          </Box>
          <Actionsheet isOpen={showModal} onClose={() => modalClose()}>
            <Stack width={"100%"} maxH={"100%"}>
              <Actionsheet.Content alignItems={"left"} bg={colors.cardBg}>
                <HStack justifyContent={"space-between"}>
                  <Stack p={5} pt={2} pb="25px">
                    <H2 color={colors.white}>
                      {t("ATTENDANCE_SUMMARY_REPORT")}
                    </H2>
                    <BodySmall color={colors.white}>
                      {classObject?.title ?? ""}
                    </BodySmall>
                  </Stack>
                  <IconByName
                    name="CloseCircleLineIcon"
                    onPress={(e) => setShowModal(false)}
                    color={colors.white}
                  />
                </HStack>
              </Actionsheet.Content>
              <ScrollView width={"100%"} space="1" bg={colors.coolGray}>
                <Box bg={colors.bgSuccessAlert} px={5} py={10}>
                  <VStack alignItems="center" space="2">
                    <IconByName
                      color={colors.successAlertText}
                      name="CheckboxCircleFillIcon"
                      _icon={{
                        size: "70",
                      }}
                      isDisabled
                    />
                    <H1 color={colors.successAlertText}>
                      {t("ATTENDANCE_SUBMITTED")}
                    </H1>
                  </VStack>
                </Box>
                <Box bg={colors.white} p={5}>
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    pb={5}
                  >
                    <H2>{t("ATTENDANCE_SUMMARY")}</H2>
                    <BodyLarge>{moment().format("DD MMM, Y")}</BodyLarge>
                  </HStack>
                  <ReportSummary
                    {...{
                      students,
                      attendance: [
                        attendance.filter(
                          (e) => e.date === moment().format("YYYY-MM-DD")
                        ),
                      ],
                      footer: (
                        <HStack justifyContent={"space-between"}>
                          <Subtitle>{t("ATTENDANCE_TAKEN_BY")}</Subtitle>
                          <Subtitle color={colors.successAlertText}>
                            {fullName ? fullName : ""}
                            {" at "}
                            {lastAttedance}
                          </Subtitle>
                        </HStack>
                      ),
                    }}
                  />
                </Box>
                <Box bg={colors.white} p="5" textAlign={"center"}>
                  <VStack space={2}>
                    <BodyLarge>
                      {t("VIEW_SEND_ATTENDANCE_RELATED_MESSAGES_TO_STUDENTS")}
                    </BodyLarge>
                    {/* <Caption>{t("STUDENTS_ABSENT")}</Caption> */}

                    <Button.Group>
                      <Button
                        variant="outline"
                        flex="1"
                        wordBreak="break-word"
                        onPress={(e) => {
                          const telemetryData = telemetryFactory.interact({
                            appName,
                            type: "Attendance-Notification-View-Message",
                          });
                          capture("INTERACT", telemetryData);
                          navigate(
                            "/attendance/sendSms/" +
                              (classObject?.id?.startsWith("1-")
                                ? classObject?.id?.replace("1-", "")
                                : classObject?.id)
                          );
                        }}
                      >
                        {t("VIEW_MESSAGES_BEING_SENT_BY_ADMIN")}
                      </Button>
                      <Button
                        _text={{ color: colors.white }}
                        flex="1"
                        onPress={(e) => {
                          const telemetryData = telemetryFactory.interact({
                            appName,
                            type: "Attendance-Notification-View-Message",
                          });
                          capture("INTERACT", telemetryData);
                          navigate("/notification/create?module=Attendance");
                        }}
                      >
                        {t("SEND_ANOTHER_MESSAGE")}
                      </Button>
                    </Button.Group>
                  </VStack>
                </Box>
                <Box bg={colors.white} p={5}>
                  <Box bg={colors.bgReportCard} rounded={"md"} p="4">
                    <VStack space={5}>
                      <HStack
                        justifyContent={"space-between"}
                        alignItems="center"
                      >
                        <Text bold>
                          100% {t("ATTENDANCE") + " " + t("THIS_WEEK")}
                        </Text>
                        <IconByName name="More2LineIcon" isDisabled />
                      </HStack>
                      <HStack
                        alignItems="center"
                        justifyContent={"space-around"}
                      >
                        {presentStudents.map((student, index) =>
                          index < 3 ? (
                            <Stack key={index}>
                              <Suspense fallback="loading">
                                <Card
                                  attendanceProp={attendance ? attendance : []}
                                  item={student}
                                  hidePopUpButton={true}
                                  type="vertical"
                                  appName={appName}
                                />
                              </Suspense>
                            </Stack>
                          ) : (
                            <div key={index}></div>
                          )
                        )}
                      </HStack>
                      {presentStudents?.length <= 0 ? (
                        <Caption>
                          {t("NO_STUDENT_HAS_ACHIEVED_ATTENDANCE_THIS_WEEK")}
                        </Caption>
                      ) : (
                        ""
                      )}
                      {presentStudents?.length > 3 ? (
                        <Button colorScheme="button" variant="outline">
                          {t("MORE")}
                        </Button>
                      ) : (
                        ""
                      )}
                    </VStack>
                  </Box>
                </Box>
                <Box p="2" py="5" bg={colors.white}>
                  <VStack space={"15px"} alignItems={"center"}>
                    <Caption textAlign={"center"}>
                      {t("ATTENDANCE_WILL_AUTOMATICALLY_SUBMIT")}
                    </Caption>
                    <Button.Group width="100%">
                      {/* <Button
                        flex={1}
                        variant="outline"
                        colorScheme="button"
                        onPress={(e) => modalClose()}
                      >
                        {t("CLOSE")}
                      </Button> */}
                      <Button
                        flex={1}
                        colorScheme="button"
                        _text={{ color: colors.white }}
                        onPress={(e) =>
                          navigate(
                            "/attendance/report/" +
                              (classObject?.id?.startsWith("1-")
                                ? classObject?.id?.replace("1-", "")
                                : classObject?.id) +
                              "/days"
                          )
                        }
                      >
                        {t("SEE_FULL_REPORT")}
                      </Button>
                    </Button.Group>
                  </VStack>
                </Box>
              </ScrollView>
            </Stack>
          </Actionsheet>
        </Stack>
      ) : (
        <></>
      )}
    </>
  );
};

export default function AttendanceComponent({
  type,
  page,
  student,
  attendanceProp,
  hidePopUpButton,
  sms,
  _card,
  isEditDisabled,
  _weekBox,
  appName,
  manifest,
  setLastAttedance,
}) {
  const { t } = useTranslation();
  const teacherId = localStorage.getItem("id");
  const [attendance, setAttendance] = React.useState([]);
  const [attendanceObject, setAttendanceObject] = React.useState([]);
  const [days, setDays] = React.useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [smsShowModal, setSmsShowModal] = React.useState(false);
  const [loading, setLoading] = React.useState({});
  const status = Array.isArray(
    manifest?.["attendance.default_attendance_states"]
  )
    ? manifest?.["attendance.default_attendance_states"]
    : manifest?.["attendance.default_attendance_states"]
    ? JSON.parse(manifest?.["attendance.default_attendance_states"])
    : [];

  useEffect(() => {
    if (typeof page === "object") {
      setDays(
        page.map((e) =>
          calendar(
            e,
            type,
            manifest?.[
              "class_attendance.no_of_day_display_on_attendance_screen"
            ]
          )
        )
      );
    } else {
      setDays([
        calendar(
          page,
          type,
          manifest?.["class_attendance.no_of_day_display_on_attendance_screen"]
        ),
      ]);
    }
    async function getData() {
      if (attendanceProp) {
        setAttendance(attendanceProp);
      }
      setLoading({});
    }
    getData();
  }, [page, attendanceProp, type]);

  const markAttendance = async (dataObject) => {
    setLoading({
      [dataObject.date + dataObject.id]: true,
    });
    if (moment().format("HH:MM") <= manifest?.["class_attendance.submit_by"]) {
      if (dataObject.attendanceId) {
        attendanceRegistryService
          .update(
            {
              id: dataObject.attendanceId,
              attendance: dataObject.attendance,
            },
            {
              onlyParameter: ["attendance", "id", "date", "classId"],
            }
          )
          .then((e) => {
            const newData = attendance.filter(
              (e) =>
                !(
                  e.date === dataObject.date &&
                  e.studentId === dataObject.studentId
                )
            );

            setAttendance([
              ...newData,
              { ...dataObject, id: dataObject.attendanceId },
            ]);
            setLastAttedance(moment().format("hh:mma"));
            setLoading({});
            setShowModal(false);
          });
      } else {
        attendanceRegistryService
          .create({
            studentId: student.id,
            date: dataObject.date,
            attendance: dataObject.attendance,
            attendanceNote: "Test",
            classId: student.currentClassID,
            subjectId: "History",
            teacherId: teacherId,
          })
          .then((e) => {
            setAttendance([...attendance, dataObject]);
            setLastAttedance(moment().format("hh:mma"));
            setLoading({});
            setShowModal(false);
          });
      }
    } else {
      setLoading({});
    }
  };
  return (
    <Stack space={type !== "day" ? "15px" : ""}>
      <VStack space={type !== "day" ? "15px" : "2"}>
        {!_card?.isHideStudentCard ? (
          <Suspense fallback="loading">
            <Card
              attendanceProp={attendance ? attendance : []}
              appName={appName}
              href={"/students/" + student.id}
              item={student}
              _arrow={{ _icon: { fontSize: "large" } }}
              type="attendance"
              hidePopUpButton={hidePopUpButton}
              {...(type === "day" ? { _textTitle: { fontSize: "xl" } } : {})}
              {..._card}
              rightComponent={
                type === "day"
                  ? days.map((day, index) => (
                      <CalendarComponent
                        manifest={manifest}
                        key={index}
                        monthDays={[[day]]}
                        isIconSizeSmall={true}
                        isEditDisabled={isEditDisabled}
                        {...{
                          attendance,
                          student,
                          markAttendance,
                          setAttendanceObject,
                          setShowModal,
                          setSmsShowModal,
                          loading,
                          type,
                          _weekBox: _weekBox?.[index] ? _weekBox[index] : {},
                        }}
                      />
                    ))
                  : false
              }
            />
          </Suspense>
        ) : (
          ""
        )}
        {type !== "day" ? (
          <Box borderWidth={1} borderColor={colors.coolGray} rounded="xl">
            {days.map((day, index) => (
              <CalendarComponent
                manifest={manifest}
                key={index}
                monthDays={day}
                isEditDisabled={isEditDisabled}
                {...{
                  sms,
                  attendance,
                  student,
                  markAttendance,
                  setAttendanceObject,
                  setShowModal,
                  setSmsShowModal,
                  loading,
                  type,
                  _weekBox: _weekBox?.[index] ? _weekBox[index] : {},
                }}
              />
            ))}
          </Box>
        ) : (
          <></>
        )}
        <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
          <Actionsheet.Content alignItems={"left"} bg={colors.bgMarkAttendance}>
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="25px">
                <H2 color={colors.white}>{t("MARK_ATTENDANCE")}</H2>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={colors.white}
                onPress={(e) => setShowModal(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box w="100%" p={4} justifyContent="center" bg={colors.white}>
            {status.map((item) => {
              return (
                <Pressable
                  key={item}
                  p={3}
                  onPress={(e) => {
                    if (attendanceObject.attendance !== item) {
                      markAttendance({
                        ...attendanceObject,
                        attendance: item,
                      });
                    } else {
                      setShowModal(false);
                    }
                  }}
                >
                  <HStack alignItems="center" space={2}>
                    <GetIcon status={item} _box={{ p: 2 }} />
                    <Text color={colors.darkGray} bold fontSize="lg">
                      {t(item)}
                    </Text>
                  </HStack>
                </Pressable>
              );
            })}
          </Box>
        </Actionsheet>
        <Actionsheet
          isOpen={smsShowModal}
          onClose={() => setSmsShowModal(false)}
        >
          <Actionsheet.Content alignItems={"left"}>
            {/* <HStack justifyContent={"end"}>
              <IconByName
                name="CloseCircleLineIcon"
                onPress={(e) => setSmsShowModal(false)}
              />
            </HStack> */}
            <VStack space={5} alignItems="center" p="5">
              <Subtitle color={colors.messageSent}>
                Message Sent to Parent
              </Subtitle>
              <Subtitle color={colors.messageAlert}>Absent alert</Subtitle>
              <BodyMedium color={colors.messageInfo} textAlign="center">
                Hello Mr. B.K. Chaudhary, this is to inform you that your ward
                Sheetal is absent in school on Wednesday, 12th of January 2022.
              </BodyMedium>
              <Button
                variant="outline"
                colorScheme="button"
                onPress={(e) => setSmsShowModal(false)}
              >
                {t("CLOSE")}
              </Button>
            </VStack>
          </Actionsheet.Content>
        </Actionsheet>
      </VStack>
      <></>
    </Stack>
  );
}

const CalendarComponent = ({
  monthDays,
  type,
  isIconSizeSmall,
  isEditDisabled,
  sms,
  attendance,
  student,
  markAttendance,
  setAttendanceObject,
  setShowModal,
  setSmsShowModal,
  loading,
  manifest,
  _weekBox,
}) => {
  let thisMonth = monthDays?.[1]?.[0]?.format("M");
  const holidays = [];
  const status = Array.isArray(
    manifest?.["attendance.default_attendance_states"]
  )
    ? manifest?.["attendance.default_attendance_states"]
    : manifest?.["attendance.default_attendance_states"]
    ? JSON.parse(manifest?.["attendance.default_attendance_states"])
    : [];

  const handleAttendaceData = (attendance, day) => {
    let isToday = moment().format("YYYY-MM-DD") === day.format("YYYY-MM-DD");
    let isAllowDay = false;
    if (manifest?.["class_attendance.previous_attendance_edit"] === "true") {
      isAllowDay = day.format("YYYY-MM-DD") <= moment().format("YYYY-MM-DD");
    } else {
      isAllowDay = day.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD");
    }

    let isHoliday = holidays.includes(day.format("YYYY-MM-DD"));
    let dateValue = day.format("YYYY-MM-DD");
    let smsDay = sms?.find(
      (e) => e.date === day.format("YYYY-MM-DD") && e.studentId === student.id
    );
    let attendanceItem = attendance
      .slice()
      .reverse()
      .find((e) => e.date === dateValue && e.studentId === student.id);
    let attendanceIconProp = !isIconSizeSmall
      ? {
          _box: { py: 2, minW: "46px", alignItems: "center" },
          status: "CheckboxBlankCircleLineIcon",
        }
      : {};
    let attendanceType = PRESENT;
    if (attendanceItem?.attendance === PRESENT) {
      attendanceIconProp = {
        ...attendanceIconProp,
        status: attendanceItem?.attendance,
      };
    } else if (attendanceItem?.attendance === ABSENT) {
      attendanceIconProp = {
        ...attendanceIconProp,
        status: attendanceItem?.attendance,
      };
    } else if (attendanceItem?.attendance === "Late") {
      attendanceIconProp = {
        ...attendanceIconProp,
        status: attendanceItem?.attendance,
      };
    } else if (day.day() === 0) {
      attendanceIconProp = { ...attendanceIconProp, status: "Holiday" };
    } else if (isToday) {
      attendanceIconProp = { ...attendanceIconProp, status: "Today" };
    } else if (moment().diff(day, "days") > 0) {
      attendanceIconProp = { ...attendanceIconProp, status: UNMARKED };
    }

    if (status) {
      const arr = status;
      const i = arr.indexOf(attendanceItem?.attendance);
      if (i === -1) {
        attendanceType = arr[0];
      } else {
        attendanceType = arr[(i + 1) % arr.length];
      }
    }

    return [
      isToday,
      isAllowDay,
      isHoliday,
      dateValue,
      smsDay,
      attendanceItem,
      attendanceIconProp,
      attendanceType,
    ];
  };

  return monthDays.map((week, index) => (
    <HStack
      justifyContent="space-around"
      alignItems="center"
      key={index}
      borderBottomWidth={
        monthDays.length > 1 && monthDays.length - 1 !== index ? "1" : "0"
      }
      borderBottomColor={colors.lightGray}
      {...(type === "day" ? { px: "2" } : { p: "2" })}
      {..._weekBox}
    >
      {week.map((day, subIndex) => {
        const [
          isToday,
          isAllowDay,
          isHoliday,
          dateValue,
          smsDay,
          attendanceItem,
          attendanceIconProp,
          attendanceType,
        ] = handleAttendaceData(attendance, day);

        return (
          <VStack
            key={subIndex}
            alignItems="center"
            borderWidth={isToday ? "1" : ""}
            borderColor={isToday ? colors.calendarBtn : ""}
            p={type === "day" ? "1" : "0"}
            rounded="lg"
            opacity={
              type !== "month" && thisMonth && day.format("M") !== thisMonth
                ? 0
                : isHoliday
                ? 0.3
                : 1
            }
            bg={
              smsDay?.type && isEditDisabled
                ? smsDay?.type.toLowerCase() + ".50"
                : ""
            }
          >
            {smsDay?.type && isEditDisabled ? (
              <Badge
                bg={smsDay?.type.toLowerCase() + ".500"}
                rounded="full"
                p="0"
                w="2"
                h="2"
                position="absolute"
                right="0"
                top="0"
              />
            ) : (
              ""
            )}
            <Text
              key={subIndex}
              pt={monthDays.length > 1 && index ? 0 : !isIconSizeSmall ? 2 : 0}
              textAlign="center"
            >
              {!isIconSizeSmall ? (
                <VStack alignItems={"center"}>
                  {index === 0 ? (
                    <BodySmall pb="1" color={colors.dateText}>
                      {day.format("ddd")}
                    </BodySmall>
                  ) : (
                    ""
                  )}
                  <BodySmall color={colors.date}>{day.format("DD")}</BodySmall>
                </VStack>
              ) : (
                <HStack alignItems={"center"} space={1}>
                  <Text>{day.format("dd")}</Text>
                  <Text>{day.format("D")}</Text>
                </HStack>
              )}
            </Text>
            <TouchableHighlight
              onPress={(e) => {
                //check if isToday required or not
                if (!isEditDisabled && isAllowDay && !isHoliday && isToday) {
                  const newAttendanceData = {
                    attendanceId: attendanceItem?.id ? attendanceItem.id : null,
                    id: attendanceItem?.id ? attendanceItem.id : null,
                    date: dateValue,
                    attendance: attendanceType,
                    studentId: student.id,
                  };
                  markAttendance(newAttendanceData);
                }
              }}
              onLongPress={(event) => {
                if (!isEditDisabled && isAllowDay && !isHoliday) {
                  setAttendanceObject({
                    attendanceId: attendanceItem?.id ? attendanceItem.id : null,
                    date: dateValue,
                    attendance: attendanceItem?.attendance,
                    id: attendanceItem?.id,
                    studentId: student.id,
                  });
                  setShowModal(true);
                }
              }}
            >
              <Box alignItems="center">
                {loading[dateValue + student.id] ? (
                  <GetIcon
                    {...attendanceIconProp}
                    status="Loader4LineIcon"
                    color={colors.primary}
                    isDisabled
                    _icon={{ _fontawesome: { spin: true } }}
                  />
                ) : (
                  <GetIcon {...attendanceIconProp} />
                )}
              </Box>
            </TouchableHighlight>
            {!isEditDisabled ? (
              smsDay?.type ? (
                <IconByName
                  mt="1"
                  p="5px"
                  rounded="full"
                  name="MailFillIcon"
                  bg={smsDay?.type.toLowerCase() + ".100"}
                  colorScheme={smsDay?.type.toLowerCase()}
                  color={smsDay?.type.toLowerCase() + ".500"}
                  _icon={{ size: "14" }}
                  onPress={(e) => setSmsShowModal(true)}
                />
              ) : (
                <Box p="3" mt="1"></Box>
              )
            ) : (
              ""
            )}
          </VStack>
        );
      })}
    </HStack>
  ));
};
