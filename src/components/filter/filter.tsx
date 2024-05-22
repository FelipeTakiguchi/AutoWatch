"use client"
import React, { useEffect, useState } from "react";
import "./styles.sass";
import Image from "../../../node_modules/next/image";
import searchIcon from "@/assets/images/search.svg";
import axios from "axios";
import useClientStore from "../../services/clientStore";


export default function Filter() {
    const { setClients, setPage, nElements, inputValue, setInputValue, setTotalPages, statusFilter, setElementsReturned, setTotalElements, sortByPlate, sortByModel, sortByOwner, sortByStatus, orderBy, setOrderBy, isAscending, setIsAscending } = useClientStore();
    const [isFocused, setIsFocused] = useState(false);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [timeoutId, setTimeoutId] = useState<number | null>(null);

    useEffect(() => {
        if (orderBy !== "") {
            if (!sortByPlate && !sortByModel && !sortByOwner && !sortByStatus) {
                setIsAscending(true);
            }
            else {
                setIsAscending(false);
                setOrderBy(sortByPlate ? "plate" : sortByModel ? "vehicle" : sortByOwner ? "name" : sortByStatus ? "status" : "status");
            }
        }else {
            setOrderBy(sortByPlate ? "plate" : sortByModel ? "vehicle" : sortByOwner ? "name" : sortByStatus ? "status" : "status");
        }

    }, [sortByPlate, sortByModel, sortByOwner, sortByStatus])

    const makeRequest = async () => {
        try {
            setPage(1);
            const url = `${apiUrl}/api/client/${1}/${nElements}${inputValue ? "/" + inputValue : "/ALL"}${statusFilter ? "/" + statusFilter : "/Todos"}${orderBy ? "/" + orderBy : "/status"}${isAscending ? "/desc" : "/asc"}`; // change status to filter by order
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    const fetchData = async () => {
        const data = await makeRequest()

        if (!data) return;

        data.clients.map((c: any) => {
            c.lastUpdated = new Date(c.lastUpdated).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
            return c;
        });

        const promises = data.clients.map((client: any) => {
            if (client.lastLocation) {
                const latitude = client.lastLocation.split(", ")[0];
                const longitude = client.lastLocation.split(", ")[1];
                if (latitude && longitude) {
                    var address = "270, Rua Paula Gomes, São Francisco, Curitiba, Paraná, South Region, 80510-190, Brazil";
                    const addressParts = address.split(", ");
                    const firstFour = addressParts.slice(0, 4).join(", ");
                    const lastFour = addressParts.slice(-4).join(", ");
                    client.address = `${firstFour}, ${lastFour}`;
                    // return getFormattedAddress(latitude, longitude)
                    //     .then(address => {
                    //         const addressParts = address.split(", ");
                    //         const firstFour = addressParts.slice(0, 4).join(", ");
                    //         const lastFour = addressParts.slice(-4).join(", ");
                    //         client.address = `${firstFour}, ${lastFour}`;
                    //         return client.lastLocation;
                    //     });
                }
            }
        });

        Promise.all(promises)
            .then(locations => {
                setClients(data.clients);
                setTotalPages(data.totalPages);
                setTotalElements(data.totalElements);
                setElementsReturned(data.clients.length);
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching addresses:', error);
            });
    }

    // function getFormattedAddress(latitude: string, longitude: string) {
    //     const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

    //     return fetch(url)
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             if (data.display_name) {
    //                 return data.display_name;
    //             } else {
    //                 throw new Error('No results found');
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //             return null;
    //         });
    // }

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
            fetchData();
        }, 100) as unknown as number;

        setTimeoutId(newTimeoutId);
    }, [inputValue, statusFilter, orderBy, isAscending]);

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
