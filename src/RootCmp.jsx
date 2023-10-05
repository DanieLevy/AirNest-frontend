import React from 'react'
import { Routes, Route } from 'react-router'
import routes from './routes'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { StayDetails } from './pages/StayDetails'
import { UserMsg } from './cmps/UserMsg'

export function RootCmp() {
  return (
    <div className='main-layout'>
      <AppHeader />
      {/* <main className=''> */}
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} exact={true} element={route.component} path={route.path} />
        ))}
      </Routes>
      {/* </main> */}
      {/* <AppFooter /> */}
      <UserMsg />
    </div>
  )
}
