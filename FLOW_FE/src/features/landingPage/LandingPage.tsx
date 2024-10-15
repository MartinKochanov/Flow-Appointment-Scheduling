import AboutSection from "./AboutSection";
import ContactsSection from "./ContactsSection";
import HeroSection from "./HeroSection";
import ScrollUpButton from "./ScrollUpButton";
import ServicesSection from "./ServicesSection";
import Navigation from "./LandingNavigation";

const LandingPage = () => {
    return (
        <>
            <Navigation />
            <HeroSection />
            <ServicesSection />
            <AboutSection />
            <ScrollUpButton />
            <ContactsSection />
        </>
    );
};

export default LandingPage;
