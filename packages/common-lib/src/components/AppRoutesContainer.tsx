import React, { Suspense, useEffect, useState } from 'react'
import { Center, NativeBaseProvider } from 'native-base'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { eventBus } from '../services/EventBus'
import Loading from './Loading'

const AppRoutesContainer = ({
  theme,
  routes,
  AuthComponent,
  basename,
  isShowFooterLink,
  appName,
  ...otherProps
}: any) => {
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
    <NativeBaseProvider theme={theme}>
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
                element={<item.component {...{ footerLinks, appName }} />}
              />
            ))}
          </Routes>
        </Router>
      </Suspense>
    </NativeBaseProvider>
  )
}

export default AppRoutesContainer
