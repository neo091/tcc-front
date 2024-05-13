const Button = ({ text, type, hide }) => {

    const config = {
        
        type: type ? type : 'default',
        text: text ? text : 'text here!.',
        hide: false

    }

    let classText = 'bg-violet-900 hover:bg-violet-700'

    if(config.type === "warning"){
        classText = "bg-yellow-600 hover:bg-yellow-700"
    }

    if(config.type === "danger"){
        classText = "bg-red-600 hover:bg-red-700"
    }


    return (
        <>
            <button className={classText + "rounded shadow-[inset_0px_-6px_0px_0px_#00000050] text-white py-2 px-5  "}>{text ? text : 'DEFAULT'}</button>
        </>
    )
}

export default Button