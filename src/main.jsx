import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import Home from './pages/Home'
import ErrorPage from './pages/error-page.jsx'

import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Logout from './pages/Dashboard/Logout.jsx'
import NewRoom, { action as NewRoomAction } from './pages/Teacher/NewRoom.jsx'

import DeleteVirtualRoom, { loader as AulaVirtualDelete } from './pages/Dashboard/Teacher/DeleteVirtualRoom.jsx'
import Teacher, { loader as teacherLoader } from './pages/Teacher'
import TeacherHome from './pages/Teacher/TeacherHome.jsx'
import Rooms from './pages/Teacher/Rooms.jsx'
import RoomsList from './pages/Teacher/RoomsList.jsx'
import Room, { loader as RoomLoader } from './pages/Teacher/Room.jsx'
import EditRoom, { loader as EditRoomLoader } from './pages/Teacher/EditRoom.jsx'
import Files from './pages/Teacher/Files.jsx'
import NewLesson, { loader as NewLessonLoader } from './pages/Teacher/NewLesson.jsx'
import RoomDelete, { loader as RoomDeleteLoader } from './pages/Teacher/RoomDelete.jsx'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />
    },
    {
      path: "/Teacher",
      element: <Teacher />,
      loader: teacherLoader,
      id: "teacher",
      children: [
        { index: true, element: <TeacherHome /> },
        { path: "Home", element: <TeacherHome /> },
        {
          path: "Rooms",
          element: <Rooms />,
          children: [
            { index: true, element: <RoomsList /> },
            {
              path: "new",
              element: <NewRoom />,
              action: NewRoomAction
            },
            {
              path: ":id",
              element: <Room />,
              loader: RoomLoader
            },
            {
              path: ":id/edit",
              element: <EditRoom />,
              loader: EditRoomLoader
            },
            {
              path: ":id/NewLesson",
              element: <NewLesson />,
              loader: NewLessonLoader
            },
            {
              path: ":id/delete",
              element: <RoomDelete />,
              loader: RoomDeleteLoader
            }
          ]
        },
        {
          path: "Files",
          element: <Files />
        }

      ]
    },
    {
      path: "Logout",
      element: <Logout />
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
  <RouterProvider router={router} />,
)
