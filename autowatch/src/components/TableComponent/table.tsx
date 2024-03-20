import "./styles.sass"

export default function Table() {
    const data = [
        { placa: 'ABC1234', modelo: 'Toyota Corolla', dono: 'John Doe', status: 'Em crise' },
        { placa: 'DEF5678', modelo: 'Honda Civic', dono: 'Jane Smith', status: 'Rodando' },
        { placa: 'GHI9012', modelo: 'Ford Mustang', dono: 'Bob Johnson', status: 'Sem sinal' },
        { placa: 'JKL3456', modelo: 'Chevrolet Cruze', dono: 'Alice Brown', status: 'Rodando' },
        { placa: 'MNO7890', modelo: 'Tesla Model S', dono: 'Eve Wilson', status: 'Rodando' }
    ];

    return (
        <table className="table">
            <thead className="table_header">
                <tr className="table_row">
                    <th className="table_header_cell first_header_cell"><p className="table_header_text">Placa</p></th>
                    <th className="table_header_cell"><p className="table_header_text">Modelo</p></th>
                    <th className="table_header_cell"><p className="table_header_text">Dono</p></th>
                    <th className="table_header_cell status"><p className="table_header_text">Status</p></th>
                </tr>
            </thead>
            <tbody className="table_body">
                {data.map((row, index) => (
                    <tr className="table_row" key={index}>
                        <td className="table_element first_element">{row.placa}</td>
                        <td className="table_element">{row.modelo}</td>
                        <td className="table_element">{row.dono}</td>
                        <td className="table_element status">
                            <div className="wrap_container">
                                <p className="status_text">{row.status}</p>
                                {
                                    row.status == "Rodando" && (
                                        <div className="green_circle" />
                                    )
                                }
                                {
                                    row.status == "Sem sinal" && (
                                        <div className="yellow_circle" />
                                    )
                                }
                                {
                                    row.status == "Em crise" && (
                                        <div className="red_circle" />
                                    )
                                }
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}