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

                    <div className="text-3xl py-7 px-4">
                        <a href="/">TCC</a>
                    </div>

                    <div className="flex flex-col overflow-y-auto">
                        <nav className="mt-5 py-2 px-4">
                            <div>
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">MENU</h3>
                                <ul className="mb-6 flex flex-col gap-2">
                                    <li>
                                        <Link to={"./Home"} className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-violet-800 ">
                                            <svg class="fill-current" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.3103 1.77586C11.6966 1.40805 12.3034 1.40805 12.6897 1.77586L20.6897 9.39491L23.1897 11.7759C23.5896 12.1567 23.605 12.7897 23.2241 13.1897C22.8433 13.5896 22.2103 13.605 21.8103 13.2241L21 12.4524V20C21 21.1046 20.1046 22 19 22H14H10H5C3.89543 22 3 21.1046 3 20V12.4524L2.18966 13.2241C1.78972 13.605 1.15675 13.5896 0.775862 13.1897C0.394976 12.7897 0.410414 12.1567 0.810345 11.7759L3.31034 9.39491L11.3103 1.77586ZM5 10.5476V20H9V15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15V20H19V10.5476L12 3.88095L5 10.5476ZM13 20V15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15V20H13Z" ></path></svg>
                                            HOME
                                        </Link>
                                    </li>
                                    <li>

                                        <Link to={"./Rooms"} className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-violet-800">
                                            <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_130_9728)"><path d="M3.45928 0.984375H1.6874C1.04053 0.984375 0.478027 1.51875 0.478027 2.19375V3.96563C0.478027 4.6125 1.0124 5.175 1.6874 5.175H3.45928C4.10615 5.175 4.66865 4.64063 4.66865 3.96563V2.16562C4.64053 1.51875 4.10615 0.984375 3.45928 0.984375ZM3.3749 3.88125H1.77178V2.25H3.3749V3.88125Z" fill=""></path><path d="M7.22793 3.71245H16.8748C17.2123 3.71245 17.5217 3.4312 17.5217 3.06558C17.5217 2.69995 17.2404 2.4187 16.8748 2.4187H7.22793C6.89043 2.4187 6.58105 2.69995 6.58105 3.06558C6.58105 3.4312 6.89043 3.71245 7.22793 3.71245Z" fill=""></path><path d="M3.45928 6.75H1.6874C1.04053 6.75 0.478027 7.28437 0.478027 7.95937V9.73125C0.478027 10.3781 1.0124 10.9406 1.6874 10.9406H3.45928C4.10615 10.9406 4.66865 10.4062 4.66865 9.73125V7.95937C4.64053 7.28437 4.10615 6.75 3.45928 6.75ZM3.3749 9.64687H1.77178V8.01562H3.3749V9.64687Z" fill=""></path><path d="M16.8748 8.21252H7.22793C6.89043 8.21252 6.58105 8.49377 6.58105 8.8594C6.58105 9.22502 6.86231 9.47815 7.22793 9.47815H16.8748C17.2123 9.47815 17.5217 9.1969 17.5217 8.8594C17.5217 8.5219 17.2123 8.21252 16.8748 8.21252Z" fill=""></path><path d="M3.45928 12.8531H1.6874C1.04053 12.8531 0.478027 13.3875 0.478027 14.0625V15.8344C0.478027 16.4813 1.0124 17.0438 1.6874 17.0438H3.45928C4.10615 17.0438 4.66865 16.5094 4.66865 15.8344V14.0625C4.64053 13.3875 4.10615 12.8531 3.45928 12.8531ZM3.3749 15.75H1.77178V14.1188H3.3749V15.75Z" fill=""></path><path d="M16.8748 14.2875H7.22793C6.89043 14.2875 6.58105 14.5687 6.58105 14.9344C6.58105 15.3 6.86231 15.5812 7.22793 15.5812H16.8748C17.2123 15.5812 17.5217 15.3 17.5217 14.9344C17.5217 14.5687 17.2123 14.2875 16.8748 14.2875Z" fill=""></path></g><defs><clipPath id="clip0_130_9728"><rect width="18" height="18" fill="white"></rect></clipPath></defs></svg>
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

                                    <svg class="hidden fill-current sm:block" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z" fill=""></path></svg>
                                </a>

                                <div className={`absolute bg-slate-800 text-white right-0 mt-4 font-semibold w-64 mr-3 ${userMenu ? 'block' : 'hidden'} shadow border-slate-700 border`}>
                                    <ul className="flex flex-col gap-5 border-b border-slate-700 px-4 py-6">
                                        <li>
                                            <a href="/" className="flex items-center gap-4">
                                                <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 9.62499C8.42188 9.62499 6.35938 7.59687 6.35938 5.12187C6.35938 2.64687 8.42188 0.618744 11 0.618744C13.5781 0.618744 15.6406 2.64687 15.6406 5.12187C15.6406 7.59687 13.5781 9.62499 11 9.62499ZM11 2.16562C9.28125 2.16562 7.90625 3.50624 7.90625 5.12187C7.90625 6.73749 9.28125 8.07812 11 8.07812C12.7188 8.07812 14.0938 6.73749 14.0938 5.12187C14.0938 3.50624 12.7188 2.16562 11 2.16562Z" fill=""></path><path d="M17.7719 21.4156H4.2281C3.5406 21.4156 2.9906 20.8656 2.9906 20.1781V17.0844C2.9906 13.7156 5.7406 10.9656 9.10935 10.9656H12.925C16.2937 10.9656 19.0437 13.7156 19.0437 17.0844V20.1781C19.0094 20.8312 18.4594 21.4156 17.7719 21.4156ZM4.53748 19.8687H17.4969V17.0844C17.4969 14.575 15.4344 12.5125 12.925 12.5125H9.07498C6.5656 12.5125 4.5031 14.575 4.5031 17.0844V19.8687H4.53748Z" fill=""></path></svg>

                                                My Profile
                                            </a>
                                        </li>

                                    </ul>

                                    <Link to={"/Logout"} className="flex items-center gap-4 px-6 py-4  duration-300 ease-in-out ">
                                        <svg class="fill-current" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.5375 0.618744H11.6531C10.7594 0.618744 10.0031 1.37499 10.0031 2.26874V4.64062C10.0031 5.05312 10.3469 5.39687 10.7594 5.39687C11.1719 5.39687 11.55 5.05312 11.55 4.64062V2.23437C11.55 2.16562 11.5844 2.13124 11.6531 2.13124H15.5375C16.3625 2.13124 17.0156 2.78437 17.0156 3.60937V18.3562C17.0156 19.1812 16.3625 19.8344 15.5375 19.8344H11.6531C11.5844 19.8344 11.55 19.8 11.55 19.7312V17.3594C11.55 16.9469 11.2062 16.6031 10.7594 16.6031C10.3125 16.6031 10.0031 16.9469 10.0031 17.3594V19.7312C10.0031 20.625 10.7594 21.3812 11.6531 21.3812H15.5375C17.2219 21.3812 18.5625 20.0062 18.5625 18.3562V3.64374C18.5625 1.95937 17.1875 0.618744 15.5375 0.618744Z" fill=""></path><path d="M6.05001 11.7563H12.2031C12.6156 11.7563 12.9594 11.4125 12.9594 11C12.9594 10.5875 12.6156 10.2438 12.2031 10.2438H6.08439L8.21564 8.07813C8.52501 7.76875 8.52501 7.2875 8.21564 6.97812C7.90626 6.66875 7.42501 6.66875 7.11564 6.97812L3.67814 10.4844C3.36876 10.7938 3.36876 11.275 3.67814 11.5844L7.11564 15.0906C7.25314 15.2281 7.45939 15.3312 7.66564 15.3312C7.87189 15.3312 8.04376 15.2625 8.21564 15.125C8.52501 14.8156 8.52501 14.3344 8.21564 14.025L6.05001 11.7563Z" fill=""></path></svg>
                                        Logout
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </header>
                    <div className="px-7">
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

