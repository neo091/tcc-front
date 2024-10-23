import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

const Logout = () => {
    const { resetSession } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => resetSession(), [])
    window.localStorage.clear()
    navigate("/Login")
    return;
}

export default Logout;