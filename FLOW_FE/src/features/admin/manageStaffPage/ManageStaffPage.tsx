import ManageEntityPage from "../ManageUsersPage";
import useStaff from "../../../hooks/useStaffQuery";
import AddStaffModal from "../../../modals/AddStaffModal";
import { EntityEnum } from "../../../types/EntityEnum";

const ManageStaffPage = () => {
    return (
        <ManageEntityPage
            title="Staff"
            queryHook={useStaff}
            mutationKey="staff"
            showAddButton={true}
            renderAddModal={(open, onClose) => (
                <AddStaffModal open={open} onClose={onClose} />
            )}
            entityType={EntityEnum.Staff}
        />
    );
};

export default ManageStaffPage;
