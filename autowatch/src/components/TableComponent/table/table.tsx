import "./styles.sass"
import TableBody from "../table_body/table_body";
import TableHeader from "../table_header/table_header";

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
            <TableHeader/>
            <TableBody data={data}/>
        </table>
    );
}