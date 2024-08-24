import React from 'react';
import { Card, CardTitle } from './Card';
import StudentsList from './StudentsList';

const ChatSection = () => {
    return (
        <div className="grid grid-cols-12 gap-6 ">

            <Card extraCss={'col-span-12 md:col-span-6 xl:col-span-8'}>
                <div className='p-2'>
                    <CardTitle>Alumnos</CardTitle>

                    <StudentsList />

                </div>
            </Card>

            <Card extraCss={'col-span-12 md:col-span-6 xl:col-span-4'}>
                <div className='px-4 py-2'>
                    <CardTitle>Chat</CardTitle>
                </div>

                <div className='flex flex-col gap-0 mt-4'>

                    <a href='/' className='hover:bg-slate-700 py-2 px-4 w-full flex gap-4 items-center'>
                        <img src="https://react-demo.tailadmin.com/assets/user-01-b007ff3f.png" className='h-14 rounded-full' alt="" />
                        <div className='flex-1 flex justify-between items-center'>
                            <div>
                                <p>Grimwald Heimdall</p>
                                <span>this is a message</span>
                            </div>

                            <div className=' h-8 w-8 p-1 bg-sky-600 rounded-full flex items-center justify-center'>
                                <span className='text-sm'>3</span>
                            </div>
                        </div>
                    </a>

                    <a href='/' className='hover:bg-slate-700 py-2 px-4 w-full flex gap-4 items-center'>
                        <img src="https://randomuser.me/api/portraits/men/24.jpg" className='h-14 rounded-full' alt="" />
                        <div className='flex-1 flex justify-between items-center'>
                            <div>
                                <p>Jessi Ermengardis</p>
                                <span>this is a message</span>
                            </div>


                        </div>
                    </a>

                    <a href='/' className='hover:bg-slate-700 py-2 px-4 w-full flex gap-4 items-center'>
                        <img src="https://randomuser.me/api/portraits/men/11.jpg" className='h-14 rounded-full' alt="" />
                        <div className='flex-1 flex justify-between items-center'>
                            <div>
                                <p>Fina Esther</p>
                                <span>this is a message</span>
                            </div>

                            <div className=' h-8 w-8 p-1 bg-sky-600 rounded-full flex items-center justify-center'>
                                <span className='text-sm'>1</span>
                            </div>
                        </div>
                    </a>

                </div>
            </Card>
        </div>
    );
}

export default ChatSection;
