import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface ServiceCardProps {
    service: {
        image: string;
        name: string;
    };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
    return (
        <Card sx={{ width: { xs: "90%", sm: "70%", md: "30%" } }}>
            <CardMedia
                sx={{
                    display: "block",
                    height: "30vh",
                    width: "100%",
                    backgroundSize: "cover",
                }}
                image={service.image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {service.name}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ServiceCard;
