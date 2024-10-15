import {
    Box,
    Container,
    Typography,
    Stack,
    IconButton,
    ListItemButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-scroll";

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#37474F",
                color: "white",
                py: 4,
                width: "100%",
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography variant="body2" align="center">
                        © {new Date().getFullYear()} Your Company. All rights
                        reserved.
                    </Typography>

                    <Stack direction="row" spacing={2}>
                        <Link to="services" smooth={true} duration={500}>
                            <ListItemButton color="inherit">
                                Services
                            </ListItemButton>
                        </Link>

                        <Link to="about" smooth={true} duration={500}>
                            <ListItemButton color="inherit">
                                About
                            </ListItemButton>
                        </Link>

                        <Link to="contacts" smooth={true} duration={500}>
                            <ListItemButton color="inherit">
                                Contact
                            </ListItemButton>
                        </Link>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <IconButton
                            href="https://facebook.com"
                            color="inherit"
                            aria-label="Facebook"
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            href="https://instagram.com"
                            color="inherit"
                            aria-label="Instagram"
                        >
                            <InstagramIcon />
                        </IconButton>
                        <IconButton
                            href="https://twitter.com"
                            color="inherit"
                            aria-label="Twitter"
                        >
                            <LinkedInIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
