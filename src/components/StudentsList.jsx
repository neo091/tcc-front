import React from 'react';

const StudentsList = () => {

    const studentsList = [
        {
            id: 1,
            name: 'Grimwald Heimdall',
            pic: 'https://react-demo.tailadmin.com/assets/user-01-b007ff3f.png',
            type: 'Student'
        },
        {
            id: 2,
            name: 'Jessi Ermengardis',
            pic: 'https://randomuser.me/api/portraits/men/24.jpg',
            type: 'Student'
        },
        {
            id: 3,
            name: 'Deniyal Shifer',
            pic: 'https://react-demo.tailadmin.com/assets/user-03-3c4ef32c.png',
            type: 'Student'
        },
        {
            id: 4,
            name: 'Jonna D. Hardee',
            pic: 'https://react-demo.tailadmin.com/assets/user-02-5a304001.png',
            type: 'Student'
        }
    ]

    const getTypeColor = ({ type }) => {
        const textColor = type === "Student" ? 'text-sky-500' : type === "Teacher" ? "text-yellow-500" : "text-red-500"
        return textColor
    }


    return (
        <div className='my-4 mx-6 max-h-96 overflow-x-auto'>

            {/* header of list */}
            <div className='flex justify-between'>

                <div className='px-6 py-2 bg-slate-700 flex-1'>
                    Examen
                </div>
                <div className='px-6 py-2 bg-slate-700 flex-1'>
                    Nivel
                </div>
                <div className='px-6 py-2 bg-slate-700 flex-1'>
                    Fecha
                </div>

            </div>

            {/* body of list */}

            <div>

                {
                    studentsList.map(student => (
                        <div key={student.id} className='flex justify-between border-b border-slate-700 items-center '>
                            <div className='px-6 py-4 flex-1'>
                                <div className=' w-16 h-16 overflow-hidden rounded-full'>
                                    <img src={student.pic} alt="" />
                                </div>
                            </div>
                            <div className='px-6 py-4 flex-1'>{student.name}</div>
                            <div className={`px-6 py-4 flex-1 ${getTypeColor({ type: student.type })}`}>{student.type}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default StudentsList;
