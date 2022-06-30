// Lib
import React from "react";
import { TimeBar } from "components/simple/TimeBar";

export default function CalendarBar({ view, ...props }) {
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
  return <TimeBar {...props} />;
}
