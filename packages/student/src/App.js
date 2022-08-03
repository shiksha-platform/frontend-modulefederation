import React from "react";
import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import StudentDetails from "./pages/StudentDetails";
import Student from "./pages/students";
import { navigationRoute } from "services/routes";

function App() {
  initializeI18n(
    ["student"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      path: navigationRoute.student,
      component: Student,
    },
    {
      path: navigationRoute.studentDetails,
      component: StudentDetails,
    },
    {
      path: navigationRoute.fourOfour,
      component: Student,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      _authComponent={{ swPath: "/modules/student" }}
    />
  );
}

export default App;
