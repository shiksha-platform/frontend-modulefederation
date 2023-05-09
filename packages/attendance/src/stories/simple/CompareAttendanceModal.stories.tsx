// Lib
import * as React from "react";
import { CompareAttendanceModal } from "components/simple/CompareAttendanceModal";
import Wrapper from "stories/Wrapper";

export default {
  title: "Attendance/simple/CompareAttendanceModal",
  component: CompareAttendanceModal,
};

const mockFunction = () => {};
const Template = (args) => {
  const [compare, setCompare] = React.useState<string>("week");
  const navigate = () => {};
  return (
    <Wrapper>
      <CompareAttendanceModal
        {...args}
        setCompare={setCompare}
        navigate={navigate}
      />
    </Wrapper>
  );
};

export const Open = Template.bind({});
Open.args = {
  showModal: true,
  setShowModal: mockFunction,
  appName: "Shiksha",
  classId: "9eae88b7-1f2d-4561-a64f-871cf7a6b3f2",
};
