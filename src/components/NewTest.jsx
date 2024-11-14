export const NewTest = ({ handle }) => {
    return (
        <section className="p-4 bg-slate-800 rounded-xl shadow-lg hover:shadow-none shadow-slate-800 transition-all duration-300">
            <h2 className="font-semibold text-2xl mb-4">Pruebas</h2>
            <p className=" text-sm mb-4">Aún no haz realizado ninguna prueba, haz una prueba para determinar tu nivel de Inglés.</p>

            <button onClick={handle}
                className=" bg-sky-600 text-center font-semibold text-white p-4 transition-all duration-300 w-full rounded-md hover:bg-sky-500">
                Comenzar Prueba
            </button>

        </section>
    );
};
