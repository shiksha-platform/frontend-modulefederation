import React  from "react";
import "./App.css";
import { extendTheme } from "native-base";
import { DEFAULT_THEME, AppShell, initializeI18n } from "@shiksha/common-lib";
import Assessment from "pages";
import ExamScores from "./pages/ExamScores";
import SuccessPublicationReport from "./components/SpotAssessment/successPublicationReport";
import ReportDetails from "./components/SpotAssessment/ReportDetails";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  /*initializeI18n(
    ["assessment"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );*/
  const routes = [
    {
      path: "/examscores",
      component: ExamScores,
    },
    {
      path: "/assessment-success",
      component: SuccessPublicationReport,
    },
    {
      path: "/detailed-report",
      component: ReportDetails,
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
