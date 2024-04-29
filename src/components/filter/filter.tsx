"use client"
import React, { useEffect, useState } from "react";
import "./styles.sass";
import Image from "../../../node_modules/next/image";
import searchIcon from "@/assets/images/search.svg";
import axios from "axios";
import useClientStore from "../../services/clientStore";


export default function Filter() {
    const { setClients, page, nElements, setTotalPages, statusFilter, setElementsReturned } = useClientStore();
    const [isFocused, setIsFocused] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    function makeRequest() {
        axios.get(`${apiUrl}/api/client/${page}/${nElements}${inputValue ? "/" + inputValue : "/ALL"}${statusFilter ? "/" + statusFilter : "/Todos"}`).then((response) => {
            setClients(response.data.clients);            
            setElementsReturned(response.data.clients.length);
            setTotalPages(response.data.totalPages);
        }).catch((error) => {
            console.error("Error:", error);
        });
    }

    function handleFocus() {
        setIsFocused(true);
    }

    function handleBlur() {
        setIsFocused(false);
    }

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(() => {
            makeRequest();
        }, 100) as unknown as number;

        setTimeoutId(newTimeoutId);
    }, [inputValue, statusFilter]);

    return (
        <div className={`input_box ${isFocused ? 'focused' : ''}`}>
            <div className="icon_box">
                <Image src={searchIcon} className={`search_icon ${isFocused ? 'focused_icon' : 'unfocused_icon'}`} alt="search icon" width={30} />
            </div>
            <input
                placeholder="Pesquisar..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={`input ${isFocused ? 'focused_input' : 'unfocused_input'}`}
            />
        </div>
    );
}
