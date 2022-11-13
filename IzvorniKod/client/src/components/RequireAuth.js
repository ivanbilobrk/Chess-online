import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt_decode from "jwt-decode";

const RequireAuth = ({allowedRoles}) =>{
    const{auth} = useAuth();
    const location = useLocation();
    const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined

    console.log(decoded)

    const roleAuth = decoded?.role || undefined;

    return(
        allowedRoles.find(role => role === roleAuth) ?
             <Outlet /> : 
             auth?.user ? <Navigate to="/unauthorized" state={{from:location}} replace/>:<Navigate to="/login" state={{from: location}} replace/>
    );
}

export default RequireAuth;