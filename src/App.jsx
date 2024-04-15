import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register/Register'
import { useState } from 'react'
import RegisterSuccess from './pages/Register/Success'

function App() {

  const [user, setUser] = useState({
    name: 'Marcos Delgado',
    user: 'marcos',
    type: 1
  })

  const updateUserNameHandle = (newName) => {
    console.log(newName)
    setUser({ ...user, name: newName })
  }

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Dashboard' element={<Dashboard user={user} />} />
        <Route path='/register-success' element={<RegisterSuccess />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
