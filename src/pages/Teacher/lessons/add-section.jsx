import { useState } from "react"
import Enlace from "../../../components/Enlace"
import Button from "../../../components/Button"
import { useNavigate } from "react-router-dom"

const SelectType = ({ type }) => {
    return (
        <>
            {type && type === "text" && <><input type="text" /></>}
            {type && type === "title" && <><input type="text" /></>}
        </>
    )
}

const AddSection = () => {

    const navigate = useNavigate();

    const types = ['text', 'title', 'image', 'audio', 'video']

    const [selectType, setSelectType] = useState('text');

    const select_type_handle = (e) => {
        setSelectType(e.target.value)
    }


    return (
        <div>
            <select name="type" id="" className=" block p-2 text-black " onChange={(e) => select_type_handle(e)} >
                {
                    types.map((type, index) => <option key={index}  >{type}</option>)
                }
            </select>

            <SelectType type={selectType} />

            <Button handle={() => navigate(-1)} >Atras</Button>

        </div>
    );
}

export default AddSection;
