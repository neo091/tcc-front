import { useEffect, useState } from "react"
import HeaderDash from "./HeaderDash"
import { Link, Outlet, redirect, useLoaderData } from "react-router-dom"

import { getUserData } from '../../auth'

export async function loader() {
    const user = await getUserData();
    if (!user) return redirect("../Login")
    return { user };
}

const Dashboard = () => {

    return (
        <>
            <HeaderDash />

            <div className="mx-auto flex">

                {/*Sidebar*/}
                <div className=" w-1/4 bg-slate-600 h-[100vh] fixed" >
                    <Link to={"Dashboard"} className="p-2 w-100 block ">Dashboard</Link>
                    <Link to={"Logout"} className="p-2 w-100 block ">Logout</Link>

                </div>
                {/*Content*/}
                <div className="p-2 ml-[25%]">
                    <Outlet />
                </div>


            </div>

        </>
    )

}

export default Dashboard