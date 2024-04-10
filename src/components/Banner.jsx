
const Banner = ({ text, children }) => {
    return (
        <>

            <div className='p-5'>
                {
                    text ? <h1 className=' text-2xl w-2/3 mx-auto'>{text}</h1> : children
                }
            </div>

        </>
    )
}

export default Banner