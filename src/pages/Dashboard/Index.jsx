import SidebarStudents from "@components/SidebarStudents";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {

  const [showMenu, setShowMenu] = useState(false)


  const toggleMenuHandle = () => {
    setShowMenu(!showMenu)
  }

  return (
    <>
      <div className="h-16 bg-slate-800 w-full max-md:fixed max-md:flex justify-between items-center px-8 hidden">

        <button onClick={toggleMenuHandle}>
          <Bars3BottomLeftIcon className="w-10 h-10" />
        </button>

        <img src="/images/JohnWick.png" className="w-10 h-10 rounded-full border-4 border-slate-700" />

      </div>
      <div className="grid w-[98%] max-xl:w-[96%] max-md:w-full m-auto grid-cols-[12rem_auto_23rem] max-xl:grid-cols-[4rem_auto_1em] max-md:grid-cols-1 gap-8   ">


        <SidebarStudents showMenu={showMenu} toggleMenuHandle={toggleMenuHandle} />

        <main className="mt-6 max-md:px-4 max-md:mt-16">
          <Outlet />
        </main>

      </div>

    </>
  );
}

export default Dashboard;