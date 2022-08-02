import moment, { Moment } from "moment";

interface IFormatDate {
  date: Moment | Moment[] | Moment[][];
  type?: string;
}

// TODO: Remove TSignore
export const FormatDate: Function = ({ date, type }: IFormatDate) => {
  if (!date) return "";
  if (type === "Month") {
    return moment(date[0]).format("MMMM Y");
  } else if (type === "Week") {
    return (
      moment(date[0]).format("D MMM") +
      " - " +
      // @ts-ignore
      moment(date[date.length - 1]).format("D MMM")
    );
  } else if (type === "Today") {
    // @ts-ignore
    return moment(date).format("D MMM, ddd, HH:MM");
  } else if (type === "Tomorrow") {
    // @ts-ignore
    return moment(date).format("D MMM, ddd");
  } else if (type === "Yesterday") {
    // @ts-ignore
    return moment(date).format("D MMM, ddd");
  } else {
    // @ts-ignore
    return moment(date).format("D MMMM, Y");
  }
};
