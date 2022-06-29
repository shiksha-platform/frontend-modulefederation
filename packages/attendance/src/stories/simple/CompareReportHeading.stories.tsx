import * as React from "react";
import { CompareReportHeading } from "components/simple/CompareReportHeading";

export default {
  title: "Attendance/simple/CompareReportHeading",
  component: CompareReportHeading,
};

const Template = (args) => <CompareReportHeading {...args} />;

export const Main = Template.bind({});
Main.args = {
  _textMed: "This is the medium sized text",
  _textSmall: "This is the small sized text",
};
