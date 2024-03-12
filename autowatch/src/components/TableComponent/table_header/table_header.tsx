import "./styles.sass"

export default function TableHeader() {
    return (
        <thead className="table_header">
            <tr className="table_row">
                <th className="table_header_cell">Placa</th>
                <th>Modelo</th>
                <th>Dono</th>
                <th>Status</th>
            </tr>
        </thead>
    )
}