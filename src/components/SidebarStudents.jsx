import { ArrowLeftStartOnRectangleIcon, ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, HomeIcon, PresentationChartBarIcon, UserCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { SidebarLinkLogout, SidebarLink } from "./SidebarLink";
import { useAuth } from "@hooks/useAuth";
import Swal from "sweetalert2";


const SidebarStudents = ({ showMenu, toggleMenuHandle }) => {

  const { Logout } = useAuth()

  const handleLogout = () => {

    Swal.fire({
      title: "Quieres desconectarte?",
      confirmButtonText: 'Si, desconectar ahora!',
      cancelButtonText: 'No, seguir conectado',
      showCancelButton: true,
      confirmButtonColor: '#dc2626'
    }).then(result => {
      if (result.isConfirmed) {
        Logout()
      }
    })
  }

  return (

    <aside className={`h-screen max-md:fixed max-md:w-60 max-lg:w-16  ${!showMenu && "max-md:-left-60 max-md:hidden"} max-md:bg-slate-800 transition-all duration-300 z-20 `}>
      <div className="flex items-center justify-between ">
        <div className="max-xl:w-30">
          <img src="/images/logo.png" />
        </div>
        <div className="hidden max-md:inline-block" onClick={toggleMenuHandle}>
          <XMarkIcon className="w-6 h-6" />
        </div>
      </div>

      <div className="flex flex-col relative bg-slate-800 h-[88vh] max-md:h-screen  top-5 shadow-slate-950 shadow-lg rounded-xl hover:shadow-none transition-all ease-in-out duration-300 overflow-hidden max-md:overflow-visible " onClick={toggleMenuHandle}>
        <SidebarLink to={"Profile"} text={"Perfil"} >
          <UserCircleIcon className="w-8 h-8" />
        </SidebarLink>

        <SidebarLink to={'/Dashboard'} text={'Dashboard'}>
          <HomeIcon className="w-8 h-8" />
        </SidebarLink>

        <SidebarLink to={"Rooms"} text="Mis Aulas">
          <PresentationChartBarIcon className="w-8 h-8" />
        </SidebarLink>

        <SidebarLink to={"Courses"} text="Aulas Virtuales">
          <ChartBarIcon className="w-8 h-8" />
        </SidebarLink>

        <SidebarLink to={"Chatbot"} text="Chatbot">
          <ChatBubbleOvalLeftEllipsisIcon className="w-8 h-8" />
        </SidebarLink>

        <SidebarLinkLogout handle={handleLogout} text="Logout">
          <ArrowLeftStartOnRectangleIcon className="w-8 h-8" />
          <h2 className="max-xl:hidden"></h2>
        </SidebarLinkLogout>

      </div>

    </aside>

  );
}

export default SidebarStudents;
