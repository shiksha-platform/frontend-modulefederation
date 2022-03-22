import React, { Suspense } from "react";
import "./App.css";
import Login from "pages/Login";
import { extendTheme, NativeBaseProvider } from "native-base";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyClasses from "pages/myclasses/MyClasses";
import ClassDetails from "pages/myclasses/ClassDetails";
import { AppShell, DEFAULT_THEME } from "@shiksha/common-lib";

import {initializeI18n}  from '@shiksha/common-lib';

initializeI18n(['translation','core']);

const theme = extendTheme(DEFAULT_THEME);
 

function App() {
  const routes  = [
    {
      path: "my-classes",
      component: MyClasses
    },
    {
      path: "my-classes/:classId",
      component: ClassDetails
    },
    {
      path: "*",
      component: MyClasses
    }
  ]
  return (
    <AppShell theme={theme} routes={routes} AuthComponent={Login}/>
  );
}

export default App;
