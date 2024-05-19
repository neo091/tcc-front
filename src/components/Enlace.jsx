import { Link } from "react-router-dom"

const Enlace = (props) => {
    const { to, text, type, children, modal, handle } = props

    const config = {

        type: type ? type : 'default',
        to: to ? to : '/',
        text: text ? text : 'text here!.',
        hide: false,
        modal: modal ? true : false,
        handle: handle ? handle : () => { }

    }

    let classText = 'bg-violet-600 hover:bg-violet-700'

    if (config.type === "warning") {
        classText = "bg-yellow-600 hover:bg-yellow-500"
    }

    if (config.type === "danger") {
        classText = "bg-red-600 hover:bg-red-700"
    }

    if (config.modal) {
        console.log('Modal type')

        return (
            <a href={""} onClick={(e) => {
                e.preventDefault()
                config.handle(e)
            }} className={`shadow-[inset_0px_-6px_0px_0px_#00000050] block sm:inline-block xl:inline lg:inline-block text-center my-2 font-semibold text-white p-4 transition-all duration-500 ${classText}`}>
                {children}
            </a>
        )
    } else {

        return (
            <>
                <Link to={to} className={`shadow-[inset_0px_-6px_0px_0px_#00000050] block sm:inline-block xl:inline lg:inline-block text-center my-2 font-semibold text-white p-4 transition-all duration-500 ${classText}`}>
                    {text ? text : children}
                </Link>
            </>
        )

    }



}

export default Enlace