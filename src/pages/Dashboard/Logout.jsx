import { useEffect } from "react";
import { destryoUser } from "../../auth";
import { Navigate, redirect } from "react-router-dom";

const Logout = () => {
    destryoUser()
    return (
        <Navigate to={'../../Login'} />
    )

}

export default Logout;