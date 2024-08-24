import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import ErrorPage from './pages/error-page.jsx'

import Login from './pages/Login/Login.jsx'
import Register from './pages/Register/Register.jsx'
import Logout from './pages/Logout.jsx'
import NewRoom, { action as NewRoomAction } from './pages/Teacher/NewRoom.jsx'

//Teacher Sections
import Teacher from './pages/Teacher'
import TeacherHome from './pages/Teacher/TeacherHome.jsx'
import Rooms from './pages/Teacher/Rooms.jsx'
import RoomsList from './pages/Teacher/RoomsList.jsx'
import Room, { loader as RoomLoader } from './pages/Teacher/Room.jsx'
import EditRoom, { loader as EditRoomLoader, action as EditAction } from './pages/Teacher/EditRoom.jsx'
import Files from './pages/Teacher/Files.jsx'
import NewLesson, { loader as NewLessonLoader } from './pages/Teacher/NewLesson.jsx'
import RoomDelete, { loader as RoomDeleteLoader } from './pages/Teacher/RoomDelete.jsx'
import EditLesson, { loader as editLessonLoader, action as editLessonAction } from './pages/Teacher/EditLesson.jsx'
import { DeleteLesson, loader as DeleteLessonLoader } from './pages/Teacher/Lessons.jsx'
import Students from './pages/Teacher/Students.jsx'

import TaskNew, { loader as NewTaskLoader } from './pages/Teacher/Tasks/TaskNew.jsx'
import TaskEdit, { loader as TaskEditLoader } from './pages/Teacher/Tasks/TaskEdit.jsx'

//---//

//Dash Section -> 
import Dashboard, { loader as dashloader } from './pages/Dashboard/Index.jsx'
import HomeDash from './pages/Dashboard/Home.jsx'
import InglishTest from './pages/Dashboard/Test.jsx'
import TestPage from './pages/Test-Page.jsx'
import FilesStudent from './pages/Dashboard/Files.jsx'
import AddSection from './pages/Teacher/lessons/add-section.jsx'
import DashboardRooms, { loader as dashLoader } from './pages/Dashboard/Rooms.jsx'
import DashboardRoomsView, { loader as RoomsViewLoader } from './pages/Dashboard/RoomsView.jsx'
import DashboardLessonView, { loader as LessonViewLoader } from './pages/Dashboard/LessonView.jsx'
import DashboardCourses, { loader as CoursesLoader } from './pages/Dashboard/Courses.jsx'
import DashboardCourse, { loader as CourseLoader } from './pages/Dashboard/Course.jsx'
import Demo from './pages/Demo.jsx'

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
              loader: EditRoomLoader,
              action: EditAction
            },
            {
              path: ":id/NewLesson",
              element: <NewLesson />,
              loader: NewLessonLoader
            },
            {
              path: ":id/lessons/:lessonId/students",
              element: <Students />,
            },
            {
              path: ":id/lessons/:lessonId/edit",
              element: <EditLesson />,
              loader: editLessonLoader,
              action: editLessonAction
            },
            {
              path: ":id/lessons/:lessonId/delete",
              element: <DeleteLesson />,
              loader: DeleteLessonLoader
            },
            {
              path: ":id/delete",
              element: <RoomDelete />,
              loader: RoomDeleteLoader
            },
            {
              path: ":id/lessons/:lessonId/edit/addSection",
              element: <AddSection />
            },
            {
              path: ":id/NewTask",
              element: <TaskNew />,
              loader: NewTaskLoader
            },
            {
              path: ":id/TaskEdit/:taskId",
              element: <TaskEdit />,
              loader: TaskEditLoader
            },
          ]
        },
        {
          path: "Files",
          element: <Files />
        }

      ]
    },
    {
      path: "Dashboard",
      element: <Dashboard />,
      loader: dashloader,
      children: [
        { index: true, element: <HomeDash /> },
        { path: "Home", element: <HomeDash /> },
        { path: "Test", element: <InglishTest /> },
        { path: "Files", element: <FilesStudent /> },
        { path: "Rooms", element: <DashboardRooms />, loader: dashLoader },
        { path: "Rooms/:id", element: <DashboardRoomsView />, loader: RoomsViewLoader },
        { path: "Lesson/:id", element: <DashboardLessonView />, loader: LessonViewLoader },
        { path: "Courses", element: <DashboardCourses />, loader: CoursesLoader },
        { path: "Course/:id", element: <DashboardCourse />, loader: CourseLoader }
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
    },
    {
      path: "/test-page",
      element: <TestPage />,
      errorElement: <ErrorPage />
    },
    {
      path: "/Demo",
      element: <Demo />,
      errorElement: <ErrorPage />
    },
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
