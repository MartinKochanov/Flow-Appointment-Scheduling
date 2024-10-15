import axiosInstance from "../axiosInstance/axiosInstance";
import { CreateStaffCredentials } from "../types/CreateStaffCredentials";
import { LoginCredentials, RegisterCredentials } from "../types/Credentials";
import { LoginResponse } from "../types/LoginResponse";
import Page from "../types/Page";
import { UpdateStaff } from "../types/UpdateStaff";
import { UpdateUser } from "../types/UpdateUser";
import { User } from "../types/User";

export const getClients = async (
    page: number,
    size: number
): Promise<Page<User>> => {
    const response = await axiosInstance.get("/users", {
        params: {
            page,
            size,
        },
    });
    return response.data;
};

export const getStaff = async (
    page: number,
    size: number
): Promise<Page<User>> => {
    const response = await axiosInstance.get("/users/employees", {
        params: {
            page,
            size,
        },
    });
    return response.data;
};

export const login = async (credentials: LoginCredentials) => {
    const { data } = await axiosInstance.post<LoginResponse>(
        "/auth/authenticate",
        credentials
    );
    return data;
};

export const register = async (credentials: RegisterCredentials) => {
    await axiosInstance.post<void>("/users", credentials);
};

export const createStaff = async (credentials: CreateStaffCredentials) => {
    await axiosInstance.post<void>("/users/employees", credentials);
};

export const updateUser = async (
    id: number | undefined,
    values: UpdateUser
) => {
    const { data } = await axiosInstance.patch<User>(`/users/${id}`, values);
    return data;
};

export const updateStaff = async (
    id: number | undefined,
    values: UpdateStaff
) => {
    const { data } = await axiosInstance.patch<User>(
        `/users/employees/${id}`,
        values
    );
    return data;
};

export const getCurrentUser = async () => {
    const response = await axiosInstance.get<User>("/auth/me");
    return response.data;
};

export const remove = async (id: number, collection: string) => {
    await axiosInstance.delete<void>(`/${collection}/${id}`);
};
