"use client";
import "./styles.sass";
import { useState } from "react";
import Image from "../../../node_modules/next/image";
import backIcon from "@/assets/images/Back.svg"
import forwardIcon from "@/assets/images/Forward.svg"

export default function Pagination({totalPages, actualPage, setActualPage}: {totalPages: number, actualPage: number, setActualPage: Function}) {
    const sibling_count = 3;

    function renderPageNumbers() {
        const list = [];
        const initial = actualPage - sibling_count > 0 ? actualPage - sibling_count : 1;
        const last = initial + sibling_count * 2 < totalPages ? initial + sibling_count * 2 : totalPages;

        for (let i = initial; i <= last; i++) {
            if (i == actualPage) {
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
                        onClick={() => setActualPage(i)}
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
            <Image
                className="arrow"
                src={backIcon}
                alt="Back Arrow"
            />
            <div className="paginator">
                {renderPageNumbers()}
            </div>
            <Image
                className="arrow"
                src={forwardIcon}
                alt="Foward Arrow"
            />
        </div>
    );
}