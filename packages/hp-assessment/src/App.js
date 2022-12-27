import React from "react";

import "./App.css";
import { AppShell } from "@shiksha/common-lib";
import AllocatedSchools from "./pages/AllocatedSchools";
import SchoolProfile from "./pages/SchoolProfile";
import ClassDetails from "./pages/ClassDetails";
import StudentsListPage from "./pages/StudentsList";
import OralAssessmentSuccessPage from "./pages/OralAssessmentSuccessPage";
import FinalAssessmentSuccessPage from "./pages/FinalAssessmentSuccessPage";
import FinalAssessmentSuccessPage2 from "./pages/FinalAssessmentSuccessPage2";
import SchoolReport from "./pages/SchoolReport";
import SchoolNipunCertificate from "./pages/SchoolNipunCertificate";
import QumlTest from "./pages/QumlTest";
import ReadAlongInstruction from "./pages/read-along/Instruction";
import NotInstalledError from "./pages/read-along/NotInstalledError";

function App() {
  const routes = [
    {
      moduleName: "hpAssessment",
      path: "/hpAssessment/read-along-instruction",
      component: ReadAlongInstruction,
    },
    {
      moduleName: "hpAssessment",
      path: "/hpAssessment/read-along-not-installed",
      component: NotInstalledError,
    },
    {
      moduleName: "hpAssessment",
      path: "/hpAssessment/school-nipun-certificate",
      component: SchoolNipunCertificate,
    },
    {
      moduleName: "hpAssessment",
      path: "/hpAssessment/school-report",
      component: SchoolReport,
    },
    {
      moduleName: "hpAssessment",
      path: "/hpAssessment/final-assessment-success",
      component: FinalAssessmentSuccessPage,
    },
    {
      moduleName: "hpAssessment",
      path: "/hpAssessment/final-assessment-success2",
      component: FinalAssessmentSuccessPage2,
    },
    {
      moduleName: "hpAssessment",
      path: "/hpAssessment/quml-test",
      component: QumlTest,
    },
    {
      moduleName: "hpAssessment",
      path: "/hpAssessment/oral-assessment-success",
      component: OralAssessmentSuccessPage,
    },
    {
      moduleName: "hpAssessment",
      path: "/hpAssessment/student-list",
      component: StudentsListPage,
    },
    {
      moduleName: "hpAssessment",
      path: "/hpAssessment/class-details",
      component: ClassDetails,
    },
    {
      moduleName: "hpAssessment",
      path: "/hpAssessment/school-profile",
      component: SchoolProfile,
    },
    {
      moduleName: "hpAssessment",
      path: "/",
      component: AllocatedSchools,
    },
    {
      moduleName: "hpAssessment",
      path: "*",
      component: AllocatedSchools,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      basename={process.env.PUBLIC_URL}
      routes={routes}
    // AuthComponent={LoginComponent}
    />
  );
}

export default App;
