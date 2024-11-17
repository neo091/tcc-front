import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from '@Pages/Home'
import ErrorPage from '@Pages/error-page.jsx'
// import Profile from '@Pages/Profile.jsx'
import Login from '@Pages/Login/Login.jsx'
import Logout from '@Pages/Logout.jsx'
import Register from '@Pages/Register/Register.jsx'

//Teacher Sections
import Teacher from '@Teacher'
import TeacherHome from '@Teacher/TeacherHome.jsx'
import Rooms from '@Teacher/Rooms.jsx'
import EditRoom from '@Teacher/Rooms/EditRoom'
import NewRoom, { action as NewRoomAction } from '@Teacher/NewRoom.jsx'
import RoomsList from '@Teacher/RoomsList.jsx'
import Room, { loader as RoomLoader } from '@Teacher/Room.jsx'
import Files from '@Teacher/Files.jsx'
import NewLesson, { loader as NewLessonLoader } from '@Teacher/NewLesson.jsx'
import RoomDelete, { loader as RoomDeleteLoader } from '@Teacher/RoomDelete.jsx'
import EditLesson, { loader as editLessonLoader, action as editLessonAction } from '@Teacher/EditLesson.jsx'
import AddSection from '@Teacher/lessons/add-section.jsx'
import { DeleteLesson, loader as DeleteLessonLoader } from '@Teacher/Lessons.jsx'
import Students from '@Teacher/Students.jsx'
import Exams from '@Teacher/Exams/Exams.jsx'
import ExamsIndex from '@Teacher/Exams/ExamsIndex.jsx'
import AddExam, { loader as AddExamLoader } from '@Teacher/Exams/AddExam.jsx'
import EditExam, { loader as EditExamLoader } from '@Teacher/Exams/Edit.jsx'
import TaskNew, { loader as NewTaskLoader } from '@Teacher/Tasks/TaskNew.jsx'
import TaskEdit, { loader as TaskEditLoader } from '@Teacher/Tasks/TaskEdit.jsx'

//---//

//Dash Section -> 
import Dashboard from '@Dashboard/Index.jsx'
import HomeDash from '@Dashboard/Home.jsx'
import EnglishTest from '@Dashboard/Test.jsx'
import TestPage from '@Pages/Test-Page.jsx'
import FilesStudent from '@Dashboard/Files.jsx'
import DashboardRooms, { loader as dashLoader } from '@Dashboard/Rooms.jsx'
import DashboardRoomsView, { loader as RoomsViewLoader } from '@Dashboard/RoomsView.jsx'
import DashboardLessonView, { loader as LessonViewLoader } from '@Dashboard/LessonView.jsx'
import DashboardCourses, { loader as CoursesLoader } from '@Dashboard/Courses.jsx'
import DashboardCourse, { loader as CourseLoader } from '@Dashboard/Course.jsx'
import DashboardExams from '@Dashboard/exams/index.jsx'
import DashboardExam from '@Dashboard/exams/Exam.jsx'
import Demo from '@Pages/Demo.jsx'

//---//

// Admin
import Admin from "@Admin/Admin.jsx"
import AdminHome from "@Admin/Home.jsx"
import AdminUsers from "@Admin/Users.jsx"
import AdminRooms from "@Admin/Rooms.jsx"
import Chatbot from '@Pages/Dashboard/Chatbot'
import Profile from '@Pages/Dashboard/Profile'
//cc
import Comienzo from './pages/Comienzo/comienzo.jsx';
import TestFacil from './pages/Comienzo/testFacil.jsx';
import TestMedio from './pages/Comienzo/testMedio.jsx';
import TestDificil from './pages/Comienzo/testDificil.jsx';
import RegisterTeacher from '@Pages/Register/RegisterTeacher.jsx'

//---//

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />
    },
    {
      path: "/comienzo",
      element: <Comienzo />,
      errorElement: <ErrorPage />
    },
    { path: "/testFacil", element: <TestFacil /> },
    { path: "/testMedio", element: <TestMedio /> },
    { path: "/testDificil", element: <TestDificil /> },
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
              path: "Edit",
              element: <EditRoom />
            },
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
            {
              path: ':id/Exams', element: <Exams />,
              children: [
                { index: true, element: <ExamsIndex /> },
                { path: 'Add', element: <AddExam />, loader: AddExamLoader },
                { path: 'Edit/:idExam', element: <EditExam />, loader: EditExamLoader }
              ]
            }
          ]
        },
        {
          path: "Files",
          element: <Files />
        },
        { path: 'Profile', element: <Profile /> },


      ]
    },
    {
      path: "Dashboard",
      element: <Dashboard />,
      children: [
        { index: true, element: <HomeDash /> },
        { path: "Test", element: <EnglishTest /> },
        { path: "Files", element: <FilesStudent /> },
        { path: "Rooms", element: <DashboardRooms />, loader: dashLoader },
        { path: "Rooms/:id", element: <DashboardRoomsView />, loader: RoomsViewLoader },
        { path: "Lesson/:id", element: <DashboardLessonView />, loader: LessonViewLoader },
        { path: "Courses", element: <DashboardCourses />, loader: CoursesLoader },
        { path: "Course/:id", element: <DashboardCourse />, loader: CourseLoader },
        { path: 'Profile', element: <Profile /> },
        { path: 'Exams', element: <DashboardExams /> },
        { path: 'Exam', element: <DashboardExam /> },
        { path: "Chatbot", element: <Chatbot /> }
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
      path: "/Register/Teacher",
      element: <RegisterTeacher />,
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
    {
      path: "/Admin",
      element: <Admin />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <AdminHome /> },
        { path: "Users", element: <AdminUsers /> },
        { path: "Rooms", element: <AdminRooms /> },
        { path: "Profile", element: <Profile /> },
      ]
    },
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
