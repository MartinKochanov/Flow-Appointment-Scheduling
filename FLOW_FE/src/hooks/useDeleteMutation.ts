import { useMutation } from "@tanstack/react-query";
import { remove } from "../services/usersApi";

export const useDelete = (id: number, collection: string) => {
    return useMutation({
        mutationFn: () => remove(id, collection),
    });
};
