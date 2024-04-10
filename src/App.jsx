import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState } from 'react'

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
        <Route path='/Dashboard' element={<Dashboard user={user} updateUserNameHandle={updateUserNameHandle} />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
