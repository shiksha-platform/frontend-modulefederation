import { attendanceRegistryService, calendar } from "@shiksha/common-lib";
import moment from "moment";

export const report = async (weekPage, calendarView) => {
  const pastDays = [weekPage, weekPage - 1, weekPage - 2];
  if (calendarView === "days") {
    return {
      weekData: [calendar(weekPage, calendarView)],
      reportAttendace: await Promise.all(
        pastDays.map((num) => getReportData(calendarView, num))
      ),
    };
  } else if (calendarView === "weeks") {
    return {
      weekData: calendar(weekPage, calendarView),
      reportAttendace: await Promise.all(
        pastDays.map((num) => getReportData(calendarView, num))
      ),
    };
  } else {
    return {
      weekData: calendar(weekPage, calendarView),
      reportAttendace: await Promise.all(
        pastDays.map((num) => getReportData(calendarView, num))
      ),
    };
  }
};

const getReportData = async (calendarView, day) => {
  const dates = calendar(
    day,
    calendarView === "weeks"
      ? "week"
      : calendarView === "month"
      ? "monthInDays"
      : "days"
  );
  const filter = {
    fromDate: dates[0].format("YYYY-MM-DD"),
    toDate:
      dates?.[dates?.length < 2 ? 0 : dates?.length - 1]?.format("YYYY-MM-DD"),
    userId: localStorage.getItem("id"),
  };
  return {
    name: formatDate(filter, calendarView),
    data: await attendanceRegistryService.getAll(filter),
  };
};

const formatDate = (date, type) => {
  if (["Month", "month"].includes(type)) {
    return moment(date?.fromDate).format("MMMM Y");
  } else if (["Week", "week", "weeks"].includes(type)) {
    return (
      moment(date?.fromDate).format("D MMM") +
      " - " +
      moment(date?.toDate).format("D MMM")
    );
  } else {
    return moment(date?.fromDate).format("D MMM, Y");
  }
};
