import axiosInstance from "../axiosInstance/axiosInstance";
import { CreateServiceCredentials } from "../types/CreateServiceCredentials";
import Page from "../types/Page";
import { Service } from "../types/Service";

export const getServices = async (page: number, size: number) => {
    const response = await axiosInstance.get<Page<Service>>("/services", {
        params: { page, size },
    });

    return response.data;
};

export const createService = async (credentials: CreateServiceCredentials) => {
    await axiosInstance.post<void>("/services", credentials);
};

export const updateService = async (
    id: number | undefined,
    values: CreateServiceCredentials
) => {
    const { data } = await axiosInstance.patch<Service>(
        `/services/${id}`,
        values
    );
    return data;
};
