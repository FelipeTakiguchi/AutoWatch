import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { Popup } from "../../../node_modules/react-leaflet/lib/Popup"
import { TileLayer } from "../../../node_modules/react-leaflet/lib/TileLayer"
import { MapContainer } from "../../../node_modules/react-leaflet/lib/MapContainer"
import { Marker } from "../../../node_modules/react-leaflet/lib/Marker"
import "./styles.sass"

export default function Map(props: any) {
    const { position, zoom } = props

    const renderMap = () => {
        console.log("map");


        return (
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        )
    }

    return <MapContainer center={[-25.4217968,-49.2740144]} zoom={15} className="map_size" scrollWheelZoom={false}>
        <TileLayer
            className="map_size"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMap()}
        <Marker position={[-25.4217968,-49.2740144]}>
            <Popup>
                <a target="_blank" href="https://www.google.com/maps/search/google+maps/@-25.4217968,-49.2740144,15z/data=!3m1!4b1?entry=ttu">Google Maps</a>
            </Popup>
        </Marker>
    </MapContainer>
}