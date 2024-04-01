import Map from "@/components/map/map";
import "./styles.sass";
import { useMemo } from "react";
import dynamic from 'next/dynamic';

export default function SimulationModal() {
    
    const Map = useMemo(() => dynamic(
        () => import('@/components/map/map'),
        {
            loading: () => <p>A map is loading</p>,
            ssr: false
        }
    ), [])

    return (
        <div className="modal">
            <div className="modal_content">
                <header className="modal_header">
                    <h1 className="modal_title">Mapa</h1>
                </header>
                <section className="modal_content">
                    <Map props={{position: "-25.4217968,-49.2740144", zoom: "15z"}}/>
                </section>
            </div>
        </div>
    );
}