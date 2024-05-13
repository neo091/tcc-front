import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import { useEffect, useState } from 'react'
import RegisterSuccess from './pages/Register/Success'
import registerService from './services/auth'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='/Login' element={<Login />} />
          <Route path='/Register' element={<Register />} />
          <Route path='Dashboard' element={<Dashboard />} />
          <Route path='/register-success' element={<RegisterSuccess />} />
        </Route>

        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
