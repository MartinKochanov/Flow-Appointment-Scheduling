import { Typography } from "@mui/material";
import AppointmentCalendar from "../../core/AppointmentCalendar";
import { useAuth } from "../../../context/AuthContext";
import { RoleEnum } from "../../../types/RoleEnum";
import EmployeeAppointmentCalendar from "../../core/EmployeeCalendar ";

const AppointmentsPage = () => {
    const { user } = useAuth();
    return (
        <div>
            <Typography variant="h4">Your Appointments</Typography>
            {user?.role === RoleEnum.Client ? (
                <AppointmentCalendar clientId={user?.id} />
            ) : (
                <EmployeeAppointmentCalendar employeeId={user?.id} />
            )}
        </div>
    );
};

export default AppointmentsPage;
