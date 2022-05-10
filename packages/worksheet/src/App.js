import React from "react";
import "./App.css";
import { extendTheme } from "native-base";
import { DEFAULT_THEME, AppShell, initializeI18n } from "@shiksha/common-lib";
import QuestionBank from "pages/QuestionBank";
import ViewWorksheet from "pages/ViewWorksheet";
import Teaching from "pages/Teaching";
import TeachingDetail from "pages/TeachingDetail";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  initializeI18n(
    ["worksheet"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      path: "/viewworksheets",
      component: ViewWorksheet,
    },
    {
      path: "/teaching/:id",
      component: TeachingDetail,
    },
    {
      path: "/questionBank",
      component: QuestionBank,
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
    />
  );
}

export default App;
