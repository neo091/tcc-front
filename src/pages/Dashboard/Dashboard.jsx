import { useEffect, useState } from "react"
import Content from "../../components/Content"
import Header from "../../components/Header"
import HeaderDash from "./HeaderDash"
import Student from "./PanelStudent"
import Teacher from "./PanelTeacher"
import Admin from "./PanelAdmin"

const AdminPanel = () => {
    return (
        <>

            <div className="bg-white border border-gray-100 min-h-[300px] flex flex-col items-center justify-center">
                <div>Alumnos</div>
            </div>

            <div className="bg-white border border-gray-100 min-h-[300px] flex flex-col items-center justify-center">
                <div>Maestros</div>
            </div>

        </>
    )
}

const TasksPanel = () => {
    return (
        <>
            <div>Mis Tareas</div>
        </>
    )
}

const FilesPanel = () => {
    return (
        <>
            <div>Mis Archivos</div>
        </>
    )
}

const CoursesPanel = () => {
    return (
        <>
            <div>Mis Cursos</div>
        </>
    )
}

const Panels = ({ activePanel }) => {
    return (
        <>
            <div className="min-h-[300px] flex flex-col items-center justify-center bg-slate-800 rounded">
                {activePanel === 'tasks' ? <TasksPanel /> : ''}
                {activePanel === 'files' ? <FilesPanel /> : ''}
                {activePanel === 'courses' ? <CoursesPanel /> : ''}
            </div >
        </>
    )
}

const Dashboard = () => {

    const [user, setUser] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem("loggedTCC")
        if (loggedUserJson) {
            const userLogged = JSON.parse(loggedUserJson)
            setUser(userLogged)
            setIsAdmin(userLogged.type === 3 ? true : false)
        } else {
            location.href = './login'
        }
    }, [])


    const logout = () => {
        window.localStorage.clear()
        location.href = './login'
    }


    return (
        <>
            {user ? <HeaderDash user={user} /> : <Header />}

            <Content>
                <div className="flex">

                    {user.type == 1 ? <Student user={user} logoutHandle={logout} /> : ''}
                    {user.type == 2 ? <Teacher user={user} logoutHandle={logout} /> : ''}
                    {user.type == 3 ? <Admin user={user} logoutHandle={logout} /> : ''}
                    <div className="p-2 w-full">
                        <Panels activePanel='tasks' />
                    </div>
                </div>

            </Content>
        </>
    )

}

export default Dashboard