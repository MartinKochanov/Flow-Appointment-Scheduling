import { useState } from "react";
import { useAvailableTimeSlots } from "../../hooks/useAvailableTimeSlotsQuery";
import {
    CircularProgress,
    Typography,
    Button,
    styled,
    Box,
    Snackbar,
    Alert,
} from "@mui/material";
import { format } from "date-fns";
import AppointmentConfirmationModal from "../../modals/AppointmentConfirmationModal"; // Fixed typo in component name
import { useBookAppointmentMutation } from "../../hooks/useBookAppointmentMutation";
import { useAuth } from "../../context/AuthContext";

type TimeSlotsProps = {
    employeeId: number;
    serviceId: number;
    date: string;
};

const StyledButton = styled(Button)(({ theme }) => ({
    color: "black",
    borderColor: theme.palette.secondary.main,
    margin: 4,
    padding: "8px 16px",
    textTransform: "none",
    borderRadius: 8,
}));

const TimeSlots = ({ employeeId, serviceId, date }: TimeSlotsProps) => {
    const {
        data: timeSlots,
        isLoading,
        error,
    } = useAvailableTimeSlots(employeeId, serviceId, date);

    const { user } = useAuth();

    const {
        mutate: bookAppointment,
        isError,
        isPending,
    } = useBookAppointmentMutation();

    const [open, setOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleSlotClick = (slot: string) => {
        setSelectedSlot(slot);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        if (selectedSlot) {
            bookAppointment(
                {
                    employeeId,
                    serviceId,
                    clientId: user?.id,
                    appointmentDateTime: selectedSlot,
                },
                {
                    onSuccess: () => {
                        setSnackbarMessage("Appointment booked successfully!");
                        setSnackbarOpen(true);
                        setOpen(false);
                    },
                    onError: () => {
                        setSnackbarMessage("Failed to book the appointment.");
                        setSnackbarOpen(true);
                    },
                }
            );
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (isLoading) return <CircularProgress />;
    if (error)
        return (
            <Typography color="error">Failed to load time slots.</Typography>
        );

    return (
        <Box display={"flex"} flexWrap={"wrap"} justifyContent={"center"}>
            {timeSlots?.length ? (
                timeSlots.map((slot) => (
                    <StyledButton
                        color="secondary"
                        key={slot}
                        variant="outlined"
                        onClick={() => handleSlotClick(slot)}
                    >
                        {format(new Date(slot), "HH:mm")}
                    </StyledButton>
                ))
            ) : (
                <Typography>No available time slots.</Typography>
            )}

            {selectedSlot && (
                <AppointmentConfirmationModal
                    open={open}
                    selectedSlot={selectedSlot}
                    onClose={handleClose}
                    onConfirm={handleConfirm}
                    isLoading={isPending}
                />
            )}

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={isError ? "error" : "success"}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default TimeSlots;
