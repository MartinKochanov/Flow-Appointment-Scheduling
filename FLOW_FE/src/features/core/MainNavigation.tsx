import { useState } from "react";
import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Divider,
    Box,
    Button,
    Typography,
    ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BadgeIcon from "@mui/icons-material/Badge";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SecondaryNavigation from "./SecondaryNavigation";
import ConfirmationModal from "../../modals/ConfirmationModal";
import CalendarToday from "@mui/icons-material/CalendarToday";
import { RoleEnum } from "../../types/RoleEnum";

const MainNavigation = () => {
    const navigate = useNavigate();
    const { auth, logOutSubmitHandler, user } = useAuth();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen((open) => !open);
    };

    const toggleModal = () => {
        setModalOpen((open) => !open);
    };

    const handleConfirmSignOut = () => {
        logOutSubmitHandler();
        navigate("/");
        setModalOpen(false);
    };

    return (
        <>
            <IconButton
                color="inherit"
                edge="start"
                onClick={toggleDrawer}
                sx={{ position: "fixed", top: 16, left: 16 }}
            >
                <MenuIcon color="secondary" />
            </IconButton>

            <Drawer variant="persistent" anchor="left" open={drawerOpen}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    width={240}
                    p={1}
                >
                    <Button variant="text" color="secondary">
                        <Typography variant="h6">Flow</Typography>
                    </Button>
                    <IconButton onClick={toggleDrawer}>
                        <MenuIcon color="secondary" />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    <ListItemButton component={Link} to={"/home"}>
                        <ListItemIcon>
                            <HomeIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/services">
                        <ListItemIcon>
                            <BusinessCenterIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Services" />
                    </ListItemButton>

                    <ListItemButton component={Link} to="/profile">
                        <ListItemIcon>
                            <AccountCircleIcon color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>

                    {user?.role !== RoleEnum.Admin && (
                        <ListItemButton component={Link} to="/appointments">
                            <ListItemIcon>
                                <CalendarToday color="secondary" />
                            </ListItemIcon>
                            <ListItemText primary="Appointments" />
                        </ListItemButton>
                    )}

                    {user?.role === RoleEnum.Admin && (
                        <>
                            <Divider />
                            <ListItem>
                                <ListItemIcon>
                                    <AdminPanelSettingsIcon color="secondary" />
                                </ListItemIcon>
                                <Typography variant="h6" color="secondary">
                                    Admin
                                </Typography>
                            </ListItem>

                            <ListItemButton component={Link} to="/manage-users">
                                <ListItemIcon>
                                    <GroupIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText primary="Manage Clients" />
                            </ListItemButton>

                            <ListItemButton component={Link} to="/manage-staff">
                                <ListItemIcon>
                                    <BadgeIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText primary="Manage Staff" />
                            </ListItemButton>

                            <ListItemButton
                                component={Link}
                                to="/manage-services"
                            >
                                <ListItemIcon>
                                    <DashboardIcon color="secondary" />
                                </ListItemIcon>
                                <ListItemText primary="Manage Services" />
                            </ListItemButton>
                        </>
                    )}

                    {auth && (
                        <>
                            <Divider />
                            <ListItemButton onClick={toggleModal}>
                                <ListItemIcon>
                                    <LogoutIcon color="error" />
                                </ListItemIcon>
                                <ListItemText primary="Sign Out" />
                            </ListItemButton>
                        </>
                    )}
                </List>
            </Drawer>

            {!drawerOpen && (
                <SecondaryNavigation
                    toggleModal={toggleModal}
                    toggleDrawer={toggleDrawer}
                />
            )}

            <ConfirmationModal
                dialogTitle={"Confirm Sign Out"}
                dialogText={"Are you sure you want to sign out?"}
                open={modalOpen}
                onClose={toggleModal}
                onConfirm={handleConfirmSignOut}
            />
        </>
    );
};

export default MainNavigation;
