import { Box, Typography, Button } from "@mui/material";
import ServiceCard from "./LandingServiceCard";
import fitnessImage from "/fitness.jpg";
import massageImage from "/spa.avif";
import skinCareImage from "/skincare-4.avif";
import { Link } from "react-router-dom";

const OurServicesSection = () => {
    return (
        <Box
            id={"services"}
            display="flex"
            flexDirection="column"
            justifyContent={{ md: "space-evenly" }}
            alignItems="center"
            height={{ lg: "100vh" }}
            paddingY={{ xs: 10, md: 0 }}
            width={"100%"}
            gap={"3em"}
            borderBottom={"1px solid #ef6c00"}
        >
            <Typography variant="h3" gutterBottom>
                Our Services
            </Typography>
            <Box
                display={"flex"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                width={"100%"}
                marginTop={"2em"}
                gap={6}
                flexDirection={{ xs: "column", md: "row" }}
            >
                <ServiceCard
                    service={{ name: "Fitness", image: fitnessImage }}
                />

                <ServiceCard
                    service={{ name: "Massage", image: massageImage }}
                />

                <ServiceCard
                    service={{ name: "Skin Care", image: skinCareImage }}
                />
            </Box>
            <Link to={"/services"}>
                <Button
                    variant="outlined"
                    color={"secondary"}
                    sx={{ marginBottom: { xs: 6, lg: 0 } }}
                >
                    And More
                </Button>
            </Link>
        </Box>
    );
};

export default OurServicesSection;
