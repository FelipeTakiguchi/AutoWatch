"use client"
import React, { useState } from 'react';
import './styles.sass';

export default function Table() {
    const [expandedRow, setExpandedRow] = useState(null);

    const data = [
        { placa: 'ABC1234', modelo: 'Toyota Corolla', dono: 'John Doe', status: 'Em crise', infos: { localizacao: "Av das torres 1024 - Curitiba-PR Brasil | lat:65.1231, long -31.1213", risco: "alto", impacto: 90, suporte: 76 } },
        { placa: 'DEF5678', modelo: 'Honda Civic', dono: 'Jane Smith', status: 'Rodando', infos: { localizacao: "Av das torres 1024 - Curitiba-PR Brasil | lat:65.1231, long -31.1213" } },
        { placa: 'GHI9012', modelo: 'Ford Mustang', dono: 'Bob Johnson', status: 'Sem sinal', infos: { localizacao: "Av das torres 1024 - Curitiba-PR Brasil | lat:65.1231, long -31.1213" } },
        { placa: 'JKL3456', modelo: 'Chevrolet Cruze', dono: 'Alice Brown', status: 'Rodando', infos: { localizacao: "Av das torres 1024 - Curitiba-PR Brasil | lat:65.1231, long -31.1213" } },
        { placa: 'MNO7890', modelo: 'Tesla Model S', dono: 'Eve Wilson', status: 'Rodando', infos: { localizacao: "Av das torres 1024 - Curitiba-PR Brasil | lat:65.1231, long -31.1213" } }
    ];

    const toggleRow = (index) => {
        if (expandedRow === index) {
            setExpandedRow(null);
        } else {
            setExpandedRow(index);
        }
    };

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
                    <React.Fragment key={index}>
                        <tr className={`table_row ${expandedRow === index ? "selected_table_row" : "section_group"}`} onClick={() => toggleRow(index)}>
                            <td className="table_element first_element">{row.placa}</td>
                            <td className="table_element">{row.modelo}</td>
                            <td className="table_element">{row.dono}</td>
                            <td className="table_element status">
                                <div className="wrap_container">
                                    <p className="status_text">{row.status}</p>
                                    {row.status === "Rodando" && (<div className="green_circle" />)}
                                    {row.status === "Sem sinal" && (<div className="yellow_circle" />)}
                                    {row.status === "Em crise" && (<div className="red_circle" />)}
                                </div>
                            </td>
                        </tr>
                        {expandedRow === index && (
                            <tr className="table_row additional_info_row selected_table_row" onClick={() => toggleRow(index)}>
                                <td colSpan={4}>
                                    <p>Localização: {row.infos.localizacao}</p>
                                    <p>Impacto Calculado: {row.infos.impacto} km/h</p>
                                    <p>Risco de vida: {row.infos.risco}</p>
                                    <p>Chance de precisar de suporte médico: {row.infos.suporte}%</p>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
}
