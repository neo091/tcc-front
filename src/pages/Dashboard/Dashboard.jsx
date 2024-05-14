import { useEffect, useState } from "react"
import HeaderDash from "./HeaderDash"
import { Link, NavLink, Outlet, redirect, useLoaderData } from "react-router-dom"

import { getUserData } from '../../auth'
import { ProfilePicture, ProfileInfo, ProfileUserType } from "../../components/Profiel";


export async function loader() {
    const user = await getUserData();
    if (!user) return redirect("../Login")
    return { user };
}



const SidebarLinks = ({ to, text }) => {
    return (
        <>
            <Link to={to} className="p-2 w-100 block  hover:bg-violet-800">
                {text}
            </Link>
        </>
    )
}



const Dashboard = () => {

    const { user } = useLoaderData()

    return (
        <>
            <HeaderDash />

            <div className="mx-auto flex">

                {/*Sidebar*/}
                <div className=" d-none w-[100%] lg:w-[20%] md:w-[20%] h-[100vh] fixed" >

                    <div className="p-2">
                        <ProfilePicture src='../images/user-4-xxl.png' />
                        <ProfileInfo name={user.name} />
                        <ProfileUserType type={user.type} />

                    </div>

                    <SidebarLinks text={"Dashboard"} to={"/Dashboard"} />
                    <SidebarLinks text={"Aula Virtual"} to={"./AulaVirtual"} />


                    {/*Student Area*/}


                    {/*Teacher Area*/}


                    {/*Admin Area*/}



                    <Link to={"Logout"} className="p-2 w-100 block ">Logout</Link>

                </div>
                {/*Content*/}
                <div className=" p-4 ml-[20%] flex-1">
                    <Outlet />
                </div>


            </div>

        </>
    )

}

export default Dashboard