import { Box, Button, Modal, TextField, Alert } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useCreateService } from "../hooks/useCreateServiceMutation";

const schema = z.object({
    name: z.string().min(1, "Service name is required"),
    description: z.string().min(1, "Description is required"),
    duration: z.number().min(0, "Duration is required"),
    price: z.number().min(0, "Price must be a positive number"),
});

interface AddServiceModalProps {
    open: boolean;
    onClose: () => void;
}

type FormFields = z.infer<typeof schema>;

const AddServiceModal = ({ onClose, open }: AddServiceModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const { mutate, isPending, isError, error } = useCreateService();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const durationInSeconds = data.duration * 60;

        const requestData = {
            ...data,
            duration: durationInSeconds,
        };

        mutate(requestData, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const errorMessage =
        isError && error instanceof AxiosError
            ? error.response?.data?.name || "An unexpected error occurred."
            : null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    width: 400,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                {errorMessage && (
                    <Box mt={2}>
                        <Alert severity="error">{errorMessage}</Alert>
                    </Box>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        color="secondary"
                        label="Service Name"
                        fullWidth
                        variant="outlined"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        margin="normal"
                    />
                    <TextField
                        multiline
                        rows={4}
                        color="secondary"
                        label="Description"
                        fullWidth
                        variant="outlined"
                        {...register("description")}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        margin="normal"
                    />
                    <TextField
                        color="secondary"
                        label="Duration (minutes)"
                        type="number"
                        fullWidth
                        variant="outlined"
                        {...register("duration", { valueAsNumber: true })}
                        error={!!errors.duration}
                        helperText={errors.duration?.message}
                        margin="normal"
                    />
                    <TextField
                        color="secondary"
                        label="Price"
                        type="number"
                        fullWidth
                        variant="outlined"
                        {...register("price", { valueAsNumber: true })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        margin="normal"
                    />
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        sx={{ mt: 3 }}
                    >
                        <Button
                            onClick={onClose}
                            variant="contained"
                            color="error"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            disabled={isPending}
                        >
                            {isPending ? "Creating..." : "Create Service"}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default AddServiceModal;
