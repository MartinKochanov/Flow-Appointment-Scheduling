import { StatusEnum } from "./StatusEnum";

export type Appointment = {
    id: number;
    serviceName: string;
    startDate: string;
    endDate: string;
    clientName: string;
    employeeName: string;
    status: StatusEnum;
};
