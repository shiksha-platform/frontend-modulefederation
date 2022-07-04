// Lib
import React, { FC } from "react";
import { TimeBar } from "components/simple/TimeBar/TimeBar"

export interface ICalendarBar {
  view?: string;
  type?: string;
}

export const CalendarBar: FC<ICalendarBar> = ({ view, ...props }) => {
  let CalendarBar = <></>;
  switch (view) {
    case "month":
    case "monthInDays":
      props.type = "monthInDays";
      break;
    case "week":
      props.type = "week";
      break;
    default:
      props.type = "days";
      break;
  }
  // @ts-ignore
  CalendarBar = <TimeBar {...props} />;
  return CalendarBar;
};

CalendarBar.defaultProps = {
  view: "days",
};
