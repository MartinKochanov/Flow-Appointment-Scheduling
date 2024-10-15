import { User } from "./User";

export type Service = {
    id: number;
    name: string;
    description: string;
    duration: string;
    price: number;
    users: User[];
};
