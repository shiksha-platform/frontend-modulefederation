import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import { DEFAULT_THEME, initializeI18n } from "@shiksha/common-lib";
import ClassDetails from "./pages/ClassDetails";
import MyClassRoute from "pages/MyClassRoute";
import { navigationRoutes } from "services/routes";

initializeI18n(
  ["classes"],
  `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
);
function App() {
  const theme = extendTheme(DEFAULT_THEME);
  return (
    <NativeBaseProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={navigationRoutes.myClasses} element={<ClassDetails />} />
          <Route path={navigationRoutes.fourOfour} element={<MyClassRoute />} />
        </Routes>
      </Router>
    </NativeBaseProvider>
  );
}

export default App;
