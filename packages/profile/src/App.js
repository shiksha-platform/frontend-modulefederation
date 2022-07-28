import React from "react";
import "./App.css";
import { extendTheme } from "native-base";
import { DEFAULT_THEME, initializeI18n, AppShell } from "@shiksha/common-lib";
import Profile from "pages/Profile";
import AttendanceReport from "pages/AttendanceReport";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  initializeI18n(
    ["profile"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      path: "/profile/attendance",
      component: AttendanceReport,
    },
    {
      path: "*",
      component: Profile,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      theme={theme}
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      _authComponent={{ swPath: "/modules/profile" }}
    />
  );
}

export default App;
