import { useQuery } from "@tanstack/react-query";
import Page from "../types/Page";
import { Service } from "../types/Service";
import { getServices } from "../services/servicesApi";

export const useServices = (page: number, size: number) => {
    return useQuery<Page<Service>>({
        queryKey: ["services", "page", page, "size", size],
        queryFn: () => getServices(page, size),
    });
};
