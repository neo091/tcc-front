import { ArchiveBoxIcon, DocumentTextIcon, PresentationChartBarIcon, UserIcon } from '@heroicons/react/24/outline';
import React from 'react';

const CounterSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className=" bg-slate-800 p-6">

                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-600">
                    <UserIcon className="w-6 h-6" />
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className=" text-3xl font-bold text-black dark:text-white">95</h4>
                        <span className="text-xs text-slate-400">Alumnos</span>
                    </div>

                </div>



            </div>

            <div className=" bg-slate-800 p-6">

                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-600">
                    <PresentationChartBarIcon className="w-6 h-6" />
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className=" text-3xl font-bold text-black dark:text-white">4</h4>
                        <span className="text-xs text-slate-400">Aulas Virtuales</span>
                    </div>

                </div>



            </div>

            <div className=" bg-slate-800 p-6">

                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-600">
                    <ArchiveBoxIcon className="w-6 h-6" />
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className=" text-3xl font-bold text-black dark:text-white">10</h4>
                        <span className="text-xs text-slate-400">Archivos</span>
                    </div>

                </div>



            </div>

            <div className=" bg-slate-800 p-6">

                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-600">
                    <DocumentTextIcon className="w-6 h-6" />
                </div>

                <div className="mt-4 flex items-end justify-between">
                    <div>
                        <h4 className=" text-3xl font-bold text-black dark:text-white">5</h4>
                        <span className="text-xs text-slate-400">Exámenes Pendientes</span>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default CounterSection;
