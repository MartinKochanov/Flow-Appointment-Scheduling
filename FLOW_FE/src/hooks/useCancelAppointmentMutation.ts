import { useMutation } from "@tanstack/react-query";
import { cancelAppointment } from "../services/appointmentApi";
import { queryClient } from "../utils/reactQuery/queryClient";

export const useCancelAppointmentsMutation = (
    appointmentId: number | undefined
) => {
    return useMutation({
        mutationKey: ["appointments", appointmentId],
        mutationFn: cancelAppointment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["appointments"],
            });
        },
    });
};
