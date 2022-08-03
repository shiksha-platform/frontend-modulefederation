import React from "react";

import "./App.css";
import { extendTheme } from "native-base";
import { DEFAULT_THEME, AppShell } from "@shiksha/common-lib";
import Myvisits from "./pages/Myvisits";
import Recommendedschools from "./pages/Recommended-schools";
import Allocatedschools from "./pages/Allocated-schools";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
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
      theme={theme}
      routes={routes}
      AuthComponent={LoginComponent}
      basename={process.env.PUBLIC_URL}
    />
  );
}

export default App;
