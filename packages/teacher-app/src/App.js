import React from "react";
import "./App.css";
import { extendTheme } from "native-base";
import {
  DEFAULT_THEME,
  initializeI18n,
  Loding,
  AppShell,
  capturePage,
} from "@shiksha/common-lib";
import MyClasses from "pages/MyClasses";
import Home from "./pages/Home";

//TODO: separate out the theme related code from App
initializeI18n(["translation", "core", "attendance"]);

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  const ClassDetails = React.lazy(() => import("classes/ClassDetails"));
  const Attendance = React.lazy(() => import("attendance/Attendance"));
  const Report = React.lazy(() => import("attendance/Report"));
  const ReportDetail = React.lazy(() => import("attendance/ReportDetail"));
  const CompareReport = React.lazy(() => import("attendance/CompareReport"));
  const SendSMS = React.lazy(() => import("attendance/SendSMS"));
  const MessageHistory = React.lazy(() => import("attendance/MessageHistory"));
  const QuestionBank = React.lazy(() => import("worksheet/QuestionBank"));
  const Student = React.lazy(() => import("students/Student"));
  const StudentDetails = React.lazy(() => import("students/StudentDetails"));
  capturePage();
  const routes = [
    {
      path: "worksheet",
      component: QuestionBank,
    },
    {
      path: "classes",
      component: MyClasses,
    },
    {
      path: "/classes/:classId",
      component: ClassDetails,
    },
    { path: "/class/students/:classId", component: Student },
    { path: "/attendance/:classId", component: Attendance },
    { path: "/attendance/report", component: Report },
    { path: "/class/students/:classId", component: Student },
    {
      path: "/attendance/report/:classId/:view",
      component: ReportDetail,
    },
    {
      path: "/attendance/reportCompare/:classId",
      component: CompareReport,
    },
    {
      path: "/students/sendSms/:studentId",
      component: MessageHistory,
    },
    { path: "/attendance/sendSms/:classId", component: SendSMS },
    { path: "/students/:studentId", component: StudentDetails },
    { path: "*", component: Home },
  ];

  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      theme={theme}
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      isShowFooterLink={true}
      appName="Teacher App"
    />
  );
}
export default App;
