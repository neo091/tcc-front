import { destryoUser } from "../auth";
import { Navigate } from "react-router-dom";

const Logout = () => {
    destryoUser()
    return (
        <Navigate to={'../../Login'} />
    )
}

export default Logout;