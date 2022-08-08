import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { extendTheme, NativeBaseProvider } from "native-base";
import { DEFAULT_THEME, AppShell } from "@shiksha/common-lib";
import ContentPage from "pages/ContentPage";

function App() {
  const FourOFour = () => {
    return (
      <Center flex={1} px="3">
        <Center
          height={200}
          width={{
            base: 200,
            lg: 400,
          }}
        >
          404
        </Center>
      </Center>
    );
  };
  const theme = extendTheme(DEFAULT_THEME);
  const routes = [
    {
      path: "content-page/:slug",
      component: ContentPage,
    },
    {
      path: "*",
      component: FourOFour
    }
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell theme={theme} routes={routes} AuthComponent={LoginComponent} />
  );
}

export default App;
