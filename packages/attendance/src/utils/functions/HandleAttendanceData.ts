// Lib
import moment from "moment";

// Utils
import { PRESENT, ABSENT, UNMARKED } from "./Constants";
import { GetStatusFromManifest } from "./GetStatusFromManifest";

export const HandleAttendanceData = ({
  attendance,
  day,
  sms,
  isIconSizeSmall,
  student,
  manifest,
}) => {
  const holidays = [];
  const status = GetStatusFromManifest(manifest);
  let isToday = moment().format("YYYY-MM-DD") === day.format("YYYY-MM-DD");
  let isAllowDay = false;
  if (manifest?.["class_attendance.previous_attendance_edit"] === "true") {
    isAllowDay = day.format("YYYY-MM-DD") <= moment().format("YYYY-MM-DD");
  } else {
    isAllowDay = day.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD");
  }

  let isHoliday =
    day.day() === 0 || holidays.includes(day.format("YYYY-MM-DD"));
  let dateValue = day.format("YYYY-MM-DD");
  let smsDay = sms?.find(
    (e) => e.date === day.format("YYYY-MM-DD") && e.studentId === student.id
  );
  let attendanceItem = attendance
    .slice()
    .reverse()
    .find((e) => e.date === dateValue && e.studentId === student.id);
  let attendanceIconProp: any = !isIconSizeSmall
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

  return {
    isToday,
    isAllowDay,
    isHoliday,
    dateValue,
    smsDay,
    attendanceItem,
    attendanceIconProp,
    attendanceType,
  };
};
