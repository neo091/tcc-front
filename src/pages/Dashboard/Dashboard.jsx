import { useEffect, useState } from "react"
import Content from "../../components/Content"
import Header from "../../components/Header"
import HeaderDash from "./HeaderDash"
import Student from "./Student"
import Teacher from "./Teacher"
import Admin from "./Admin"

const Dashboard = () => {

    const [user, setUser] = useState([])
    const [panel, setPanel] = useState('welcome')
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const loggedUserJson = window.localStorage.getItem("loggedTCC")
        if (loggedUserJson) {
            const userLogged = JSON.parse(loggedUserJson)
            setUser(userLogged)
            setIsAdmin(userLogged.type === 3 ? true : false)
        } else {
            location.href = './login'
        }
    }, [])

    const activatePanelHandle = (panel) => {
        const selected = panel.target.dataset.panelSelected
        console.log('Selected', selected)
        setPanel(selected)

    }

    const logout = () => {
        window.localStorage.clear()
        location.href = './login'
    }

    const editNameHandle = (e) => {
        e.preventDefault()

    }


    return (
        <>
            {user ? <HeaderDash user={user} /> : <Header />}

            <Content>
                <div className="flex">

                    {user.type == 1 ? <Student user={user} logoutHandle={logout} panel={panel} handle={activatePanelHandle} /> : ''}
                    {user.type == 2 ? <Teacher user={user} logoutHandle={logout} panel={panel} handle={activatePanelHandle} editNameHandle={editNameHandle} /> : ''}
                    {user.type == 3 ?
                        <Admin user={user} logoutHandle={logout} panel={panel} handle={activatePanelHandle} />
                        : ''}

                </div>

            </Content>
        </>
    )

}

export default Dashboard