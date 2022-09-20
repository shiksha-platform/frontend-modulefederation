import React from "react";

import "./App.css";
import { AppShell } from "@shiksha/common-lib";
import Sample from "pages/Sample";

function App() {
  const routes = [
    {
      moduleName: "module-template",
      path: "/",
      component: Sample,
    },
    {
      moduleName: "module-template",
      path: "/",
      component: Sample,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return <AppShell routes={routes} AuthComponent={LoginComponent} />;
}

export default App;
