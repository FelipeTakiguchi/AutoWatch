"use client"
import useClientStore from "@/services/clientStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { Oval, Radio } from 'react-loader-spinner'
import "./styles.sass";

export default function VideoPlayer() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { expandedRow, clients } = useClientStore();
    const [videoData, setVideoData] = useState("");

    const [chartHeight, setChartHeight] = useState(window.innerHeight * 0.6); // Initial height
    const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.8); // Initial width
  
    // Update chart dimensions on window resize
    useEffect(() => {
      function handleResize() {
        setChartHeight(window.innerHeight * 0.6); // Set height as 60% of window height
        setChartWidth(window.innerWidth * 0.8); // Set width as 80% of window width
      }
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                // console.log("Cannot get video: " + error);
            }
        }
        fetchVideoData();
    }, []);

    return (
        <div className="centralize_loading">
            {
                !videoData &&
                <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#0E1D35"
                    secondaryColor="#0E1D35"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            }
            {
                videoData &&
                <iframe src={videoData} width={chartWidth} height={chartHeight} allow="fullscreen"></iframe>
            }
        </div>
    );
}
