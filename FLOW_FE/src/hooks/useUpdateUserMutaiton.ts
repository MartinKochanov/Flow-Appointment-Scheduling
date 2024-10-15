import { useMutation } from "@tanstack/react-query";
import { UpdateUser } from "../types/UpdateUser";
import { updateUser } from "../services/usersApi";
import { queryClient } from "../utils/reactQuery/queryClient";

interface UpdateClientParams {
    id: number | undefined;
    values: UpdateUser;
}

export const useUpdateUserMutation = (queryKey: string) => {
    return useMutation({
        mutationFn: ({ id, values }: UpdateClientParams) =>
            updateUser(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
    });
};
