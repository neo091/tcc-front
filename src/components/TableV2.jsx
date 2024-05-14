import { useEffect, useState } from "react"
import Subtitle from "./Subtitle"
import { Link } from "react-router-dom"

const ThRoom = ({ text }) => <th scope='col' className=" px-6 py-3">{text}</th>

const TrRoom = (props) => {
    const content = props.content
    let count = 0
    return (
        <>
            <tr className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {
                    content.map((item) =>

                        <>
                            {console.log(count++)}
                            {item.handle ? <th scope="row" key={count++} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[150px] overflow-hidden text-ellipsis" >

                                <Link to={`${props.id}`}>{item.text}</Link>


                            </th>
                                :
                                <th scope="row" key={count++} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[150px] overflow-hidden text-ellipsis" >
                                    {item.text}
                                </th>
                            }

                        </>
                    )
                }

            </tr >
        </>
    )
}

const Paginador = ({ handle }) => {
    return (
        <>
            <div className="my-6 text-center">
                <a href="#load-more" className="hover:text-black hover:bg-white p-2 rounded" onClick={() => handle()} >Cargar mas</a>
            </div>
        </>
    )
}


const TableV2 = ({ thead, tbody, maxPerPage, title }) => {

    const [actual, setActual] = useState(maxPerPage)

    const [tb, setTb] = useState([])

    const [showLoadMore, setShowLoadMore] = useState(false)

    const total = tbody.length

    const load = () => {
        if (tbody.length === 0) {
            return
        }

        if (total > maxPerPage) setShowLoadMore(!showLoadMore)
        setTb(tbody.slice(0, actual))
    }

    useEffect(() => load(), [])

    const loadMore = () => {
        console.log(total, tb.length)
        if (tb.length === total) {
            if (total > maxPerPage) setShowLoadMore(!showLoadMore)
            return
        }

        setTb(tbody.slice(0, actual + maxPerPage))
        setActual(actual + maxPerPage)
    }

    const buscar = (text) => {

        const preguntame = tbody

        const consulta = text.target.value

        if (consulta === '') {
            load()
            return

        }

        let consultados = []

        preguntame.forEach(element => {
            let nombre = element.tr_content[0].text

            if (consulta.length != 0 && nombre.length != 0) {
                if (nombre.toLowerCase().search(consulta.toLowerCase()) != -1) {
                    consultados.push(element)
                }
            }
        });

        setTb(consultados)
    }

    let count = 0

    return (
        <>
            <div className="relative overflow-x-auto">
                <Subtitle text={title} />

                <div className="flex items-center gap-3 border-none">
                    <p>Total: {total}</p>
                    <div>
                        <input className="p-2 bg-slate-700 rounded w-full" type="text" placeholder="buscar" onChange={(e) => buscar(e)} />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 my-6">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {thead ? thead.map((th) => <ThRoom key={th.id} text={th.text} />) : ''}
                        </tr>

                    </thead>
                    <tbody>
                        {tb ? tb.map((tb) => <TrRoom key={tb.ID} id={tb.ID} content={tb.tr_content} />) : ''}
                    </tbody>
                </table>
                {showLoadMore ? <Paginador handle={loadMore} /> : <p className="text-center my-6 opacity-40">Final</p>}
            </div>

        </>
    );
}

export default TableV2;