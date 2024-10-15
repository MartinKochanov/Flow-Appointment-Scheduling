import { useParams } from "react-router-dom";
import AppointmentCalendar from "./AppointmentCalendar";
import EmployeeAppointmentCalendar from "./EmployeeCalendar ";
import { EntityEnum } from "../../types/EntityEnum";

const AdminCalendar = () => {
    const { role, id } = useParams();

    const numberId = Number(id);

    return (
        <div>
            {role === EntityEnum.Client ? (
                <AppointmentCalendar clientId={numberId} />
            ) : (
                <EmployeeAppointmentCalendar employeeId={numberId} />
            )}
        </div>
    );
};

export default AdminCalendar;
