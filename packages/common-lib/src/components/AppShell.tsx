import React, { useEffect, useState } from 'react'
import { NativeBaseProvider } from 'native-base'
import { eventBus } from '../services/EventBus'
import Loading from './Loading'
import { PushNotification } from './firebase/firebase'
import AppRoutesContainer from './AppRoutesContainer'
import { useAuthFlow } from '../hooks/useAuthFlow'

function AppShell({
  theme,
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

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const searchParams = Object.fromEntries(urlSearchParams.entries())
    if (searchParams.token != undefined) {
      localStorage.setItem('token', searchParams.token)
      skipLogin = true
    }
  }, [])
  const user = useAuthFlow()

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
    const subscription = eventBus.subscribe('AUTH', (data, envelop) => {
      if (data.eventType == 'LOGIN_SUCCESS') {
        setToken(localStorage.getItem('token'))
      } else if (data.eventType == 'LOGOUT' && skipLogin) {
        setTimeout(() => {
          window.location.href = '/oauth2/sign_out?rd=/'
        }, 1)
      }
    })
    return () => {
      eventBus.unsubscribe(subscription)
    }
  }, [])

  if (!token && !skipLogin) {
    return (
      <NativeBaseProvider theme={theme}>
        <PushNotification />
        <React.Suspense fallback={<Loading />}>
          <AuthComponent {..._authComponent} />
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
