const PanelLink = ({ text, panel, handle }) => {
    return (
        <>
            <a href="#"
                data-panel-selected={panel}
                onClick={(e) => handle(e)}
                className="p-2 w-full hover:bg-slate-800 transition-all duration-300">
                {text}
            </a>
        </>
    )
}

export default PanelLink