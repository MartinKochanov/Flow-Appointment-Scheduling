import {
    Modal,
    Box,
    Button,
    TextField,
    Typography,
    Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MultiSelect from "../features/core/MultiSelect";
import { UpdateStaff } from "../types/UpdateStaff";

const staffSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    serviceIds: z.array(z.number()).optional(),
});

interface EmployeeEditModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: UpdateStaff) => void;
    initialData: {
        firstName: string;
        lastName: string;
        phone: string;
        serviceIds?: number[];
    };
    errorMessage?: string | null;
}

const EmployeeEditModal = ({
    initialData,
    onClose,
    onSave,
    open,
    errorMessage,
}: EmployeeEditModalProps) => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialData,
        resolver: zodResolver(staffSchema),
    });

    const handleSave = (data: any) => {
        onSave(data);
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
                    Edit Employee
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
                            {...register("firstName")}
                            color="secondary"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                        <TextField
                            {...register("lastName")}
                            color="secondary"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                        <TextField
                            {...register("phone")}
                            color="secondary"
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                        <Controller
                            name="serviceIds"
                            control={control}
                            render={({}) => (
                                <MultiSelect
                                    label="Services"
                                    name="serviceIds"
                                    control={control}
                                    open={open}
                                    defaultValue={initialData.serviceIds}
                                />
                            )}
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

export default EmployeeEditModal;