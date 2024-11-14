export const PendingTest = ({ handle }) => {
    return (
        <section className="p-4 bg-slate-800 rounded-xl shadow-lg hover:shadow-none shadow-slate-800 transition-all duration-300">
            <p className=" text-center  font-medium text-xl my-4">Prueba Pendiente.</p>
            <button onClick={handle}
                className=" bg-sky-600 text-center font-semibold text-white p-4 transition-all duration-300 w-full rounded-md hover:bg-sky-500">
                Continuar Prueba
            </button>

        </section>
    );
};
