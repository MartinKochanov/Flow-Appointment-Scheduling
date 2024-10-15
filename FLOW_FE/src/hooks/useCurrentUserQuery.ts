import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getCurrentUser } from "../services/usersApi";
import { User } from "../types/User";

export const useCurrentUser = (queryKey: string) => {
    const queryOptions: UseQueryOptions<User, Error> = {
        queryKey: [queryKey],
        queryFn: getCurrentUser,
    };

    return useQuery(queryOptions);
};
