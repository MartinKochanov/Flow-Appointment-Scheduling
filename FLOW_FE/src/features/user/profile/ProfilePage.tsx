import { useAuth } from "../../../context/AuthContext";
import {
    Avatar,
    Box,
    Container,
    Typography,
    Paper,
    Button,
    useTheme,
} from "@mui/material";
import EditProfileForm from "./EditProfileForm";
import { useState } from "react";
import { UpdateUser } from "../../../types/UpdateUser";
import { useUpdateUserMutation } from "../../../hooks/useUpdateUserMutaiton";

const ProfilePage = () => {
    const { user } = useAuth();

    const { mutateAsync: update } = useUpdateUserMutation("currentUser");

    const theme = useTheme();

    const initial = user?.firstName?.charAt(0).toUpperCase() || "";

    const [isEditing, setIsEditing] = useState(false);

    const initialData = {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phone || "",
    };

    const toggleEditMode = () => {
        setIsEditing((editing) => !editing);
    };

    const handleSave = (values: UpdateUser) => {
        update({ id: user?.id, values });
        toggleEditMode();
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={2}
                >
                    <Avatar
                        alt={user?.firstName}
                        sx={{
                            border: `2px solid ${theme.palette.secondary.main}`,
                            backgroundColor: "white",
                            color: "black",
                            width: 100,
                            height: 100,
                            mb: 2,
                        }}
                    >
                        {initial}
                    </Avatar>
                    <Typography variant="h5" component="h1" gutterBottom>
                        User Profile
                    </Typography>
                    {isEditing ? (
                        <EditProfileForm
                            initialData={initialData}
                            onSave={handleSave}
                            onCancel={toggleEditMode}
                        />
                    ) : (
                        <Box
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-evenly"
                            width="100%"
                            sx={{ mt: 2 }}
                        >
                            <Box>
                                <Typography variant="body1" gutterBottom>
                                    <strong>First Name:</strong>{" "}
                                    {user?.firstName}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Last Name:</strong> {user?.lastName}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Email:</strong> {user?.email}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    <strong>Phone:</strong> {user?.phone}
                                </Typography>
                            </Box>
                        </Box>
                    )}
                    {!isEditing && (
                        <Box
                            display="flex"
                            justifyContent="flex-end"
                            sx={{ mt: 3 }}
                        >
                            <Button
                                onClick={toggleEditMode}
                                variant="contained"
                                color="secondary"
                            >
                                Edit
                            </Button>
                        </Box>
                    )}
                </Box>
            </Paper>
        </Container>
    );
};

export default ProfilePage;
