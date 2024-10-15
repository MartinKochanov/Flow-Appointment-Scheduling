import { useQuery } from "@tanstack/react-query";
import { getClientAppointments } from "../services/appointmentApi";

export const useClientAppointmentsQuery = (clientId: number | undefined) => {
    return useQuery({
        queryKey: ["appointments", clientId],
        queryFn: () => getClientAppointments(clientId),
    });
};
