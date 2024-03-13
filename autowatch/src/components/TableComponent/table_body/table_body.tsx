import "./styles.sass"

interface RowData {
    placa: string;
    modelo: string;
    dono: string;
    status: string;
}

interface TableBodyProps {
    data: RowData[];
}

export default function TableBody({ data }: TableBodyProps) {
    return (
        <tbody className="table_body">
            {data.map((row, index) => (
                <tr className="table_row" key={index}>
                    <td className="table_element">{row.placa}</td>
                    <td className="table_element">{row.modelo}</td>
                    <td className="table_element">{row.dono}</td>
                    <td className="table_element">{row.status}</td>
                </tr>
            ))}
        </tbody>
    )
}