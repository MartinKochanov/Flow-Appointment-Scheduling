import axiosInstance from "../axiosInstance/axiosInstance";
import { Appointment } from "../types/Appointment";
import { AppointmentBookingValues } from "../types/AppointmentBookingValues";
import { Slot } from "../types/Slot";

export const getAvailableTimeSlots = async (
    employeeId: number,
    serviceId: number,
    date: string
): Promise<Slot[]> => {
    const response = await axiosInstance.get(
        `/appointments/available-time-slots`,
        {
            params: {
                employeeId,
                serviceId,
                date,
            },
        }
    );
    return response.data;
};

export const bookAppointment = async (
    values: AppointmentBookingValues
): Promise<Appointment> => {
    const response = await axiosInstance.post("/appointments/book", values);

    return response.data;
};

export const getClientAppointments = async (
    clientId: number | undefined
): Promise<Appointment[]> => {
    const { data } = await axiosInstance.get(
        `/appointments/client/${clientId}`
    );
    return data;
};

export const cancelAppointment = async (
    appointmentId: number | undefined
): Promise<void> => {
    await axiosInstance.patch(`/appointments/cancel/${appointmentId}`);
};

export const getEmployeeAppointments = async (
    employeeId: number | undefined,
    date: string
): Promise<Appointment[]> => {
    const { data } = await axiosInstance.get(
        `/appointments/employee/${employeeId}`,
        {
            params: { date },
        }
    );
    return data;
};
