import { Link, Outlet } from "react-router-dom";
import Logo from "/images/logo.png"
import { useAuth } from "@hooks/useAuth";
import { useAuthStore } from "@store/authStore";
import { useEffect } from "react";

const Admin = () => {

  const { Logout } = useAuth()
  const { session } = useAuthStore()

  useEffect(() => {

    if (session.type !== "" && session.type !== 3) {

      Logout()
    }
  }, [])


  return (
    <>
      <div className="flex flex-col h-lvh">
        <header className="w-full flex bg-slate-800">
          <Link to={"/Admin"} className="w-1/4 block text-center p-2 ">
            <img src={Logo} width={150} alt="" />
          </Link>

          <ul className="flex items-center">
            <li>
              <Link to={"/Admin"} className="hover:bg-slate-700 block h-full p-2 ">Home</Link>
            </li>
          </ul>
        </header>

        <section className="flex h-full">

          <aside className="w-1/4 bg-slate-800 flex flex-col">
            <h3 className="px-2">MENU</h3>
            <nav className="flex-1">
              <ul>
                <li><Link to={"Profile"} className="px-4 py-2 hover:bg-slate-700 block">Perfil Admin</Link></li>
                <li><Link to={"/Admin/Users"} className="px-4 py-2 hover:bg-slate-700 block">Gestion de Usuario</Link></li>
                <li><Link to={"/Admin/Rooms"} className="px-4 py-2 hover:bg-slate-700 block">Gestion de Aulas</Link></li>
                <li><Link to={"/Admin/Activation"} className="px-4 py-2 hover:bg-slate-700 block">Docentes Activacion</Link></li>
              </ul>
            </nav>
            <footer>
              <button onClick={Logout} className=" hover:bg-red-700 p-2 block w-full">
                Desconexión
              </button>
            </footer>
          </aside>

          <main className="w-full h-full px-2 overflow-y-auto">
            <Outlet />
          </main>
        </section>
      </div>

    </>
  )
}

export default Admin;
