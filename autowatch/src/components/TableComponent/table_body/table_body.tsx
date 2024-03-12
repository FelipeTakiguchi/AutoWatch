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
        <tbody>
            {data.map((row, index) => (
                <tr key={index}>
                    <td>{row.placa}</td>
                    <td>{row.modelo}</td>
                    <td>{row.dono}</td>
                    <td>{row.status}</td>
                </tr>
            ))}
        </tbody>
    )
}