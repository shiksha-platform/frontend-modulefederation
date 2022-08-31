import React, { Suspense, useEffect, useState } from 'react'
import { Center, NativeBaseProvider } from 'native-base'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Loading from './Loading'
import { PushNotification } from './firebase/firebase'
import { useAuthFlow } from '../hooks/useAuthFlow'
import Alert from './Alert'

const AppRoutesContainer = ({
  colors,
  theme,
  routes,
  basename,
  isShowFooterLink,
  appName,
  ...otherProps
}: any) => {
  const user = useAuthFlow()
  const [alert, setAlert] = React.useState<any>()
  const footerLinks = !isShowFooterLink
    ? {}
    : {
        menues: [
          {
            title: 'HOME',
            icon: 'Home4LineIcon',
            module: 'Registry',
            route: '/',
            routeparameters: {}
          },
          {
            title: 'CLASSES',
            icon: 'TeamLineIcon',
            module: 'Registry',
            route: '/classes',
            routeparameters: {}
          },
          {
            title: 'SCHOOL',
            icon: 'GovernmentLineIcon',
            module: 'Registry',
            route: '/',
            routeparameters: {}
          },
          {
            title: 'TEACHING',
            icon: 'BookOpenLineIcon',
            module: 'Registry',
            route: '/worksheet',
            routeparameters: {}
          },
          {
            title: 'CAREER',
            icon: 'UserLineIcon',
            module: 'Registry',
            route: '/',
            routeparameters: {}
          }
        ]
      }
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
                    {...{ footerLinks, appName, colors, setAlert }}
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
