import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import { DEFAULT_THEME } from "@shiksha/common-lib";
import Attendance from "pages/Attendance";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  return (
    <NativeBaseProvider theme={theme}>
      <Suspense fallback="Loadng...">
        <Router>
          <Routes>
            <Route path="my-attendace" element={<Attendance />} />
            <Route path="my-attendace/:classId" element={<Attendance />} />

            <Route path="*" element={<Attendance />} />
          </Routes>
        </Router>
      </Suspense>
    </NativeBaseProvider>
  );
}

export default App;
