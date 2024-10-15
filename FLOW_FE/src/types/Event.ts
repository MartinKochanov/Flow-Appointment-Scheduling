import { StatusEnum } from "./StatusEnum";

export type Event = {
    id: number;
    title: string;
    start: Date;
    end: Date;
    clientName: string;
    employeeName: string;
    status: StatusEnum;
};
