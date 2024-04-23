const ButtonSky = ({ text, url, handle }) => {
    return (
        <>
            <a className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400 my-4" href={url || '#'} onClick={(e) => handle(e.target) || ''} >{text}</a>
        </>
    )
}

export default ButtonSky