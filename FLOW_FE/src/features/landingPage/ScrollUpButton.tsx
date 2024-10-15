import { ArrowUpward } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-scroll";

const ScrollUpButton = () => {
    return (
        <Link to="hero" smooth={true} duration={500}>
            <Button
                sx={{
                    position: "fixed",
                    bottom: 40,
                    right: 40,
                    borderRadius: "50%",
                    aspectRatio: "1/1",
                }}
                variant="contained"
                color="secondary"
            >
                <ArrowUpward />
            </Button>
        </Link>
    );
};

export default ScrollUpButton;
