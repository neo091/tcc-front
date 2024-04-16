const Button = ({ text }) => {
    return (
        <>
            <button className='bg-violet-900 rounded shadow-[inset_0px_-6px_0px_0px_#00000050]   text-white py-2 px-5 hover:bg-violet-700 '>{text ? text : 'DEFAULT'}</button>
        </>
    )
}

export default Button