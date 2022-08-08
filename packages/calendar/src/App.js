import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { extendTheme } from "native-base";
import { AppShell, DEFAULT_THEME, initializeI18n } from "@shiksha/common-lib";
import TimeTableRoute from "pages/TimeTableRoute";
import { navigationRoute } from "services/routes";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  initializeI18n(
    ["timeTable"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      path: navigationRoute.fourOfour,
      component: TimeTableRoute,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));
  const skipLogin = !(
    process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false
  );

  return (
    <AppShell
      theme={theme}
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      skipLogin={skipLogin}
      _authComponent={{ swPath: "/modules/calendar" }}
    />
  );
}

export default App;
