import { Box } from "@mui/material";
import Footer from "../features/core/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            <Outlet />
            <Footer />
        </Box>
    );
};

export default MainLayout;
