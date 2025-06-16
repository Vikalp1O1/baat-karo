import React from 'react'
import Navbar from '../Components/Navbar'
import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    
    <>
    <Navbar />
    <main className='p-4'>
        <Outlet />
    </main>
    </>
  )
}

export default MainLayout