import Profile from "./Profile";


const PanelLink = ({ text, href }) => {
    return (
        <>
            <a href="#"
                className="p-2 w-full hover:bg-slate-800 transition-all duration-300">
                {text}
            </a>
        </>
    )
}

const Student = ({ user, logoutHandle }) => {
    return (
        <>
            <div className="w-1/4 py-5">
                <Profile user={user} />

                <div className="mt-2 flex flex-col">
                    <PanelLink text='Mis Tareas' />
                    <PanelLink text='Mis Archivos' />
                    <PanelLink text='Exámenes' />
                </div>


                <div className="mt-2 flex flex-col">
                    <a href="#" onClick={() => logoutHandle()} className="text-red-600 w-full p-2">Desconectar</a>

                </div>
            </div>
        </>
    )
}
export default Student;