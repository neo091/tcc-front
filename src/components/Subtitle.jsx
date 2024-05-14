const Subtitle = ({ text, children }) => {
    return (
        <>
            <h2 className="font-bold text-2xl my-3">{text ? text : children}</h2>
        </>
    )
}

export default Subtitle;