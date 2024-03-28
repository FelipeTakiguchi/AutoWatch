"use client"
import React, { useState } from "react";
import "./styles.sass"
import Image from "../../../node_modules/next/image";
import searchIcon from "@/assets/images/search.svg"

export default function Filter({ setFilter }: { setFilter: any }) {
    const [isFocused, setIsFocused] = useState(false);

    function handleFocus() {
        setIsFocused(true);
    }

    function handleBlur() {
        setIsFocused(false);
    }

    return (
        <div className={`input_box ${isFocused ? 'focused' : ''}`}>
            <div className="icon_box">
                <Image src={searchIcon} className={`search_icon ${isFocused ? 'focused_icon' : 'unfocused_icon'}`} alt="search icon" width={30} />
            </div>
            <input
                placeholder="Pesquisar..."
                onChange={(e) => setFilter(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`input ${isFocused ? 'focused_input' : 'unfocused_input'}`}
            />
        </div>
    );
}