import { useQuery } from "@tanstack/react-query";
import { getAvailableTimeSlots } from "../services/appointmentApi";
import { Slot } from "../types/Slot";

export const useAvailableTimeSlots = (
    employeeId: number,
    serviceId: number,
    date: string
) => {
    return useQuery<Slot[]>({
        queryKey: ["availableTimeSlots", employeeId, serviceId, date],
        queryFn: () => getAvailableTimeSlots(employeeId, serviceId, date),
    });
};
