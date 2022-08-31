import React, { useEffect } from "react";
import "./App.css";
import {
  initializeI18n,
  AppShell,
  AppRoutesContainer,
  userRegistryService,
  useAuthFlow,
} from "@shiksha/common-lib";

import { routes } from "./Routes";

//TODO: separate out the theme related code from App
initializeI18n(["translation", "core", "attendance"]);

function App() {
  console.log(process.env);
  const LoginComponent = React.lazy(() => import("core/Login"));
  const skipLogin = !(
    process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false
  );

  return (
    <AppShell
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      isShowFooterLink={true}
      appName="Teacher App"
      skipLogin={skipLogin}
    />
  );
}
export default App;
