import React from "react";
import "./App.css";
import { initializeI18n, AppShell } from "@shiksha/common-lib";
import Profile from "pages/Profile";
import AttendanceReport from "pages/AttendanceReport";

function App() {
  initializeI18n(
    ["profile"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      moduleName: "profile",
      path: "/profile/attendance",
      component: AttendanceReport,
    },
    {
      moduleName: "profile",
      path: "/",
      component: Profile,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      _authComponent={{ swPath: "/modules/profile" }}
    />
  );
}

export default App;
