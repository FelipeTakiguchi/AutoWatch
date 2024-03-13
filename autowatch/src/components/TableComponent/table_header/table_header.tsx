import "./styles.sass"

export default function TableHeader() {
    return (
        <thead className="table_header">
            <tr className="table_row">
                <th className="table_header_cell"><p className="table_header_text">Placa</p></th>
                <th className="table_header_cell"><p className="table_header_text">Modelo</p></th>
                <th className="table_header_cell"><p className="table_header_text">Dono</p></th>
                <th className="table_header_cell"><p className="table_header_text">Status</p></th>
            </tr>
        </thead>
    )
}