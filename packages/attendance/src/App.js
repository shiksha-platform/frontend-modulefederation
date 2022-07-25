import React from "react";
import "./App.css";
import { extendTheme } from "native-base";
import { DEFAULT_THEME, AppShell, initializeI18n } from "@shiksha/common-lib";
import Attendance from "pages/Attendance";
import Report from "pages/reports/Report";
import ReportDetail from "pages/reports/ReportDetail";
import SendSMS from "pages/sms/SendSMS";
import { navigationRoute } from "./services/routes";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  initializeI18n(
    ["attendance"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      path: navigationRoute.attendance,
      component: Attendance,
    },
    {
      path: navigationRoute.report,
      component: Report,
    },
    {
      path: navigationRoute.attendanceReport,
      component: ReportDetail,
    },
    {
      path: navigationRoute.sendSms,
      component: SendSMS,
    },
    {
      path: navigationRoute.fourOfour,
      component: Attendance,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      theme={theme}
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      _authComponent={{ swPath: "/modules/attendance" }}
    />
  );
}

export default App;
