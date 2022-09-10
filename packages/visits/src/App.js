import React from "react";

import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import Myvisits from "pages/Myvisits";
import Recommendedschools from "pages/Recommended-schools";
import Allocatedschools from "pages/Allocated-schools";

function App() {
  initializeI18n(
    ["visits"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      moduleName: "visits",
      path: "/",
      component: Myvisits,
    },
    {
      moduleName: "visits",
      path: "/visits/recommended-schools",
      component: Recommendedschools,
    },
    {
      moduleName: "visits",
      path: "/visits/allocated-schools",
      component: Allocatedschools,
    },
    {
      moduleName: "visits",
      path: "/",
      component: Myvisits,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      routes={routes}
      AuthComponent={LoginComponent}
      basename={process.env.PUBLIC_URL}
      _authComponent={{ swPath: "/modules/visits" }}
    />
  );
}

export default App;
