import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import schema from "./registerSchema";
import { z } from "zod";
import {
    Box,
    Paper,
    TextField,
    Typography,
    Button,
    useTheme,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";

type FormFields = z.infer<typeof schema>;

const RegisterPage = () => {
    const theme = useTheme();

    const navigate = useNavigate();

    const [visible, setVisible] = useState<boolean>(false);
    const handleVisibleCLick = () => {
        setVisible((v) => !v);
    };

    const { registerSubmitHandler, registrationError, isSigningUp } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const registered = await registerSubmitHandler(data);
        if (registered) {
            navigate("/sign-in");
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            alignItems="center"
            height={"100vh"}
            paddingY={10}
            width={{ xs: 300, md: 400, lg: 500 }}
        >
            <Link to={"/"}>
                <Button
                    variant="text"
                    color="secondary"
                    sx={{
                        position: "absolute",
                        top: 10,
                        left: 20,
                        fontSize: { md: "1.2em" },
                    }}
                >
                    Flow
                </Button>
            </Link>
            <Paper
                sx={{
                    width: "100%",
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                }}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        padding: 20,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}
                    >
                        Welcome
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        gutterBottom
                        sx={{ marginBottom: 4 }}
                    >
                        Sign up here
                    </Typography>
                    {registrationError && (
                        <Typography variant="body1" color={red[400]}>
                            {registrationError}
                        </Typography>
                    )}
                    <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        margin="normal"
                        {...register("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />

                    <TextField
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        margin="normal"
                        {...register("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />

                    <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        fullWidth
                        label="Phone"
                        type="text"
                        variant="outlined"
                        margin="normal"
                        {...register("phone")}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />
                    <Box width={"100%"} position={"relative"} padding={0}>
                        <TextField
                            fullWidth
                            label="Password"
                            type={visible ? "text" : "password"}
                            variant="outlined"
                            margin="normal"
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <Button
                            onClick={handleVisibleCLick}
                            sx={{
                                padding: 0,
                                position: "absolute",
                                top: 32,
                                right: 10,
                            }}
                        >
                            {visible ? (
                                <VisibilityOffIcon color="secondary" />
                            ) : (
                                <RemoveRedEyeIcon color="secondary" />
                            )}
                        </Button>
                    </Box>

                    <TextField
                        fullWidth
                        label="Repeat Password"
                        type={visible ? "text" : "password"}
                        variant="outlined"
                        margin="normal"
                        {...register("repeatPassword")}
                        error={!!errors.repeatPassword}
                        helperText={errors.repeatPassword?.message}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ marginTop: 2, padding: 1 }}
                        type="submit"
                        disabled={isSigningUp}
                    >
                        {isSigningUp ? "Signing Up" : "Sing Up"}
                    </Button>

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ marginTop: 2 }}
                    >
                        <Link
                            to="/sign-in"
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "1em",
                                textDecoration: "none",
                            }}
                        >
                            <Typography variant="body2">
                                Already have an account?
                            </Typography>
                            <Typography
                                variant="body2"
                                color={theme.palette.secondary.main}
                            >
                                Sign In
                            </Typography>
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterPage;
