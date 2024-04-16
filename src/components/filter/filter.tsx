"use client"
import React, { useState } from "react";
import "./styles.sass";
import Image from "../../../node_modules/next/image";
import searchIcon from "@/assets/images/search.svg";
import axios from "axios";
import useClientStore from "../../services/store";


export default function Filter({ setFilter }: { setFilter: any }) {
    const { setClients, page, nElements, setTotalPages } = useClientStore();
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    function handleFocus() {
        setIsFocused(true);
    }

    function handleBlur() {
        setIsFocused(false);
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(e.target.value);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            axios.get(`${apiUrl}/api/client/${page}/${nElements}/${e.target.value}`).then((response) => {
                setClients(response.data.clients);
                console.log(response.data);
                setTotalPages(response.data.totalPages);
            }).catch((error) => {
                console.error("Error:", error);
            });
        }, 500) as unknown as number;

        setTimeoutId(newTimeoutId);
    }

    return (
        <div className={`input_box ${isFocused ? 'focused' : ''}`}>
            <div className="icon_box">
                <Image src={searchIcon} className={`search_icon ${isFocused ? 'focused_icon' : 'unfocused_icon'}`} alt="search icon" width={30} />
            </div>
            <input
                placeholder="Pesquisar..."
                value={inputValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`input ${isFocused ? 'focused_input' : 'unfocused_input'}`}
            />
        </div>
    );
}
