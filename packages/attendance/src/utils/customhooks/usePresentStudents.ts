// Lib
import { useState, useEffect } from "react";
import { calendar } from "@shiksha/common-lib";
import { getStudentsPresentAbsent } from "@shiksha/common-lib";

// Services
import { GetAttendance, DefaultStudents } from "services/calls/registryCalls";

// Utilities
import { MomentUnionType } from "utils/types/types";
import { isMomentArray } from "utils/types/typeGuards";

export const usePresentStudents = ({ students, attendance }) => {
  const holidays = [];
  const [presentStudents, setPresentStudents] = useState([]);
  useEffect(() => {
    const getPresentStudents = async ({ students }) => {
      let weekdays: MomentUnionType = calendar(-1, "week");
      // Check type, also for typescripts
      if (isMomentArray(weekdays)) {
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
        setPresentStudents(await DefaultStudents(presentNew));
      }
    };
    getPresentStudents({ students });
  }, [students, attendance]);

  return [presentStudents];
};
