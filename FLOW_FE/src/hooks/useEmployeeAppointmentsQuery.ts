import { useQuery } from "@tanstack/react-query";
import { getEmployeeAppointments } from "../services/appointmentApi";

export const useEmployeeAppointmentsQuery = (
    employeeId: number | undefined,
    date: string
) => {
    return useQuery({
        queryKey: ["appointments", employeeId, date],
        queryFn: () => getEmployeeAppointments(employeeId, date),
    });
};
