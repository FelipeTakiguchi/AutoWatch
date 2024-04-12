import useClientStore from "@/services/store";
import "./styles.sass";

export default function Delimiter() {
    const { page, setPage, totalElements, elementsReturned, nElements, setNElements } = useClientStore();

    const handleNElementsChange = (event: any) => {
        const newValue = parseInt(event.target.value);
        setNElements(newValue);
        setPage(1);
    };

    return (
        <div className="delimiter">
            <p>Elementos por página</p>
            <select className="select" value={nElements} onChange={handleNElementsChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="30">30</option>
            </select>
            <p>{(page - 1) * nElements + 1}-{(page - 1) * nElements + elementsReturned} de {totalElements}</p>
        </div>
    );
}