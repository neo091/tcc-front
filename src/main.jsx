import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import Home from './pages/Home'
import ErrorPage from './pages/error-page.jsx'
import Dashboard, { loader as dashLoader } from './pages/Dashboard/Dashboard.jsx'
import VirtualClassRoom from './pages/Dashboard/TeacherPanels/VirtualClassRoom.jsx'
import Index from './pages/Dashboard/Index.jsx'
import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Logout from './pages/Dashboard/Logout.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />
    },
    {
      path: "/Dashboard",
      element: <Dashboard />,
      loader: dashLoader,
      children: [
        { index: true, element: <Index /> },
        {
          path: "AulaVirtual",
          element: <VirtualClassRoom />
        },
        {
          path: "Logout",
          element: <Logout />
        }
      ]
    },
    {
      path: "/Login",
      element: <Login />,
      errorElement: <ErrorPage />
    },
    {
      path: "/Register",
      element: <Register />,
      errorElement: <ErrorPage />
    }
  ]
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
