import Alert from "../../components/Alerts"
import Banner from "../../components/Banner"
import Content from "../../components/Content"
import Header from "../../components/Header"

const RegisterSuccess = () => {
    return (
        <>
            <Header />
            <Content>

                <Alert type='success' message='Registro exitoso' />

            </Content>
        </>
    )
}

export default RegisterSuccess