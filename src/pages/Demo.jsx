import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CounterSection from '../components/CounterSection';
import ChartSection from '../components/ChartSection';
import ChatSection from '../components/ChatSection';
import { PresentationChartLineIcon, HomeIcon, FolderOpenIcon, UserIcon, Cog6ToothIcon, UsersIcon } from '@heroicons/react/24/solid';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';

const Demo = () => {

    const [userMenu, setUserMenu] = useState(false)

    const userMenuHandle = (e) => {
        e.preventDefault()
        setUserMenu(!userMenu)
    }

    return (

        <>
            <div className="flex h-screen overflow-hidden">
                <div className="hidden lg:block w-72 bg-slate-800 absolute lg:static h-screen">

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
                                        <a href='#' to={"./Home"} className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800 ">
                                            <div className='w-6 h-6'>
                                                <HomeIcon />
                                                {/* <PaperClipIcon /> */}
                                            </div>

                                            HOME
                                        </a>
                                    </li>
                                    <li>

                                        <a href='#' className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800">

                                            <div className='w-6 h-6'>
                                                <PresentationChartLineIcon />
                                            </div>

                                            AULA VIRTUAL
                                        </a>
                                    </li>

                                    <li>

                                        <a href='#' className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800">

                                            <div className='w-6 h-6'>
                                                <FolderOpenIcon />
                                            </div>

                                            Archivos
                                        </a>
                                    </li>

                                    <li>

                                        <a href='#' className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800">

                                            <div className='w-6 h-6'>
                                                <UsersIcon />
                                            </div>

                                            Alumnos
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">MENU</h3>
                                <ul className="mb-6 flex flex-col gap-2">
                                    <li>
                                        <a href='#' to={"./Home"} className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800 ">
                                            <div className='w-6 h-6'>
                                                <HomeIcon />
                                                {/* <PaperClipIcon /> */}
                                            </div>

                                            HOME
                                        </a>
                                    </li>
                                    <li>

                                        <a href='#' className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800">

                                            <div className='w-6 h-6'>
                                                <PresentationChartLineIcon />
                                            </div>

                                            AULA VIRTUAL
                                        </a>
                                    </li>

                                    <li>

                                        <a href='#' className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800">

                                            <div className='w-6 h-6'>
                                                <FolderOpenIcon />
                                            </div>

                                            Archivos
                                        </a>
                                    </li>

                                    <li>

                                        <a href='#' className="group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800">

                                            <div className='w-6 h-6'>
                                                <UsersIcon />
                                            </div>

                                            Alumnos
                                        </a>
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
                                        <span className="block font-bold">John Wick</span>
                                        <span className="block text-slate-500">User</span>
                                    </span>
                                    <span className="rounded-full p-1 bg-slate-700">
                                        <img src="/images/JohnWick.png" className="w-12 h-12 rounded-full" alt="" />
                                    </span>


                                </a>

                                <div className={`absolute bg-slate-800 text-white right-0 mt-4 font-semibold w-64 mr-3 ${userMenu ? 'block' : 'hidden'} shadow border-slate-700 border`}>
                                    <ul className="flex flex-col gap-5 border-b border-slate-700 px-4 py-6">
                                        <li>
                                            <a href="/" className="flex items-center gap-4">

                                                <div className='w-6 h-6'>
                                                    <UserIcon />
                                                </div>
                                                My Profile
                                            </a>
                                        </li>

                                        <li>
                                            <a href="/" className="flex items-center gap-4">

                                                <div className='w-6 h-6'>
                                                    <Cog6ToothIcon />
                                                </div>
                                                Configuración
                                            </a>
                                        </li>

                                    </ul>

                                    <ul className="flex flex-col gap-5 border-b border-slate-700 px-4 py-6">
                                        <li>
                                            <a href="/" className="flex items-center gap-4">

                                                <div className='w-6 h-6'>
                                                    <ArrowLeftEndOnRectangleIcon />
                                                </div>
                                                Logout
                                            </a>
                                        </li>

                                    </ul>

                                </div>
                            </div>
                        </div>

                    </header>
                    <div className="px-7 py-4">

                        <div className="xl:mx-6 flex flex-col gap-4">
                            <CounterSection />
                            <ChartSection />
                            <ChatSection />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Demo;
