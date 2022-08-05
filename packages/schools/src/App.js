import React from "react";

import "./App.css";
import { AppShell } from "@shiksha/common-lib";
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
  const routes = [
    {
      moduleName: "schools",
      path: "/schools/new-visit",
      component: NewVisitPage,
    },
    {
      moduleName: "schools",
      path: "/schools/visit-submit",
      component: VisitSubmit,
    },
    {
      moduleName: "schools",
      path: "/schools/teacher-visit-report",
      component: TeacherVisitReport,
    },
    {
      moduleName: "schools",
      path: "/schools/assessment-report",
      component: AssessmentReportDashboard,
    },
    {
      moduleName: "schools",
      path: "/schools/assessment-section-report",
      component: AssessmentSectionWiseReport,
    },
    {
      moduleName: "schools",
      path: "/schools/assessment-detailed-report",
      component: AssessmentDetailedReport,
    },
    {
      moduleName: "schools",
      path: "/schools/attendance-report",
      component: AttendanceReportDashboard,
    },
    {
      moduleName: "schools",
      path: "/schools/attendance-section-report",
      component: AttendanceSectionWiseReport,
    },
    {
      moduleName: "schools",
      path: "/schools/attendance-detailed-report",
      component: AttendanceDetailedReport,
    },
    {
      moduleName: "schools",
      path: "schools/my-visits",
      component: Myvisitspage,
    },
    {
      moduleName: "schools",
      path: "/schools/school-profile",
      component: SchoolProfile,
    },
    ,
    {
      moduleName: "schools",
      path: "/schools/teacher-details",
      component: TeacherDetails,
    },
    {
      moduleName: "schools",
      path: "/schools/teacher-attendance-report",
      component: TeacherAttendanceReport,
    },
    {
      moduleName: "schools",
      path: "schools/questionnaire",
      component: Question,
    },
    {
      moduleName: "schools",
      path: "*",
      component: SchoolProfile,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      routes={routes}
      AuthComponent={LoginComponent}
      appName="schools"
      basename={process.env.PUBLIC_URL}
    />
  );
}

export default App;
