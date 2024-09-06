import { Link, NavLink } from "react-router-dom"

const EnlaceDefault = ({ text, to, children }) => {
    return (
        <>
            <NavLink to={to}
                className={({ isActive, isPending }) =>
                    isActive
                        ? "bg-violet-900 text-center rounded text-white py-2 hover:scale-105 duration-200 px-10"
                        : isPending
                            ? "pending"
                            : "bg-violet-900 text-center rounded text-white py-2 hover:scale-105 duration-200 px-10"
                }

            >
                {text ? text : children}
            </NavLink>
        </>
    )
}


export default EnlaceDefault 