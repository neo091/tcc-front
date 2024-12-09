const TaskLoader = () => {
  return (
    <div className='max-w-xl m-auto  relative  animate-fadeIn'>
      <div className='animate-pulse bg-slate-800 p-4 rounded'>
        <div className='absolute -top-4 w-full left-0 right-0  text-center'>
          <span className='bg-slate-600 py-1 px-6 rounded'></span>
        </div>
        <h2 className="text-center text-3xl bg-slate-700 p-2 rounded-md h-32"></h2>
        <div className='border-b-[1px] border-gray-600 my-4'></div>

        <div className={" bg-gray-600  rounded block w-full text-center my-2 font-semibold text-white p-7 transition-all duration-500"}></div>

        <div className={" bg-gray-600  rounded block w-full text-center my-2 font-semibold text-white p-7 transition-all duration-500"}></div>

        <div className={" bg-gray-600  rounded block w-full text-center my-2 font-semibold text-white p-7 transition-all duration-500"}></div>
      </div>

    </div>
  )
}

export default TaskLoader