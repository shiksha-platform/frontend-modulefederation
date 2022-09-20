import React from "react";
import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import ClassDetails from "./pages/ClassDetails";
import MyClassRoute from "pages/MyClassRoute";
import { navigationRoutes } from "services/routes";

initializeI18n(
  ["classes"],
  `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
);
function App() {
  const routes = [
    {
      moduleName: "classes",
      path: navigationRoutes.myClasses,
      component: ClassDetails,
    },
    {
      moduleName: "classes",
      path: navigationRoutes.fourOfour,
      component: MyClassRoute,
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
      _authComponent={{ swPath: "/modules/classes" }}
    />
  );
}

export default App;
