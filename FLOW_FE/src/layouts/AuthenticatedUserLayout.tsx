import { Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useCurrentUser } from "../hooks/useCurrentUserQuery";
import { Outlet } from "react-router-dom";
import MainNavigation from "../features/core/MainNavigation";
import { useEffect } from "react";

const AuthenticatedUserLayout = () => {
    const { setCurrentUserInfo } = useAuth();
    const { data } = useCurrentUser("currentUser");

    useEffect(() => {
        setCurrentUserInfo(data);
    }, [data]);

    return (
        <>
            <Box
                display={"flex"}
                flexDirection={"column"}
                height={"100vh"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <MainNavigation />
                <Outlet />
            </Box>
        </>
    );
};

export default AuthenticatedUserLayout;
