import React, { Suspense, useEffect, useState } from 'react'
import { NativeBaseProvider } from 'native-base'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { eventBus } from '../services/EventBus'
import Loading from './Loading'

function AppShell({
  theme,
  routes,
  AuthComponent,
  basename,
  isShowFooterLink,
  appName,
  ...otherProps
}: any) {
  const [token, setToken] = useState(localStorage.getItem('token'))
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
            title: 'MATERIALS',
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

  useEffect(() => {
    const subscription = eventBus.subscribe('AUTH', (data, envelop) => {
      if ((data.eventType = 'LOGIN_SUCCESS')) {
        setToken(localStorage.getItem('token'))
      }
    })
    return () => {
      eventBus.unsubscribe(subscription)
    }
  }, [token])
  if (!token) {
    return (
      <NativeBaseProvider theme={theme}>
        <React.Suspense fallback={<Loading />}>
          <AuthComponent />
        </React.Suspense>
      </NativeBaseProvider>
    )
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <Suspense fallback={<Loading />}>
          <Router basename={basename}>
            <Routes>
              {routes.map((item: any, index: number) => (
                <Route
                  key={index}
                  path={item.path}
                  element={<item.component {...{ footerLinks, appName }} />}
                />
              ))}
            </Routes>
          </Router>
        </Suspense>
      </NativeBaseProvider>
    )
  }
}
export default AppShell
