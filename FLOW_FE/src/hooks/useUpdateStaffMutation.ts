import { useMutation } from "@tanstack/react-query";
import { UpdateStaff } from "../types/UpdateStaff";
import { queryClient } from "../utils/reactQuery/queryClient";
import { updateStaff } from "../services/usersApi";

interface UpdateStaffParams {
    id: number | undefined;
    values: UpdateStaff;
}

export const useUpdateStaffMutation = (queryKey: string) => {
    return useMutation({
        mutationFn: ({ id, values }: UpdateStaffParams) =>
            updateStaff(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
    });
};
