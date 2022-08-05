import React, { Suspense } from "react";
import "./App.css";
import Login from "pages/Login";
import { AppShell } from "@shiksha/common-lib";

import { initializeI18n } from "@shiksha/common-lib";
import Sample from "pages/Sample";

initializeI18n(["translation", "core"]);
console.log("hello");
function App() {
  const routes = [
    {
      path: "/",
      component: Sample,
    },
    {
      path: "*",
      component: Sample,
    },
  ];
  return <AppShell AuthComponent={Login} />;
}

export default App;
