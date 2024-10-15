import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RoleEnum } from "../types/RoleEnum";

const AdminRoute = () => {
    const { user } = useAuth();

    return user?.role === RoleEnum.Admin ? (
        <Outlet />
    ) : (
        <Navigate to={"/home"} />
    );
};

export default AdminRoute;
