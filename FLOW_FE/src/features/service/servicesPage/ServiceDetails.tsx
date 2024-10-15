import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Duration } from "luxon";
import EmployeeCard from "./EmployeeCard";
import { Service } from "../../../types/Service";
import DescriptionIcon from "@mui/icons-material/Description";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";

const ServiceDetailsBox = styled(Box)({
    flex: 3,
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
    maxHeight: "100%",
    overflowY: "auto",
});

const DetailItem = styled(Box)({
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
});

const ServiceName = styled(Typography)({
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
});

type ServiceDetailsProps = {
    service: Service;
};

const ServiceDetails = ({ service }: ServiceDetailsProps) => {
    return (
        <ServiceDetailsBox>
            <ServiceName variant="h5" gutterBottom>
                <InfoIcon color="secondary" style={{ marginRight: 8 }} />{" "}
                {service.name}
            </ServiceName>
            <DetailItem>
                <DescriptionIcon color="secondary" style={{ marginRight: 8 }} />
                <Typography variant="body1" gutterBottom>
                    <strong>Description:</strong> {service.description}
                </Typography>
            </DetailItem>
            <DetailItem>
                <AccessTimeIcon color="secondary" style={{ marginRight: 8 }} />
                <Typography variant="body1" gutterBottom>
                    <strong>Duration:</strong>{" "}
                    {Duration.fromISO(service.duration).as("minute")} minutes
                </Typography>
            </DetailItem>
            <DetailItem>
                <AttachMoneyIcon color="secondary" style={{ marginRight: 8 }} />
                <Typography variant="body1" gutterBottom>
                    <strong>Price:</strong> ${service.price.toFixed(2)}
                </Typography>
            </DetailItem>
            <Typography variant="body1" gutterBottom>
                <strong>Specialists:</strong>
            </Typography>
            <Box>
                {service.users.map((user) => (
                    <EmployeeCard
                        key={user.id}
                        employee={user}
                        serviceId={service.id}
                    />
                ))}
            </Box>
        </ServiceDetailsBox>
    );
};

export default ServiceDetails;
