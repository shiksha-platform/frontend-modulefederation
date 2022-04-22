import React from "react";
import "./App.css";
import { extendTheme } from "native-base";
import { DEFAULT_THEME, initializeI18n, AppShell } from "@shiksha/common-lib";
import StudentDetails from "./pages/students/StudentDetails";
import Student from "./pages/students/Student";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  initializeI18n(
    ["student"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      path: "class/students/:classId",
      component: Student,
    },
    {
      path: "students/:studentId",
      component: StudentDetails,
    },
    {
      path: "*",
      component: Student,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      theme={theme}
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
    />
  );
}

export default App;
