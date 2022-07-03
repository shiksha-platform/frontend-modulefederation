// Constants
import { MALE, FEMALE } from "./Constants";

export const countReport = ({
  gender,
  attendance,
  attendanceType,
  type,
  studentIds,
  withoutHolidays,
  students
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
      (e) => studentIds.includes(e.studentId) && e.attendance !== attendanceType
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
