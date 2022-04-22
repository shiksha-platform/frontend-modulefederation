import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import { DEFAULT_THEME, AppShell } from "@shiksha/common-lib";
import Attendance from "pages/Attendance";
import Report from "pages/reports/Report";
import ReportDetail from "pages/reports/ReportDetail";
import CompareReport from "pages/reports/CompareReport";
import MessageHistory from "pages/sms/MessageHistory";
import SendSMS from "pages/sms/SendSMS";
import { navigationRoute } from "./services/routes";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
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
      path: navigationRoute.reportCompare,
      component: CompareReport,
    },
    {
      path: navigationRoute.sendSms,
      component: SendSMS,
    },
    {
      path: navigationRoute.sendSmsStudentId,
      component: MessageHistory,
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
    />
  );
}

export default App;
