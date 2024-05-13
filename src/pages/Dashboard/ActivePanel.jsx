import ButtonSky from "../../components/ButtonSky"
import VirtualClassRoom from "./TeacherPanels/VirtualClassRoom"
import MyStudents from "./TeacherPanels/MyStudents"
import Title from "../../components/Title"
import Subtitle from "../../components/Subtitle"
import Table from "../../components/Table"
import TableV2 from "../../components/TableV2"
import { useEffect, useState } from "react"
import AddVirtualRoom from "./TeacherPanels/AddVirtualRoom"
import EditVirtualRoom from "./TeacherPanels/EditVirtualRoom"

const WelcomePanel = () => {
    return <>welcome panel</>
}
const AdminPanel = () => {
    return (
        <>

            <div>Admin Panel</div>

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

    const th_archivos = [
        {
            ID: 1,
            text: 'Nombre'
        },
        {
            ID: 2,
            text: 'Fecha'
        },
        {
            ID: 3,
            text: 'Peso'
        }
    ]

    const tb_archivos = [
        {
            ID: 1,
            tr_content: [
                {
                    text: 'Nombre del Archivo.jpg'
                },
                {
                    text: '15/08/2024'
                },
                {
                    text: '15MB'
                },
            ]
        },
        {
            ID: 2,
            tr_content: [
                {
                    text: 'Nombre_Archivo2.jpg'
                },
                {
                    text: '15/06/2024'
                },
                {
                    text: '25MB'
                },
            ]
        },
        {
            ID: 3,
            tr_content: [
                {
                    text: '3_Nombre_Archivo.jpg'
                },
                {
                    text: '15/06/2024'
                },
                {
                    text: '25MB'
                },
            ]
        },
        {
            ID: 4,
            tr_content: [
                {
                    text: '4_Nombre_Archivo.jpg'
                },
                {
                    text: '15/06/2024'
                },
                {
                    text: '25MB'
                },
            ]
        },
        {
            ID: 5,
            tr_content: [
                {
                    text: '5_Nombre_Archivo.jpg'
                },
                {
                    text: '15/06/2024'
                },
                {
                    text: '25MB'
                },
            ]
        },
        {
            ID: 6,
            tr_content: [
                {
                    text: '6_Nombre_Archivo.jpg'
                },
                {
                    text: '15/06/2024'
                },
                {
                    text: '25MB'
                },
            ]
        },
        {
            ID: 7,
            tr_content: [
                {
                    text: 'mi archivo.jpg'
                },
                {
                    text: '15/06/2024'
                },
                {
                    text: '15MB'
                },
            ]
        }
    ]

    return (
        <>
            <div className="px-6 w-full">

                <TableV2 thead={th_archivos} tbody={tb_archivos} maxPerPage={5} title='Lista de Archivos' />
            </div>
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

const Input = ({ type, label, value, handle, placeholder, readonly, name }) => {

    return (
        <div className='my-4'>
            <label>{label}</label>
            <input readOnly={readonly} onChange={(e) => handle(e)} name={name} type={type} placeholder={placeholder} className='p-2 bg-slate-700 rounded w-full ' />
        </div>
    )
}

const EditProfile = (props) => {

    return (
        <>
            <div className="my-4">
                <h2 className=" font-bold text-2xl">Editar Perfil</h2>

                <form action="#" method="POST" onSubmit={(e) => props.handle(e)}>
                    <div className="w-full flex gap-3">
                        <Input label='Nombre' name='username' value={props.user.name} />
                    </div>

                    <Input label='Correo' readonly='readonly' value={props.user.email} />

                    <button type="submit">Actualizar</button>
                </form>

            </div>
        </>
    )
}



const ActivePanel = ({ panel, user, handle, logout, editNameHandle }) => {
    return (
        <>
            <div className="min-h-[300px] flex flex-col items-center justify-center bg-slate-800 rounded">
                {panel === 'welcome' ? <WelcomePanel /> : ''}
                {panel === 'tasks' ? <TasksPanel /> : ''}
                {panel === 'files' ? <FilesPanel /> : ''}
                {panel === 'courses' ? <CoursesPanel /> : ''}
                {panel === 'admin' ? <AdminPanel /> : ''}
                {panel === 'edit-profile' ? <EditProfile user={user} handle={editNameHandle} /> : ''}
                {panel === 'virtual-classroom' ? <VirtualClassRoom handleChangePanel={handle} user={user} handle={editNameHandle} /> : ''}
                {panel === 'add-virtual-classroom' ? <AddVirtualRoom logoutHandle={logout} user={user} handle={handle} /> : ''}
                {panel === 'edit-virtual-classroom' ? <EditVirtualRoom logoutHandle={logout} user={user} handle={handle} /> : ''}
            </div >
        </>
    )
}

export default ActivePanel