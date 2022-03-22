import React, { Suspense, useEffect, useState } from "react";
import { extendTheme, NativeBaseProvider } from "native-base";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { eventBus } from "../services/EventBus";

function AppShell({theme, routes, AuthComponent, ...otherProps}:any) {
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
    if(!token){
        return ( 
      <NativeBaseProvider theme={theme}>
      <React.Suspense fallback="Loading ">
        <AuthComponent />
      </React.Suspense>
    </NativeBaseProvider>
        );

    } else {
        return (
        <NativeBaseProvider theme={theme}>
          <Suspense fallback="loadng...">
            <Router>
              <Routes>
              {routes.map((item:any, index:number) => (
                <Route key={index} path={item.path} element={<item.component/>} />
              ))}
              </Routes>
            </Router>
            </Suspense> 
        </NativeBaseProvider>
        );
    }
}
export default AppShell;