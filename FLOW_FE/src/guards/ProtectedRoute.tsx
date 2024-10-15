import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth ? (
        <Outlet />
    ) : (
        <Navigate
            to={`/sign-in?redirectTo=${encodeURIComponent(location.pathname)}`}
            state={{ from: location }}
            replace
        />
    );
};

export default ProtectedRoute;
