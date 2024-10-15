import { Box, Typography, useTheme } from "@mui/material";
import { EmojiPeople, FitnessCenter, Spa, ThumbUp } from "@mui/icons-material";

const stats = [
    {
        icon: <EmojiPeople fontSize="large" />,
        value: "500+",
        label: "Happy Clients",
    },
    {
        icon: <FitnessCenter fontSize="large" />,
        value: "1,000+",
        label: "Hours of Fitness Classes",
    },
    {
        icon: <Spa fontSize="large" />,
        value: "800+",
        label: "Spa Treatments",
    },
    {
        icon: <ThumbUp fontSize="large" />,
        value: "99%",
        label: "Positive Feedback",
    },
];

const AboutSection = () => {
    const theme = useTheme();

    return (
        <Box
            id={"about"}
            display="flex"
            flexDirection="column"
            justifyContent={{ md: "space-evenly" }}
            alignItems="center"
            height={{ lg: "100vh" }}
            paddingBottom={{ xs: 10, lg: 0 }}
            width={"100%"}
            gap={"3em"}
            borderBottom={"1px solid #ef6c00"}
        >
            <Typography marginTop={{ xs: 8, lg: 0 }} variant="h3" gutterBottom>
                About Flow
            </Typography>

            <Typography
                variant="h5"
                paddingX={{ xs: 5, md: 0 }}
                align="center"
                sx={{
                    maxWidth: { md: "70%", lg: "50%" },
                    marginBottom: 4,
                }}
            >
                At Flow, we believe in a holistic approach to wellness. Our
                mission is to provide a sanctuary where you can find balance,
                rejuvenation, and empowerment. With years of experience and a
                passion for health, our team is dedicated to helping you achieve
                your personal wellness goals.
            </Typography>
            <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                flexWrap={{ md: "wrap", lg: "nowrap" }}
                alignItems={"center"}
                justifyContent="space-evenly"
                width="100%"
                mt={4}
            >
                {stats.map((stat, index) => (
                    <Box
                        key={index}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        padding={4}
                        margin={2}
                        textAlign="center"
                        sx={{
                            width: { xs: "50%", md: "35%" },
                            color: "#000",
                            borderRadius: 2,
                            border: "2px solid #ef6c00",
                        }}
                    >
                        <Box color={theme.palette.secondary.main} mb={2}>
                            {stat.icon}
                        </Box>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            {stat.value}
                        </Typography>
                        <Typography variant="subtitle1">
                            {stat.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default AboutSection;
