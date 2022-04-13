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

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  const routes = [
    {
      path: "attendance",
      component: Attendance,
    },
    {
      path: "attendance/report",
      component: Report,
    },
    {
      path: "attendance/report/:classId/:view",
      component: ReportDetail,
    },
    {
      path: "attendance/reportCompare/:classId",
      component: CompareReport,
    },
    {
      path: "students/sendSms/:studentId",
      component: SendSMS,
    },
    {
      path: "attendance/sendSms/:studentId",
      component: MessageHistory,
    },
    {
      path: "*",
      component: Attendance,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell theme={theme} basename={process.env.PUBLIC_URL} routes={routes} AuthComponent={LoginComponent} />
  );
}

export default App;
