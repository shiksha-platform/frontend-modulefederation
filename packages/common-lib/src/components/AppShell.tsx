import React, { Suspense, useEffect, useState } from 'react'
import { Center, NativeBaseProvider } from 'native-base'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { eventBus } from '../services/EventBus'
import Loading from './Loading'
import { PushNotification } from './firebase/firebase'
import { DEFAULT_THEME } from './helper'

function AppShell({
  colors,
  routes,
  AuthComponent,
  basename,
  isShowFooterLink,
  appName,
  _authComponent,
  ...otherProps
}: any) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [theme, setTheme] = React.useState<any>('')

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
            title: 'MY_LEARNING',
            icon: 'UserLineIcon',
            module: 'Registry',
            route: '/mylearning',
            routeparameters: {}
          }
        ]
      }
  useEffect(() => {
    const getTheme = async () => {
      try {
        setTheme(await DEFAULT_THEME())
      } catch {
        setTheme(DEFAULT_THEME('joyfull'))
      }
    }
    getTheme()
    const subscription = eventBus.subscribe('AUTH', (data, envelop) => {
      if ((data.eventType = 'LOGIN_SUCCESS')) {
        setToken(localStorage.getItem('token'))
      }
    })
    return () => {
      eventBus.unsubscribe(subscription)
    }
  }, [token])

  if (!theme) {
    return <React.Fragment />
  }
  if (!token) {
    return (
      <NativeBaseProvider theme={theme}>
        <PushNotification />
        <React.Suspense fallback={<Loading />}>
          <AuthComponent {...{ colors }} {..._authComponent} />
        </React.Suspense>
      </NativeBaseProvider>
    )
  } else {
    return (
      <NativeBaseProvider theme={theme}>
        <PushNotification />
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
                    <item.component {...{ footerLinks, appName, colors }} />
                  }
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
