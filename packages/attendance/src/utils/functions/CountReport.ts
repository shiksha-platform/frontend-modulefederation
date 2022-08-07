// Constants
import constants from "./Constants";
// Utilities
import { filterStudentsAttendance } from "./FilterStudentsAttendance";

export interface ICountReport {
  gender?: any;
  isAverage?: any;
  attendance?: any;
  attendanceType?: any;
  type?: string;
  studentIds?: any;
  withoutHolidays?: any;
  students?: any;
  t?: any;
}

// Returns the data corresponding to a report depending on the
// parameters passed
export const countReport = ({
  gender,
  isAverage,
  attendance,
  attendanceType,
  type,
  studentIds,
  withoutHolidays,
  students,
  t,
}: ICountReport) => {
  let attendanceAll = filterStudentsAttendance({ attendance });
  if (gender && [t("BOYS"), t("GIRLS")].includes(gender)) {
    studentIds = students
      .filter(
        (e: any) =>
          e.gender ===
          (gender === t("BOYS")
            ? constants.MALE
            : gender === t("GIRLS")
            ? constants.FEMALE
            : "")
      )
      .map((e: any) => e.id);
  }

  if (attendanceType === "Unmarked" && gender === t("TOTAL")) {
    let studentIds1 = attendanceAll.filter(
      (e) => studentIds.includes(e.studentId) && e.attendance !== attendanceType
    );
    let val = studentIds.length * withoutHolidays - studentIds1.length;
    if (isAverage) {
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
    if (isAverage) {
      return Math.round(val ? val / studentIds.length : 0);
    } else {
      return Math.round(val);
    }
  } else {
    let val = attendanceAll.filter(
      (e) =>
        studentIds.includes(e?.studentId) && e.attendance === attendanceType
    ).length;

    if (isAverage) {
      return Math.round(val ? val / studentIds.length : 0);
    } else {
      return Math.round(val);
    }
  }
};
