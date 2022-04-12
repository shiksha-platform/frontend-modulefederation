import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import { DEFAULT_THEME } from "@shiksha/common-lib";
import TimeTableRoute from "pages/TimeTableRoute";
import { navigationRoute } from "services/routes";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  return (
    <NativeBaseProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path={navigationRoute.fourOfour}
            element={<TimeTableRoute />}
          />
        </Routes>
      </Router>
    </NativeBaseProvider>
  );
}

export default App;
