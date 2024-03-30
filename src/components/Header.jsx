const Header = () => {
    return (
        <>
            <header className=" bg-black text-white w-full ">
                <div className=" w-2/3 mx-auto">

                    <nav class="flex items-center justify-between flex-wrap p-2">
                        <div class="flex items-center flex-shrink-0 text-white mr-6">
                            <span class="font-semibold text-xl tracking-tight">TCC</span>
                        </div>
                        <div class="block lg:hidden">
                            <button class="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
                                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                            </button>
                        </div>
                        <div class="w-full flex-grow hidden lg:flex lg:items-center lg:w-auto sm:hidden md:hidden">
                            <div class="text-sm lg:flex-grow">
                                <a href="./" class="block mt-4 lg:inline-block lg:mt-0  hover:text-white mr-4">
                                    Home
                                </a>
                                <a href="#responsive-header" class="block mt-4 lg:inline-block lg:mt-0  hover:text-white">
                                    Blog
                                </a>
                            </div>
                            <div>
                                <a href="/login" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent  hover:bg-white mt-4 lg:mt-0 hover:text-black ">Login</a>

                                <a href="/register" class="inline-block text-sm px-4 py-2 leading-none text-white mt-4 lg:mt-0">Registro</a>
                            </div>
                        </div>
                    </nav>



                </div>
            </header>
        </>
    )
}

export default Header