import React from "react";
import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import Attendance from "pages/Attendance";
import Report from "pages/reports/Report";
import ReportDetail from "pages/reports/ReportDetail";
import SendSMS from "pages/sms/SendSMS";
import { navigationRoute } from "./services/routes";

function App() {
  initializeI18n(
    ["attendance"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      moduleName: "attendance",
      path: navigationRoute.attendance,
      component: Attendance,
    },
    {
      moduleName: "attendance",
      path: navigationRoute.report,
      component: Report,
    },
    {
      moduleName: "attendance",
      path: navigationRoute.attendanceReport,
      component: ReportDetail,
    },
    {
      moduleName: "attendance",
      path: navigationRoute.sendSms,
      component: SendSMS,
    },
    {
      moduleName: "attendance",
      path: navigationRoute.fourOfour,
      component: Attendance,
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
      _authComponent={{ swPath: "/modules/attendance" }}
    />
  );
}

export default App;
