import React, { Suspense, useEffect, useState } from 'react'
import { Center, NativeBaseProvider } from 'native-base'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Loading from './Loading'
import { PushNotification } from './firebase/firebase'
import { useAuthFlow } from '../hooks/useAuthFlow'
import Alert from './Alert'

const AppRoutesContainer = ({
  theme,
  routes,
  basename,
  footerLinks,
  appName,
  alert,
  setAlert,
  ...otherProps
}: any) => {
  const user = useAuthFlow()
  return (
    <NativeBaseProvider {...(Object.keys(theme).length ? { theme } : {})}>
      <PushNotification />
      <Alert {...{ alert, setAlert }} />
      <Suspense
        fallback={
          <Center>
            <Loading />
          </Center>
        }
      >
        <Router basename={basename}>
          <Routes>
            {routes.map((item: any, index: number) => (
              <Route
                key={index}
                path={item.path}
                element={
                  <item.component
                    {...{ footerLinks, appName, setAlert, ...otherProps }}
                  />
                }
              />
            ))}
          </Routes>
        </Router>
      </Suspense>
    </NativeBaseProvider>
  )
}

export default AppRoutesContainer
