import { useState } from "react";
import { Duration } from "luxon";
import {
    Box,
    Button,
    Paper,
    TableCell,
    TableContainer,
    Typography,
    Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Service } from "../../../types/Service";
import TableContent from "../../core/Table";
import Spinner from "../../core/Spinner";
import usePaginatedQuery from "../../../hooks/usePaginatedQuery";
import { AxiosError } from "axios";
import { useServices } from "../../../hooks/useServicesQuery";
import AddServiceModal from "../../../modals/AddServiceModal";
import ServiceEditModal from "../../../modals/ServiceEditModal";
import { useUpdateServiceMutation } from "../../../hooks/useUpdateServiceMutation";
import { CreateServiceCredentials } from "../../../types/CreateServiceCredentials";

const tableRowCells = ["Name", "Description", "Duration", "Price", "Actions"];

const ManageServicesPage = () => {
    const { mutateAsync: updateService } = useUpdateServiceMutation("services");

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | undefined>(
        undefined
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        data,
        isLoading,
        error,
        rowsPerPage,
        page,
        handlePageChange,
        handleChangeRowsPerPage,
    } = usePaginatedQuery<Service>(useServices);

    const renderRows = (service: Service) => (
        <>
            <TableCell align="center">{service.name}</TableCell>
            <TableCell align="center">
                {service.description.length > 50
                    ? `${service.description.substring(0, 50)}...`
                    : service.description}
            </TableCell>
            <TableCell align="center">
                {`${Duration.fromISO(service.duration).as("minute")}min`}
            </TableCell>
            <TableCell align="center">{`$${service.price}`}</TableCell>
        </>
    );

    const closeModal = () => {
        setSelectedService(undefined);
        setErrorMessage(null);
    };

    const handleSaveService = async (data: CreateServiceCredentials) => {
        if (selectedService) {
            try {
                await updateService({ id: selectedService.id, values: data });
                closeModal();
            } catch (error) {
                if (error instanceof AxiosError) {
                    const responseError = error.response?.data;
                    const errorMessage =
                        responseError?.detail ||
                        responseError?.title ||
                        "An unexpected error occurred.";
                    setErrorMessage(errorMessage);
                } else {
                    setErrorMessage("An unexpected error occurred.");
                }
            }
        }
    };

    const handleEditClick = (serviceId: number) => {
        const service = data?.content.find(
            (service: Service) => service.id === serviceId
        );
        setSelectedService(service);
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                width: { xs: "90%", md: "60%" },
                height: "92%",
                overflowY: "auto",
            }}
        >
            <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                gap={3}
                paddingX={5}
            >
                <Typography variant="h3">Services</Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={() => setAddModalOpen(true)}
                >
                    Add Service
                </Button>
            </Box>
            {error && <div>Error: {error.message}</div>}
            {isLoading ? (
                <Spinner />
            ) : (
                <TableContent<Service>
                    queryKey="services"
                    collection={"services"}
                    tableRowCells={tableRowCells}
                    data={data?.content || []}
                    renderRow={renderRows}
                    count={data?.totalElements || 0}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handlePageChange={handlePageChange}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    onEdit={handleEditClick}
                />
            )}
            {
                <AddServiceModal
                    onClose={() => setAddModalOpen(false)}
                    open={addModalOpen}
                />
            }
            {selectedService && (
                <ServiceEditModal
                    open={!!selectedService}
                    onClose={closeModal}
                    onSave={handleSaveService}
                    initialData={{
                        id: selectedService.id,
                        name: selectedService.name,
                        description: selectedService.description,
                        duration: Duration.fromISO(selectedService.duration).as(
                            "minutes"
                        ),
                        price: selectedService.price,
                    }}
                    errorMessage={errorMessage}
                />
            )}
            {errorMessage && (
                <Alert severity="error" onClose={() => setErrorMessage(null)}>
                    {errorMessage}
                </Alert>
            )}
        </TableContainer>
    );
};

export default ManageServicesPage;
