import {Navigate, Outlet} from "react-router-dom";

export const ProtectRoute = () => {
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to="/auth" replace/>
    }
    return <Outlet/>
}