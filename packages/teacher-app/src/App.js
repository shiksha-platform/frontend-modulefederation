import React from "react";
import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";

import Home from "./pages/Home";
import init from "lang/init";

import manifest from "./manifest.json";

//TODO: separate out the theme related code from App
i18n.use(initReactI18next).init(init);

const maxWidth = manifest?.maxWidth ? manifest?.maxWidth : "414";
const fontFamily =
  localStorage.getItem("lang") === "hi" ? "'Baloo 2'" : "Inter";
const fontSize = localStorage.getItem("lang") === "hi" ? "20px" : "";

function App() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    const LoginComponent = React.lazy(() => import("core/Login"));

    return (
      <NativeBaseProvider>
        <React.Suspense fallback="Loading ">
          <LoginComponent />
        </React.Suspense>
      </NativeBaseProvider>
    );
  } else {
    return (
      <NativeBaseProvider>
        <Home />
      </NativeBaseProvider>
    );
  }
}

const theme = extendTheme(
{
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
    presentCardBg: {
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
    absentCardBg: {
      500: "#FDE7E7",
      600: "#dfcbcb",
    },
    absentCardCompareBg: {
      500: "#FFF6F6",
      600: "#dfcbcb",
    },
    absentCardText: {
      500: "#F57B7B",
    },
    absentCardCompareText: {
      500: "#FA8129",
    },
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
    attendanceAbsent: {
      600: "#F57B7B",
      500: "#F57B7B",
    },
    attendanceUnmarked: {
      600: "#C4C4D4",
      500: "#C4C4D4",
      400: "#d3d3e5",
      100: "#F0F0F4",
    },
    timeTableCardOrange: {
      500: "#FFF7F5",
    },
  },
});

export default App;
