const Header = () => {

    return (
        <>
            <header className=" w-full ">
                <div className=" w-2/3 mx-auto">

                    <nav className="flex items-center justify-between flex-wrap p-2">
                        <div className="flex items-center flex-shrink-0 mr-6">
                            <span v="font-semibold text-xl tracking-tight">TCC</span>
                        </div>
                        <div className="block lg:hidden">
                            <button className="flex items-center px-3 py-2 border rounded  border-black  ">
                                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                            </button>
                        </div>
                        <div className="w-full flex-grow hidden lg:flex lg:items-center lg:w-auto sm:hidden md:hidden">
                            <div className="text-sm lg:flex-grow">
                                <a href="./" className="block mt-4 lg:inline-block lg:mt-0 hover:font-semibold mr-4">
                                    Home
                                </a>
                                <a href="#responsive-header" className="block mt-4 lg:inline-block hover:font-semibold lg:mt-0  ">
                                    Blog
                                </a>
                            </div>
                            <div>
                                <a href="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded border-black hover:bg-black hover:text-white hover:border-transparent  mt-4 lg:mt-0  ">Login</a>

                                <a href="/register" className="inline-block text-sm px-4 py-2 leading-none  mt-4 lg:mt-0">Registro</a>
                            </div>
                        </div>
                    </nav>



                </div>
            </header>
        </>
    )
}

export default Header