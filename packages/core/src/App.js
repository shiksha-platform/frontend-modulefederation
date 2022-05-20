import React, { Suspense } from "react";
import "./App.css";
import Login from "pages/Login";
import { extendTheme, NativeBaseProvider } from "native-base";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppShell, DEFAULT_THEME } from "@shiksha/common-lib";

import { initializeI18n } from "@shiksha/common-lib";
initializeI18n(["translation", "core"]);

const theme = extendTheme(DEFAULT_THEME);

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </NativeBaseProvider>
  );
}

export default App;
