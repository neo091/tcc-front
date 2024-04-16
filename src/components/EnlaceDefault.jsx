const EnlaceDefault = ({ text, href }) => {
    return (
        <>
            <a href={href} className='bg-violet-900 text-center rounded-full text-white py-2
            hover:scale-105 duration-200 w-full px-10'>{text ? text : 'DEFAULT'}</a>
        </>
    )
}


export default EnlaceDefault 