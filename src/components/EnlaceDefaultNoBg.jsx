const EnlaceDefaultNoBg = ({ text, href, children }) => {
    return (
        <>
            <a href={href} className=' text-center text-violet-500 underline decoration-violet-900 hover:text-violet-300 hover:decoration-violet-500 '>
                {text ? text : children}
            </a>
        </>
    )
}

export default EnlaceDefaultNoBg 