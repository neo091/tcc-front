const TrRoom = (props) => {
    const room = props.room
    return (
        <>
            <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[100px] overflow-hidden text-ellipsis">
                    {room.name}
                </th>

                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {room.level}
                </th>

                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[100px] overflow-hidden text-ellipsis">
                    {room.desc}
                </th>

                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {room.students}
                </th>
            </tr>
        </>
    )
}

const ThRoom = ({ text }) => <th scope='col' className=" px-6 py-3">{text}</th>

const Table = ({ thead, tbody }) => {
    return (
        <>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-6">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {thead ? thead.map((th) => <ThRoom text={th.text} />) : ''}
                        </tr>

                    </thead>
                    <tbody>
                        {
                            tbody ? tbody.map((room) => <TrRoom key={room.ID} room={room} />) : ''
                        }

                    </tbody>
                </table>
            </div>

        </>
    );
}

export default Table;