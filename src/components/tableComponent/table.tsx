"use client";
import React, { useEffect, useState } from 'react';
import './styles.sass';
import contactIcon from "@/assets/images/contact.svg"
import analysisIcon from "@/assets/images/analysis.svg"
import Image from "next/image";
import ContactModal from '../modal/contactModal/contactModal';
import SimulationModal from '../modal/simulationModal/simulationModal';
import axios from 'axios';
import useClientStore from '@/services/clientStore';
import { Radio } from 'react-loader-spinner';
import arrownDownIcon from "@/assets/images/arrow_down.svg";

interface EventAttributes {
    plate?: string;
    impactSpeed?: number;
    fatalityLikelyhood?: number;
}

export default function Table() {
    const { clients, setImpactData, expandedRow, setExpandedRow, elementsReturned, sortByPlate, setSortByPlate, sortByModel, setSortByModel, sortByOwner, setSortByOwner, sortByStatus, setSortByStatus } = useClientStore();
    const [modalOpen, setModalOpen] = useState<string>("");
    const [event, setEvent] = useState<EventAttributes>({});
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        console.log(expandedRow);

    }, [expandedRow])

    const fetchEventData = async (plate: string) => {
        try {
            const response = await axios.get(apiUrl + "/api/event/" + plate);
            setEvent(response.data);

            setImpactData({
                arising: response.data.arised,
                data: response.data.readings.map((reading: { maxAcceleration: number; timestamp: number; }) => ({
                    acceleration: reading.maxAcceleration,
                    time: reading.timestamp
                }))
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const classifyChangeOfSupport = (risk: number): string => {
        if (risk > 40)
            return "Alto"
        else if (risk > 20)
            return "Médio"
        else
            return "Baixo"
    }

    const toggleRow = (index: number) => {
        console.log("Oi")
        if (expandedRow === index) {
            setExpandedRow(null);
        } else {
            setExpandedRow(index);
        }
    };

    const handleRowClick = (index: number, event: React.MouseEvent<HTMLTableRowElement>, plate: string) => {
        // Check if the click occurred inside the ContactModal or SimulationModal
        if (
            (event.target as HTMLElement).closest(".button")
        ) {
            return; // If clicked inside either modal, do nothing
        }

        toggleRow(index);
        setEvent({});
        fetchEventData(plate);
    };

    const openModal = (modal: string) => {
        setModalOpen(modal);
    };

    const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
        // Check if the click occurred inside the ContactModal or SimulationModal
        if (
            (e.target as HTMLElement).closest(".modal")
        ) {
            return; // If clicked inside either modal, do nothing
        }
        setModalOpen("");
    };
    
    const sortData = (sortBy: string) => {
        // Reset all other sort states
        setSortByPlate(false);
        setSortByModel(false);
        setSortByOwner(false);
        setSortByStatus(false);

        // Set the selected sort state
        if (sortBy === "plate") setSortByPlate(!sortByPlate);
        else if (sortBy === "model") setSortByModel(!sortByModel);
        else if (sortBy === "owner") setSortByOwner(!sortByOwner);
        else if (sortBy === "status") setSortByStatus(!sortByStatus);
    };

    return (
        <div>
            <table className="table">
                <thead className="table_header">
                    <tr className="table_row">
                        <th className="table_header_cell first_header_cell">
                            <div className="table_header_horizontal_align">
                                <p className="table_header_text" onClick={() => sortData("plate")}>Placa</p>
                                <button className="button_order_by" onClick={() => sortData("plate")}>
                                    <Image src={arrownDownIcon} alt="order by icon" className={`${sortByPlate ? "arrow_up" : "arrow_down"} arrow_down_icon`} />
                                </button>
                            </div>
                        </th>
                        <th className="table_header_cell">
                            <div className="table_header_horizontal_align">
                                <p className="table_header_text" onClick={() => sortData("model")}>Modelo</p>
                                <button className="button_order_by" onClick={() => sortData("model")}>
                                    <Image src={arrownDownIcon} alt="order by icon" className={`${sortByModel ? "arrow_up" : "arrow_down"} arrow_down_icon`} />
                                </button>
                            </div>
                        </th>
                        <th className="table_header_cell">
                            <div className="table_header_horizontal_align">
                                <p className="table_header_text" onClick={() => sortData("owner")}>Dono</p>
                                <button className="button_order_by" onClick={() => sortData("owner")}>
                                    <Image src={arrownDownIcon} alt="order by icon" className={`${sortByOwner ? "arrow_up" : "arrow_down"} arrow_down_icon`} />
                                </button>
                            </div>
                        </th>
                        <th className="table_header_cell status last_header_cell">
                            <div className="table_header_horizontal_align">
                                <p className="table_header_text" onClick={() => sortData("status")}>Status</p>
                                <button className="button_order_by" onClick={() => sortData("status")}>
                                    <Image src={arrownDownIcon} alt="order by icon" className={`${sortByStatus ? "arrow_up" : "arrow_down"} arrow_down_icon`} />
                                </button>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="table_body">
                    {clients.length <= 0 &&
                        <tr className="centralize_message">
                            <td colSpan={4}>
                                <p className="message_error">
                                    Dados Indisponíveis
                                </p>
                            </td>
                        </tr>
                    }
                    {clients.map((row, index) => (
                        <React.Fragment key={index}>
                            <tr className={`table_row ${expandedRow === index ? "selected_table_row" : index + 1 != elementsReturned ? "section_group" : ""}`} onClick={(e) => handleRowClick(index, e, row.plate)}>
                                <td className="table_element first_element">{row.plate.toUpperCase()}</td>
                                <td className="table_element">{row.vehicle}</td>
                                <td className="table_element">{row.name}</td>
                                <td className="table_element status">
                                    <div className="wrap_container">
                                        <p className="status_text">{row.status}</p>
                                        {row.status === "Rodando" &&
                                            <Radio
                                                visible={true}
                                                height="30"
                                                width="30"
                                                colors={["#00662d", "#28A745", "#4C956C"]}
                                                ariaLabel="radio-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                            />
                                        }
                                        {row.status === "Sem Sinal" &&
                                            <Radio
                                                visible={true}
                                                height="30"
                                                width="30"
                                                colors={["#d9a202", "#dea602", "#ffbe00"]}
                                                ariaLabel="radio-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                            />}
                                        {row.status === "Em Crise" && (
                                            <div className="align">
                                                <Radio
                                                    visible={true}
                                                    height="30"
                                                    width="30"
                                                    colors={["#db0202", "#fc0808", "#ff3030"]}
                                                    ariaLabel="radio-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass=""
                                                />
                                                <div className="error_signal_container">
                                                    <p className="error_signal">x</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                            {!row.address && !event.impactSpeed && !event.fatalityLikelyhood && expandedRow === index &&
                                <tr className="centralize_message" onClick={(e) => handleRowClick(index, e, row.plate)}>
                                    <td colSpan={4}>
                                        <p className="message_error">
                                            Dados Indisponíveis
                                        </p>
                                    </td>
                                </tr>
                            }
                            {expandedRow === index && (
                                <tr className="table_row additional_info_row selected_table_row" onClick={(e) => handleRowClick(index, e, row.plate)}>
                                    <td colSpan={4} className="text_box">
                                        {row.address &&
                                            <p className="info_text">Localização: {row.address}</p>
                                        }
                                        {row.plate == event.plate && event.impactSpeed &&
                                            <p className="info_text">Impacto Calculado: {(event.impactSpeed / 9.8).toFixed(2)} g(s)</p>
                                        }
                                        {row.plate == event.plate && event.fatalityLikelyhood &&
                                            <p className="info_text">Chance de Morte: {(event.fatalityLikelyhood).toFixed(0)}%</p>
                                        }
                                        {row.plate == event.plate && event.fatalityLikelyhood &&
                                            <p className="info_text">Risco de vida: <b className={
                                                event.fatalityLikelyhood <= 20 ? "low_risk" :
                                                    event.fatalityLikelyhood <= 40 ? "medium_risk" : "high_risk"}>{classifyChangeOfSupport(event.fatalityLikelyhood)}</b></p>
                                        }
                                    </td>
                                    <td className="button_box">
                                        {row.plate == event.plate &&
                                            <>
                                                <button className="button" onClick={() => openModal("contact")}>
                                                    <Image
                                                        className="icon"
                                                        src={contactIcon}
                                                        alt="Contact Icon"
                                                    />
                                                    <h2 className="button_text">Contatar Motorista</h2>
                                                </button>
                                                <button className="button" onClick={() => openModal("analyze")}>
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
                <div className="modal_overlay" onClick={(e) => closeModal(e)}>
                    <ContactModal />
                </div>
            )}
            {modalOpen == "analyze" && (
                <div className="modal_overlay" onClick={(e) => closeModal(e)}>
                    <SimulationModal />
                </div>
            )}
        </div>
    );
}
