import { Link, Outlet, useNavigate } from "react-router-dom";
import LogoImage from '/images/logo.png'
import { Bars2Icon, ChevronRightIcon, HomeIcon, PowerIcon, PresentationChartBarIcon, QuestionMarkCircleIcon, BookOpenIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/authStore";
import Swal from "sweetalert2";
import { useAuth } from "@hooks/useAuth";

const Teacher = () => {

  const sidebarRef = useRef()
  const { Logout } = useAuth()
  const { session, isLogin, accountType } = useAuthStore()

  const toggleSidebar = (e) => {


    const element = e.target

    if (element.id.toString() === "toggleSidebar") {
      sidebarRef.current.classList.toggle("hidden")
    }

    if (element.id.toString() !== "toggleSidebar") {
      sidebarRef.current.classList.add("hidden")
    }
  }


  useEffect(() => {

    document.body.addEventListener('click', toggleSidebar);
    return () => {
      document.body.removeEventListener('click', toggleSidebar);
    }
  }, [])


  const disconnectHandle = () => {
    Swal.fire(
      {
        title: "Quieres Desconectarte?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, desconectar!"
      }
    ).then((result) => {
      if (result.isConfirmed) {
        Logout()
      }
    })
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:block w-72 max-xl:w-24 bg-slate-800 fixed lg:static h-full z-10  " ref={sidebarRef}>

        <div className="text-center p-2 ">
          <button>
            <img src={LogoImage} className=" w-40" alt="Tcc" />
          </button>
        </div>

        <Link to={'Profile'} className="p-2 bg-slate-900 block">
          <div className="mx-4 max-xl:mx-0">
            <div className="flex gap-3 justify-between max-xl:justify-center items-center">
              <span className="w-12 h-12 rounded-full overflow-hidden">
                <img src={session?.pic ? `http://localhost:4000/uploads/${session?.pic}` : `https://ui-avatars.com/api/?name=${session.name}&background=0D8ABC&color=fff`} className="w-12 h-12" alt={session.name} />
              </span>

              <span className="max-xl:hidden block">
                <span className="block font-bold">{session.name}</span>
                <span className="text-sm block text-slate-500">{accountType()}</span>
              </span>
              <ChevronRightIcon width={24} hanging={24} className="max-xl:hidden block" />
            </div>


          </div>
        </Link>

        <div className="flex flex-col">
          <nav className="mt-5 py-2 px-4 max-xl:px-0">
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">MENU</h3>
            <ul className="mb-6 flex flex-col gap-2 relative">
              <li>
                <Link to={''} className={'group flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800'}>
                  <HomeIcon className="w-6 h-6" />
                  <span className="max-xl:hidden block">Dashboard</span>
                </Link>
              </li>

              <li>
                <Link to={"Rooms"} className="group flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800 ">
                  <PresentationChartBarIcon className="w-6 h-6" />
                  <span className="max-xl:hidden block">Mis Aulas</span>
                </Link>
              </li>

              <li>
                <Link
                  to={"Report"}
                  className="group flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800"
                >
                  <BookOpenIcon className="w-6 h-6" />
                  <span className="max-xl:hidden block">Reportes</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/ayuda"
                  className="group flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800"
                >
                  <QuestionMarkCircleIcon className="w-6 h-6" />
                  <span className="max-xl:hidden block">Ayuda</span>
                </Link>
              </li>

              <li >
                <button onClick={disconnectHandle} className="group flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-red-700 w-full">
                  <PowerIcon className="w-6" />
                  <span className="max-xl:hidden block">Desconexión</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

      </div>
      <div className="relative overflow-x-hidden overflow-y-auto flex flex-1 flex-col">

        <header className="bg-slate-800 text-white z-20">
          <ul className="flex items-center ">
            <li>
              <button className="p-4" id="toggleSidebar">
                <Bars2Icon className="w-6 h-6" id="toggleSidebar" />
              </button>
            </li>
            <li>
              <Link className="px-6 py-4 inline-block hover:bg-slate-700" to={'/'}>Home</Link>
            </li>
          </ul>
        </header>
        <div className="m-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Teacher;
