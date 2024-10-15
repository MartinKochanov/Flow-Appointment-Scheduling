import { useQuery } from "@tanstack/react-query";
import { User } from "../types/User";
import { getStaff } from "../services/usersApi";
import Page from "../types/Page";

export const useStaff = (page: number, size: number) => {
    return useQuery<Page<User>>({
        queryKey: ["staff", "page", page, "size", size],
        queryFn: () => getStaff(page, size),
    });
};

export default useStaff;
