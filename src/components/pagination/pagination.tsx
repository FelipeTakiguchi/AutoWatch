"use client";
import "./styles.sass";
import { useState } from "react";
import Image from "../../../node_modules/next/image";
import backIcon from "@/assets/images/Back.svg"
import forwardIcon from "@/assets/images/Forward.svg"
import useClientStore from "../../services/store";

export default function Pagination() {
    const { page, setPage, totalPages, setExpandedRow } = useClientStore();
    const sibling_count = 3;

    function renderPageNumbers() {
        const list = [];
        const initial = page - sibling_count > 0 ? page - sibling_count : 1;
        const last = initial + sibling_count * 2 < totalPages ? initial + sibling_count * 2 : totalPages;

        for (let i = initial; i <= last; i++) {
            if (i == page) {
                list.push(
                    <button
                        key={i}
                        className={`selected_link nav_button`}
                    >
                        {i}
                    </button>
                );
            } else {
                list.push(
                    <button
                        key={i}
                        onClick={() => { setPage(i); setExpandedRow(null) }}
                        className="nav_button">
                        {i}
                    </button>
                );
            }
        }

        return list;
    }

    return (
        <div className="navigation_bar">
            <button
                onClick={() => { setPage(page - 1 > 1 ? page - 1 : 1); setExpandedRow(null) }}
                className="arrow_button">
                <Image
                    className="arrow"
                    src={backIcon}
                    alt="Back Arrow"
                />
            </button>
            {page > sibling_count + 1 &&
                <>
                    <button
                        onClick={() => { setPage(1); setExpandedRow(null) }}
                        className="nav_button">
                        {1}
                    </button>
                    <p>...</p>
                </>
            }
            <div className="paginator">
                {renderPageNumbers()}
            </div>
            {page < totalPages - sibling_count &&
                <>
                    <p>...</p>
                    <button
                        onClick={() => { setPage(totalPages); setExpandedRow(null) }}
                        className="nav_button">
                        {totalPages}
                    </button>
                </>
            }
            <button
                onClick={() => { setPage(page + 1 < totalPages ? page - 1 : totalPages); setExpandedRow(null) }}
                className="arrow_button">
                <Image
                    className="arrow"
                    src={forwardIcon}
                    alt="Foward Arrow"
                />
            </button>
        </div>
    );
}