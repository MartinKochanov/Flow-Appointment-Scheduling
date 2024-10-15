import { Service } from "./Service";

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phone: string;
    services: Service[];
};
