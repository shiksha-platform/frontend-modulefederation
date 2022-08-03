import React from "react";

import "./App.css";
import { AppShell } from "@shiksha/common-lib";
import Myvisits from "./pages/Myvisits";
import Recommendedschools from "./pages/Recommended-schools";
import Allocatedschools from "./pages/Allocated-schools";

function App() {
  const routes = [
    {
      path: "/",
      component: Myvisits,
    },
    {
      path: "/visits/recommended-schools",
      component: Recommendedschools,
    },
    {
      path: "/visits/allocated-schools",
      component: Allocatedschools,
    },
    {
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
