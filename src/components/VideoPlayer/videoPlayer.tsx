"use client"
import useClientStore from "@/services/clientStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { Radio } from 'react-loader-spinner'

export default function VideoPlayer() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { expandedRow, clients } = useClientStore();
    const [videoData, setVideoData] = useState("");

    useEffect(() => {
        async function fetchVideoData() {
            let selected = "";
            clients.map((client, index) => {
                if (expandedRow === index)
                    selected = client.plate;
            });

            try {
                const response = await axios.get(apiUrl + "/api/event/video/" + selected);
                if (response) {
                    setVideoData(`data:video/mp4;base64,${response.data.data}`)
                }
            } catch (error) {
                console.log("Cannot get video: " + error);
            }
        }
        fetchVideoData();
    }, []);

    return (
        <>
        {
            videoData &&
            <iframe src={videoData} width={600} height={400}></iframe>
        }
        </>
    );
}
