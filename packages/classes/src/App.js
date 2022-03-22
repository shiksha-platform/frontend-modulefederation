import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import {DEFAULT_THEME} from '@shiksha/common-lib';
import MyClasses from "./pages/MyClasses";
import ClassDetails from "./pages/ClassDetails";

function App() {
  const theme = extendTheme(DEFAULT_THEME);
  return (
    <NativeBaseProvider theme={theme}>
      
        <Router>
          <Routes>
            <Route path="my-classes" element={<MyClasses />} />
            <Route path="my-classes/:classId" element={<ClassDetails />} />
            <Route path="*" element={<MyClasses/>} />
          </Routes>
        </Router>
      
    </NativeBaseProvider>
  );
}

export default App;
