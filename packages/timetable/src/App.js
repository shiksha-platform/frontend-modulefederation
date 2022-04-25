import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { extendTheme } from "native-base";
import { AppShell, DEFAULT_THEME } from "@shiksha/common-lib";
import TimeTableRoute from "pages/TimeTableRoute";
import { navigationRoute } from "services/routes";

function App() {
  const theme = extendTheme(DEFAULT_THEME);

  const routes = [
    {
      path: navigationRoute.fourOfour,
      component: TimeTableRoute,
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
