// Lib
import React from "react";
import { TimeBar } from "components/simple/TimeBar/TimeBar";

export interface ICalendarBar {
  (children: React.ReactNode, view: string): React.ReactNode;
}

export default function CalendarBar({ view, ...props }) {
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
  CalendarBar = <TimeBar {...props} />;
  return CalendarBar;
}

CalendarBar.defaultProps = {
  view: "days",
};
