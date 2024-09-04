import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authStore"
import { useRef } from "react"
import { ArrowLeftEndOnRectangleIcon, Bars3Icon, ChevronDownIcon, ChevronUpIcon, Cog6ToothIcon, UserIcon } from "@heroicons/react/24/solid"
import { useMenu } from "../hooks/useMenu"

const Header = () => {

    const userMenuRef = useRef()
    const { session, isLogin, accountType } = useAuthStore()
    const { userMenu, toggleMenu } = useMenu({ userMenuRef })


    return (
        <>
            <header className="bg-slate-800 text-white sticky top-0 z-[999] px-8">
                <div className={`flex items-center justify-end`}>


                    <div className="flex-1">

                        <ul className="flex items-center">
                            <li>
                                <Link className="px-6 py-4 inline-block hover:bg-slate-700" to={'/'}>Home</Link>
                            </li>
                        </ul>
                    </div>
                    {
                        isLogin ?
                            <div className={`mr-4`}>
                                <a href="#" className="flex items-center gap-4" ref={userMenuRef} onClick={toggleMenu}  >
                                    <span className="">
                                        <span className="block font-bold">{session.name}</span>
                                        <span className="text-sm block text-slate-500">{accountType()}</span>
                                    </span>
                                    <span className="w-12 h-12 rounded-full overflow-hidden">
                                        <img src={`https://ui-avatars.com/api/?name=${session.name}&background=0D8ABC&color=fff`} className="w-12 h-12" alt={session.name} />
                                    </span>
                                    <span>
                                        {userMenu ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
                                    </span>
                                </a>

                                <div className={`absolute bg-slate-800 text-white right-0 mt-4 font-semibold w-64 mr-3 ${userMenu ? 'block' : 'hidden'} shadow border-slate-700 border`}>
                                    <ul className="flex flex-col gap-5 border-b border-slate-700 px-4 py-6">
                                        <li>
                                            <a href="#" className="flex items-center gap-4">
                                                <div className='w-6 h-6'>
                                                    <UserIcon />
                                                </div>
                                                My Profile
                                            </a>
                                        </li>

                                        <li>
                                            <a href="#" className="flex items-center gap-4">
                                                <div className='w-6 h-6'>
                                                    <Cog6ToothIcon />
                                                </div>
                                                Configuration
                                            </a>
                                        </li>

                                    </ul>

                                    <ul className="flex flex-col gap-5 px-4 py-6">
                                        <li>
                                            <Link to={"/Logout"} className="flex items-center gap-4 duration-300 ease-in-out ">
                                                <div className='w-6 h-6'>
                                                    <ArrowLeftEndOnRectangleIcon />
                                                </div>
                                                Logout
                                            </Link>
                                        </li>

                                    </ul>


                                </div>
                            </div>
                            :
                            <div>
                                <Link className="px-4 py-2 my-2 inline-block rounded-full bg-sky-700" to={'/Login'}>Comenzar</Link>
                            </div>

                    }

                </div>
            </header>
        </>
    )
}

export default Header