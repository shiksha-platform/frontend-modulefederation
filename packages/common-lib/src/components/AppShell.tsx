import React, { Suspense, useEffect, useState } from 'react'
import { Center, NativeBaseProvider } from 'native-base'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { eventBus } from '../services/EventBus'
import Loading from './Loading'
import { PushNotification } from './firebase/firebase'
import { getAppshellData } from './helper'
import Alert from './Alert'

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
  const [theme, setTheme] = React.useState<any>({})
  const [accessRoutes, setAccessRoutes] = React.useState<any>([])
  const [footerLinks, setFooterLinks] = React.useState<any>([])
  const [alert, setAlert] = React.useState<any>()

  useEffect(() => {
    const getData = async () => {
      const { newTheme, newRoutes, newFooterLinks } = await getAppshellData(
        routes
      )
      if (isShowFooterLink) {
        setFooterLinks({ menues: newFooterLinks })
      }
      setAccessRoutes(newRoutes)
      setTheme(newTheme)
    }

    getData()
    const subscription = eventBus.subscribe('AUTH', (data, envelop) => {
      if ((data.eventType = 'LOGIN_SUCCESS')) {
        setToken(localStorage.getItem('token'))
      }
    })
    return () => {
      eventBus.unsubscribe(subscription)
    }
  }, [token])

  if (!Object.keys(theme).length) {
    return <React.Fragment />
  }

  if (!token) {
    return (
      <NativeBaseProvider {...(Object.keys(theme).length ? { theme } : {})}>
        <PushNotification />
        <React.Suspense fallback={<Loading />}>
          <AuthComponent {...{ colors }} {..._authComponent} />
        </React.Suspense>
      </NativeBaseProvider>
    )
  } else {
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
              {accessRoutes.map((item: any, index: number) => (
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
}
export default AppShell
