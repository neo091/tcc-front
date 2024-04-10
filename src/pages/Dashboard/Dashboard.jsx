import Content from "../../components/Content"
import { useParams } from 'react-router-dom'
import Header from "../../components/Header"
import { useState } from "react"

const ClientDash = ({ clientName, updateUserNameHandle }) => {

    let name = clientName
    const updateName = () => {
        updateUserNameHandle(name)
    }


    return (
        <>
            <div className="flex">
                <div className="w-1/4 py-5">
                    <img src="../images/user-4-xxl.png" className=" mx-auto w-[200px] bg-black rounded-full " alt="" />
                    <p className=" text-center capitalize ">{name}</p>
                </div>
                <div className="w-2/3 bg-gray-50 p-5 ">
                    panels
                    <div className="bg-white border border-gray-100 min-h-[300px] flex flex-col items-center justify-center">
                        <div>Mis Tareas</div>
                    </div>
                </div>
            </div>
        </>
    )
}

const AdminDash = () => {
    return (
        <>Admin</>
    )
}

const TeacherDash = () => {
    return (
        <>Teacher</>
    )
}

const Dashboard = ({ user, updateUserNameHandle }) => {

    if (!user.name) { return location.href = '/login' }

    const [userData, setUserData] = useState(user)


    return (
        <>

            <Header />
            <Content>
                {user.type === 1 ? <ClientDash clientName={user.name} updateUserNameHandle={updateUserNameHandle} /> : ''}
                {user.type === 2 ? <TeacherDash /> : ''}
                {user.type === 3 ? <AdminDash /> : ''}
                {user.type === 0 ? <AdminDash /> : ''}
            </Content>
        </>
    )

}

export default Dashboard