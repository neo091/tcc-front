const Button = ({ text, type, children }) => {

    const config = {

        type: type ? type : 'default',
        text: text ? text : 'text here!.',
        hide: false

    }

    let classText = 'bg-violet-600 hover:bg-violet-500 '

    if (config.type === "warning") {
        classText = "bg-yellow-600 hover:bg-yellow-500"
    }

    if (config.type === "danger") {
        classText = "bg-red-600 hover:bg-red-700"
    }


    return (
        <>
            <button className={`shadow-[inset_0px_-6px_0px_0px_#00000050] inline-block my-2 text-white py-2 px-5 transition-all duration-500 ${classText}`}>{text ? text : children}</button>
        </>
    )
}

export default Button