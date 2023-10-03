import React from 'react'
import { Routes, Route } from 'react-router'
import routes from './routes'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'

export function RootCmp() {

    return (
        <div className='app'>
            <AppHeader />
            <main className='app-main'>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}


