import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import Home from "./pages/Home";
import init from "lang/init";

import manifest from "./manifest.json";
import { DEFAULT_THEME, eventBus, initializeI18n } from "@shiksha/common-lib";

//TODO: separate out the theme related code from App



initializeI18n(['translation','core', 'attendance']);

const theme = extendTheme(DEFAULT_THEME);

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    const subscription = eventBus.subscribe("AUTH", (data, envelop) => {
      console.log(envelop);
      if ((data.eventType = "LOGIN_SUCCESS")) {
        setToken(sessionStorage.getItem("token"));
      }
    });
    return () => {
      eventBus.unsubscribe(subscription);
    };
  }, [token]);
  if (!token) {
    const LoginComponent = React.lazy(() => import("core/Login"));
    return (
      <NativeBaseProvider theme={theme}>
        <React.Suspense fallback="Loading ">
          <LoginComponent />
        </React.Suspense>
      </NativeBaseProvider>
    );
  } else {
    const MyClasses = React.lazy(() => import("core/MyClasses"));
    const ClassDetails = React.lazy(() => import("core/ClassDetails"));
    const Attendance = React.lazy(() => import("attendance/Attendance"));
    const QuestionBank = React.lazy(() => import("worksheet/QuestionBank"));

    return (
      <NativeBaseProvider theme={theme}>
        <React.Suspense fallback="Loading ">
          <Router>
            <Routes>
              <Route path="worksheet" element={<QuestionBank />} />
              <Route path="classes" element={<MyClasses />} />
              <Route path="/classes/:classId" element={<ClassDetails />} />
              <Route path="/attendance/:classId" element={<Attendance />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Router>
        </React.Suspense>
      </NativeBaseProvider>
    );
  }
}
export default App;
