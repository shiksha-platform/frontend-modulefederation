import React, { Suspense } from "react";
import "./App.css";
import Login from "pages/Login";
import { extendTheme, NativeBaseProvider } from "native-base";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppShell, DEFAULT_THEME } from "@shiksha/common-lib";

import { initializeI18n } from "@shiksha/common-lib";

import {Helmet} from "react-helmet";
initializeI18n(["translation", "core"]);

const theme = extendTheme(DEFAULT_THEME);

function App() {
  return (
    <NativeBaseProvider theme={theme}>
    <Helmet>
        <meta charSet="utf-8" />
        <title>My Title</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Shiksha" />
    </Helmet>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
      </Router>
    </NativeBaseProvider>
  );
}

export default App;
