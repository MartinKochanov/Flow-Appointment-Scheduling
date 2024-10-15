import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from "@mui/material";

interface SignOutModalProps {
    dialogTitle: string;
    dialogText: string;
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationModal = ({
    dialogText,
    dialogTitle,
    onClose,
    onConfirm,
    open,
}: SignOutModalProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="sign-out-dialog-title"
            aria-describedby="sign-out-dialog-description"
        >
            <DialogTitle id="sign-out-dialog-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="sign-out-dialog-description">
                    {dialogText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="contained" color="error">
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        onConfirm();
                    }}
                    color="secondary"
                    variant="contained"
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
