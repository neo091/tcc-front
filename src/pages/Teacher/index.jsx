import { Link, Outlet, useNavigation } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import SidebarTeacher from "../../components/SidebarTeacher";
import Header from "../../components/Header";

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

        <div className="flex h-screen overflow-hidden">
            <SidebarTeacher />
            <div className="relative overflow-x-hidden overflow-y-auto flex flex-1 flex-col">
                <Header />
                <div className="m-6">
                    <Outlet />
                </div>
            </div>
        </div>
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

