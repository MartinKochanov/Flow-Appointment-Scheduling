import { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { User } from "../../../types/User";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TimeSlots from "../../appointment/TimeSlots";
import dayjs from "dayjs";
import { useAuth } from "../../../context/AuthContext";
import { RoleEnum } from "../../../types/RoleEnum";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const StyledCard = styled(Card)({
    marginBottom: "15px",
});

const AppointmentButton = styled(Button)({
    marginTop: "1em",
});

const IconText = styled("div")({
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
});

type EmployeeCardProps = {
    employee: User;
    serviceId: number;
};

const EmployeeCard = ({ employee, serviceId }: EmployeeCardProps) => {
    const { user } = useAuth();
    const [showTimeSlots, setShowTimeSlots] = useState(false);
    const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(
        dayjs()
    );

    const handleAppointmentClick = () => {
        setShowTimeSlots((prev) => !prev);
    };

    return (
        <StyledCard>
            <CardContent>
                <Typography variant="h6">
                    {employee.firstName} {employee.lastName}
                </Typography>

                <IconText>
                    <EmailIcon color="secondary" />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ marginLeft: 8 }}
                    >
                        {employee.email}
                    </Typography>
                </IconText>

                <IconText>
                    <PhoneIcon color="secondary" />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        style={{ marginLeft: 8 }}
                    >
                        {employee.phone}
                    </Typography>
                </IconText>

                {user?.role === RoleEnum.Client && (
                    <AppointmentButton
                        variant="contained"
                        color="secondary"
                        startIcon={<CalendarTodayIcon />}
                        onClick={handleAppointmentClick}
                    >
                        {showTimeSlots
                            ? "Hide Time Slots"
                            : "Make an Appointment"}
                    </AppointmentButton>
                )}

                {showTimeSlots && (
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar
                                minDate={dayjs()}
                                value={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                            />
                        </LocalizationProvider>
                        {selectedDate && (
                            <TimeSlots
                                employeeId={employee.id}
                                serviceId={serviceId}
                                date={selectedDate.format("YYYY-MM-DD")}
                            />
                        )}
                    </div>
                )}
            </CardContent>
        </StyledCard>
    );
};

export default EmployeeCard;
