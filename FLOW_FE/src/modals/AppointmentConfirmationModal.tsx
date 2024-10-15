import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
} from "@mui/material";
import { format } from "date-fns";

type AppointmentConfirmationModalProps = {
    open: boolean;
    isLoading: boolean;
    selectedSlot: string | null;
    onClose: () => void;
    onConfirm: () => void;
};

const AppointmentConfirmationModal = ({
    open,
    selectedSlot,
    onClose,
    onConfirm,
    isLoading,
}: AppointmentConfirmationModalProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Appointment</DialogTitle>
            <DialogContent>
                <Typography>
                    You are about to book an appointment on{" "}
                    {selectedSlot
                        ? format(new Date(selectedSlot), "ddMMMM yyyy HH:mm")
                        : ""}
                    .
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="error">
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    color="secondary"
                    variant="contained"
                    disabled={isLoading}
                >
                    {isLoading ? "Booking..." : "Confirm"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AppointmentConfirmationModal;
