import React, { Suspense } from "react";
import "./App.css";
import Login from "pages/Login";
import { AppShell } from "@shiksha/common-lib";

import { initializeI18n } from "@shiksha/common-lib";
import Sample from "pages/Sample";

initializeI18n(["translation", "core"]);
function App() {
  const routes = [
    {
      moduleName: "core",
      path: "/",
      component: Sample,
    },
    {
      moduleName: "core",
      path: "*",
      component: Sample,
    },
  ];
  return <AppShell AuthComponent={Login} />;
}

export default App;
