import { Calendar, momentLocalizer, EventProps } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useClientAppointmentsQuery } from "../../hooks/useClientAppointmentsQuery";
import { CircularProgress, Typography, Box, Tooltip } from "@mui/material";
import { useState } from "react";
import { Event } from "../../types/Event";
import AppointmentDetailsModal from "../../modals/AppointmentDetailsModal";
import { StatusEnum } from "../../types/StatusEnum";
import theme from "./theme/theme";
import { EntityEnum } from "../../types/EntityEnum";

const localizer = momentLocalizer(moment);

type AppointmentCalendarProps = {
    clientId: number | undefined;
};

const AppointmentCalendar = ({ clientId }: AppointmentCalendarProps) => {
    const {
        data: appointments,
        isLoading,
        error,
    } = useClientAppointmentsQuery(clientId);
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
            case StatusEnum.Canceled:
                backgroundColor = theme.palette.error.main;
                borderColor = theme.palette.error.main;
                break;
            case StatusEnum.Scheduled:
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

    return (
        <Box sx={{ height: "80vh", width: "80vw" }}>
            <Typography variant="h5" align="center" gutterBottom>
                Appointments
            </Typography>
            <Calendar
                localizer={localizer}
                events={events || []}
                startAccessor="start"
                endAccessor="end"
                views={["month", "week", "day"]}
                style={{ height: "100%" }}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: EventComponent,
                }}
                onSelectEvent={handleSelectEvent}
            />

            {selectedEvent && (
                <AppointmentDetailsModal
                    view={EntityEnum.Client}
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </Box>
    );
};

export default AppointmentCalendar;
