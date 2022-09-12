import { Box, FlatList, HStack, Text, VStack } from "native-base";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ProgressBar,
  calendar,
  BodySmall,
  Subtitle,
  Caption,
  getArray,
} from "@shiksha/common-lib";

const PRESENT = "Present";
const ABSENT = "Absent";
const UNMARKED = "Unmarked";
const MALE = "Male";
const FEMALE = "Female";

export default function Report({
  students,
  attendance,
  title,
  page,
  calendarView,
  footer,
  config,
}) {
  const { t } = useTranslation();
  const [studentIds, setStudentIds] = React.useState([]);
  const [design, setDesign] = React.useState({});
  const [withoutHolidays, setWithoutHolidays] = React.useState([]);
  const [genderList, setGenderList] = React.useState([]);
  const [isAvrage, setIsAvrage] = React.useState(false);
  const fullName = localStorage.getItem("fullName");
  const [status, setStatus] = React.useState([]);
  const holidays = [];

  const handleGenderList = () => {
    let genderList = [];
    genderList = [t("BOYS"), t("GIRLS")].filter((gender) => {
      return (
        (gender === t("BOYS") &&
          students.filter((e) => e.gender === MALE).length) ||
        (gender === t("GIRLS") &&
          students.filter((e) => e.gender === FEMALE).length)
      );
    });

    setGenderList([...genderList, t("TOTAL")]);
  };

  React.useEffect(() => {
    let ignore = false;
    async function getData() {
      if (!ignore) {
        setStatus(getArray(config?.["attendance.default_attendance_states"]));
        let daysWithoutHolidays = [];
        setStudentIds(students.map((e) => e.id));
        handleGenderList();
        if (typeof page === "object") {
          daysWithoutHolidays = page.map(
            (e) =>
              calendar(e, calendarView ? calendarView : "days").filter(
                (e) => !(!e.day() || holidays.includes(e.format("YYYY-MM-DD")))
              ).length
          );
          setWithoutHolidays(daysWithoutHolidays);
        } else {
          daysWithoutHolidays = [
            calendar(
              page ? page : 0,
              calendarView ? calendarView : "days"
            ).filter(
              (e) => !(!e.day() || holidays.includes(e.format("YYYY-MM-DD")))
            ).length,
          ];
          setWithoutHolidays(daysWithoutHolidays);
        }
        setIsAvrage(
          ["week", "weeks", "month", "months", "monthInDays"].includes(
            calendarView
          )
        );
        if (attendance[0]) {
          let percentage = 0;
          let attendanceAll = getStudentsAttendance(attendance[0]);
          let presentAttendanceCount = attendanceAll.filter(
            (e) => e.attendance && e.attendance !== PRESENT
          ).length;
          percentage =
            (presentAttendanceCount * 100) / daysWithoutHolidays.length;
          if (percentage && percentage >= 100) {
            setDesign({
              bg: "schools.success",
              textTransform: "inherit",
              iconName: "EmotionHappyLineIcon",
              titleHeading:
                t("YOU_HAVE_BEEN_PRESENT_ALL_DAYS_THIS") + " " + calendarView,
            });
          } else if (percentage && percentage < 100 && percentage >= 50) {
            setDesign({
              bg: "schools.warning",
              iconName: "EmotionNormalLineIcon",
              titleHeading: t("AGERAGE_CAN_BE_IMPROVED"),
            });
          } else {
            setDesign({
              bg: "schools.danger",
              textTransform: "inherit",
              iconName: "EmotionSadLineIcon",
              titleHeading:
                t("ABSENT_TODAY_POOR_THAN_LAST") + " " + calendarView,
            });
          }
        }
      }
    }
    getData();
    return () => {
      ignore = true;
    };
  }, [calendarView, page, students]);

  const getStudentsAttendance = (attendance) => {
    return attendance
      .slice()
      .reverse()
      .filter(
        (value, index, self) =>
          self.findIndex(
            (m) => value?.studentId === m?.studentId && value?.date === m?.date
          ) === index
      )
      .filter((e) => e);
  };

  const countReport = ({
    gender,
    attendance,
    attendanceType,
    type,
    studentIds,
    withoutHolidays,
  }) => {
    let attendanceAll = getStudentsAttendance(attendance);
    if (gender && [t("BOYS"), t("GIRLS")].includes(gender)) {
      studentIds = students
        .filter(
          (e) =>
            e.gender ===
            (gender === t("BOYS") ? MALE : gender === t("GIRLS") ? FEMALE : "")
        )
        .map((e) => e.id);
    }

    if (attendanceType === "Unmarked" && gender === t("TOTAL")) {
      let studentIds1 = attendanceAll.filter(
        (e) =>
          studentIds.includes(e.studentId) && e.attendance !== attendanceType
      );
      let val = studentIds.length * withoutHolidays - studentIds1.length;
      if (isAvrage) {
        return Math.round(val ? val / studentIds.length : 0);
      } else {
        return Math.round(val);
      }
    } else if (type === "Unmarked" || attendanceType === "Unmarked") {
      let studentIds1 = attendanceAll.filter((e) =>
        studentIds.includes(e.studentId)
      );

      if (attendanceType === "Unmarked") {
        studentIds1 = attendanceAll.filter(
          (e) =>
            studentIds.includes(e?.studentId) && e.attendance !== attendanceType
        );
      }
      let val = studentIds.length * withoutHolidays - studentIds1.length;
      if (isAvrage) {
        return Math.round(val ? val / studentIds.length : 0);
      } else {
        return Math.round(val);
      }
    } else {
      let val = attendanceAll.filter(
        (e) =>
          studentIds.includes(e?.studentId) && e.attendance === attendanceType
      ).length;

      if (isAvrage) {
        return Math.round(val ? val / studentIds.length : 0);
      } else {
        return Math.round(val);
      }
    }
  };

  return (
    <Box rounded={"xl"}>
      <Box roundedTop={"xl"} p="5" bg={design?.bg}>
        <HStack alignItems={"center"} space={2}>
          {/* <IconByName name={design?.iconName} isDisabled color="white" />
          <Text color="white" textTransform={"inherit"}>
            {design?.titleHeading}
          </Text> */}
        </HStack>
      </Box>
      <Box bg={"schools.primaryLight"}>
        {attendance && attendance.length ? (
          <FlatList
            data={genderList}
            renderItem={({ item, index }) => (
              <VStack
                p="5"
                space={3}
                borderBottomWidth="1"
                borderBottomColor={"schools.lightGray0"}
              >
                {attendance.length > 1 ? <Subtitle>{item}</Subtitle> : ""}
                <VStack space={3}>
                  {attendance.map((itemAttendance, index) => (
                    <HStack key={index} alignItems={"center"} space={3}>
                      <VStack alignItems={"center"}>
                        {title && title.length && title[index] ? (
                          title[index].name.split(" ").map((item, subIndex) => (
                            <Caption key={subIndex} {...title[index]?._text}>
                              {item}
                            </Caption>
                          ))
                        ) : (
                          <BodySmall>{item}</BodySmall>
                        )}
                      </VStack>
                      <VStack flex="auto" alignContent={"center"}>
                        <ProgressBar
                          data={status.map((subItem, subIndex) => {
                            let statusCount = countReport({
                              gender: item,
                              attendanceType: subItem,
                              attendance: itemAttendance,
                              studentIds,
                              withoutHolidays: withoutHolidays[index],
                            });
                            return {
                              name: subItem,
                              color:
                                subItem === PRESENT
                                  ? "schools.present"
                                  : subItem === ABSENT
                                  ? "schools.absent"
                                  : subItem === UNMARKED
                                  ? "schools.unmarked"
                                  : "schools.gray",
                              value: statusCount,
                            };
                          })}
                        />
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            )}
            keyExtractor={(item, index) => index}
          />
        ) : (
          ""
        )}
      </Box>
      <Box roundedBottom={"xl"} p="5" bg={"schools.primaryLight"}>
        {footer ? (
          footer
        ) : (
          <HStack justifyContent={"space-between"}>
            <Text textTransform="none">{t("ATTENDANCE_TAKEN_BY")}</Text>
            <Text>{fullName ? fullName : ""}</Text>
          </HStack>
        )}
      </Box>
    </Box>
  );
}
