// Libs
import React from "react";
import { Box, FlatList, HStack, Text, VStack } from "native-base";
import { useTranslation } from "react-i18next";

// @ts-ignore
import manifest from "./manifest.json";
import {
  ProgressBar,
  calendar,
  BodySmall,
  Subtitle,
  Caption,
} from "@shiksha/common-lib";

// Utilities
import { colors, colorTheme } from "utils/functions/ColorTheme";
import {
  PRESENT,
  ABSENT,
  UNMARKED,
  MALE,
  FEMALE,
} from "utils/functions/Constants";
import { isMoment } from "moment";
import { isMoment2DArray } from "utils/types/typeGuards";

export interface IReport {
  students: Array<any>;
  attendance?: Array<any>;
  title?: Array<{
    name: string;
    _text?: Object;
  }>;
  page?: number;
  calendarView?: string;
  footer?: React.ReactNode;
}
const Report: React.FC<IReport> = ({
  students,
  attendance,
  title,
  page,
  calendarView,
  footer,
}) => {
  const { t } = useTranslation();
  const [studentIds, setStudentIds] = React.useState([]);
  const [design, setDesign] = React.useState({});
  const [withoutHolidays, setWithoutHolidays] = React.useState([]);
  const [genderList, setGenderList] = React.useState([]);
  const [isAvrage, setIsAvrage] = React.useState(false);
  const fullName = localStorage.getItem("fullName");
  const status = manifest?.status ? manifest?.status : [];
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
        let daysWithoutHolidays = [];
        setStudentIds(students.map((e) => e.id));
        handleGenderList();
        if (typeof page === "object") {
          // add a type guard here
          daysWithoutHolidays = page.map((e) => {
            const dat = calendar(e, calendarView ? calendarView : "days");
            if (isMoment(dat) || isMoment2DArray(dat)) return;

            return dat.filter(
              (e) => !(!e.day() || holidays.includes(e.format("YYYY-MM-DD")))
            ).length;
          });
          setWithoutHolidays(daysWithoutHolidays);
        } else {
          const dat = calendar(
            page ? page : 0,
            calendarView ? calendarView : "days"
          );
          if (isMoment(dat) || isMoment2DArray(dat)) return;
          daysWithoutHolidays = [
            dat.filter(
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
              bg: colors.success,
              iconName: "EmotionHappyLineIcon",
              titleHeading:
                t("YOU_HAVE_BEEN_PRESENT_ALL_DAYS_THIS") + " " + calendarView,
            });
          } else if (percentage && percentage < 100 && percentage >= 50) {
            setDesign({
              bg: colors.warning,
              iconName: "EmotionNormalLineIcon",
              titleHeading: t("AGERAGE_CAN_BE_IMPROVED"),
            });
          } else {
            setDesign({
              bg: colors.danger,
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
      <Box bg={colorTheme.reportBoxBg}>
        {attendance && attendance.length ? (
          <FlatList
            data={genderList}
            renderItem={({ item, index }) => (
              <VStack
                p="5"
                space={3}
                borderBottomWidth="1"
                borderBottomColor={colorTheme.reportBorder}
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
                        {
                          // @ts-ignore
                          <ProgressBar
                            data={status.map((subItem, subIndex) => {
                              let statusCount = countReport({
                                gender: item,
                                attendanceType: subItem,
                                attendance: itemAttendance,
                                studentIds,
                                withoutHolidays: withoutHolidays[index],
                                students
                              });
                              return {
                                name: subItem,
                                color:
                                  subItem === PRESENT
                                    ? colorTheme.attendancePresent
                                    : subItem === ABSENT
                                    ? colorTheme.attendanceAbsent
                                    : subItem === UNMARKED
                                    ? colorTheme.attendanceUnmarked
                                    : colorTheme.gray,
                                value: statusCount,
                              };
                            })}
                          />
                        }
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
      <Box roundedBottom={"xl"} p="5" bg={colorTheme.reportBoxBg}>
        {footer ? (
          footer
        ) : (
          <HStack justifyContent={"space-between"}>
            <Text>{t("ATTENDANCE_TAKEN_BY")}</Text>
            <Text>{fullName ? fullName : ""}</Text>
          </HStack>
        )}
      </Box>
    </Box>
  );
};
