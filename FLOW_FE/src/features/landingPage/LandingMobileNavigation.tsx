import {
    Button,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
} from "@mui/material";
import { Link } from "react-scroll";
import { Link as RouteLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface MobileNavigationProps {
    drawerOpen: boolean;
    toggleDrawer: () => void;
}

const MobileNavigation = ({
    drawerOpen,
    toggleDrawer,
}: MobileNavigationProps) => {
    const { auth } = useAuth();

    return (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
            <List sx={{ width: 300 }}>
                <ListItem component="div">
                    <Link to="services" smooth={true} duration={500}>
                        <ListItemButton onClick={toggleDrawer}>
                            <ListItemText primary="Services" />
                        </ListItemButton>
                    </Link>
                </ListItem>

                <ListItem component="div">
                    <Link to="about" smooth={true} duration={500}>
                        <ListItemButton onClick={toggleDrawer}>
                            <ListItemText primary="About" />
                        </ListItemButton>
                    </Link>
                </ListItem>

                <ListItem component="div">
                    <Link to="contacts" smooth={true} duration={500}>
                        <ListItemButton onClick={toggleDrawer}>
                            <ListItemText primary="Contact" />
                        </ListItemButton>
                    </Link>
                </ListItem>

                {!auth && (
                    <ListItem component="div">
                        <RouteLink to="/sign-in">
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={toggleDrawer}
                            >
                                <ListItemText primary="Sign In" />
                            </Button>
                        </RouteLink>
                    </ListItem>
                )}
            </List>
        </Drawer>
    );
};

export default MobileNavigation;
