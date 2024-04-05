"use client"
import React, { useState } from 'react';
import './styles.sass';
import contactIcon from "@/assets/images/contact.svg"
import analysisIcon from "@/assets/images/analysis.svg"
import Image from "next/image";
import ContactModal from '../modal/contactModal/contactModal';
import SimulationModal from '../modal/simulationModal/simulationModal';
import axios from 'axios';

interface RowData {
    email: string;
    lastLocation: string;
    name: string;
    numnber: string;
    plate: string;
    vehicle: string;
}

interface EventAttributes {
    plate?: string;
    impactSpeed?: number;
    fatalityLikelyhood?: number;
}

interface TableProps {
    data: RowData[];
}

export default function Table({ data }: TableProps) {
    const [expandedRow, setExpandedRow] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState<string>("");
    const [event, setEvent] = useState<EventAttributes>({});
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const fetchEventData = async (plate: string) => {
        try {
            const response = await axios.get(apiUrl + "/api/event/" + plate);
            console.log(response);

            setEvent(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const classifyChangeOfSupport = (risk: number): string => {
        if (risk > 80)
            return "Alto"
        else if (risk > 50)
            return "Médio"
        else
            return "Baixo"
    }

    const toggleRow = (index: number) => {
        if (expandedRow === index) {
            setExpandedRow(null);
        } else {
            setExpandedRow(index);
        }
    };

    const handleRowClick = (index: number, plate: string) => {
        toggleRow(index);
        setEvent({});
        fetchEventData(plate);
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
                    {data.length <= 0 &&
                        <tr className="centralize_message">
                            <td colSpan={4}>
                                <p className="message_error">
                                    No data to show
                                </p>
                            </td>
                        </tr>
                    }
                    {data.map((row, index) => (
                        <React.Fragment key={index}>
                            <tr className={`table_row ${expandedRow === index ? "selected_table_row" : "section_group"}`} onClick={() => handleRowClick(index, row.plate)}>
                                <td className="table_element first_element">{row.plate.toUpperCase()}</td>
                                <td className="table_element">{row.vehicle}</td>
                                <td className="table_element">{row.name}</td>
                                <td className="table_element status"></td>
                            </tr>
                            {!row.lastLocation && expandedRow === index &&
                                <tr className="centralize_message">
                                    <td colSpan={4}>
                                        <p className="message_error">
                                            No data to show
                                        </p>
                                    </td>
                                </tr>
                            }
                            {expandedRow === index && (
                                <tr className="table_row additional_info_row selected_table_row">
                                    <td colSpan={4} className="text_box">
                                        {row.lastLocation && row.lastLocation &&
                                            <p className="info_text">Localização: {row.lastLocation}</p>
                                        }
                                        {row.plate == event.plate && event.impactSpeed &&
                                            <p className="info_text">Impacto Calculado: {(event.impactSpeed / 9.8).toFixed(2)} g(s)</p>
                                        }
                                        {row.plate == event.plate && event.fatalityLikelyhood &&
                                            <p className="info_text">Chance de Morte: {(event.fatalityLikelyhood).toFixed(0)}%</p>
                                        }
                                        {row.plate == event.plate && event.fatalityLikelyhood &&
                                            <p className="info_text">Risco de vida: <b className={
                                                event.fatalityLikelyhood <= 50 ? "low_risk" :
                                                    event.fatalityLikelyhood > 50 ? "medium_risk" :
                                                        event.fatalityLikelyhood > 80 ? "high_risk" : ""}>{classifyChangeOfSupport(event.fatalityLikelyhood)}</b></p>
                                        }
                                    </td>
                                    <td className="button_box">
                                        {event.impactSpeed &&
                                            <>
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
                                            </>
                                        }
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {modalOpen == "contact" && (
                <div className="modal_overlay" onClick={(event) => closeModal(event)}>
                    <ContactModal />
                </div>
            )}
            {modalOpen == "analyze" && (
                <div className="modal_overlay" onClick={(event) => closeModal(event)}>
                    <SimulationModal />
                </div>
            )}
        </div>
    );
}
