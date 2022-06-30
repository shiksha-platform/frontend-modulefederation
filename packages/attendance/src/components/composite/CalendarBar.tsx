// Lib
import React from "react";
import { TimeBar } from "components/simple/TimeBar";

export default function CalendarBar({ view, ...props }) {
  let CalendarBar = <></>;
  switch (view) {
    case "month":
    case "monthInDays":
      props.type = "month";
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
