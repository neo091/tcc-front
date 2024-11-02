import UserItem from "@components/UserItem";
import { useUsers } from "@hooks/useUsers";

export default function UsersList() {

    const { users, viewDialogHandle, activeToggleHandle, editDialogHandle } = useUsers()


    return (
        <>

            <header className="grid grid-cols-5 bg-slate-700">
                <div className="px-4 py-3">
                    <h5 className="uppercase text-sm font-semibold">#</h5>
                </div>
                <div className="px-4 py-3">
                    <h5 className="uppercase text-sm font-semibold">Nombre</h5>
                </div>
                <div className="px-4 py-3">
                    <h5 className="uppercase text-sm font-semibold">Tipo</h5>
                </div>
                <div className="px-4 py-3">
                    <h5 className="uppercase text-sm font-semibold">Estado</h5>
                </div>
                <div className="px-4 py-3">
                    <h5 className="uppercase text-sm font-semibold">Acción</h5>
                </div>

            </header>

            {
                users?.map(user => {
                    return <UserItem
                        key={user.UID} user={user}
                        viewDialogHandle={viewDialogHandle}
                        deleteDialogHandle={activeToggleHandle}
                        editDialogHandle={editDialogHandle} />

                })
            }
        </>
    )

}