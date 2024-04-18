import Profile from "./Profile";

const Teacher = ({ user, logoutHandle }) => {
    return (
        <>
            <div className="w-1/4 py-5">
                <Profile user={user} />

                <div className="mt-2 flex flex-col">

                    <a href="#" data-panel-name='tasks' className="p-2 bg-slate-100 w-full hover:bg-slate-200 hover:transition-all duration-300" onClick={(e) => updatePanel(e)}>Mis Tareas</a>
                    <a href="#" data-panel-name='files' className="p-2 bg-slate-100 w-full hover:bg-slate-200 transition-all duration-300 " onClick={(e) => updatePanel(e)}>Mis Archivos</a>
                    <a href="#" data-panel-name='courses' className="p-2 bg-slate-100 w-full hover:bg-slate-200 transition-all duration-300" onClick={(e) => updatePanel(e)} >Cursos</a>
                </div>


                <div className="mt-2 flex flex-col">
                    <a href="#" onClick={() => logoutHandle()} className="bg-red-600  w-full text-white p-2">Desconectar</a>

                </div>
            </div>
        </>
    )
}
export default Teacher;