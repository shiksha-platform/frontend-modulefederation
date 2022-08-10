import React, { useEffect, useState } from 'react'
import { NativeBaseProvider } from 'native-base'
import { eventBus } from '../services/EventBus'
import Loading from './Loading'
import { PushNotification } from './firebase/firebase'
import AppRoutesContainer from './AppRoutesContainer'
import { useAuthFlow } from '../hooks/useAuthFlow'
import { getAppshellData } from './helper'
import jwt_decode from 'jwt-decode'

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
      let role = ''
      if (token) {
        let jwt: any = jwt_decode(`${token}`)
        const roles = jwt.realm_access.roles
        role = roles.find((e: any) =>
          ['Teacher', 'Mentor', 'Monitor'].includes(e)
        )
      }
      const { newTheme, newRoutes, newFooterLinks } = await getAppshellData(
        routes,
        role.toLowerCase()
      )
      if (isShowFooterLink) {
        setFooterLinks({ menues: newFooterLinks })
      }
      setAccessRoutes(newRoutes)
      setTheme(newTheme)
    }

    getData()
    const subscription = eventBus.subscribe('AUTH', (data, envelop) => {
      if (data.eventType == 'LOGIN_SUCCESS') {
        setToken(localStorage.getItem('token'))
      } else if (data.eventType == 'LOGOUT') {
        if(skipLogin){
          setTimeout(() => {
            window.location.href = '/oauth2/sign_out?rd=/'
          }, 1);
        } else {
          setTimeout(() => {
            window.location.href = ''
          }, 1);
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
        theme={theme}
        basename={basename}
        routes={routes}
        isShowFooterLink={true}
        appName='Teacher App'
      />
    )
  }
}
export default AppShell
