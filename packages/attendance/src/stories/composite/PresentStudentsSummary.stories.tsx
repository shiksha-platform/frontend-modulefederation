import * as React from "react";
import { PresentStudentsSummary } from "components/composite/PresentStudentsSummary";

// Mock data
import { attendance, compareAttendance, students } from "../mockData";
import Wrapper from "stories/Wrapper";

export default {
  title: "Attendance/composite/PresentStudentsSummary",
  component: PresentStudentsSummary,
};

const defaultArgs = {
  attendance,
  compareAttendance,
  students,
  page: 0,
  presentCount: 7,
};
const Template = (args) => (
  <Wrapper>
    <PresentStudentsSummary {...args} />
  </Wrapper>
);

export const WeekSummary = Template.bind({});
WeekSummary.args = {
  ...defaultArgs,
  thisTitle: "THIS_WEEK",
  lastTitle: "LAST_WEEK",
  compare: "week",
};

export const MonthSummary = Template.bind({});
MonthSummary.args = {
  ...defaultArgs,
  thisTitle: "THIS_MONTH",
  lastTitle: "LAST_MONTH",
  compare: "month",
};
