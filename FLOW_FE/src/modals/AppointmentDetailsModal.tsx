import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
    Divider,
    IconButton,
    Box,
    Snackbar,
    Alert,
} from "@mui/material";
import { Event } from "../types/Event";
import CloseIcon from "@mui/icons-material/Close";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { styled } from "@mui/material/styles";
import { StatusEnum } from "../types/StatusEnum";
import theme from "../features/core/theme/theme";
import { useCancelAppointmentsMutation } from "../hooks/useCancelAppointmentMutation";
import { useState } from "react";
import { EntityEnum } from "../types/EntityEnum";

type AppointmentDetailsModalProps = {
    view: EntityEnum;
    event: Event;
    onClose: () => void;
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiPaper-root": {
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius * 1.5,
    },
}));

const DialogHeader = styled(DialogTitle)(({ theme }) => ({
    position: "relative",
    paddingBottom: theme.spacing(1),
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
}));

const ContentBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
}));

const InfoRow = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
}));

const AppointmentDetailsModal = ({
    view,
    event,
    onClose,
}: AppointmentDetailsModalProps) => {
    const {
        mutateAsync: cancel,
        isPending,
        isError,
    } = useCancelAppointmentsMutation(event.id);

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleCancelAppointment = () => {
        cancel(event.id, {
            onSuccess: () => {
                setSnackbarMessage("Appointment canceled successfully!");
                setSnackbarOpen(true);
                onClose();
            },
            onError: () => {
                setSnackbarMessage("Failed to cancel the appointment.");
                setSnackbarOpen(true);
            },
        });
    };

    return (
        <StyledDialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogHeader>
                Appointment Details
                <CloseButton
                    edge="end"
                    color="inherit"
                    onClick={onClose}
                    aria-label="close"
                >
                    <CloseIcon />
                </CloseButton>
            </DialogHeader>
            <Divider />
            <DialogContent>
                <ContentBox>
                    <InfoRow>
                        <CalendarTodayIcon color="secondary" />
                        <Typography variant="h6">{event.title}</Typography>
                    </InfoRow>
                    <InfoRow>
                        <PersonIcon color="secondary" />
                        <Typography variant="body1">
                            <strong>
                                {view === EntityEnum.Client
                                    ? "Employee"
                                    : "Client"}
                                :
                            </strong>{" "}
                            {view === EntityEnum.Client
                                ? event.employeeName
                                : event.clientName}
                        </Typography>
                    </InfoRow>
                    <InfoRow>
                        <AccessTimeIcon color="action" />
                        <Typography variant="body1">
                            <strong>Start:</strong>{" "}
                            {event.start.toLocaleString()}
                        </Typography>
                    </InfoRow>
                    <InfoRow>
                        <AccessTimeIcon color="action" />
                        <Typography variant="body1">
                            <strong>End:</strong> {event.end.toLocaleString()}
                        </Typography>
                    </InfoRow>
                    <InfoRow>
                        <AccessTimeIcon
                            color={
                                event.status === StatusEnum.Canceled
                                    ? "error"
                                    : "success"
                            }
                        />
                        <Typography
                            color={
                                event.status === StatusEnum.Canceled
                                    ? "error"
                                    : theme.palette.success.main
                            }
                            variant="body1"
                        >
                            <strong>Status:</strong> {event.status}
                        </Typography>
                    </InfoRow>
                </ContentBox>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="error" variant="contained">
                    Close
                </Button>
                {event.status === StatusEnum.Scheduled && (
                    <Button
                        onClick={handleCancelAppointment}
                        color="secondary"
                        variant="contained"
                        disabled={isPending}
                    >
                        {isPending ? "Cancelling..." : "Cancel Appointment"}
                    </Button>
                )}
            </DialogActions>
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
        </StyledDialog>
    );
};

export default AppointmentDetailsModal;
