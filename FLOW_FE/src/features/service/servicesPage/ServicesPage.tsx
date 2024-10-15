import {
    Box,
    TablePagination,
    CircularProgress,
    Typography,
    IconButton,
    Modal,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import usePaginatedQuery from "../../../hooks/usePaginatedQuery";
import { useServices } from "../../../hooks/useServicesQuery";
import { Service } from "../../../types/Service";
import ServiceCard from "./ServiceCard";
import ServiceDetails from "./ServiceDetails";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import theme from "../../core/theme/theme";

const PageContainer = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    padding: "20px",
    height: "100vh",
    boxSizing: "border-box",
    width: "70%",
    position: "relative",
    [theme.breakpoints.down("lg")]: {
        width: "85%",
    },
});

const ServicesListContainer = styled(Box)({
    flex: 1.5,
    marginRight: "20px",
    overflowY: "auto",
});

const PaginationContainer = styled(Box)({
    alignSelf: "center",
    marginTop: "20px",
});

const ModalContainer = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "80%",
    backgroundColor: "white",
    padding: 40,
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    outline: "none",
    maxHeight: "80vh",
    overflowY: "auto",
});

const CloseButton = styled(IconButton)({
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
});

const ServicesPage = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

    const {
        data,
        isLoading,
        error,
        rowsPerPage,
        page,
        handlePageChange,
        handleChangeRowsPerPage,
    } = usePaginatedQuery<Service>(useServices);

    const [selectedService, setSelectedService] = useState<Service | null>(
        null
    );
    const [open, setOpen] = useState(false);

    const handleServiceClick = (service: Service) => {
        setSelectedService(service);
        if (isSmallScreen) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100vh"
            >
                <Typography color="error">
                    Something went wrong. Please try again later.
                </Typography>
            </Box>
        );
    }

    return (
        <PageContainer>
            <ServicesListContainer>
                {data?.content.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                        onClick={() => handleServiceClick(service)}
                    />
                ))}
                <PaginationContainer>
                    <TablePagination
                        component="div"
                        count={data?.totalElements || 0}
                        page={page}
                        onPageChange={handlePageChange}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </PaginationContainer>
            </ServicesListContainer>

            {!isSmallScreen && selectedService && (
                <ServiceDetails service={selectedService} />
            )}

            {isSmallScreen && (
                <Modal open={open} onClose={handleClose}>
                    <ModalContainer>
                        <CloseButton onClick={handleClose}>
                            <CloseIcon />
                        </CloseButton>
                        {selectedService && (
                            <ServiceDetails service={selectedService} />
                        )}
                    </ModalContainer>
                </Modal>
            )}
        </PageContainer>
    );
};

export default ServicesPage;
