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
    {
      moduleName: "notification",
      path: "/notification",
      component: Notification,
    },
    {
      moduleName: "notification",
      path: "/notification/create",
      component: CreateNotification,
    },
    {
      moduleName: "notification",
      path: "/notification/schedule",
      component: ScheduleNotification,
    },
    {
      moduleName: "notification",
      path: "/notification/outbox",
      component: Outbox,
    },
    { moduleName: "notification", path: "*", component: Notification },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      routes={routes}
      AuthComponent={LoginComponent}
      appName="notification"
      _authComponent={{ swPath: "/modules/notification" }}
    />
  );
}

export default App;
