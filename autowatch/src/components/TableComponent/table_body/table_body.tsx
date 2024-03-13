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
                    <td className="table_element status">
                        <div className="wrap_container">
                        {row.status}
                            {
                                row.status == "Rodando" && (
                                    <div className="green_circle"/>
                                )
                            }
                            {
                                row.status == "Sem sinal" && (
                                    <div className="yellow_circle"/>
                                )
                            }
                            {
                                row.status == "Em crise" && (
                                    <div className="red_circle"/>
                                )
                            }
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}