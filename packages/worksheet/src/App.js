import React from "react";
import "./App.css";
import { extendTheme } from "native-base";
import { DEFAULT_THEME, AppShell, initializeI18n } from "@shiksha/common-lib";
import QuestionBank from "pages/QuestionBank";
import Teaching from "pages/Teaching";
import TeachingDetail from "pages/TeachingDetail";
import WorksheetQuestionBank from "pages/WorksheetQuestionBank";
import CreateWorksheet from "pages/CreateWorksheet";
import EditWorksheet from "pages/EditWorksheet";
import WorksheetTemplate from "pages/WorksheetTemplate";
import Worksheet from "./pages/Worksheet";
import WorksheetShare from "./pages/WorksheetShare";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  initializeI18n(
    ["worksheet"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      path: "/worksheet/list/:state",
      component: Worksheet,
    },
    {
      path: "/worksheet/list",
      component: Worksheet,
    },
    {
      path: "/worksheet/:classId/view",
      component: TeachingDetail,
    },
    {
      path: "/worksheet/:worksheetId/share",
      component: WorksheetShare,
    },
    {
      path: "/worksheet/questionBank",
      component: QuestionBank,
    },
    {
      path: "/worksheet/:id",
      component: WorksheetQuestionBank,
    },
    {
      path: "/worksheet/:id/edit",
      component: EditWorksheet,
    },
    {
      path: "/worksheet/create",
      component: CreateWorksheet,
    },
    {
      path: "/worksheet/template",
      component: WorksheetTemplate,
    },
    {
      path: "*",
      component: Teaching,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      theme={theme}
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      _authComponent={{ swPath: "/modules/worksheet" }}
    />
  );
}

export default App;
