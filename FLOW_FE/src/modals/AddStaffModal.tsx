import { Box, Button, Modal, TextField, Alert } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateStaff } from "../hooks/useCreateStaffMutation";
import MultiSelect from "../features/core/MultiSelect";
import { AxiosError } from "axios";

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    serviceIds: z.array(z.number()).optional(),
});

interface AddStaffModalProps {
    open: boolean;
    onClose: () => void;
}

type FormFields = z.infer<typeof schema>;

const AddStaffModal = ({ onClose, open }: AddStaffModalProps) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const { mutate, isPending, isError, error, isSuccess } = useCreateStaff();

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        mutate(data, {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const errorMessage =
        isError && error instanceof AxiosError
            ? error.response?.data?.detail ||
              error.response?.data?.email ||
              "An unexpected error occurred."
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="First Name"
                        fullWidth
                        variant="outlined"
                        {...register("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        variant="outlined"
                        {...register("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        variant="outlined"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        margin="normal"
                    />
                    <TextField
                        label="Phone"
                        fullWidth
                        variant="outlined"
                        {...register("phone")}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        margin="normal"
                    />
                    <MultiSelect
                        label={"Services"}
                        name="serviceIds"
                        control={control}
                        open={open}
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
                            {isPending ? "Creating..." : "Create Staff"}
                        </Button>
                    </Box>
                    {errorMessage && (
                        <Box mt={2}>
                            <Alert severity="error">{errorMessage}</Alert>
                        </Box>
                    )}
                    {isSuccess && (
                        <Box mt={2}>
                            <Alert severity="success">
                                Staff created successfully!
                            </Alert>
                        </Box>
                    )}
                </form>
            </Box>
        </Modal>
    );
};

export default AddStaffModal;
