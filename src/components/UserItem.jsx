import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { GetUserType } from "@utils/userType";

const UserItem = ({ user, viewDialogHandle, deleteDialogHandle, editDialogHandle }) => {

    const { name, type, UID, status } = user
    const userType = GetUserType(type)
    const isAdmin = userType === "Admin"

    return (
        <article className={`grid grid-cols-5 ${status === "inactive" && "line-through text-gray-700"}`}>

            <div className="px-3 py-4 font-bold">{UID}</div>
            <div className="px-3 py-4 font-bold">{name}</div>
            <div className="px-3 py-4 ">{userType}</div>
            <div className="px-3 py-4">{status}</div>
            <div className="px-3 py-4 flex gap-4 items-center">
                {!isAdmin && <div>
                    <button className="hover:text-green-500" onClick={() => viewDialogHandle(UID)}>
                        <EyeIcon className="w-6 h-6" />
                    </button>

                    <button className="hover:text-sky-500" onClick={() => editDialogHandle(UID)}>
                        <PencilSquareIcon className="w-6 h-6" />
                    </button>

                    <button className="hover:text-red-500" onClick={() => deleteDialogHandle(UID)}>
                        <TrashIcon className="w-6 h-6" />
                    </button>
                </div>}
            </div>
        </article>
    )
}

export default UserItem