import TopBarProgress from "react-topbar-progress-indicator";
import Header from "../../components/Header";
import { ProfileInfo, ProfilePicture, ProfileUserType } from "../../components/Profile";
import SidebarLinks from "../../components/SidebarLinks";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { getUserData } from "../../auth";
import { useState } from "react";


export async function loader() {
    const user = await getUserData()
    if (!user || user === undefined) return redirect("../Login")


    return { user };
}



const Dashboard = () => {

    const { user } = useLoaderData()

    const [showSideBar, setShowSidebar] = useState(true)


    const openSidebarHandle = () => {
        setShowSidebar(!showSideBar)
    } 
    //hola

    return (
        <>
            <Header handle={openSidebarHandle} />

            <div className="mx-auto">

                <div className={`bg-slate-950 ${showSideBar && "hidden"} w-full sm:w-[20%] xl:w-[20%] sm:block h-[100vh] fixed p-2`}>

                    <div className="p-2">
                        <ProfilePicture src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`} />
                        <ProfileInfo name={user.name} />
                        <ProfileUserType type={user.type} />
                    </div>

                    <SidebarLinks text={"Home"} to={"./Home"} handle={openSidebarHandle} />
                    <SidebarLinks text={"Aula Virtual"} to={"./Rooms"} handle={openSidebarHandle} />
                    <SidebarLinks text={"Archivos"} to={"./Files"} handle={openSidebarHandle} />

                    <SidebarLinks text={"Logout"} to={"/Logout"} />

                </div>
                <div className=" p-4 sm:ml-[20%] xl:ml-[20%]">
                    {navigation.state === "loading" ? <TopBarProgress /> : <Outlet />}
                </div>

            </div>

        </>
    );
}

export default Dashboard;