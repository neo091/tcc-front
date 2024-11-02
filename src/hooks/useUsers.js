import { getUsers } from "@services/admin"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export function useUsers() {
    const [users, setUsers] = useState([])

    const loadUsersData = async () => {
        const usersList = await getUsers()
        setUsers(usersList)
        console.log(usersList)
    }

    const viewDialogHandle = (UID) => {
        const viewUser = users.find((u) => u.UID == UID)
        Swal.fire({
            title: `Nombre: ${viewUser?.name}`,
            html: `<b>${viewUser?.email}</b>`,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: "Cerrar",
            background: "#334155",
            color: "white"
        })
    }

    const activeToggleHandle = (UID) => {
        const userData = users.find((u) => u.UID == UID)

        const isActive = userData.status === "active"
        const activeText = isActive ? "Desactivar" : "Activar"

        Swal.fire({
            title: `${activeText} cuenta de "${userData?.name}"`,
            showCancelButton: true,
            confirmButtonColor: isActive ? "#d33" : "#16a34a",
            confirmButtonText: activeText,
            background: "#334155",
            color: "white"
        }).then((result) => {
            if (result.isConfirmed) {

                const newUsersList = [...users].filter((user) => {
                    if (user.UID === userData.UID) {
                        user.status = isActive ? "inactive" : "active"
                    }
                    return user
                })

                setUsers(newUsersList)

                Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1000,
                    timerProgressBar: false,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire({
                    icon: "success",
                    title: activeText
                });
            }
        })
    }


    const editDialogHandle = async (UID) => {
        const userData = users.find((u) => u.UID == UID)

        const { value: formValues } = await Swal.fire({
            title: "Editar",
            html: `
    <input type="text" id="name" class="swal2-input" placeholder="Username" value="${userData?.name}">

    <div style="margin:20px 0px;"></div>
    <select id="type" style="box-sizing: border-box;width:auto;display: flex;height: 2.625em;padding: 0 .75em; transition: border-color .1s,box-shadow .1s;
  border: 1px solid #d9d9d9;
  border-radius: .1875em;
  background: inherit;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px transparent;
  color: inherit;
  font-size: 1.125em; margin: 0 auto;">
    
        <option value="" disabled="">Selecciona un tipo</option>
        
            <optgroup label="Cuenta de ">
            <option value="3" ${userData.type === 3 && "selected"}>Admin</option>
            <option value="2" ${userData.type === 2 && "selected"}>Teacher</option>
            <option value="1" ${userData.type === 1 && "selected"}>Student</option>

        </optgroup>
    </select>
  `,
            showCancelButton: true,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById("name").value,
                    document.getElementById("type").value
                ];
            }

        });

        if (formValues) {


            const newUsersList = [...users].filter((user) => {
                if (user.UID === userData.UID) {
                    user.name = formValues[0]
                    user.type = Number(formValues[1])
                }
                return user
            })

            setUsers(newUsersList)

            Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: false,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            }).fire({
                icon: "success",
                title: "éxito !"
            });

            // Swal.fire(`${JSON.stringify(formValues)} ${JSON.stringify(userData)}`);
        }
    }


    useEffect(() => {
        loadUsersData()
    }, [])


    return { users, viewDialogHandle, activeToggleHandle, editDialogHandle }

}