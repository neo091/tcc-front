import { Bars3Icon, ChartBarIcon, HomeIcon, PresentationChartBarIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link } from 'react-router-dom';
import LogoImage from '../../public/images/logo.png'



const SidebarTeacherMenu = [
    { name: 'Dashboard', href: '', icon: <HomeIcon className="w-6 h-6" /> },
    { name: 'MisA Aulas', href: 'Rooms', icon: <PresentationChartBarIcon className="w-6 h-6" /> }
]

const SidebarTeacher = () => {

    return (
        <div className={`z-10 fixed hidden xl:block w-72 xl:w-72 bg-slate-700 lg:static h-lvh`}>
            <div className="flex items-center justify-center h-24">
                <img src={LogoImage} className="w-40" alt="" />
            </div>

            <div className="flex flex-col overflow-y-auto">
                <nav className="mt-5 py-2 px-4">
                    <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">MENU</h3>
                    <ul className="mb-6 flex flex-col gap-2">
                        {
                            SidebarTeacherMenu.map((item) => (
                                <Link to={item.href} className={'group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800'}>
                                    {item.icon}
                                    {item.name}
                                </Link>
                            ))
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default SidebarTeacher;
