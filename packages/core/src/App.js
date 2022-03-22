import React, { Suspense } from "react";
import "./App.css";
import Login from "pages/Login";
import { extendTheme, NativeBaseProvider } from "native-base";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyClasses from "pages/myclasses/MyClasses";
import ClassDetails from "pages/myclasses/ClassDetails";
import { DEFAULT_THEME } from "@shiksha/common-lib";

import {initializeI18n}  from '@shiksha/common-lib';

initializeI18n(['translation','core']);

const theme = extendTheme(DEFAULT_THEME);
 

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Suspense fallback="loadng...">
        <Router>
          <Routes>
            <Route path="my-classes" element={<MyClasses />} />
            <Route path="my-classes/:classId" element={<ClassDetails />} />

            <Route path="*" element={<Login />} />
          </Routes>
        </Router>
        </Suspense> 
    </NativeBaseProvider>
  );
}

export default App;
