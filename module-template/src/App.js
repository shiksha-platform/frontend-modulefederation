import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import { DEFAULT_THEME, AppShell } from "@shiksha/common-lib";
import Sample from "pages/Sample";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
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

  return (
    <AppShell theme={theme} routes={routes} AuthComponent={LoginComponent} />
  );
}

export default App;
