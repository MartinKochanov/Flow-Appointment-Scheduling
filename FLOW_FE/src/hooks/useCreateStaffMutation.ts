import { useMutation } from "@tanstack/react-query";
import { createStaff } from "../services/usersApi";
import { queryClient } from "../utils/reactQuery/queryClient";

export const useCreateStaff = () => {
    return useMutation({
        mutationFn: createStaff,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["staff"] });
        },
    });
};
