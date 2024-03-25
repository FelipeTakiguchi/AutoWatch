"use client"
import React, { useState } from "react";
import "./styles.sass"

export default function Filter({ setFilter } : {setFilter: any}) {
    const [isFocused, setIsFocused] = useState(false);

    function handleFocus() {
        setIsFocused(true);
    }

    function handleBlur() {
        setIsFocused(false);
    }

    return (
        <div className={`input_box ${isFocused ? 'focused' : ''}`}>
            <img src="/assets/images/search.svg" className="search_icon" alt="search icon" />
            <input
                placeholder="Pesquisar..."
                onChange={(e) => setFilter(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="input"
            />
        </div>
    );
}