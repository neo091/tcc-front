import { Link, Outlet } from "react-router-dom";
import ActivePanel from "./ActivePanel";
import PanelLink from "./PanelLink";
import Profile from "./Profile";

const Teacher = ({ user, logoutHandle, panel, handle, editNameHandle }) => {
    return (
        <>
            <div className="w-1/4 py-5">
                <Profile user={user} />

                <div className="mt-2 flex flex-col">
                    <Link to={"AulaVirtual"} className="p-2 w-full hover:bg-slate-800 transition-all duration-300">Aula Virtual</Link>
                    {/*<PanelLink text='Dashboard' panel='welcome' handle={handle} />
                    <PanelLink text='Aula Virtual' panel='virtual-classroom' handle={handle} />
                    <PanelLink text='Archivos' panel='files' handle={handle} />
                    <PanelLink text='Editar Perfil' panel='edit-profile' handle={handle} />*/}
                </div>


                <div className="mt-2 flex flex-col">
                    <a href="#" onClick={() => logoutHandle()} className="text-red-600 hover:bg-slate-800 w-ful p-2">Desconectar</a>
                </div>
            </div>

            <div className="p-2 w-full">
                <Outlet />
            </div>
        </>
    )
}
export default Teacher;