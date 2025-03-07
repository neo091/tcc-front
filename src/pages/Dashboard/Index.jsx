import SidebarStudents from "@components/SidebarStudents";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@hooks/useAuth";
import { useAuthStore } from "@store/authStore";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

  const [showMenu, setShowMenu] = useState(false)
  const { session } = useAuthStore()
  const { Logout } = useAuth()



  const loadFilters = () => {

    const colorBlindConfig = window.localStorage.getItem("colorblind")

    if (!colorBlindConfig) return

    let filter;
    switch (colorBlindConfig) {
      case 'protanopia':
        filter = 'grayscale(30%) contrast(120%)';
        break;
      case 'deuteranopia':
        filter = 'sepia(50%) saturate(150%)';
        break;
      case 'tritanopia':
        filter = 'hue-rotate(200deg) contrast(110%)';
        break;
      case 'normal':
      default:
        filter = 'none';
        break;
    }
    document.body.style.filter = filter
  }


  const toggleMenuHandle = () => {
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    if (session.type !== 1) {
      Logout()
    }

    if (session.state === 0) {
      Logout("inactive")
    }
  }, [])

  useEffect(() => {
    loadFilters()
  }, [])

  return (
    <>
      <div className="h-16 bg-slate-800 w-full max-md:fixed max-md:flex justify-between items-center px-8 hidden">

        <button onClick={toggleMenuHandle}>
          <Bars3BottomLeftIcon className="w-10 h-10" />
        </button>

        <img src={session.pic ? `http://localhost:4000/uploads/${session.pic}` : `https://ui-avatars.com/api/?name=${session?.name}&background=0D8ABC&color=fff`} className="w-10 h-10 rounded-full border-4 border-slate-700" />

      </div>
      <div className="grid w-[98%] max-xl:w-[96%] max-md:w-full m-auto grid-cols-[12rem_auto_23rem] max-xl:grid-cols-[4rem_auto_1em] max-md:grid-cols-1 gap-8   ">


        <SidebarStudents showMenu={showMenu} toggleMenuHandle={toggleMenuHandle} />

        <main className="max-md:px-4 max-md:mt-16">
          <Outlet />
        </main>

      </div>

    </>
  );
}

export default Dashboard;