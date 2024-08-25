import Header from "../../components/Header";
import SidebarStudents from "../../components/SidebarStudents";

import { Outlet } from "react-router-dom";

export async function loader() {
    return {};
}

const Dashboard = () => {

    return (
        <div className="flex min-h-lvh">

            <SidebarStudents />

            <main className="flex-1">
                <Header />

                <div className="mx-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;