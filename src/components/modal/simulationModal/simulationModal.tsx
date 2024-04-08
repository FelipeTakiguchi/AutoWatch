import Map from "@/components/map/map";
import "./styles.sass";
import { useMemo } from "react";
import dynamic from 'next/dynamic';
import LineChart from "@/services/lineChart";
import ReactApexChart from "react-apexcharts";
import ChartPage from "@/services/lineChart";

export default function SimulationModal() {
    
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
            data: [100, 200, 300, 400, 500], // Sample data for users gained each year
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1
          }
        ]
      };
    
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
            <ChartPage/>
        </div>
    );
}