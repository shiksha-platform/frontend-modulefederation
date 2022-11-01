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

  /*
  if (!token && !skipLogin) {
    return (
      <NativeBaseProvider {...(Object.keys(theme).length ? { theme } : {})}>
        <PushNotification />
        {/!* <FloatingVideoPlayer /> *!/}
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
  */

  localStorage.setItem(
    'token',
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InVGRnE4dHU5aEdxaXpUOHk2QzY1U3hKbGd4YyJ9.eyJhdWQiOiIxYWUwNzRkYi0zMmYzLTQ3MTQtYTE1MC1jYzhhMzcwZWFmZDEiLCJleHAiOjE2NjcyMTk3MjgsImlhdCI6MTY2NzIxMjUyOCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiJmNzkxZTMxYS02MGZmLTRkNDQtYjkxOC1hYTFhMmIzYWFkOTYiLCJqdGkiOiIwYzExMjRkMS1mYmI4LTQ1NzktODU2Yi1lMGExMzVkM2ZkMTEiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsImVtYWlsIjoidW1hbmdiaG9sYUBzYW1ncmEuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiY2hha3MiLCJhcHBsaWNhdGlvbklkIjoiMWFlMDc0ZGItMzJmMy00NzE0LWExNTAtY2M4YTM3MGVhZmQxIiwicm9sZXMiOlsiVGVzdCJdLCJhdXRoX3RpbWUiOjE2NjcyMTI1MjgsInRpZCI6ImE3MTM3ZGVkLTZmNTUtMTBhOC02ZjViLWY3NmRiZDc5YWU2MCIsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJkZXZpY2VfZG9uYXRpb24iLCJDYWxsIENlbnRlciBPcGVyYXRvciIsIkRpc3RyaWN0IFByb2plY3QgT2ZmaWNlciIsIkRpcmVjdG9yIEhpZ2hlciBFZHVjYXRpb24iLCJCUkNDIFByaW1hcnkiLCJCUkNDIFVwcGVyIFByaW1hcnkiLCJUZXN0IiwiQkVFTyIsIkJQTyIsIkNIVChQKS9DUkNDKFApIiwiQ0hUKFNlYykvQ1JDQyhTZWMpIiwiRGVwdXR5IERpcmVjdG9yIEVsZW1lbnRhcnkiLCJEZXB1dHkgRGlyZWN0b3IgSGlnaGVyIiwiRGVwdXR5IERpcmVjdG9yIEluc3BlY3Rpb24gQ2FkcmUiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiZGV2aWNlX2RvbmF0aW9uIiwiWC1IYXN1cmEtVXNlci1JZCI6ImNoYWtzIiwiWC1IYXN1cmEtRGFzaGJvYXJkLVJvbGUiOiJUZXN0In19.KvSbbctmJLiNd2wEXY4Nub215nZ0T-ilNywc4Td63Ry4TNevBMnnjJKoSB3EbGw6mNNlMZig_c2jfXYA_9Q0rAHeAviMagvb_d3ClHlylWAq-7KmxX2ZpGeYt0gys027NWI2Oc80iKuj4BTxGlqjTsMKvGsYDWUsXG-X22qkIyF8EcAr_blGhZT38k3hd_xAYoYc7ZIUdJWMX8-l_YzH841w6SKVfKUWp1Q89gmyk2lwrRBghfXuRWjA8PyKJX9-5dVovqClrvPOIzSj9AXvOhoRQhkEv2pPmzmIz2nLP-QauATCJ-9coU5R4jHlUrmce_Sxt-3pjlZ0y-gY6wB3_w'
  )
  localStorage.setItem('id', 'f791e31a-60ff-4d44-b918-aa1a2b3aad96')

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
export default AppShell
