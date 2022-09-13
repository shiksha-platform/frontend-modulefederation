import React from "react";

import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import SchoolProfile from "pages/SchoolProfile";
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
import AllTeachers from "pages/AllTeachers";

function App() {
  initializeI18n(
    ["schools"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const ReportDetails = React.lazy(() => import("assessment/ReportDetails"));

  const routes = [
    {
      moduleName: "schools",
      path: "/schools/new-visit/:schoolId",
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
      path: "/schools/assessment-report/:classId",
      component: AssessmentReportDashboard,
    },
    {
      moduleName: "schools",
      path: "/schools/assessment-section-report/:classId/:subject/:date",
      component: ReportDetails,
    },
    {
      moduleName: "schools",
      path: "/schools/assessment-detailed-report",
      component: AssessmentDetailedReport,
    },
    {
      moduleName: "schools",
      path: "/schools/attendance-report/:parentId",
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
      path: "/schools/teachers/:schoolId",
      component: AllTeachers,
    },
    {
      moduleName: "schools",
      path: "/schools/school-profile",
      component: SchoolProfile,
    },
    ,
    {
      moduleName: "schools",
      path: "/schools/teacher-details/:teacherId",
      component: TeacherDetails,
    },
    {
      moduleName: "schools",
      path: "/schools/teacher-attendance-report/:teacherId",
      component: TeacherAttendanceReport,
    },
    {
      moduleName: "schools",
      path: "schools/questionnaire",
      component: Question,
    },
    {
      moduleName: "schools",
      path: "/",
      component: SchoolProfile,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      routes={routes}
      AuthComponent={LoginComponent}
      basename={process.env.PUBLIC_URL}
    />
  );
}

export default App;
