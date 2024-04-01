import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { Popup } from "../../../node_modules/react-leaflet/lib/Popup"
import { TileLayer } from "../../../node_modules/react-leaflet/lib/TileLayer"
import { MapContainer } from "../../../node_modules/react-leaflet/lib/MapContainer"
import { Marker } from "../../../node_modules/react-leaflet/lib/Marker"
import 'leaflet/dist/leaflet.css'
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

    return <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
            className="map_size"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMap()}
        <Marker position={position}>
            <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
    </MapContainer>
}