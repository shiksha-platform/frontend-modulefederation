import React, { useEffect, useState } from 'react'
import { NativeBaseProvider } from 'native-base'
import { eventBus } from '../services/EventBus'
import Loading from './Loading'
import { PushNotification } from './firebase/firebase'
import AppRoutesContainer from './AppRoutesContainer'
import { getAppshellData } from './helper'
import NotFound from './NotFound'

function AppShell({
  colors,
  routes,
  AuthComponent,
  basename,
  isShowFooterLink,
  appName,
  _authComponent,
  skipLogin = false,
  ...otherProps
}: any) {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [theme, setTheme] = React.useState<any>({})
  const [accessRoutes, setAccessRoutes] = React.useState<any>([])
  const [footerLinks, setFooterLinks] = React.useState<any>([])
  const [alert, setAlert] = React.useState<any>()
  const [allConfig, setAllConfig] = React.useState<any>()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const searchParams = Object.fromEntries(urlSearchParams.entries())
    if (searchParams.token != undefined) {
      localStorage.setItem('token', searchParams.token)
      setToken(searchParams.token)
      skipLogin = true
    }
  }, [])

  useEffect(() => {
    const getData = async () => {
      const { newTheme, newRoutes, newFooterLinks, config } =
        await getAppshellData(routes)
      if (isShowFooterLink) {
        setFooterLinks({ menues: newFooterLinks })
      }
      setAccessRoutes([
        ...newRoutes,
        {
          path: '*',
          component: NotFound
        }
      ])
      setTheme(newTheme)
      setAllConfig(config)
    }

    getData()
    const subscription = eventBus.subscribe('AUTH', (data, envelop) => {
      if (data.eventType == 'LOGIN_SUCCESS') {
        setToken(localStorage.getItem('token'))
      } else if (data.eventType == 'LOGOUT') {
        if (skipLogin) {
          setTimeout(() => {
            window.location.href = '/oauth2/sign_out?rd=/'
          }, 1)
        } else {
          setTimeout(() => {
            window.location.href = ''
          }, 1)
        }
      }
    })
    return () => {
      eventBus.unsubscribe(subscription)
    }
  }, [token])

  if (!Object.keys(theme).length) {
    return <React.Fragment />
  }

  if (!token && !skipLogin) {
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
      <AppRoutesContainer
        {...{
          theme,
          routes: accessRoutes,
          basename,
          footerLinks,
          appName: 'Teacher App',
          alert,
          setAlert,
          config: allConfig
        }}
      />
    )
  }
}
export default AppShell
