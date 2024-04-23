import { useState } from "react";
import ActivePanel from "./ActivePanel";
import PanelLink from "./PanelLink";
import Profile from "./Profile";

const Admin = ({ user, logoutHandle, handle, panel }) => {

    return (
        <>
            <div className="w-1/4 py-5">
                <Profile user={user} />

                <div className="mt-2 flex flex-col">
                    <PanelLink text='Dashboard' panel='welcome' handle={handle} />
                    <PanelLink text='Admin' panel='admin' handle={handle} />
                    <PanelLink text='Archivos' panel='files' handle={handle} />
                    <PanelLink text='Editar Perfil' panel='files' handle={handle} />

                </div>


                <div className="mt-2 flex flex-col">
                    <a href="#" onClick={() => logoutHandle()} className="bg-red-600  w-full text-white p-2">Desconectar</a>

                </div>
            </div>

            <div className="p-2 w-full">
                <ActivePanel panel={panel} />
            </div>
        </>
    )
}
export default Admin;