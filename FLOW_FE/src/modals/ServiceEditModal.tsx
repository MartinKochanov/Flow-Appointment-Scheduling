import {
    Modal,
    Box,
    Button,
    TextField,
    Typography,
    Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const serviceSchema = z.object({
    id: z.number().min(1),
    name: z.string().min(1, "Service name is required"),
    description: z
        .string()
        .min(10, "Description needs to be at least 10 characters long"),
    duration: z.number().min(1, "Duration is required"),
    price: z.number().min(0, "Price must be a positive number"),
});

interface ServiceEditModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
    initialData: {
        id: number;
        name: string;
        description: string;
        duration: number;
        price: number;
    };
    errorMessage?: string | null;
}

const ServiceEditModal = ({
    initialData,
    onClose,
    onSave,
    open,
    errorMessage,
}: ServiceEditModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...initialData,
        },
        resolver: zodResolver(serviceSchema),
    });

    const handleSave = (data: any) => {
        const durationInSeconds = data.duration * 60;

        onSave({ ...data, duration: durationInSeconds });
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    width: 400,
                    bgcolor: "background.paper",
                    p: 4,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" component="h2" gutterBottom>
                    Edit Service
                </Typography>
                <form onSubmit={handleSubmit(handleSave)}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        {errorMessage && (
                            <Alert severity="error" sx={{ mb: 2 }}>
                                {errorMessage}
                            </Alert>
                        )}
                        <TextField
                            {...register("name")}
                            color="secondary"
                            label="Service Name"
                            variant="outlined"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            multiline
                            rows={4}
                            {...register("description")}
                            color="secondary"
                            label="Description"
                            variant="outlined"
                            fullWidth
                            error={!!errors.description}
                            helperText={errors.description?.message}
                        />
                        <TextField
                            {...register("duration", { valueAsNumber: true })}
                            color="secondary"
                            label="Duration (minutes)"
                            type="number"
                            variant="outlined"
                            fullWidth
                            error={!!errors.duration}
                            helperText={errors.duration?.message}
                        />
                        <TextField
                            {...register("price", { valueAsNumber: true })}
                            color="secondary"
                            label="Price"
                            type="number"
                            variant="outlined"
                            fullWidth
                            error={!!errors.price}
                            helperText={errors.price?.message}
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 2,
                            }}
                        >
                            <Button
                                variant="contained"
                                color="secondary"
                                type="submit"
                            >
                                Save
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
};

export default ServiceEditModal;
