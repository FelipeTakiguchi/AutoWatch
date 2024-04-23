import useClientStore from "@/services/clientStore";
import "./delimiter.sass";
import { useState } from "react";
import arrownDownIcon from "@/assets/images/arrow_down.svg";
import Image from "next/image";

export default function Delimiter() {
    const { page, setPage, totalElements, elementsReturned, nElements, setNElements } = useClientStore();
    const [expanded, setExpanded] = useState(false);

    const handleNElementsChange = (event: any) => {
        const newValue = parseInt(event.target.value);
        setNElements(newValue);
        setPage(1);
        setExpanded(false);
    };


    return (
        <div className="delimiter">
            <p>Elementos por página</p>
            <div className="select_container">
                <div className="select" onClick={() => setExpanded(!expanded)}>
                    <p className="select_label">{nElements}</p>
                    <Image src={arrownDownIcon} className={`arrow_down_icon ${expanded ? 'expanded_anim' : 'back_anim'}`} alt="arrow down icon" width={30} />
                </div>
                <div className={`opt_group ${expanded ? "expand_opt" : "hide_opt"}`}>
                    <option onClick={handleNElementsChange} value={5}>5</option>
                    <option onClick={handleNElementsChange} value={10}>10</option>
                    <option onClick={handleNElementsChange} value={15}>15</option>
                    <option onClick={handleNElementsChange} value={30}>30</option>
                </div>
            </div>
            <p>{(page - 1) * nElements + 1}-{(page - 1) * nElements + elementsReturned} de {totalElements}</p>
        </div>
    );
}