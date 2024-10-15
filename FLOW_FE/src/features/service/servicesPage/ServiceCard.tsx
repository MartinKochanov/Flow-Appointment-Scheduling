import {
    Card,
    CardContent,
    Typography,
    CardActions,
    Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { Service } from "../../../types/Service";
import { Duration } from "luxon";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";

type ServiceCardProps = {
    service: Service;
    onClick?: () => void;
};

const StyledCard = styled(Card)({
    width: "100%",
    marginBottom: 10,
    cursor: "pointer",
});

const ServiceName = styled(Typography)({
    fontSize: 28,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
});

const ServiceInfo = styled(Typography)({
    marginTop: 10,
    display: "flex",
    alignItems: "center",
});

const ServicePrice = styled(Typography)({
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
});

const ServiceCard = ({ service, onClick }: ServiceCardProps) => {
    const formattedDuration = Duration.fromISO(service.duration).as("minutes");

    return (
        <StyledCard onClick={onClick}>
            <CardContent>
                <ServiceName variant="h5">
                    <StarIcon color="secondary" style={{ marginRight: 8 }} />{" "}
                    {service.name}
                </ServiceName>
                <ServiceInfo variant="body1">
                    <AccessTimeIcon
                        color="secondary"
                        style={{ marginRight: 8 }}
                    />
                    Duration:
                    {formattedDuration >= 0
                        ? ` ${formattedDuration} min`
                        : " N/A"}
                </ServiceInfo>
                <ServicePrice variant="body1">
                    <AttachMoneyIcon
                        color="secondary"
                        style={{ marginRight: 8 }}
                    />
                    Price: ${service.price.toFixed(2)}
                </ServicePrice>
            </CardContent>
            <CardActions>
                <Button size="small" color="secondary" onClick={onClick}>
                    Learn More
                </Button>
            </CardActions>
        </StyledCard>
    );
};

export default ServiceCard;
