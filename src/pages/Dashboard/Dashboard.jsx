import { useState } from "react"
import Content from "../../components/Content"
import Header from "../../components/Header"

const Profile = ({ name, type, updatePanelHandle }) => {

    const updatePanel = (e) => {
        document.querySelector('.active-panel').classList.remove('active-panel')
        e.target.classList.add('active-panel')
        updatePanelHandle(e.target.dataset.panelName)
    }
    return (
        <>
            <div className="w-1/4 py-5">
                <img src="../images/user-4-xxl.png" className=" mx-auto w-[200px] bg-black rounded-full " alt="" />
                <p className=" text-center capitalize ">{name}</p>
                <p className=" text-sm text-center text-blue-500">
                    {type === 0 ? 'undefined' : ''}
                    {type === 1 ? 'Alumno' : ''}
                    {type === 2 ? 'Teacher' : ''}
                    {type === 3 ? 'Admin' : ''}
                </p>
                <div className="mt-2 flex flex-col">
                    <a href="#" data-panel-name='tasks' className="p-2 bg-slate-100 w-full hover:bg-slate-200 hover:transition-all duration-300 active-panel" onClick={(e) => updatePanel(e)}>Mis Tareas</a>
                    <a href="#" data-panel-name='files' className="p-2 bg-slate-100 w-full hover:bg-slate-200 transition-all duration-300 " onClick={(e) => updatePanel(e)}>Mis Archivos</a>
                    <a href="#" data-panel-name='courses' className="p-2 bg-slate-100 w-full hover:bg-slate-200 transition-all duration-300" onClick={(e) => updatePanel(e)} >Cursos</a>
                </div>

                <div className="mt-2 flex flex-col">
                    <a href="/login" className="bg-red-600  w-full text-white p-2">Desconectar</a>

                </div>
            </div>
        </>
    )
}

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
            {activePanel === 'tasks' ? <TasksPanel /> : ''}
            {activePanel === 'files' ? <FilesPanel /> : ''}
            {activePanel === 'courses' ? <CoursesPanel /> : ''}
        </>
    )
}

const DashPanels = ({ type, activePanel }) => {
    return (
        <>
            <div className=" w-9/12  ">
                <div className="bg-gray-50 p-5 ">

                    {type === 3 ? <AdminPanel /> : ''}
                    <div className="bg-white border border-gray-100 min-h-[300px] flex flex-col items-center justify-center">
                        <Panels activePanel={activePanel} />
                    </div>
                </div>
            </div>
        </>
    )
}

const Dashboard = ({ user }) => {

    if (!user.name) { return location.href = '/login' }

    const [activePanel, setActivePanel] = useState('tasks')

    const updateTabeHandle = (panel) => {
        setActivePanel(panel)
    }

    return (
        <>
            <Header />
            <Content>
                <div className="flex">
                    <Profile name={user.name} type={user.type} updatePanelHandle={updateTabeHandle} />
                    <DashPanels type={user.type} activePanel={activePanel} />
                </div>
            </Content>
        </>
    )

}

export default Dashboard