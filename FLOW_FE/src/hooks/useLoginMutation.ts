import { useMutation } from "@tanstack/react-query";
import { login } from "../services/usersApi";

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
    });
};
