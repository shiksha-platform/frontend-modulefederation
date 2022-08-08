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
      path: navigationRoutes.myClasses,
      component: ClassDetails,
    },
    {
      path: navigationRoutes.fourOfour,
      component: MyClassRoute,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      _authComponent={{ swPath: "/modules/classes" }}
    />
  );
}

export default App;
