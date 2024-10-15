import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    useTheme,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../context/AuthContext";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import schema from "./loginSchema";
import { useState } from "react";

type FormFields = z.infer<typeof schema>;

const LoginPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [visible, setVisible] = useState<boolean>(false);
    const handleVisibleCLick = () => {
        setVisible((v) => !v);
    };

    const { loginSubmitHandler, authError, isLogingIn } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });

    const searchParams = new URLSearchParams(location.search);
    const redirectTo = searchParams.get("redirectTo") || "/home";

    const onSumbit: SubmitHandler<FormFields> = async (data) => {
        const success = await loginSubmitHandler(data);

        if (success) {
            navigate(redirectTo, { replace: true });
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent={"center"}
            alignItems="center"
            height={"100vh"}
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
                        fontSize: "1.2em",
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
                    onSubmit={handleSubmit(onSumbit)}
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
                        Welcome Back
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        gutterBottom
                        sx={{ marginBottom: 4 }}
                    >
                        Log in to your Flow account
                    </Typography>
                    {authError && (
                        <Typography variant="body1" color={red[400]}>
                            {authError}
                        </Typography>
                    )}
                    <TextField
                        fullWidth
                        label="Email Address"
                        variant="outlined"
                        color="secondary"
                        margin="normal"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <Box width={"100%"} position={"relative"} padding={0}>
                        <TextField
                            fullWidth
                            label="Password"
                            color="secondary"
                            type={visible ? "text" : "password"}
                            variant="outlined"
                            margin="normal"
                            {...register("password")}
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
                    <Button
                        disabled={isLogingIn}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ marginTop: 2, padding: 1 }}
                    >
                        {isLogingIn ? "Signing In" : "Sign In"}
                    </Button>
                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ marginTop: 2 }}
                    >
                        <Link
                            to={"/sign-up"}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "1em",
                                textDecoration: "none",
                            }}
                        >
                            <Typography variant="body2">
                                Don't have an account?
                            </Typography>
                            <Typography
                                variant="body2"
                                color={theme.palette.secondary.main}
                            >
                                Sign Up
                            </Typography>
                        </Link>
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;
