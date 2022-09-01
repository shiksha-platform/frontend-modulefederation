import React from "react";

import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import TimeTableRoute from "pages/TimeTableRoute";
import { navigationRoute } from "services/routes";

function App() {
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

  return (
    <AppShell
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      _authComponent={{ swPath: "/modules/calendar" }}
    />
  );
}

export default App;
