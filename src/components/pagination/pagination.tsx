"use client";
import "./styles.sass";
import { useState } from "react";
import Image from "../../../node_modules/next/image";
import backIcon from "@/assets/images/Back.svg"
import forwardIcon from "@/assets/images/Forward.svg"
import useClientStore from "../../services/store";

export default function Pagination() {
    const { page, setPage, totalPages } = useClientStore();
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
                        onClick={() => setPage(i)}
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