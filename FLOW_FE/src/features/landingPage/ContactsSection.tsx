import { Box, Typography, useTheme } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";

const ContactsSection = () => {
    const theme = useTheme();

    return (
        <Box
            id={"contacts"}
            display="flex"
            flexDirection="column"
            justifyContent={{ md: "space-evenly" }}
            alignItems="center"
            height={{ lg: "100vh" }}
            paddingY={{ xs: 4 }}
            width={"100%"}
        >
            <Typography variant="h3">Get in Touch</Typography>
            <Typography
                variant="h6"
                align="center"
                sx={{ marginBottom: 4, maxWidth: "600px" }}
            >
                We’d love to hear from you! Whether you have questions or just
                want to say hello, drop us a message.
            </Typography>
            <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent="center"
                alignItems="center"
                gap={4}
                sx={{ marginBottom: 4, width: "100%", maxWidth: "800px" }}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    sx={{ width: { xs: "100%", md: "33%" } }}
                >
                    <LocationOn
                        fontSize="large"
                        sx={{ color: theme.palette.secondary.main }}
                    />
                    <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                        123 Wellness Way, Cityville
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    sx={{ width: { xs: "100%", md: "33%" } }}
                >
                    <Phone
                        fontSize="large"
                        sx={{ color: theme.palette.secondary.main }}
                    />
                    <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                        <a
                            href="tel:+1234567890"
                            style={{ textDecoration: "none", color: "#000" }}
                        >
                            +1 234 567 890
                        </a>
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    textAlign="center"
                    sx={{ width: { xs: "100%", md: "33%" } }}
                >
                    <Email
                        fontSize="large"
                        sx={{ color: theme.palette.secondary.main }}
                    />
                    <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                        <a
                            href="mailto:info@flow.com"
                            style={{ textDecoration: "none", color: "#000" }}
                        >
                            info@flow.com
                        </a>
                    </Typography>
                </Box>
            </Box>
            <Box
                width="90%"
                maxWidth="800px"
                height="400px"
                borderRadius={2}
                overflow="hidden"
            >
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.802749054038!2d-122.08385168469013!3d37.38605177982559!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5caa3b03a73%3A0x1ea29f77ec6e91!2sGoogleplex!5e0!3m2!1sen!2sus!4v1637556262401!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                />
            </Box>
        </Box>
    );
};

export default ContactsSection;
