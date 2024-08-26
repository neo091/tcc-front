import React from 'react';

const Exam = () => {


    const examList = [
        {
            id: 1,
            name: 'Examen',
            level: 'Principiante',
            type: 'IA'
        },
        {
            id: 2,
            name: 'Examen',
            level: 'Principiante',
            type: 'IA'
        },
        {
            id: 3,
            name: 'Examen',
            level: 'Principiante',
            type: 'IA'
        },
        {
            id: 22,
            name: 'Examen',
            level: 'Principiante',
            type: 'IA'
        }
    ]

    const getLevelColor = ({ level }) => {
        const textColor = level === "Principiante" ? 'text-green-500' : level === "Intermedio" ? "text-yellow-500" : "text-red-500"
        return textColor
    }


    return (
        <div className='my-4 mx-6 max-h-80 overflow-x-auto'>

            {/* header of list */}
            <div className='flex justify-between'>

                <div className='px-6 py-2 bg-slate-700 flex-1'>
                    Examen
                </div>
                <div className='px-6 py-2 bg-slate-700 flex-1'>
                    Nivel
                </div>
                <div className='px-6 py-2 bg-slate-700 flex-1'>
                    Tipo
                </div>

            </div>

            {/* body of list */}

            <div>

                {
                    examList.map(exam => (
                        <div key={exam.id} className='flex justify-between border-b border-slate-700 '>
                            <div className='px-6 py-4 flex-1'>{exam.name} {exam.id}</div>
                            <div className={`px-6 py-4 flex-1 ${getLevelColor({ level: exam.level })}`}>{exam.level}</div>
                            <div className='px-6 py-4 flex-1'>{exam.type}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Exam;
