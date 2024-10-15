import React from "react";
import { Box, Typography, Button } from "@mui/material";
import backgroundImage from "/hero-bg.jpg";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
    return (
        <Box
            id={"hero"}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width="100%"
            height="100vh"
            sx={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Typography variant="h1" color="white">
                Flow
            </Typography>
            <Typography variant="h2" color="white" textAlign={"center"}>
                Your Destination for Wellness
            </Typography>
            <Link to={"/sign-up"}>
                <Button
                    sx={{ marginTop: "2em" }}
                    variant="contained"
                    color="secondary"
                >
                    Get Started
                </Button>
            </Link>
        </Box>
    );
};

export default HeroSection;
