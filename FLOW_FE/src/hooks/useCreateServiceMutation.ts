import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/reactQuery/queryClient";
import { createService } from "../services/servicesApi";

export const useCreateService = () => {
    return useMutation({
        mutationFn: createService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
};
