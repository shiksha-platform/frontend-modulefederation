import React, { Suspense, useEffect, useState } from 'react'
import { Center, NativeBaseProvider } from 'native-base'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { eventBus } from '../services/EventBus'
import Loading from './Loading'
import { PushNotification } from './firebase/firebase'
import { getAnnouncementsSet } from '../services/announcementsRegistryService'
import { getAppshellData } from './helper'

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

  //TODO: integrate with API call to fetch whitelisted modules
  const pinnedAnnouncementsWhitelist = ['announcements']
  //TODO: integrate with API call to fetch pinned announcements
  const [pinnedAnnouncementsData, setPinnedAnnouncementsData] = useState([])

  useEffect(() => {
    if (!pinnedAnnouncementsWhitelist.some((val: string) => val === appName))
      return

    getAnnouncementsSet({ isPinned: true, status: 'published' }).then((res) => {
      setPinnedAnnouncementsData(res.data)
    })
  }, [])

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
                    pinnedAnnouncementsData?.length > 0 ? (
                      <item.component
                        {...{ footerLinks, appName, pinnedAnnouncementsData }}
                      />
                    ) : (
                      <item.component {...{ footerLinks, appName }} />
                    )
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
