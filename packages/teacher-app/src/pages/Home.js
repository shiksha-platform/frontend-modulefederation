import React from "react";
import { getRole } from "@shiksha/common-lib";
import TeacherHome from "./TeacherHome";
import MentoreMoniterHome from "./MentoreMoniterHome";

function Home({ footerLinks, appName }) {
  const [role, setRole] = React.useState();

  React.useEffect(async (e) => {
    const newRole = await getRole();
    setRole(newRole);
  }, []);

  if (role && role.toLowerCase() === "teacher") {
    return <TeacherHome />;
  } else if (role && ["mentore", "moniter"].includes(role.toLowerCase())) {
    return <MentoreMoniterHome />;
  }
  return <></>;
}
export default Home;
