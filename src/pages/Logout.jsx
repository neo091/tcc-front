import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

const Logout = () => {
    const { resetSession } = useAuthStore()

    useEffect(() => resetSession(), [])
    window.localStorage.clear()
    return (
        <Navigate to={'../../Login'} />
    )
}

export default Logout;