import * as React from "react";
import { CalendarBar } from "components/composite/CalendarBar";
import { useState } from "@storybook/addons";

const Template = (args) => {
  const [page, setPage] = useState<number>(0);
  return <CalendarBar {...args} page={page} setPage={setPage} />;
};

export default {
  title: "Attendance/Composite/Calendar Bar",
  component: CalendarBar,
};

// Day View
export const DayView = Template.bind({});
DayView.args = {
  view: "days",
};

// Week View
export const WeekView = Template.bind({});
WeekView.args = {
  view: "week",
};

export const MonthView = Template.bind({});
MonthView.args = {
  view: "month",
};
