import Map from "@/components/map/map";
import "./styles.sass";

export default function SimulationModal() {
    return (
        <div className="modal">
            <div className="modal_content">
                <header className="modal_header">
                    <h1 className="modal_title">Mapa</h1>
                </header>
                <section className="modal_content">
                    <Map />
                </section>
            </div>
        </div>
    );
}