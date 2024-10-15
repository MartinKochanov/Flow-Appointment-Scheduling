import {
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import BadgeIcon from "@mui/icons-material/Badge";
import GroupIcon from "@mui/icons-material/Group";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CalendarToday } from "@mui/icons-material";
import { RoleEnum } from "../../types/RoleEnum";

interface IconOnlyDrawerProps {
    toggleDrawer: () => void;
    toggleModal: () => void;
}

const SecondaryNavigation = ({
    toggleDrawer,
    toggleModal,
}: IconOnlyDrawerProps) => {
    const { auth, user } = useAuth();

    const listItemButtonStyle = {
        padding: "0.5em 0",
        display: "flex",
        justifyContent: "center",
    };

    const listItemIconStyle = { display: "flex", justifyContent: "center" };

    return (
        <Drawer
            sx={{ display: { xs: "none", md: "block" } }}
            variant="permanent"
            anchor="left"
        >
            <List sx={{ width: 70 }}>
                <ListItemButton sx={listItemButtonStyle} onClick={toggleDrawer}>
                    <ListItemIcon sx={listItemIconStyle}>
                        <MenuIcon color="secondary" />
                    </ListItemIcon>
                </ListItemButton>

                <Divider sx={{ margin: "1em 0" }} />

                <ListItemButton
                    sx={listItemButtonStyle}
                    component={Link}
                    to={"/home"}
                >
                    <ListItemIcon sx={listItemIconStyle}>
                        <HomeIcon color="secondary" />
                    </ListItemIcon>
                </ListItemButton>

                <ListItemButton
                    sx={listItemButtonStyle}
                    component={Link}
                    to="/services"
                >
                    <ListItemIcon sx={listItemIconStyle}>
                        <BusinessCenterIcon color="secondary" />
                    </ListItemIcon>
                </ListItemButton>

                <ListItemButton
                    sx={listItemButtonStyle}
                    component={Link}
                    to="/profile"
                >
                    <ListItemIcon sx={listItemIconStyle}>
                        <AccountCircleIcon color="secondary" />
                    </ListItemIcon>
                </ListItemButton>

                {user?.role !== RoleEnum.Admin && (
                    <ListItemButton
                        sx={listItemButtonStyle}
                        component={Link}
                        to="/appointments"
                    >
                        <ListItemIcon sx={listItemIconStyle}>
                            <CalendarToday color="secondary" />
                        </ListItemIcon>
                    </ListItemButton>
                )}

                {user?.role === "ADMIN" && (
                    <>
                        <ListItemButton
                            sx={listItemButtonStyle}
                            component={Link}
                            to="/manage-users"
                        >
                            <ListItemIcon sx={listItemIconStyle}>
                                <GroupIcon color="secondary" />
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton
                            sx={listItemButtonStyle}
                            component={Link}
                            to="/manage-staff"
                        >
                            <ListItemIcon sx={listItemIconStyle}>
                                <BadgeIcon color="secondary" />
                            </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton
                            sx={listItemButtonStyle}
                            component={Link}
                            to="/manage-services"
                        >
                            <ListItemIcon sx={listItemIconStyle}>
                                <DashboardIcon color="secondary" />
                            </ListItemIcon>
                        </ListItemButton>
                    </>
                )}

                {auth && (
                    <ListItemButton
                        sx={listItemButtonStyle}
                        onClick={toggleModal}
                    >
                        <ListItemIcon sx={listItemIconStyle}>
                            <LogoutIcon color="error" />
                        </ListItemIcon>
                    </ListItemButton>
                )}
            </List>
        </Drawer>
    );
};

export default SecondaryNavigation;
