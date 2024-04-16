const EnlaceDefaultNoBg = ({ text, href }) => {
    return (
        <>
            <a href={href} className=' text-center text-violet-900 underline decoration-violet-900 hover:text-violet-500 hover:decoration-violet-500 '>
                {text ? text : 'DEFAULT'}
            </a>
        </>
    )
}

export default EnlaceDefaultNoBg 