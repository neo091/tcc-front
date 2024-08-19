import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

const LoginRegisterLinks = () => {
    return (
        <>
            <Link to={"/Login"} className="inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:bg-black hover:text-white hover:border-transparent  ">Login</Link>
            <Link to={"/Register"} className="inline-block text-sm px-4 py-2 leading-none ">Register</Link>

        </>
    )
}

const LoggedLinks = ({ to, children }) => {
    return (
        <Link to={to} className="inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:bg-black hover:text-white hover:border-transparent lg:mt-0">
            {children}
        </Link>
    )
}


const Header = ({ handle }) => {

    const { session, isLoggin } = useAuthStore()

    const openSidebar = () => {
        handle()
    }

    return (
        <>
            <header className='bg-slate-800 sticky'>
                <div className='w-3/4 mx-auto'>
                    <div className='flex items-center'>
                        <div className='p-4'>
                            TCC
                        </div>
                        <div className='flex-1'>
                            <nav>
                                <ul className='flex items-center justify-center'>
                                    <li><a href="/" className='p-4 block hover:bg-slate-700'>Home</a></li>
                                </ul>
                            </nav>
                        </div>

                        <div>
                            <ul className='flex items-center gap-4'>
                                <li><a href="/Login" className='p-2 block bg-sky-600 rounded'>Login</a></li>
                                <li><a href="/Register" className='p-2 block border border-transparent hover:border-sky-600 rounded transition-all duration-500'>Registro</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header