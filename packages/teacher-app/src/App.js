import React, { useEffect } from "react";
import "./App.css";
import { extendTheme } from "native-base";
import {
  DEFAULT_THEME,
  initializeI18n,
  AppShell,
  AppRoutesContainer,
  userRegistryService,
  useAuthFlow
} from "@shiksha/common-lib";

import { routes } from "./Routes";

//TODO: separate out the theme related code from App
initializeI18n(["translation", "core", "attendance"]);

function App() {
  const theme = extendTheme(DEFAULT_THEME);

  console.log(process.env);
  const LoginComponent = React.lazy(() => import("core/Login"));
  const skipLogin = !(process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false);
  
  return (<AppShell
    theme={theme}
    basename={process.env.PUBLIC_URL}
    routes={routes}
    AuthComponent={LoginComponent}
    isShowFooterLink={true}
    appName="Teacher App"
    skipLogin={skipLogin}
  />)
  /*  
  if (
    process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false
  ) {
    return (
      <AppShell
        theme={theme}
        basename={process.env.PUBLIC_URL}
        routes={routes}
        AuthComponent={LoginComponent}
        isShowFooterLink={true}
        appName="Teacher App"
      />
    );
  } else {
    return (
      <AppRoutesContainer
        theme={theme}
        basename={process.env.PUBLIC_URL}
        routes={routes}
        isShowFooterLink={true}
        appName="Teacher App"
      />
    );
  }
  */
}
export default App;
