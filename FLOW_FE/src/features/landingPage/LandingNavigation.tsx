import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Stack, Box } from "@mui/material";
import { Link } from "react-scroll";
import { Link as RouteLink } from "react-router-dom";
import MobileNavigation from "./LandingMobileNavigation";
import { useAuth } from "../../context/AuthContext";

const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { auth } = useAuth();

    const toggleDrawer = () => {
        setDrawerOpen((open) => !open);
    };

    return (
        <>
            <AppBar
                id={"navigation"}
                position="fixed"
                sx={{
                    backgroundColor: "transparent",
                    boxShadow: "none",
                    background:
                        "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3))",
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        <Button color="inherit" href="/">
                            Flow
                        </Button>
                    </Typography>
                    <Box sx={{ display: { xs: "none", md: "block" } }}>
                        <Stack spacing={2} direction="row">
                            <Link to={"services"} smooth={true} duration={500}>
                                <Button color="inherit">Services</Button>
                            </Link>

                            <Link to={"about"} smooth={true} duration={500}>
                                <Button color="inherit">About</Button>
                            </Link>

                            <Link to={"contacts"} smooth={true} duration={500}>
                                <Button color="inherit" href="#contact">
                                    Contact
                                </Button>
                            </Link>
                            {!auth && (
                                <RouteLink to={"sign-in"}>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                    >
                                        Sign In
                                    </Button>
                                </RouteLink>
                            )}
                        </Stack>
                    </Box>
                    <Box sx={{ display: { xs: "block", md: "none" } }}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <MobileNavigation
                drawerOpen={drawerOpen}
                toggleDrawer={toggleDrawer}
            />
        </>
    );
};

export default Navigation;
