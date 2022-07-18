import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import { DEFAULT_THEME, AppShell, initializeI18n } from "@shiksha/common-lib";
import Announcements from "pages/Announcements";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  initializeI18n(
    ["announcements"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    {
      path: "announcements",
      component: Announcements,
    },
    {
      path: "*",
      component: Announcements,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      theme={theme}
      routes={routes}
      AuthComponent={LoginComponent}
      appName="announcements"
    />
  );
}

export default App;
