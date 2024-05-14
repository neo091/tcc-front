import { NavLink } from "react-router-dom"

const SidebarLinks = ({ to, text, handle, children }) => {
    return (
        <>
            <NavLink
                to={to}
                className={({ isActive, isPending }) =>
                    isPending ? " animate-pulse p-2 w-100 block  bg-violet-600 rounded my-2" : isActive ? "p-2 w-100 block  bg-violet-800 rounded my-2" : "p-2 w-100 block  hover:bg-violet-800 rounded my-2"
                } onClick={() => handle && handle()}>
                {text ? text : children}
            </NavLink>
        </>
    )
}

export default SidebarLinks