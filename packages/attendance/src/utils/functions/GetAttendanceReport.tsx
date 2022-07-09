// Services
import { GetAttendance } from "services/calls/registryCalls";

// Utils
import { isMoment, isMoment2DArray } from "utils/types/typeGuards";

export const GetAttendanceReport = async (page, calendar, calendarView) => {
  let weekdays = calendar(page, calendarView);
  if (isMoment(weekdays) || isMoment2DArray(weekdays)) return;
  let params = {
    fromDate: weekdays?.[0]?.format("Y-MM-DD"),
    toDate: weekdays?.[weekdays.length - 1]?.format("Y-MM-DD"),
  };
  const attendanceData = await GetAttendance(params);
  return attendanceData;
};
