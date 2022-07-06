import moment from "moment";
export const GetLastAttendance = (attendance) => {
  let dates = attendance.map((d) => moment(d.updatedAt));
  let date = moment.max(dates);
  return dates.length ? date.format("hh:mmA") : "N/A";
};
