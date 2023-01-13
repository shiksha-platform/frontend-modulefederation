import React from "react";
import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import Teaching from "pages/Teaching";
import TeachingDetail from "pages/TeachingDetail";
import WorksheetQuestionBank from "pages/WorksheetQuestionBank";
import CreateWorksheet from "pages/CreateWorksheet";
import EditWorksheet from "pages/EditWorksheet";
import WorksheetTemplate from "pages/WorksheetTemplate";
import Worksheet from "./pages/Worksheet";
import WorksheetShare from "./pages/WorksheetShare";

function App() {
  initializeI18n(
    ["worksheet"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      moduleName: "worksheet",
      path: "/worksheet/list/:state",
      component: Worksheet,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/list",
      component: Worksheet,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/:classId/:subject",
      component: TeachingDetail,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/:worksheetId/share",
      component: WorksheetShare,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/:id",
      component: WorksheetQuestionBank,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/:id/edit",
      component: EditWorksheet,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/create",
      component: CreateWorksheet,
    },
    {
      moduleName: "worksheet",
      path: "/worksheet/template/:worksheetId",
      component: WorksheetTemplate,
    },
    {
      moduleName: "worksheet",
      path: "/",
      component: Teaching,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));
  const skipLogin = !(
    process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false
  );

  return (
    <AppShell
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      skipLogin={skipLogin}
      _authComponent={{ swPath: "/modules/worksheet" }}
    />
  );
}

export default App;
