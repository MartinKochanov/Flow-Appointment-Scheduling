import { useMutation } from "@tanstack/react-query";
import { bookAppointment } from "../services/appointmentApi";
import { queryClient } from "../utils/reactQuery/queryClient";

export const useBookAppointmentMutation = () => {
    return useMutation({
        mutationFn: bookAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["availableTimeSlots"],
            });
            queryClient.invalidateQueries({
                queryKey: ["appointments"],
            });
        },
    });
};
