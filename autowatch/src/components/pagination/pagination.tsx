"use client";
import Link from "next/link";
import "./styles.sass";
import { useState } from "react";
import Image from "../../../node_modules/next/image";
import backIcon from "@/assets/images/Back.svg"
import forwardIcon from "@/assets/images/Forward.svg"

export default function Pagination() {
    const sibling_count = 3;
    const [selected, setSeleted] = useState(2);

    function renderPageNumbers() {
        const list = [];
        const initial = selected - sibling_count > 0 ? selected - sibling_count : 1;
        const last = initial + sibling_count * 2;

        for (let i = initial; i <= last; i++) {
            if (i == selected) {
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
                        onClick={() => setSeleted(i)}
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