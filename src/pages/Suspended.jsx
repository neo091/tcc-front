import React, { useEffect, useRef } from 'react';
import LogoImage from '/images/logo.png'
import { useAuth } from '@hooks/useAuth';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, Bars2Icon, PowerIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';


const Suspended = () => {
  const sidebarRef = useRef()
  const { Logout } = useAuth()

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


  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden lg:block w-72 max-xl:w-24 bg-slate-800 fixed lg:static h-full z-10 " ref={sidebarRef}>

        <div className="text-center p-2 ">
          <button>
            <img src={LogoImage} className=" w-40" alt="Tcc" />
          </button>
        </div>
        <div className="flex flex-col">
          <nav className="mt-5 py-2 px-4 max-xl:px-0">
            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">MENU</h3>
            <ul className="mb-6 flex flex-col gap-2 relative">


              <li >
                <button onClick={Logout} className="group flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-red-700 w-full">
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
        <div className="flex flex-col w-full md:w-96 gap-6 m-auto px-6">
          <h1 className='text-4xl text-center font-bold mb-6'>Cuenta Suspendida</h1>
          <p>Tu cuenta se encuentra <span className='text-red-600 mb-4'>INACTIVA</span>, por favor sigue los siguientes pasos para activarla:</p>


        </div>
      </div>
    </div>
  );
}

export default Suspended;
