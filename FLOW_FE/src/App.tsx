import { Route, Routes } from "react-router-dom";
import LandingPage from "./features/landingPage/LandingPage";
import LoginPage from "./features/user/login/LoginPage";
import RegisterPage from "./features/user/register/RegisterPage";
import PublicRoute from "./guards/PublicRoute";
import ProfilePage from "./features/user/profile/ProfilePage";
import ProtectedRoute from "./guards/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import AuthenticatedUserLayout from "./layouts/AuthenticatedUserLayout";
import NotFound from "./features/core/NotFound";
import ManageUsersPage from "./features/admin/manageUsersPage/ManageClientsPage";
import ManageStaffPage from "./features/admin/manageStaffPage/ManageStaffPage";
import HomePage from "./features/core/HomePage";
import ServicesPage from "./features/service/servicesPage/ServicesPage";
import ManageServicesPage from "./features/admin/manageServicesPage/ManageServicesPage";
import AdminRoute from "./guards/AdminRoute";
import AppointmentsPage from "./features/user/appointments/AppointmentsPage";
import AdminCalendar from "./features/core/AdminCalendar";

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route element={<PublicRoute />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/sign-in" element={<LoginPage />} />
                    <Route path="/sign-up" element={<RegisterPage />} />
                </Route>
            </Route>

            <Route element={<AuthenticatedUserLayout />}>
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route
                        path="/appointments"
                        element={<AppointmentsPage />}
                    />
                    <Route path="*" element={<NotFound />} />
                </Route>
                <Route element={<AdminRoute />}>
                    <Route path="/manage-users" element={<ManageUsersPage />} />
                    <Route path="/manage-staff" element={<ManageStaffPage />} />
                    <Route
                        path="/manage-services"
                        element={<ManageServicesPage />}
                    />
                    <Route
                        path="/:role/:id/appointments"
                        element={<AdminCalendar />}
                    />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
