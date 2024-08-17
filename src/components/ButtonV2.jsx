import { Link } from "react-router-dom"

const ButtonV2 = ({ children }, props) => {
    const { to } = props
    return (
        <Link className="bg-violet-600 block p-2 rounded-sm" to={to}>{children}</Link>
    )
}

export default ButtonV2