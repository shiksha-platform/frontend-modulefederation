import React, { Suspense } from "react";

import "./App.css";
import { AppShell } from "@shiksha/common-lib";
import Sample from "pages/Sample";

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
  const LoginComponent = React.lazy(() => import("core/Login"));

  return <AppShell AuthComponent={LoginComponent} />;
}

export default App;
