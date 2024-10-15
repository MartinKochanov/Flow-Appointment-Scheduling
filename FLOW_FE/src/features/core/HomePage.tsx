import {
    Box,
    Typography,
    Button,
    List,
    ListItem,
    Divider,
    Collapse,
    IconButton,
    Card,
    CardContent,
    Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ContactsSection from "../landingPage/ContactsSection";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VideocamIcon from "@mui/icons-material/Videocam";

const Container = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "3em",
    textAlign: "center",
    minHeight: "100vh",
});

const Section = styled(Box)({
    margin: "30px 0",
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    position: "relative",
});

const SectionHeader = styled(Typography)({
    position: "absolute",
    top: "-20px",
    left: "20px",
    backgroundColor: "#fff",
    padding: "0 10px",
    fontWeight: 600,
    fontSize: "1.5rem",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
});

const FAQList = styled(List)({
    textAlign: "left",
    margin: "20px 0",
});

const FAQItem = styled(ListItem)({
    padding: "15px 20px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "8px",
    "&:hover": {
        backgroundColor: "#f0f0f0",
    },
});

const FAQContent = styled(Box)({
    padding: "10px 16px",
    transition: "max-height 0.3s ease-out",
    overflow: "hidden",
});

const TestimonialsCard = styled(Card)({
    margin: "10px 0",
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
});

const FAQIcon = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10px",
    color: "#6c6c6c",
});

const HomePage = () => {
    const [openFAQ, setOpenFAQ] = useState<string | null>(null);

    const handleFAQClick = (question: string) => {
        setOpenFAQ(openFAQ === question ? null : question);
    };

    const testimonials = [
        {
            name: "Jane Doe",
            text: "Excellent service and support. Highly recommend!",
        },
        {
            name: "John Smith",
            text: "Professional and reliable. They exceeded our expectations.",
        },
        {
            name: "Emily Johnson",
            text: "The team was incredibly knowledgeable and helpful. Will definitely use their services again.",
        },
        {
            name: "Michael Brown",
            text: "Great experience from start to finish. The results were exactly what we needed.",
        },
    ];

    const faqs = [
        {
            question: "What services do you offer?",
            answer: "We offer a variety of services including consulting, support, and maintenance. Visit our services page for more details.",
            icon: <EmojiObjectsIcon />,
            id: "question1",
        },
        {
            question: "How can I contact support?",
            answer: "You can contact support through our contact page or directly via email at support@example.com.",
            icon: <PhoneIcon />,
            id: "question2",
        },
        {
            question: "What are your business hours?",
            answer: "Our business hours are Monday to Friday, 9 AM to 5 PM. We are closed on weekends and public holidays.",
            icon: <AccessTimeIcon />,
            id: "question3",
        },
        {
            question: "Do you offer online consultations?",
            answer: "Yes, we offer online consultations via video call. You can schedule an appointment through our website.",
            icon: <VideocamIcon />,
            id: "question4",
        },
    ];

    return (
        <Container>
            <Typography marginY={5} variant="h2" gutterBottom>
                Welcome to Flow
            </Typography>
            <Typography marginY={5} variant="h5" paragraph>
                Explore our range of services and get to know more about us.
            </Typography>
            <Button variant="contained" color="secondary" href="/services">
                View Our Services
            </Button>

            <Section>
                <SectionHeader variant="h4">What Our Clients Say</SectionHeader>
                <Grid container spacing={2}>
                    {testimonials.map((testimonial, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <TestimonialsCard>
                                <CardContent>
                                    <Typography variant="h6">
                                        {testimonial.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        {testimonial.text}
                                    </Typography>
                                </CardContent>
                            </TestimonialsCard>
                        </Grid>
                    ))}
                </Grid>
            </Section>

            <Section>
                <SectionHeader variant="h4">
                    Frequently Asked Questions
                </SectionHeader>
                <FAQList>
                    {faqs.map((faq) => (
                        <div key={faq.id}>
                            <FAQItem onClick={() => handleFAQClick(faq.id)}>
                                <FAQIcon>{faq.icon}</FAQIcon>
                                <Typography variant="h6">
                                    {faq.question}
                                </Typography>
                                <IconButton>
                                    {openFAQ === faq.id ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </IconButton>
                            </FAQItem>
                            <Collapse in={openFAQ === faq.id}>
                                <FAQContent>
                                    <Typography variant="body1">
                                        {faq.answer}
                                    </Typography>
                                </FAQContent>
                            </Collapse>
                            <Divider />
                        </div>
                    ))}
                </FAQList>
            </Section>

            <Section>
                <ContactsSection />
            </Section>
        </Container>
    );
};

export default HomePage;
