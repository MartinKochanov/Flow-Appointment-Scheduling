import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PublicRoute = () => {
    const { auth } = useAuth();
    return auth ? <Navigate to={"/home"} /> : <Outlet />;
};

export default PublicRoute;
