import { Calendar, momentLocalizer, EventProps } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEmployeeAppointmentsQuery } from "../../hooks/useEmployeeAppointmentsQuery";
import { CircularProgress, Typography, Box, Tooltip } from "@mui/material";
import { useState } from "react";
import { Event } from "../../types/Event"; // Custom Event type
import AppointmentDetailsModal from "../../modals/AppointmentDetailsModal";
import theme from "./theme/theme";
import { EntityEnum } from "../../types/EntityEnum";

const localizer = momentLocalizer(moment);

type EmployeeAppointmentCalendarProps = {
    employeeId: number | undefined;
};

const EmployeeAppointmentCalendar = ({
    employeeId,
}: EmployeeAppointmentCalendarProps) => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const {
        data: appointments,
        isLoading,
        error,
    } = useEmployeeAppointmentsQuery(
        employeeId,
        moment(currentDate).format("YYYY-MM-DD")
    );
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    if (isLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="90vh"
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="90vh"
            >
                <Typography color="error" variant="h6">
                    Failed to load appointments.
                </Typography>
            </Box>
        );
    }

    const events: Event[] =
        appointments?.map((appointment) => ({
            title: appointment.serviceName,
            start: new Date(appointment.startDate),
            end: new Date(appointment.endDate),
            id: appointment.id,
            clientName: appointment.clientName,
            employeeName: appointment.employeeName,
            status: appointment.status,
        })) || [];

    const eventStyleGetter = (event: Event) => {
        let backgroundColor;
        let borderColor;

        switch (event.status) {
            case "CANCELED":
                backgroundColor = theme.palette.error.main;
                borderColor = theme.palette.error.main;
                break;
            case "SCHEDULED":
            default:
                backgroundColor = theme.palette.secondary.main;
                borderColor = theme.palette.secondary.main;
                break;
        }

        return {
            style: {
                backgroundColor,
                borderColor,
                color: "white",
                borderRadius: 5,
                padding: 5,
                border: "none",
            },
        };
    };

    const EventComponent = ({ event }: EventProps<Event>) => (
        <Tooltip title={`Employee: ${event.employeeName}`} arrow>
            <span>{event.title}</span>
        </Tooltip>
    );

    const handleSelectEvent = (event: Event) => {
        setSelectedEvent(event);
    };

    const handleNavigate = (newDate: Date) => {
        setCurrentDate(newDate);
    };

    return (
        <Box sx={{ height: "80vh", width: "80vw" }}>
            <Typography variant="h5" align="center" gutterBottom>
                Appointments for {moment(currentDate).format("MMMM Do YYYY")}
            </Typography>

            <Calendar
                localizer={localizer}
                events={events || []}
                startAccessor="start"
                endAccessor="end"
                views={["day"]}
                defaultView="day"
                date={currentDate}
                style={{ height: "100%" }}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: EventComponent,
                }}
                onSelectEvent={handleSelectEvent}
                onNavigate={handleNavigate}
            />

            {selectedEvent && (
                <AppointmentDetailsModal
                    view={EntityEnum.Staff}
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </Box>
    );
};

export default EmployeeAppointmentCalendar;
