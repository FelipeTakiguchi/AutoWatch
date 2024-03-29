"use client"
import React, { useMemo, useState } from 'react';
import './styles.sass';
import contactIcon from "@/assets/images/contact.svg"
import Image from "../../../node_modules/next/image";
import analysisIcon from "@/assets/images/analysis.svg"
import dynamic from '../../../node_modules/next/dynamic';

interface RowData {
    placa: string;
    modelo: string;
    dono: string;
    status: string;
    infos: {
        localizacao: string;
        risco?: string;
        impacto?: number;
        suporte?: number;
    };
}

interface TableProps {
    data: RowData[];
}

export default function Table({ data }: TableProps) {
    const [expandedRow, setExpandedRow] = useState(null);
    const [modalOpen, setModalOpen] = useState("");

    const Map = useMemo(() => dynamic(
        () => import('@/components/map/map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    const toggleRow = (index: any) => {
        if (expandedRow === index) {
            setExpandedRow(null);
        } else {
            setExpandedRow(index);
        }
    };

    const handleRowClick = (index: any, event: any) => {
        if (!event.target.closest('.contact_button') && !event.target.closest('.analyze_button')) {
            toggleRow(index);
        }
    };

    const openModal = (modal: string) => {
        setModalOpen(modal);
    };

    const closeModal = (event: any) => {
        if (!event.target.closest('.modal')) {
            setModalOpen("");
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
                                    <td className="button_box">
                                        <button className="contact_button" onClick={() => openModal("contact")}>
                                            <Image
                                                className="icon"
                                                src={contactIcon}
                                                alt="Contact Icon"
                                            />
                                            <h2 className="button_text">Contatar Motorista</h2>
                                        </button>
                                        <button className="analyze_button" onClick={() => openModal("analyze")}>
                                            <Image
                                                className="icon"
                                                src={analysisIcon}
                                                alt="Analysis Icon"
                                            />
                                            <h2 className="button_text">Analisar Evento</h2>
                                        </button>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {modalOpen == "contact" && (
                <div className="modal_overlay" onClick={(event) => closeModal(event)}>
                    <div className="modal">
                        <div className="modal_content">
                            <header className="modal_header">
                                <h1 className="modal_title">Contatos</h1>
                            </header>
                            <section className="modal_content">
                                <p><b>Email:</b> felipe_ntakiguchi@hotmail.com</p>
                                <p><b>Telefone:</b> (41) 99221-3693</p>
                            </section>
                        </div>
                    </div>
                </div>
            )}
            {modalOpen == "analyze" && (
                <div className="modal_overlay" onClick={(event) => closeModal(event)}>
                    <div className="modal">
                        <div className="modal_content">
                            <header className="modal_header">
                                <h1 className="modal_title">Mapa</h1>
                            </header>
                            <section className="modal_content">
                                <Map />
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
