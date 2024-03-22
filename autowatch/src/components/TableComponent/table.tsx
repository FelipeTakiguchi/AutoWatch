"use client"
import React, { useState } from 'react';
import './styles.sass';

export default function Table() {
    const [expandedRow, setExpandedRow] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

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

    const handleRowClick = (index, event) => {
        if (!event.target.closest('.contact_button') && !event.target.closest('.analyze_button')) {
            toggleRow(index);
        }
    };

    const openModal = (content) => {
        setModalContent(content);
        setModalOpen(true);
    };

    const closeModal = (event) => {
        if (!event.target.closest('.modal')) {
            setModalOpen(false);
        }
    };

    return (
        <div>
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
                            <tr className={`table_row ${expandedRow === index ? "selected_table_row" : "section_group"}`} onClick={(event) => handleRowClick(index, event)}>
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
                                <tr className="table_row additional_info_row selected_table_row" onClick={(event) => handleRowClick(index, event)}>
                                    <td colSpan={4} className="text_box">
                                        <p className="info_text">Localização: {row.infos.localizacao}</p>
                                        <p className="info_text">Impacto Calculado: {row.infos.impacto} km/h</p>
                                        <p className="info_text">Risco de vida: {row.infos.risco}</p>
                                        <p className="info_text">Chance de precisar de suporte médico: {row.infos.suporte}%</p>
                                    </td>
                                    <div className="button_box">
                                        <button className="contact_button" onClick={() => openModal(`Contatando o motorista de ${row.placa}`)}>
                                            <img
                                                className="icon"
                                                src="/assets/images/contact.svg"
                                                alt="Contact Icon"
                                            />
                                            <h2 className="button_text">Contatar Motorista</h2>
                                        </button>
                                        <button className="analyze_button" onClick={() => openModal(`Analisando evento para ${row.placa}`)}>
                                            <img
                                                className="icon"
                                                src="/assets/images/analysis.svg"
                                                alt="Analysis Icon"
                                            />
                                            <h2 className="button_text">Analisar Evento</h2>
                                        </button>
                                    </div>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {modalOpen && (
                <div className="modal_overlay" onClick={(event) => closeModal(event)}>
                    <div className="modal">
                        <div className="modal_content">
                            <p>{modalContent}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
