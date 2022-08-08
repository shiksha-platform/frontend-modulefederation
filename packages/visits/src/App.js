import React from "react";

import "./App.css";
import { AppShell } from "@shiksha/common-lib";
import Myvisits from "./pages/Myvisits";
import Recommendedschools from "./pages/Recommended-schools";
import Allocatedschools from "./pages/Allocated-schools";

function App() {
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
      path: "*",
      component: Myvisits,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      routes={routes}
      AuthComponent={LoginComponent}
      basename={process.env.PUBLIC_URL}
    />
  );
}

export default App;
