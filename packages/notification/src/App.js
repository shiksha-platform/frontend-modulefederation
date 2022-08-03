import React, { Suspense } from "react";
import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import Notification from "./pages/Notification";
import CreateNotification from "./pages/CreateNotification";
import Outbox from "./pages/Outbox";
import ScheduleNotification from "./pages/ScheduleNotification";

function App() {
  initializeI18n(
    ["notification"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    { path: "/notification", component: Notification },
    { path: "/notification/create", component: CreateNotification },
    { path: "/notification/schedule", component: ScheduleNotification },
    { path: "/notification/outbox", component: Outbox },
    { path: "*", component: Notification },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      routes={routes}
      AuthComponent={LoginComponent}
      _authComponent={{ swPath: "/modules/notification" }}
    />
  );
}

export default App;
