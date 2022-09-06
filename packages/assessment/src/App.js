import React from "react";
import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import Assessment from "pages";
import ExamScores from "./pages/ExamScores";
import SuccessPublicationReport from "./components/SpotAssessment/successPublicationReport";
import ReportDetails from "./components/SpotAssessment/ReportDetails";
import SpotAssessmentResult from "./components/SpotAssessment/SpotAssessmentResult";
import SpotAssessmentResult2 from "./components/SpotAssessment/SpotAssessmentResult2";
import SpotAssessmentResult3 from "./components/SpotAssessment/SpotAssessmentResult3";
import QumlTest from "./pages/QumlTest";
import QuestionList2 from "./components/ExamScores/QuestionLIst2";
import QuestionList3 from "./components/ExamScores/QuestionLIst3";
import QuestionList4 from "./components/ExamScores/QuestionLIst4";
import QuestionList5 from "./components/ExamScores/QuestionLIst5";
import QuestionList6 from "./components/ExamScores/QuestionLIst6";
import QuestionList7 from "./components/ExamScores/QuestionLIst7";
import PastAssessments from "./pages/PastAssessments";
import PastExaminationsList from "./pages/PastExaminations";
import AssessmentGiven from "pages/AssessmentGiven";
import StudentReport from "pages/StudentReport";

function App() {
  initializeI18n(
    ["assessment"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      moduleName: "assessment",
      path: "/assessment/exam-list2",
      component: QuestionList2,
    },
    {
      moduleName: "assessment",
      path: "/assessment/exam-list3",
      component: QuestionList3,
    },
    {
      moduleName: "assessment",
      path: "/assessment/exam-list4",
      component: QuestionList4,
    },
    {
      moduleName: "assessment",
      path: "/assessment/exam-list5",
      component: QuestionList5,
    },
    {
      moduleName: "assessment",
      path: "/assessment/exam-list6",
      component: QuestionList6,
    },
    {
      moduleName: "assessment",
      path: "/assessment/exam-list7",
      component: QuestionList7,
    },
    {
      moduleName: "assessment",
      path: "/assessment/examscores",
      component: ExamScores,
    },
    {
      moduleName: "assessment",
      path: "/assessment/assessment-result",
      component: SpotAssessmentResult,
    },
    {
      moduleName: "assessment",
      path: "/assessment/assessment-result2",
      component: SpotAssessmentResult2,
    },
    {
      moduleName: "assessment",
      path: "/assessment/assessment-result3",
      component: SpotAssessmentResult3,
    },
    {
      moduleName: "assessment",
      path: "/assessment/assessment-detailed-report/:classId/:subject",
      component: ReportDetails,
    },
    {
      moduleName: "assessment",
      path: "/assessment/assessment-detailed-report/:classId/:subject/:date",
      component: ReportDetails,
    },
    {
      moduleName: "assessment",
      path: "/assessment/past-assessments/:classId/:subject",
      component: PastAssessments,
    },
    {
      moduleName: "assessment",
      path: "/assessment/past-examinations",
      component: PastExaminationsList,
    },
    {
      moduleName: "assessment",
      path: "/assessment/quml-test",
      component: QumlTest,
    },
    {
      moduleName: "assessment",
      path: "/assessment/given/:classId/:subject",
      component: AssessmentGiven,
    },
    {
      moduleName: "assessment",
      path: "/assessment/student-report/:classId/:subject/:date",
      component: StudentReport,
    },
    {
      moduleName: "assessment",
      path: "/",
      component: Assessment,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));
  const skipLogin = !(
    process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false
  );

  return (
    <AppShell
      routes={routes}
      AuthComponent={LoginComponent}
      basename={process.env.PUBLIC_URL}
      skipLogin={skipLogin}
      _authComponent={{ swPath: "/modules/assessment" }}
    />
  );
}

export default App;
