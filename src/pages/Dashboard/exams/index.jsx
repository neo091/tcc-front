import { useState } from "react";
import { Link } from "react-router-dom";

const Exams = () => {
    const [exams, setExams] = useState([])

    return (
        <div className="max-w-2xl">
            <h2 className="text-3xl mb-4 ">Exámenes pendientes </h2>

            <div className="flex flex-col gap-2">
                <article className="p-2 bg-slate-800">
                    <div className="flex">
                        <div className="flex-1">
                            <h2 className="font-semibold text-xl">Saludar en inglés</h2>
                            <p className="font-medium">Preguntas: 5 </p>
                            <p className="font-medium">Duración: 15 min.</p>
                        </div>
                        <div>
                            <Link to={"/Dashboard/Exam"} className="bg-blue-600 p-2 inline-block h-full w-full">
                                <span className="flex items-center h-full">
                                    Iniciar examen
                                </span>
                            </Link>
                        </div>
                    </div>

                </article>


            </div>

        </div>
    );
}

export default Exams;
