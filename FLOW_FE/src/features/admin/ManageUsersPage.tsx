import { useState } from "react";
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
import { User } from "../../types/User";
import TableContent from "../core/Table";
import Spinner from "../core/Spinner";
import usePaginatedQuery from "../../hooks/usePaginatedQuery";
import ClientEditModal from "../../modals/ClientEditModal";
import EmployeeEditModal from "../../modals/EmployeeEditModal";
import { useUpdateUserMutation } from "../../hooks/useUpdateUserMutaiton";
import { UpdateUser } from "../../types/UpdateUser";
import { UpdateStaff } from "../../types/UpdateStaff";
import Page from "../../types/Page";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useUpdateStaffMutation } from "../../hooks/useUpdateStaffMutation";
import { EntityEnum } from "../../types/EntityEnum";

interface ManageEntityPageProps {
    title: string;
    queryHook: (page: number, size: number) => UseQueryResult<Page<User>>;
    mutationKey: string;
    showAddButton?: boolean;
    renderAddModal?: (open: boolean, onClose: () => void) => JSX.Element;
    entityType: EntityEnum;
}

const tableRowCells = ["First Name", "Last Name", "Email", "Phone", "Actions"];

const ManageEntityPage = ({
    title,
    queryHook,
    mutationKey,
    showAddButton = false,
    renderAddModal,
    entityType,
}: ManageEntityPageProps) => {
    const { mutateAsync: updateUser } = useUpdateUserMutation(mutationKey);
    const { mutateAsync: updateStaff } = useUpdateStaffMutation(mutationKey);

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | undefined>(
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
    } = usePaginatedQuery<User>(queryHook);

    const renderRows = (user: User) => (
        <>
            <TableCell align="center">{user.firstName}</TableCell>
            <TableCell align="center">{user.lastName}</TableCell>
            <TableCell align="center">{user.email}</TableCell>
            <TableCell align="center">{user.phone}</TableCell>
        </>
    );

    const closeModal = () => {
        setSelectedUser(undefined);
        setErrorMessage(null);
    };

    const handleSaveClient = async (data: UpdateUser) => {
        if (selectedUser) {
            try {
                await updateUser({
                    id: selectedUser.id,
                    values: data,
                });
                closeModal();
            } catch (error) {
                if (error instanceof AxiosError) {
                    const responseError = error.response?.data;
                    const errorMessage =
                        responseError?.error || "An unexpected error occurred.";
                    setErrorMessage(errorMessage);
                } else {
                    setErrorMessage("An unexpected error occurred.");
                }
            }
        }
    };

    const handleSaveStaff = async (data: UpdateStaff) => {
        if (selectedUser) {
            try {
                await updateStaff({
                    id: selectedUser.id,
                    values: data,
                });
                closeModal();
            } catch (error) {
                if (error instanceof AxiosError) {
                    const responseError = error.response?.data;
                    const errorMessage =
                        responseError?.error || "An unexpected error occurred.";
                    setErrorMessage(errorMessage);
                } else {
                    setErrorMessage("An unexpected error occurred.");
                }
            }
        }
    };

    const handleEditClick = (userId: number) => {
        const user = data?.content.find((user: User) => user.id === userId);
        setSelectedUser(user);
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                width: { xs: "90%", md: "60%" },
                height: { xs: "90%", md: "91%" },
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
                <Typography variant="h3">{title}</Typography>
                {showAddButton && (
                    <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<AddIcon />}
                        onClick={() => setAddModalOpen(true)}
                    >
                        Add {title}
                    </Button>
                )}
            </Box>
            {error && <div>Error: {error.message}</div>}
            {isLoading ? (
                <Spinner />
            ) : (
                <TableContent<User>
                    role={entityType}
                    appointmentsPresent={true}
                    queryKey={mutationKey}
                    collection={"users"}
                    tableRowCells={tableRowCells}
                    data={data?.content || []}
                    renderRow={renderRows}
                    count={data?.totalElements || 0}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    handlePageChange={(event, newPage) =>
                        handlePageChange(event, newPage)
                    }
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    onEdit={handleEditClick}
                />
            )}
            {renderAddModal &&
                renderAddModal(addModalOpen, () => setAddModalOpen(false))}
            {selectedUser && (
                <>
                    {entityType === "client" ? (
                        <ClientEditModal
                            open={!!selectedUser}
                            onClose={closeModal}
                            onSave={handleSaveClient}
                            initialData={{
                                firstName: selectedUser.firstName,
                                lastName: selectedUser.lastName,
                                phone: selectedUser.phone,
                            }}
                            errorMessage={errorMessage}
                        />
                    ) : (
                        <EmployeeEditModal
                            open={!!selectedUser}
                            onClose={closeModal}
                            onSave={handleSaveStaff}
                            initialData={{
                                firstName: selectedUser.firstName,
                                lastName: selectedUser.lastName,
                                phone: selectedUser.phone,
                                serviceIds: selectedUser.services.map(
                                    (service) => service.id
                                ),
                            }}
                            errorMessage={errorMessage}
                        />
                    )}
                </>
            )}
            {errorMessage && (
                <Alert severity="error" onClose={() => setErrorMessage(null)}>
                    {errorMessage}
                </Alert>
            )}
        </TableContainer>
    );
};

export default ManageEntityPage;
