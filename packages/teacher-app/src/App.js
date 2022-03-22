import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import Home from "./pages/Home";
import init from "lang/init";

import manifest from "./manifest.json";
import { DEFAULT_THEME, eventBus } from "@shiksha/common-lib";

//TODO: separate out the theme related code from App
i18n.use(initReactI18next).init(init);

const maxWidth = manifest?.maxWidth ? manifest?.maxWidth : "414";
const fontFamily =
  localStorage.getItem("lang") === "hi" ? "'Baloo 2'" : "Inter";
const fontSize = localStorage.getItem("lang") === "hi" ? "20px" : "";

let red = {
  50: "#fef2f2",
  100: "#fde5e5",
  150: "#fcd7d7",
  200: "#fbcaca",
  250: "#fabdbd",
  300: "#f9b0b0",
  350: "#f8a3a3",
  400: "#f79595",
  450: "#f68888",
  500: "#f57b7b",
  550: "#dd6f6f",
  600: "#c46262",
  650: "#ac5656",
  700: "#934a4a",
  750: "#7b3e3e",
  800: "#623131",
  850: "#492525",
  900: "#311919",
  950: "#180c0c",
};

let green = {
  50: "#e7f4e8",
  100: "#cfe9d1",
  150: "#b6debb",
  200: "#9ed3a4",
  250: "#86c98d",
  300: "#6ebe76",
  350: "#56b35f",
  400: "#3da849",
  450: "#259d32",
  500: "#0d921b",
  550: "#0c8318",
  600: "#0a7516",
  650: "#096613",
  700: "#085810",
  750: "#07490e",
  800: "#053a0b",
  850: "#042c08",
  900: "#031d05",
  950: "#010f03",
};

const theme = extendTheme({
  fonts: {
    heading: fontFamily,
    body: fontFamily,
    mono: fontFamily,
  },
  components: {
    Text: {
      baseStyle: {
        textTransform: "capitalize",
        fontFamily: fontFamily,
        fontSize: fontSize,
      },
    },
    Actionsheet: {
      baseStyle: {
        maxW: maxWidth,
        alignSelf: "center",
      },
    },
    Button: {
      baseStyle: {
        rounded: "lg",
      },
      defaultProps: {
        colorScheme: "button",
      },
    },
  },
  colors: {
    studentCard: {
      500: "#B9FBC0",
    },
    classCard: {
      500: "#D9F0FC",
    },
    attendanceCard: {
      500: "#C9AFF4",
    },
    attendanceCardText: {
      400: "#9C9EA0",
      500: "#373839",
    },
    reportCard: {
      500: "#FFCAAC",
    },
    present: green,
    presentCardBg: {
      400: "#CEEED1",
      500: "#DFFDE2",
      600: "#cae3ce",
    },
    presentCardCompareBg: {
      500: "#ECFBF2",
      600: "#cae3ce",
    },
    presentCardText: {
      500: "#07C71B",
    },
    presentCardCompareText: {
      500: "#FA8129",
    },
    absent: red,
    absentCardBg: {
      500: "#FDE7E7",
      600: "#dfcbcb",
    },
    absentCardCompareBg: {
      500: "#FFF6F6",
      600: "#dfcbcb",
    },
    absentCardText: red,
    absentCardCompareText: {
      500: "#FA8129",
    },
    special_duty: { 500: "#06D6A0" },
    weekCardCompareBg: {
      500: "#FFF8F7",
    },
    reportBoxBg: {
      400: "#FFF8F7",
      500: "#FEF1EE",
      600: "#ede7e6",
    },
    button: {
      50: "#fcf1ee",
      100: "#fae2dd",
      200: "#f5c8bc",
      300: "#f2ab99",
      400: "#ee8e78",
      500: "#F87558",
      600: "#d9654c",
    },
    attendancePresent: {
      600: "#2BB639",
      500: "#2BB639",
    },
    attendanceAbsent: red,
    attendanceUnmarked: {
      100: "#F0F0F4",
      300: "#B5B5C8",
      400: "#d3d3e5",
      500: "#C4C4D4",
      600: "#C4C4D4",
    },
    timeTableCardOrange: {
      500: "#FFF7F5",
    },
  },
});


function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  useEffect(() => {
    const subscription = eventBus.subscribe("AUTH", (data, envelop)=>{
      console.log(envelop);
      if(data.eventType="LOGIN_SUCCESS"){
        setToken(sessionStorage.getItem("token"))
      }
    });
    return ()=>{
      eventBus.unsubscribe(subscription);
    }
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
    const MyClasses = React.lazy(() => import("classes/MyClasses"));
    const ClassDetails = React.lazy(() => import("classes/ClassDetails"));
    const Attendance = React.lazy(() => import("attendance/Attendance"));

    return (
      <NativeBaseProvider theme={theme}>
        <React.Suspense fallback="Loading ">

        <Router>
        <Routes>
          <Route
            path="classes"
            element={
                 <MyClasses />
            }
          />
          <Route
          path="/classes/:classId"
          element={
                 <ClassDetails />
            }
          />
          <Route
          path="/attendance/:classId"
          element={
                 <Attendance />
            }
          />
          <Route
            path="*"
            element={
                 <Home />
            }
          />
        </Routes>
      </Router>

       </React.Suspense>
      </NativeBaseProvider>
    );
  }
}
export default App;
