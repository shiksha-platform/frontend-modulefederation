import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import { DEFAULT_THEME, AppShell } from "@shiksha/common-lib";
import AllocatedSchools from "./pages/AllocatedSchools";
import SchoolProfile from "./pages/SchoolProfile";
import ClassDetails from "./pages/ClassDetails";
import StudentsListPage from "./pages/StudentsList";
import OralAssessmentSuccessPage from "./pages/OralAssessmentSuccessPage";
import FinalAssessmentSuccessPage from "./pages/FinalAssessmentSuccessPage";
import FinalAssessmentSuccessPage2 from "./pages/FinalAssessmentSuccessPage2";
import SchoolReport from "./pages/SchoolReport";
import SchoolNipunCertificate from "./pages/SchoolNipunCertificate";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  const routes = [
    {
      path: "/school-nipun-certificate",
      component: SchoolNipunCertificate,
    },
    {
      path: "/school-report",
      component: SchoolReport,
    },
    {
      path: "/final-assessment-success",
      component: FinalAssessmentSuccessPage,
    },
    {
      path: "/final-assessment-success2",
      component: FinalAssessmentSuccessPage2,
    },
    {
      path: "/oral-assessment-success",
      component: OralAssessmentSuccessPage,
    },
    {
      path: "/student-list",
      component: StudentsListPage,
    },
    {
      path: "/class-details",
      component: ClassDetails,
    },
    {
      path: "/school-profile",
      component: SchoolProfile,
    },
    {
      path: "/",
      component: AllocatedSchools,
    },
    {
      path: "*",
      component: AllocatedSchools,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell theme={theme} routes={routes} AuthComponent={LoginComponent} />
  );
}

export default App;
