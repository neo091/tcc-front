import { Link, Outlet, useNavigation } from "react-router-dom";
import Header from "../../components/Header";
import { ProfileInfo, ProfilePicture, ProfileUserType } from "../../components/Profile"
import SidebarLinks from "../../components/SidebarLinks"
import TopBarProgress from "react-topbar-progress-indicator";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const UserTypeToString = (type) => {

    if (type === 0) return 'undefined'
    if (type === 1) return 'Student'
    if (type === 2) return 'Teacher'
    if (type === 3) return 'Admin'

}

const Teacher = () => {

    const { session } = useAuthStore()

    const navigation = useNavigation()

    const [showSideBar, setShowSidebar] = useState(true)

    const openSidebarHandle = () => {
        setShowSidebar(!showSideBar)
    }

    const [userMenu, setUserMenu] = useState(false)

    const userMenuHandle = (e) => {
        e.preventDefault()
        setUserMenu(!userMenu)
    }


    return (

        <>
            <div className="flex h-screen overflow-hidden">
                <div className="hidden sm:block w-72 bg-slate-800 absolute lg:static h-screen">

                    <div className="text-3xl py-7 px-4 w-60">
                        <a href="/">

                            <img src="/images/logo.png" alt="" />
                        </a>
                    </div>

                    <div className="flex flex-col overflow-y-auto">
                        <nav className="mt-5 py-2 px-4">
                            <div>
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">MENU</h3>
                                <ul className="mb-6 flex flex-col gap-2">
                                    <li>
                                        <Link to={"./Home"} className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-violet-800 ">
                                            <svg
                                                viewBox="0 0 21 21"
                                                fill="currentColor"
                                                height="18"
                                                width="18"
                                            >
                                                <g
                                                    fill="none"
                                                    fillRule="evenodd"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M1.5 10.5l9-9 9 9" />
                                                    <path d="M3.5 8.5v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                                </g>
                                            </svg>

                                            HOME
                                        </Link>
                                    </li>
                                    <li>

                                        <Link to={"./Rooms"} className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-violet-800">

                                            <svg
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                height="18"
                                                width="18"
                                            >
                                                <path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z" />
                                            </svg>

                                            AULA VIRTUAL
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>


                </div>
                <div className="relative overflow-x-hidden overflow-y-auto flex flex-1 flex-col">
                    <header className="bg-slate-800 text-white sticky top-0 z-[999]">

                        <div className="flex px-4 py-4 items-center justify-end">
                            <div className="mr-4">
                                <a href="/" className="flex items-center gap-4" onClick={(e) => userMenuHandle(e)}>
                                    <span className="">
                                        <span className="block font-bold">{session.name}</span>
                                        <span className="block text-slate-500">{UserTypeToString(session.type)}</span>
                                    </span>
                                    <span className="w-12 h-12 rounded-full">
                                        <img src="http://localhost:5173/images/user.png" className="w-12 h-12" alt="" />
                                    </span>


                                </a>

                                <div className={`absolute bg-slate-800 text-white right-0 mt-4 font-semibold w-64 mr-3 ${userMenu ? 'block' : 'hidden'} shadow border-slate-700 border`}>
                                    <ul className="flex flex-col gap-5 border-b border-slate-700 px-4 py-6">
                                        <li>
                                            <a href="/" className="flex items-center gap-4">


                                                My Profile
                                            </a>
                                        </li>

                                    </ul>

                                    <Link to={"/Logout"} className="flex items-center gap-4 px-6 py-4  duration-300 ease-in-out ">

                                        Logout
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </header>
                    <div className="px-7 py-4">
                        <Outlet />
                    </div>
                </div>
            </div>

        </>


    );
}

export default Teacher;


// <Header handle={openSidebarHandle} />

// <div className="mx-auto">

//     {/*Sidebar*/}
//     <div className={`bg-slate-950 ${showSideBar && "hidden"} w-full sm:w-[20%] xl:w-[20%] sm:block h-[100vh] fixed p-2`}>

//         <div className="p-2">
//             <ProfilePicture src={"http://localhost:5173/images/user.png"} />
//             <ProfileInfo name={session.name} />
//             <ProfileUserType type={session.type} />

//         </div>

//         <SidebarLinks text={"Home"} to={"./Home"} handle={openSidebarHandle} />
//         <SidebarLinks text={"Aula Virtual"} to={"./Rooms"} handle={openSidebarHandle} />
//         <SidebarLinks text={"Archivos"} to={"./Files"} handle={openSidebarHandle} />

//         <SidebarLinks text={"Logout"} to={"/Logout"} />

//     </div>
//     {/*Content*/}
//     <div className=" p-4 sm:ml-[20%] xl:ml-[20%]">
//         {navigation.state === "loading" ? <TopBarProgress /> : <Outlet />}
//     </div>

// </div>

