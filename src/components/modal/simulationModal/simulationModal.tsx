"use client";
import "../styles.sass";
import { useMemo, useState } from "react";
import dynamic from 'next/dynamic';
import ChartPage from "@/components/lineChart/lineChart";
import VideoPlayer from "@/components/VideoPlayer/videoPlayer";

export default function SimulationModal() {
    const [option, setOption] = useState("Map");

    const Map = useMemo(() => dynamic(
        () => import('@/components/map/map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    const chartData = {
        labels: ["2016", "2017", "2018", "2019", "2020"],
        datasets: [
            {
                label: "Users",
                data: [100, 200, 300, 400, 500],
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1
            }
        ]
    };

    return (
        <div className="modal">
            <div>
                <header className="modal_header">
                    <button onClick={() => setOption("Map")} className={`modal_button ${option=="Map" ? "modal_button_selected": ""}`}>
                        <h1 className="modal_title first_button">Mapa</h1>
                    </button>
                    <button onClick={() => setOption("Graphic")} className={`modal_button ${option=="Graphic" ? "modal_button_selected": ""}`}>
                        <h1 className="modal_title">Graphic</h1>
                    </button>
                    <button onClick={() => setOption("Video")} className={`modal_button ${option=="Video" ? "modal_button_selected": ""}`}>
                        <h1 className="modal_title last_button">Video</h1>
                    </button>
                </header>
                <section className="modal_content">
                    {option == "Map" &&
                        <Map props={{ position: "-25.4217968,-49.2740144", zoom: "15z" }} />
                    }
                    {option == "Graphic" &&
                        <ChartPage />
                    }
                    {option == "Video" &&
                        <VideoPlayer />
                    }
                </section>
            </div>
        </div>
    );
}