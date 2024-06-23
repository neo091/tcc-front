const Alert = ({ type, message, hide }) => {
    const config = {
        type: type ? type : 'default',
        message: message ? message : 'message here!.',
        hide: false

    }

    if (hide) {
        return
    }

    if (config.type === "danger") {
        return (
            <>
                <div className="p-3 my-2 bg-red-200 border-[3px] border-red-500 rounded ">
                    <p className="text-red-600 text-center flex items-center justify-center gap-1 "><span className="icon-[mdi--close-circle]"></span> {config.message}</p>
                </div>
            </>
        )
    }

    if (config.type === "success") {
        return (
            <>
                <div className="p-3 my-2 bg-green-200 border-[3px] border-green-500 rounded">
                    <p className="text-green-600 text-center flex items-center justify-center gap-1 "> <span className="icon-[ph--check-fat-fill]"></span> {config.message}</p>
                </div>
            </>
        )
    }

    if (config.type === "default") {
        return (
            <>
                <div className="p-3 my-2 bg-blue-200 border-[3px] border-blue-500 rounded">
                    <p className="text-blue-600 text-center flex items-center justify-center gap-1 "> <span className="icon-[material-symbols--info-outline]"></span> {config.message}</p>
                </div>
            </>
        )
    }



    //console.log(config.type)
}

export default Alert