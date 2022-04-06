import moment from "moment";

export const weekDates = (filter = {}, currentDate = moment()) => {
  if (filter.today) {
    return [moment()];
  }
  let weekStart = currentDate.clone().startOf("isoWeek");
  let days = [];
  for (let i = 0; i <= 6; i++) {
    days.push(moment(weekStart).add(i, "days"));
  }
  return days;
};

export function calendar(weekPage, today, type) {
  let date = moment();
  if (type === "month") {
    let startDate = moment().startOf("month");
    let endDate = moment(startDate).endOf("month");
    var weeks = [];
    weeks.push(weekDates({}, startDate));
    while (startDate.add(7, "days").diff(endDate) < 8) {
      weeks.push(weekDates({}, startDate));
    }
    return weeks;
  } else {
    date.add(weekPage * 7, "days");
    if (type === "week") {
      return weekDates({ today: today }, date);
    } else if (type === "weeks") {
      return [
        weekDates({ today: today }, date),
        weekDates({ today: today }, date.clone().add(-1 * 7, "days")),
      ];
    }
    return [weekDates({ today: today }, date)];
  }
}
