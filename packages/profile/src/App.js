import React from "react";
import "./App.css";
import { initializeI18n, AppShell } from "@shiksha/common-lib";
import Profile from "pages/Profile";
import AttendanceReport from "pages/AttendanceReport";
import SeeMore from "pages/SeeMore";

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
      path: "/profile/seemore",
      component: SeeMore,
    },
    {
      moduleName: "profile",
      path: "*",
      component: Profile,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));
  const skipLogin = !(
    process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false
  );

  return (
    <AppShell
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      skipLogin={skipLogin}
      _authComponent={{ swPath: "/modules/profile" }}
    />
  );
}

export default App;
