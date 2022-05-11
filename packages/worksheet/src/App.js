import React from "react";
import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import { DEFAULT_THEME, initializeI18n } from "@shiksha/common-lib";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionBank from "pages/QuestionBank";
import ViewWorksheet from "pages/ViewWorksheet";

// initializeI18n(
//   ["worksheet"],
//   `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
// );

export default function App() {
  const theme = extendTheme(DEFAULT_THEME);
  return (
    <NativeBaseProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<QuestionBank />} />
          <Route path="/viewworksheets" element={<ViewWorksheet />} />
        </Routes>
      </Router>
    </NativeBaseProvider>
  );
}
