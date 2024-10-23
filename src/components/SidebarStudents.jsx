import { ChartBarIcon, DocumentTextIcon, HomeIcon, PresentationChartBarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import LogoImage from '../../public/images/logo.png'

const SidebarStudents = () => {
    return (
        <div className="hidden lg:block w-72 bg-slate-800 absolute lg:static h-lvh">

            <div className="flex items-center justify-center h-24">
                <img src={LogoImage} className="w-40" alt="" />
            </div>

            <div className="flex flex-col overflow-y-auto">
                <nav className="mt-5 py-2 px-4">
                    <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">MENU</h3>
                    <ul className="mb-6 flex flex-col gap-2">
                        <li>
                            <Link to={'/Dashboard'} className={'group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800'}>
                                <HomeIcon className="w-6 h-6" />
                                Dashboard
                            </Link>
                        </li>

                        <li>
                            <Link to={"Rooms"} className="group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800 ">
                                <PresentationChartBarIcon className="w-6 h-6" />
                                Mis Aulas
                            </Link>
                        </li>

                        <li>
                            <Link to={"Courses"} className="group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800 ">
                                <ChartBarIcon className="w-6 h-6" />
                                Aulas Virtuales
                            </Link>
                        </li>

                        <li>
                            <Link to={"Exams"} className="group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800 ">
                                <DocumentTextIcon className="w-6 h-6" />
                                Exámenes
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

    );
}

export default SidebarStudents;
