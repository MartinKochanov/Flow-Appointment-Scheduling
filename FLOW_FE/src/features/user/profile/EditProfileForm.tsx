import { Box, Button, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./editProfileSchema";

type FormData = Omit<z.infer<typeof schema>, "email"> & {
    email: string;
};

interface EditProfileFormProps {
    initialData: FormData;
    onSave: (data: Omit<FormData, "email">) => void;
    onCancel: () => void;
}

const EditProfileForm = ({
    initialData,
    onCancel,
    onSave,
}: EditProfileFormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: initialData,
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        const { email, ...saveData } = data;
        onSave(saveData);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                sx={{ mt: 2 }}
            >
                <Box flex="1" pr={2}>
                    <TextField
                        color="secondary"
                        label="First Name"
                        fullWidth
                        variant="outlined"
                        {...register("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                    <TextField
                        color="secondary"
                        label="Last Name"
                        fullWidth
                        variant="outlined"
                        {...register("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        sx={{ mt: 2 }}
                    />
                </Box>
                <Box flex="1" pl={2}>
                    <TextField
                        color="secondary"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        disabled={true}
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                    <TextField
                        color="secondary"
                        label="Phone"
                        fullWidth
                        variant="outlined"
                        {...register("phone")}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                        sx={{ mt: 2 }}
                    />
                </Box>
            </Box>
            <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                <Button
                    onClick={onCancel}
                    variant="contained"
                    color="error"
                    sx={{ mr: 2 }}
                >
                    Cancel
                </Button>
                <Button type="submit" variant="contained" color="secondary">
                    Save
                </Button>
            </Box>
        </form>
    );
};

export default EditProfileForm;
