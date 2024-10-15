import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/reactQuery/queryClient";
import { CreateServiceCredentials } from "../types/CreateServiceCredentials";
import { updateService } from "../services/servicesApi";

interface UpdateServiceParams {
    id: number | undefined;
    values: CreateServiceCredentials;
}

export const useUpdateServiceMutation = (queryKey: string) => {
    return useMutation({
        mutationFn: ({ id, values }: UpdateServiceParams) =>
            updateService(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
    });
};
