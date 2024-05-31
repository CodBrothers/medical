import React from 'react'
import Navbar from './components/common/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/common/Footer'

export default function Layout() {
    return (
        <> <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer /></>

    )
}
