import { Link, Outlet, useNavigate } from "react-router-dom";
import LogoImage from '/images/logo.png'
import { Bars2Icon, ChevronRightIcon, HomeIcon, PowerIcon, PresentationChartBarIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { useAuthStore } from "../../store/authStore";
import Swal from "sweetalert2";


const Teacher = () => {

    const navigate = useNavigate()
    const sidebarRef = useRef()
    const { session, isLogin, accountType } = useAuthStore()

    const toggleSidebar = (e) => {


        const element = e.target

        if (element.id.toString() === "toggleSidebar") {
            sidebarRef.current.classList.toggle("hidden")
        }

        if (element.id.toString() !== "toggleSidebar") {
            sidebarRef.current.classList.add("hidden")
        }
    }


    useEffect(() => {

        document.body.addEventListener('click', toggleSidebar);
        return () => {
            document.body.removeEventListener('click', toggleSidebar);
        }
    }, [])


    const disconnectHandle = () => {
        Swal.fire(
            {
                title: "Quieres Desconectarte?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, desconectar!"
            }
        ).then((result) => {
            if (result.isConfirmed) {
                navigate("/Logout")
            }
        })
    }

    return (
        <>

            <div className="flex h-screen overflow-hidden">
                <div className="hidden lg:block w-72 bg-slate-800 absolute lg:static h-lvh z-10  " ref={sidebarRef}>

                    <div className="text-center p-2 max-sm:mt-14">
                        <button>
                            <img src={LogoImage} className="w-40" alt="Tcc" />
                        </button>
                    </div>

                    <a href="#" className="p-4 bg-slate-900 block">
                        <div className="mx-4">
                            <div className="flex gap-3 justify-between items-center">
                                <span className="w-12 h-12 rounded-full overflow-hidden">
                                    <img src={`https://ui-avatars.com/api/?name=${session.name}&background=0D8ABC&color=fff`} className="w-12 h-12" alt={session.name} />
                                </span>

                                <span className="">
                                    <span className="block font-bold">{session.name}</span>
                                    <span className="text-sm block text-slate-500">{accountType()}</span>
                                </span>
                                <ChevronRightIcon width={24} hanging={24} />
                            </div>


                        </div>
                    </a>



                    <div className="flex flex-col overflow-y-auto">
                        <nav className="mt-5 py-2 px-4">
                            <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-400">MENU</h3>
                            <ul className="mb-6 flex flex-col gap-2">
                                <li>
                                    <Link to={''} className={'group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-violet-800'}>
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
                                    <button onClick={disconnectHandle} className="group relative flex items-center gap-2.5 rounded px-4 py-2 font-medium duration-300 ease-in-out hover:bg-red-700 w-full">
                                        <PowerIcon className="w-6" />
                                        Desconexión
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="flex flex-col overflow-y-auto">
                        <nav className="mt-4 py-2 px-4">
                            <ul className="mb-6 flex flex-col gap-2">

                            </ul>

                        </nav>
                    </div>

                </div>
                <div className="relative overflow-x-hidden overflow-y-auto flex flex-1 flex-col">

                    <header className="bg-slate-800 text-white z-20">
                        <ul className="flex items-center ">
                            <li>
                                <button className="p-4" id="toggleSidebar">
                                    <Bars2Icon className="w-6 h-6" id="toggleSidebar" />
                                </button>
                            </li>
                            <li>
                                <Link className="px-6 py-4 inline-block hover:bg-slate-700" to={'/'}>Home</Link>
                            </li>
                        </ul>
                    </header>
                    <div className="m-6">
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    );
}

export default Teacher;


{/* <div className="flex h-screen overflow-hidden">
            <SidebarTeacher />
            <div className="relative overflow-x-hidden overflow-y-auto flex flex-1 flex-col">
                <Header />
                <div className="m-6">
                    <Outlet />
                </div>
            </div>
        </div> */}


// <Header handle={openSidebarHandle} />

// <div className="mx-auto">

//     {/*Sidebar*/}
//     <div className={`bg-slate-950 ${showSideBar && "hidden"} w-full sm:w-[20%] xl:w-[20%] sm:block h-[100vh] fixed p-2`}>

//         <div className="p-2">
//             <ProfilePicture src={"http://localhost:5173/images/user.png"} />
//             <ProfileInfo name={session.name} />
//             <ProfileUserType type={session.type} />

//         </div>

//         <SidebarLinks text={"Home"} to={"./Home"} handle={openSidebarHandle} />
//         <SidebarLinks text={"Aula Virtual"} to={"./Rooms"} handle={openSidebarHandle} />
//         <SidebarLinks text={"Archivos"} to={"./Files"} handle={openSidebarHandle} />

//         <SidebarLinks text={"Logout"} to={"/Logout"} />

//     </div>
//     {/*Content*/}
//     <div className=" p-4 sm:ml-[20%] xl:ml-[20%]">
//         {navigation.state === "loading" ? <TopBarProgress /> : <Outlet />}
//     </div>

// </div>

