import React from "react";
import "./App.css";
import { extendTheme } from "native-base";
import { DEFAULT_THEME, AppShell, initializeI18n } from "@shiksha/common-lib";
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

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  /*initializeI18n(
    ["assessment"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );*/
  const routes = [
    {
      path: "/exam-list2",
      component: QuestionList2,
    },
    {
      path: "/exam-list3",
      component: QuestionList3,
    },
    {
      path: "/exam-list4",
      component: QuestionList4,
    },
    {
      path: "/exam-list5",
      component: QuestionList5,
    },
    {
      path: "/exam-list6",
      component: QuestionList6,
    },
    {
      path: "/exam-list7",
      component: QuestionList7,
    },
    {
      path: "/examscores",
      component: ExamScores,
    },
    {
      path: "/assessment-result",
      component: SpotAssessmentResult,
    },
    {
      path: "/assessment-result2",
      component: SpotAssessmentResult2,
    },
    {
      path: "/assessment-result3",
      component: SpotAssessmentResult3,
    },
    {
      path: "/assessment-success",
      component: SuccessPublicationReport,
    },
    {
      path: "/assessment-detailed-report",
      component: ReportDetails,
    },
    {
      path: "/quml-test",
      component: QumlTest,
    },
    {
      path: "/",
      component: Assessment,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell theme={theme} routes={routes} AuthComponent={LoginComponent} />
  );
}

export default App;
