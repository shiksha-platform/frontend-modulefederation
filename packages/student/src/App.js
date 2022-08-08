import React from "react";
import "./App.css";
import { extendTheme } from "native-base";
import { DEFAULT_THEME, AppShell, initializeI18n } from "@shiksha/common-lib";
import StudentDetails from "./pages/StudentDetails";
import Student from "./pages/students";
import { navigationRoute } from "services/routes";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  initializeI18n(
    ["student"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      path: navigationRoute.student,
      component: Student,
    },
    {
      path: navigationRoute.studentDetails,
      component: StudentDetails,
    },
    {
      path: navigationRoute.fourOfour,
      component: Student,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));
  const skipLogin = !(
    process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false
  );

  return (
    <AppShell
      theme={theme}
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      skipLogin={skipLogin}
      _authComponent={{ swPath: "/modules/student" }}
    />
  );
}

export default App;
