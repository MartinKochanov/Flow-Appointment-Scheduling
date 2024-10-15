import ManageEntityPage from "../ManageUsersPage";
import useClients from "../../../hooks/useClientsQuery";
import { EntityEnum } from "../../../types/EntityEnum";

const ManageUsersPage = () => {
    return (
        <ManageEntityPage
            title="Clients"
            queryHook={(page: number, size: number) => useClients(page, size)}
            mutationKey="users"
            entityType={EntityEnum.Client}
        />
    );
};

export default ManageUsersPage;
