import React from "react";
import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import { DEFAULT_THEME } from "@shiksha/common-lib";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionBank from "pages/QuestionBank";

export default function App() {
  const theme = extendTheme(DEFAULT_THEME);
  return (
    <NativeBaseProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<QuestionBank />} />
        </Routes>
      </Router>
    </NativeBaseProvider>
  );
}
