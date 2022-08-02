import React from "react";

import "./App.css";
import { extendTheme } from "native-base";
import { DEFAULT_THEME, AppShell } from "@shiksha/common-lib";
import SchoolProfile from "pages/SchoolProfile";
import Myvisitspage from "pages/MyVisitsPage";
import AttendanceReportDashboard from "pages/reports/AttendanceReportDashboard";
import AttendanceSectionWiseReport from "pages/reports/AttendanceSectionWiseReport";
import AttendanceDetailedReport from "pages/reports/AttendanceDetailedReport";
import AssessmentReportDashboard from "pages/reports/AssessmentReportDashboard";
import AssessmentSectionWiseReport from "pages/reports/AssessmentSectionWiseReport";
import AssessmentDetailedReport from "pages/reports/AssessmentDetailedReport";
import TeacherDetails from "pages/TeacherDetails";
import TeacherAttendanceReport from "pages/TeacherAttendanceReport";
import NewVisitPage from "pages/visit/NewVisitPage";
import VisitSubmit from "pages/visit/VisitSubmit";
import TeacherVisitReport from "pages/TeacherVisitReport";
import Question from "pages/Question";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  const routes = [
    {
      path: "/schools/new-visit",
      component: NewVisitPage,
    },
    {
      path: "/schools/visit-submit",
      component: VisitSubmit,
    },
    {
      path: "/schools/teacher-visit-report",
      component: TeacherVisitReport,
    },
    {
      path: "/schools/assessment-report",
      component: AssessmentReportDashboard,
    },
    {
      path: "/schools/assessment-section-report",
      component: AssessmentSectionWiseReport,
    },
    {
      path: "/schools/assessment-detailed-report",
      component: AssessmentDetailedReport,
    },
    {
      path: "/schools/attendance-report",
      component: AttendanceReportDashboard,
    },
    {
      path: "/schools/attendance-section-report",
      component: AttendanceSectionWiseReport,
    },
    {
      path: "/schools/attendance-detailed-report",
      component: AttendanceDetailedReport,
    },
    {
      path: "schools/my-visits",
      component: Myvisitspage,
    },
    {
      path: "/schools/school-profile",
      component: SchoolProfile,
    },
    ,
    {
      path: "/schools/teacher-details",
      component: TeacherDetails,
    },
    {
      path: "/schools/teacher-attendance-report",
      component: TeacherAttendanceReport,
    },
    {
      path: "schools/questionnaire",
      component: Question,
    },
    {
      path: "*",
      component: SchoolProfile,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      theme={theme}
      routes={routes}
      AuthComponent={LoginComponent}
      basename={process.env.PUBLIC_URL}
    />
  );
}

export default App;
