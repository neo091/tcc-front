const Button = ({ text }) => {
    return (
        <>
            <button className='bg-violet-900 rounded-full text-white py-2 hover:scale-105 duration-200 w-full'>{text ? text : 'DEFAULT'}</button>
        </>
    )
}

export default Button