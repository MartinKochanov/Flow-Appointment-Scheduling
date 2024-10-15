import { useQuery } from "@tanstack/react-query";
import { User } from "../types/User";
import { getClients } from "../services/usersApi";
import Page from "../types/Page";

export const useClients = (page: number, size: number) => {
    return useQuery<Page<User>>({
        queryKey: ["users", "page", page, "size", size],
        queryFn: () => getClients(page, size),
    });
};

export default useClients;
