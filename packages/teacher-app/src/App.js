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
import MyClasses from "pages/MyClasses";

//TODO: separate out the theme related code from App

initializeI18n(["translation", "core", "attendance"]);

const theme = extendTheme(DEFAULT_THEME);

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const subscription = eventBus.subscribe("AUTH", (data, envelop) => {
      console.log(envelop);
      if ((data.eventType = "LOGIN_SUCCESS")) {
        setToken(localStorage.getItem("token"));
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
    const ClassDetails = React.lazy(() => import("classes/ClassDetails"));
    const Attendance = React.lazy(() => import("attendance/Attendance"));
    const Report = React.lazy(() => import("attendance/Report"));
    const ReportDetail = React.lazy(() => import("attendance/ReportDetail"));
    const CompareReport = React.lazy(() => import("attendance/CompareReport"));
    const QuestionBank = React.lazy(() => import("worksheet/QuestionBank"));
    const Student = React.lazy(() => import("students/Student"));
    const StudentDetails = React.lazy(() => import("students/StudentDetails"));

    return (
      <NativeBaseProvider theme={theme}>
        <React.Suspense fallback="Loading ">
          <Router>
            <Routes>
              <Route path="worksheet" element={<QuestionBank />} />
              <Route path="classes" element={<MyClasses />} />
              <Route path="/classes/:classId" element={<ClassDetails />} />
              <Route path="/class/students/:classId" element={<Student />} />
              <Route path="/attendance/:classId" element={<Attendance />} />
              <Route path="/attendance/report" element={<Report />} />
              <Route
                path="/attendance/report/:classId/:view"
                element={<ReportDetail />}
              />
              <Route
                path="/attendance/reportCompare/:classId"
                element={<CompareReport />}
              />
              <Route path="/students/:studentId" element={<StudentDetails />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Router>
        </React.Suspense>
      </NativeBaseProvider>
    );
  }
}
export default App;
