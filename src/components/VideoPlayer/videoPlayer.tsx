"use client"
import useClientStore from "@/services/clientStore";
import axios from "axios";
import { useEffect, useState } from "react";

export default function VideoPlayer() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { expandedRow, clients } = useClientStore();
    const [ videoData, setVideoData ] = useState("");

    useEffect(() => {
        async function fetchData() {
            let selected = "";
            clients.map((client, index) => {
                if (expandedRow === index)
                    selected = client.plate;
            })

            console.log(selected);

            const response = await axios.get(apiUrl + "/api/event/video/" + selected);
            console.log(response.data.data);
            if(response){
                setVideoData(`data:video/mp4;base64,${response.data.data}`)
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <video controls>
                <source src={videoData} type="video/mp4"/>
            </video>
        </>
    );
}