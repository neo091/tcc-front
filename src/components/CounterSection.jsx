import { ArchiveBoxIcon, DocumentTextIcon, PresentationChartBarIcon, UserIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import MotionNumber from 'motion-number'

const CounterSection = () => {

    const [students, setStudents] = useState(0)
    const [examCounter, setExamCounter] = useState(0)
    const [virtualRoom, setVirtualRoom] = useState(0)
    const [filesCounter, setFilesCounter] = useState(0)


    let studentsInterval, examCountInterval

    const loadStudents = () => {
        setStudents(Math.floor(Math.random() * 100))
        clearInterval(studentsInterval)
        studentsInterval = setInterval(loadStudents, 5000)
    }

    const loadExamCounter = () => {
        setTimeout(() => { setExamCounter(Math.floor(Math.random() * 10)) }, 500)
    }

    const loadVirtualRoomCounter = () => {

        setTimeout(() => { setVirtualRoom(Math.floor(Math.random() * 100)) }, 500)
    }

    const loadFilesCounter = () => {

        setTimeout(() => { setFilesCounter(Math.floor(Math.random() * 1000)) }, 500)

    }

    useEffect(() => {

        loadStudents()
        loadExamCounter()
        loadVirtualRoomCounter()
        loadFilesCounter()
    }, [])



    return (
        <div className="grid lg:grid-flow-col md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className=" bg-slate-800 p-6">

                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-600">
                    <UserIcon className="w-6 h-6" />
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className=" text-3xl font-bold text-black dark:text-white">
                            <MotionNumber

                                value={students}
                                format={{ notation: "standard" }}
                                locales="es-ES"
                            />
                        </h4>
                        <span className="text-xs text-slate-400">Alumnos</span>
                    </div >

                </div >



            </div >

            <div className=" bg-slate-800 p-6">

                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-600">
                    <PresentationChartBarIcon className="w-6 h-6" />
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className=" text-3xl font-bold text-black dark:text-white">
                            <MotionNumber

                                value={virtualRoom}
                                format={{ notation: "standard" }}
                                locales="es-ES"
                            />
                        </h4>
                        <span className="text-xs text-slate-400">Aulas Virtuales</span>
                    </div >

                </div >



            </div >

            <div className=" bg-slate-800 p-6">

                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-600">
                    <ArchiveBoxIcon className="w-6 h-6" />
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className=" text-3xl font-bold text-black dark:text-white">
                            <MotionNumber

                                value={filesCounter}
                                format={{ notation: "standard" }}
                                locales="es-ES"
                            />
                        </h4>
                        <span className="text-xs text-slate-400">Archivos</span>
                    </div >

                </div >



            </div >

            <div className=" bg-slate-800 p-6">

                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-600">
                    <DocumentTextIcon className="w-6 h-6" />
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className=" text-3xl font-bold text-black dark:text-white">
                            <MotionNumber

                                value={examCounter}
                                format={{ notation: "standard" }}
                                locales="es-ES"
                            />
                        </h4>
                        <span className="text-xs text-slate-400">Exámenes Pendientes</span>
                    </div >

                </div >

            </div >
        </div >
    );
}

export default CounterSection;
