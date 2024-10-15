import React from "react";
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
} from "@mui/material";
import theme from "./theme/theme";
import { Edit, Delete, CalendarToday } from "@mui/icons-material";
import { ReactNode } from "react";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { useDelete } from "../../hooks/useDeleteMutation";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { EntityEnum } from "../../types/EntityEnum";

interface TableContentProps<T> {
    queryKey: string;
    collection: string;
    tableRowCells: string[];
    data: T[];
    renderRow: (item: T) => ReactNode;
    count: number;
    page: number;
    rowsPerPage: number;
    handlePageChange: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => void;
    handleChangeRowsPerPage: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onEdit: (itemId: number) => void;
    appointmentsPresent?: boolean;
    role?: EntityEnum;
}

const TableContent = <T extends { id: number }>({
    queryKey,
    collection,
    tableRowCells,
    data,
    renderRow: renderRows,
    count,
    page,
    rowsPerPage,
    handlePageChange,
    handleChangeRowsPerPage,
    onEdit,
    appointmentsPresent,
    role,
}: TableContentProps<T>) => {
    const [confirmationModalOpen, setConfirmationModalOpen] =
        React.useState<boolean>(false);
    const [itemId, setItemId] = React.useState<number>(0);

    const queryClient = useQueryClient();
    const toggleModal = () => {
        setConfirmationModalOpen((confirmation) => !confirmation);
    };

    const { mutateAsync: remove } = useDelete(itemId, collection);

    const handleDelete = async () => {
        try {
            await remove();
            toggleModal();
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: { xs: "100%", md: "calc(100% - 64px)" },
            }}
        >
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                }}
            >
                <Table>
                    <TableHead
                        sx={{
                            position: "sticky",
                            top: 0,
                            backgroundColor: theme.palette.background.paper,
                            zIndex: 1,
                        }}
                    >
                        <TableRow>
                            {tableRowCells.map((cell) => (
                                <TableCell
                                    align="center"
                                    key={cell}
                                    sx={{
                                        color: theme.palette.secondary.main,
                                    }}
                                >
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length ? (
                            data.map((item) => (
                                <TableRow key={item.id}>
                                    {renderRows(item)}
                                    <TableCell
                                        align="center"
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Button
                                            startIcon={
                                                <Edit color="secondary" />
                                            }
                                            onClick={() => onEdit(item.id)}
                                        />
                                        <Button
                                            onClick={() => {
                                                toggleModal();
                                                setItemId(item.id);
                                            }}
                                            startIcon={<Delete color="error" />}
                                        />
                                        {appointmentsPresent && (
                                            <Link
                                                to={`/${role}/${item.id}/appointments`}
                                            >
                                                <Button
                                                    startIcon={
                                                        <CalendarToday color="success" />
                                                    }
                                                ></Button>
                                            </Link>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={tableRowCells.length}
                                    align="center"
                                >
                                    No data available
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Box>
            <TablePagination
                component="div"
                count={count}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{ flexShrink: 0 }}
            />

            <ConfirmationModal
                dialogTitle={"Confirm Delete"}
                dialogText={"Are you sure you want to delete this?"}
                open={confirmationModalOpen}
                onClose={toggleModal}
                onConfirm={handleDelete}
            />
        </Box>
    );
};

export default TableContent;
