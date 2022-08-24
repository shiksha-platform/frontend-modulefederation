import React from "react";
import { getRole } from "@shiksha/common-lib";
import TeacherHome from "./TeacherHome";
import MentorMonitorHome from "./MentorMonitorHome";

function Home(props) {
  const [role, setRole] = React.useState();

  React.useEffect(async (e) => {
    const newRole = await getRole();
    setRole(newRole);
  }, []);

  if (role && role.toLowerCase() === "teacher") {
    return <TeacherHome {...props} />;
  } else if (role && ["mentor", "monitor"].includes(role.toLowerCase())) {
    return <MentorMonitorHome {...props} />;
  }
  return <></>;
}
export default Home;
