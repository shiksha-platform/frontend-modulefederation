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
  Link,
} from "native-base";
import * as attendanceServiceRegistry from "../services/attendanceServiceRegistry";
import manifest from "../manifest.json";
import { useTranslation } from "react-i18next";
import { TouchableHighlight } from "react-native-web";
import moment from "moment";
import {
  IconByName,
  getStudentsPresentAbsent,
  useWindowSize,
} from "@shiksha/common-lib";
import ReportSummary from "./ReportSummary";
import * as studentServiceRegistry from "../services/studentServiceRegistry";

export function calendar(page, type = "weeks") {
  let date = moment();
  if (type === "month") {
    let startDate = moment().add(page, "months").startOf("month");
    let endDate = moment(startDate).endOf("month");
    var weeks = [];
    weeks.push(weekDates(startDate));
    while (startDate.add(7, "days").diff(endDate) < 8) {
      weeks.push(weekDates(startDate));
    }
    return weeks;
  } else if (type === "monthInDays") {
    let startDate = moment().add(page, "months").startOf("month");
    let endDate = moment(startDate).endOf("month");
    var days = [];
    days.push(startDate.clone());
    while (startDate.add(1, "days").diff(endDate) < 1) {
      days.push(startDate.clone());
    }
    return days;
  } else if (["week", "weeks"].includes(type)) {
    date.add(page * 7, "days");
    if (type === "week") {
      return weekDates(date);
    }
    return [weekDates(date)];
  } else {
    if (type === "days") {
      return [date.add(page * 1, "days")];
    }
    return date.add(page * 1, "days");
  }
}

export const weekDates = (currentDate = moment()) => {
  let weekStart = currentDate.clone().startOf("isoWeek");
  let days = [];
  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, "days"));
  }
  return days;
};

export const GetAttendance = async (params) => {
  return await attendanceServiceRegistry.getAll({
    params: params,
  });
};

export const GetIcon = ({ status, _box, color, _icon }) => {
  let icon = <></>;
  let iconProps = { fontSize: "xl", isDisabled: true, ..._icon };
  switch (status) {
    case "Present":
      icon = (
        <Box {..._box} color={color ? color : "attendancePresent.500"}>
          <IconByName name="CheckboxCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Absent":
      icon = (
        <Box {..._box} color={color ? color : "attendanceAbsent.500"}>
          <IconByName name="CloseCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Late":
      icon = (
        <Box {..._box} color={color ? color : "yellow.500"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Holiday":
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.100"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Unmarked":
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.500"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    case "Today":
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.500"}>
          <IconByName name="CheckboxBlankCircleLineIcon" {...iconProps} />
        </Box>
      );
      break;
    default:
      icon = (
        <Box {..._box} color={color ? color : "attendanceUnmarked.400"}>
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
  setLoding,
  setAllAttendanceStatus,
  allAttendanceStatus,
  classObject,
  isEditDisabled,
  setIsEditDisabled,
  isWithEditButton,
}) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [presentStudents, setPresentStudents] = useState([]);
  const teacherId = localStorage.getItem("id");
  const [width, Height] = useWindowSize();

  useEffect(() => {
    const getPresentStudents = async ({ students }) => {
      let weekdays = calendar(-1, "week");
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
    getPresentStudents({ students });
  }, [students]);

  const getStudentsAttendance = (e) => {
    return students
      .map((item) => {
        return attendance
          .slice()
          .reverse()
          .find(
            (e) =>
              e.date === moment().format("Y-MM-DD") && e.studentId === item.id
          );
      })
      .filter((e) => e);
  };

  const markAllAttendance = async () => {
    setLoding(true);
    if (typeof students === "object") {
      let ctr = 0;
      let attendanceAll = getStudentsAttendance();

      students.forEach((item, index) => {
        let attendanceObject = attendanceAll.find(
          (e) => item.id === e.studentId
        );
        let result = null;
        if (attendanceObject?.id) {
          if (attendanceObject.attendance !== "Present") {
            result = attendanceServiceRegistry
              .update(
                {
                  id: attendanceObject.id,
                  attendance: "Present",
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
              .then((e) => {
                if (getAttendance) {
                  getAttendance();
                }
              });
          } else {
            result = "alreadyPresent";
          }
        } else {
          result = attendanceServiceRegistry.create(
            {
              studentId: item.id,
              date: moment().format("Y-MM-DD"),
              attendance: "Present",
              attendanceNote: "Test",
              classId: item.currentClassID,
              subjectId: "History",
              teacherId: teacherId,
            },
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
        }

        setTimeout(async (e) => {
          if (result && result === "alreadyPresent") {
            setAllAttendanceStatus({
              ...allAttendanceStatus,
              success: parseInt(index + 1) + " Already Present",
            });
          } else if (result) {
            setAllAttendanceStatus({
              ...allAttendanceStatus,
              success: parseInt(index + 1) + " success",
            });
          } else {
            setAllAttendanceStatus({
              ...allAttendanceStatus,
              fail: parseInt(index + 1) + " fail",
            });
          }
          ctr++;
          if (ctr === students.length) {
            setAllAttendanceStatus({});
            setLoding(false);
            await getAttendance();
          }
        }, index * 900);
      });
    }
  };

  return (
    <>
      {isWithEditButton || !isEditDisabled ? (
        <Stack
          position={"sticky"}
          bottom={74}
          width={"100%"}
          style={{ boxShadow: "rgb(0 0 0 / 22%) 0px -2px 10px" }}
        >
          <Box p="2" py="5" bg="white">
            <VStack space={"15px"} alignItems={"center"}>
              <Text
                textAlign={"center"}
                fontSize="10px"
                textTransform={"inherit"}
              >
                {t("ATTENDANCE_WILL_AUTOMATICALLY_SUBMIT")}
              </Text>
              {!isEditDisabled ? (
                <Button.Group>
                  <Button
                    variant="outline"
                    colorScheme="button"
                    onPress={(e) => setShowModal(true)}
                  >
                    {t("SAVE")}
                  </Button>
                  <Button
                    colorScheme="button"
                    onPress={markAllAttendance}
                    _text={{ color: "white" }}
                  >
                    {t("MARK_ALL_PRESENT")}
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
          <Actionsheet isOpen={showModal} onClose={() => setShowModal(false)}>
            <Stack width={"100%"} height={Height} overflowY={"scroll"}>
              <Actionsheet.Content alignItems={"left"} bg="attendanceCard.500">
                <HStack justifyContent={"space-between"}>
                  <Stack p={5} pt={2} pb="25px">
                    <Text color={"white"} fontSize="16px" fontWeight={"600"}>
                      {t("ATTENDANCE_SUMMARY_REPORT")}
                    </Text>
                    <Text color={"white"} fontSize="12px" fontWeight={"400"}>
                      {classObject?.title ?? ""}
                    </Text>
                  </Stack>
                  <IconByName
                    name="CloseCircleLineIcon"
                    color="white"
                    onPress={(e) => setShowModal(false)}
                  />
                </HStack>
              </Actionsheet.Content>
              <Stack width={"100%"} space="1" bg={"gray.200"}>
                <Box bg="reportBoxBg.500" p="5" textAlign={"center"}>
                  <VStack space={2}>
                    <Text fontSize="14px" fontWeight="500">
                      {t("CHOOSE_STUDENTS_FOR_ATTENDANCE_SMS")}
                    </Text>
                    <Text fontSize="10px" fontWeight="300">
                      {t("STUDENTS_ABSENT")}
                    </Text>
                    <Link
                      style={{
                        textDecoration: "none",
                      }}
                      href={
                        "/attendance/sendSms/" +
                        (classObject?.id?.startsWith("1-")
                          ? classObject?.id?.replace("1-", "")
                          : classObject?.id)
                      }
                    >
                      <Button
                        variant="outline"
                        colorScheme="button"
                        rounded="lg"
                        flex="1"
                      >
                        {t("SEND_MESSAGE")}
                      </Button>
                    </Link>
                  </VStack>
                </Box>
                <Box bg="white" p={5}>
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    pb={5}
                  >
                    <Text fontSize={"16px"} fontWeight={"600"}>
                      {t("ATTENDANCE_SUMMARY")}
                    </Text>
                    <Text fontSize={"14px"}>
                      {t("TODAY") + ": "}
                      <Text fontWeight={"600"}>
                        {moment().format("DD MMM, Y")}
                      </Text>
                    </Text>
                  </HStack>
                  <ReportSummary
                    {...{
                      students,
                      attendance: [
                        attendance.filter(
                          (e) => e.date === moment().format("Y-MM-DD")
                        ),
                      ],
                    }}
                  />
                </Box>
                <Box bg="white" p={5}>
                  <Box bg={"gray.100"} rounded={"md"} p="4">
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
                              <Suspense fallback="loding">
                                <Card
                                  item={student}
                                  hidePopUpButton={true}
                                  type="veritical"
                                />
                              </Suspense>
                            </Stack>
                          ) : (
                            <div key={index}></div>
                          )
                        )}
                      </HStack>
                      <Button colorScheme="button" variant="outline">
                        {(presentStudents?.length > 3
                          ? "+ " + (presentStudents.length - 3)
                          : "") +
                          " " +
                          t("MORE")}
                      </Button>
                    </VStack>
                  </Box>
                </Box>
                <Box p="2" py="5" bg="white">
                  <VStack space={"15px"} alignItems={"center"}>
                    <Text textAlign={"center"} fontSize="10px">
                      {t("ATTENDANCE_WILL_AUTOMATICALLY_SUBMIT")}
                    </Text>
                    <HStack alignItems={"center"} space={4}>
                      <Button
                        variant="outline"
                        colorScheme="button"
                        onPress={(e) => setShowModal(false)}
                      >
                        {t("CLOSE")}
                      </Button>
                      <Link
                        style={{
                          textDecoration: "none",
                        }}
                        href={
                          "/classes/attendance/report/" +
                          (classObject?.id?.startsWith("1-")
                            ? classObject?.id?.replace("1-", "")
                            : classObject?.id)
                        }
                      >
                        <Button colorScheme="button" _text={{ color: "white" }}>
                          {t("SEE_FULL_REPORT")}
                        </Button>
                      </Link>
                    </HStack>
                  </VStack>
                </Box>
              </Stack>
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
  getAttendance,
  sms,
  _card,
  isEditDisabled,
  _weekBox,
}) {
  const { t } = useTranslation();
  const teacherId = localStorage.getItem("id");
  const [attendance, setAttendance] = useState([]);
  const [attendanceObject, setAttendanceObject] = useState([]);
  const [days, setDays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [smsShowModal, setSmsShowModal] = useState(false);
  const [loding, setLoding] = useState({});
  const status = manifest?.status ? manifest?.status : [];
  const Card = React.lazy(() => import("students/Card"));

  useEffect(() => {
    if (typeof page === "object") {
      setDays(page.map((e) => calendar(e, type)));
    } else {
      setDays([calendar(page, type)]);
    }
    async function getData() {
      if (attendanceProp) {
        setAttendance(attendanceProp);
      }
      setLoding({});
    }
    getData();
  }, [page, attendanceProp, type]);

  const markAttendance = async (dataObject) => {
    setLoding({
      [dataObject.date + dataObject.id]: true,
    });

    if (dataObject.attendanceId) {
      attendanceServiceRegistry
        .update(
          {
            id: dataObject.attendanceId,
            attendance: dataObject.attendance,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            onlyParameter: ["attendance", "id", "date"],
          }
        )
        .then((e) => {
          if (getAttendance) {
            setTimeout(getAttendance, 900);
          }
          setShowModal(false);
        });
    } else {
      attendanceServiceRegistry
        .create(
          {
            studentId: student.id,
            date: dataObject.date,
            attendance: dataObject.attendance,
            attendanceNote: "Test",
            classId: student.currentClassID,
            subjectId: "History",
            teacherId: teacherId,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((e) => {
          if (getAttendance) {
            setTimeout(getAttendance, 900);
          }
          setShowModal(false);
        });
    }
  };
  return (
    <Stack space={type !== "day" ? "15px" : ""}>
      <VStack space={type !== "day" ? "15px" : ""}>
        {!_card.isHideStudentCard ? (
          <Suspense fallback="loding">
            <Card
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
                          loding,
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
          <Box borderWidth={1} borderColor={"coolGray.200"} rounded="xl">
            {days.map((day, index) => (
              <CalendarComponent
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
                  loding,
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
          <Actionsheet.Content alignItems={"left"} bg="purple.500">
            <HStack justifyContent={"space-between"}>
              <Stack p={5} pt={2} pb="25px">
                <Text color={"white"} fontSize="16px" fontWeight={"600"}>
                  {t("MARK_ATTENDANCE")}
                </Text>
              </Stack>
              <IconByName
                name="CloseCircleLineIcon"
                color={"white"}
                onPress={(e) => setShowModal(false)}
              />
            </HStack>
          </Actionsheet.Content>
          <Box w="100%" p={4} justifyContent="center" bg="white">
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
                    <Text color="coolGray.800" bold fontSize="lg">
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
              <Text fontWeight={500} fontSize="12px" color={"#B1B1BF"}>
                Message Sent to Parent
              </Text>
              <Text fontWeight={600} fontSize="16px" color={"#373839"}>
                Absent alert
              </Text>
              <Text
                fontWeight={600}
                fontSize="14px"
                color={"#7C7E82"}
                textAlign="center"
              >
                Hello Mr. B.K. Chaudhary, this is to inform you that your ward
                Sheetal is absent in school on Wednesday, 12th of January 2022.
              </Text>
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
  loding,
  _weekBox,
}) => {
  let thisMonth = monthDays?.[1]?.[0]?.format("M");
  return monthDays.map((week, index) => (
    <HStack
      justifyContent="space-around"
      alignItems="center"
      key={index}
      borderBottomWidth={
        monthDays.length > 1 && monthDays.length - 1 !== index ? "1" : "0"
      }
      borderBottomColor={"coolGray.300"}
      {...(type === "day" ? { px: "2" } : { p: "2" })}
      {..._weekBox}
    >
      {week.map((day, subIndex) => {
        let smsDay = sms?.find(
          (e) => e.date === day.format("Y-MM-DD") && e.studentId === student.id
        );
        let isToday = moment().format("Y-MM-DD") === day.format("Y-MM-DD");
        let isFutureDay = day.format("Y-MM-DD") > moment().format("Y-MM-DD");
        let isHoliday = day.day() === 0;
        let dateValue = day.format("Y-MM-DD");
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
        let attendanceType = "Present";
        if (
          attendanceItem?.attendance &&
          attendanceItem?.attendance === "Present"
        ) {
          attendanceIconProp = {
            ...attendanceIconProp,
            status: attendanceItem?.attendance,
          };
        } else if (
          attendanceItem?.attendance &&
          attendanceItem?.attendance === "Absent"
        ) {
          attendanceIconProp = {
            ...attendanceIconProp,
            status: attendanceItem?.attendance,
          };
        } else if (
          attendanceItem?.attendance &&
          attendanceItem?.attendance === "Late"
        ) {
          attendanceIconProp = {
            ...attendanceIconProp,
            status: attendanceItem?.attendance,
          };
        } else if (day.day() === 0) {
          attendanceIconProp = { ...attendanceIconProp, status: "Holiday" };
        } else if (isToday) {
          attendanceIconProp = { ...attendanceIconProp, status: "Today" };
        } else if (moment().diff(day, "days") > 0) {
          attendanceIconProp = { ...attendanceIconProp, status: "Unmarked" };
        }

        if (manifest.status) {
          const arr = manifest.status;
          const i = arr.indexOf(attendanceItem?.attendance);
          if (i === -1) {
            attendanceType = arr[0];
          } else {
            attendanceType = arr[(i + 1) % arr.length];
          }
        }

        return (
          <VStack
            key={subIndex}
            alignItems="center"
            borderWidth={isToday ? "1" : ""}
            borderColor={isToday ? "button.500" : ""}
            p={type === "day" ? "1" : "0"}
            rounded="lg"
            opacity={
              type !== "month" && day.day() !== 0
                ? 1
                : thisMonth && day.format("M") !== thisMonth
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
              ></Badge>
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
                    <Text pb="1" color={"attendanceCardText.400"}>
                      {day.format("ddd")}
                    </Text>
                  ) : (
                    ""
                  )}
                  <Text color={"attendanceCardText.500"}>
                    {day.format("DD")}
                  </Text>
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
                if (!isEditDisabled && !isFutureDay && !isHoliday) {
                  markAttendance({
                    attendanceId: attendanceItem?.id ? attendanceItem.id : null,
                    date: dateValue,
                    attendance: attendanceType,
                    id: student.id,
                  });
                }
              }}
              onLongPress={(event) => {
                if (
                  !isEditDisabled &&
                  day.format("M") === moment().format("M") &&
                  day.day() !== 0
                ) {
                  setAttendanceObject({
                    attendanceId: attendanceItem?.id ? attendanceItem.id : null,
                    date: dateValue,
                    attendance: attendanceItem?.attendance,
                    id: student.id,
                  });
                  setShowModal(true);
                }
              }}
            >
              <Box alignItems="center">
                {loding[dateValue + student.id] ? (
                  <GetIcon
                    {...attendanceIconProp}
                    status="Loader4LineIcon"
                    color={"button.500"}
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
