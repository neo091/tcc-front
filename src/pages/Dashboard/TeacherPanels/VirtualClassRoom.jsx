import ButtonSky from "../../../components/ButtonSky";
import Subtitle from "../../../components/Subtitle";
import Table from "../../../components/Table";
import TableV2 from "../../../components/TableV2";
import Title from "../../../components/Title";


const VirtualClassRoom = () => {

    const thRooms = [
        {
            text: 'Aula'
        },
        {
            text: 'Nivel'
        },
        {
            text: 'Descripcion'
        },
        {
            text: 'Alumnos'
        },
    ]

    const classRoom = [
        {
            ID: 1,
            tr_content: [
                {
                    text: 'Aula 1'
                },
                {
                    text: 'Avanzado'
                },
                {
                    text: 'Descripcion para el aula'
                },
                {
                    text: 14
                },


            ]
        },

        {
            ID: 2,
            tr_content: [
                {
                    text: 'Aula 2'
                },
                {
                    text: 'Avanzado'
                },
                {
                    text: 'Descripcion para el aula'
                },
                {
                    text: 14
                },


            ]
        },
    ]

    const selectRoom = (e) => {
        console.log(e.target.value)
    }

    return (
        <>
            <div className="flex gap-2">

            </div>
            <div>
                <div className="my-4 flex gap-2">

                    <div>
                        <Title text='Aulas Virtuales' />
                        <p>Aqui puedes crear y modificar tus aulas virtuales</p>
                    </div>

                    <div className=" justify-end">
                        <ButtonSky text='Agregar nueva' />
                    </div>
                </div>

                <TableV2 tbody={classRoom} thead={thRooms} maxPerPage={2} title='Lista de Aulas' />
            </div>
        </>
    );
}

export default VirtualClassRoom;