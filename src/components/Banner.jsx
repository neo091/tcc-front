
const Banner = ({ text, children }) => {
    return (
        <>

            <div className=' bg-gradient-to-b to-violet-950 from-[#2b0725] p-5'>
                {
                    text ? <h1 className=' text-2xl text-white font-bold w-2/3 mx-auto'>{text}</h1> : children
                }

            </div>

        </>
    )
}

export default Banner