import { useMutation } from "@tanstack/react-query";
import { register } from "../services/usersApi";

export const useRegister = () => {
    return useMutation({
        mutationFn: register,
    });
};
