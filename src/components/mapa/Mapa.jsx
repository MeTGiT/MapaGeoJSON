import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './mapa.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-icon.png';
import data from './puntosGeo.json';

let iconUbicacion = new L.icon({
    iconUrl: icon,
    iconShadow: iconShadow,
});

const Mapa = () => {

    const [puntos, setPuntos] = useState([]);

    const construirPunto = () => {
        let arreglo = [];
        data.features.forEach((value, key) => {
            arreglo.push(
                <Marker position={[value.geometry.coordinates[1], value.geometry.coordinates[0]]} key={key} icon={iconUbicacion}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            )
        });

        setPuntos(arreglo);
    }

    useEffect(()=>{
        construirPunto();
    },[data])

    return(
        <>
            <MapContainer center={[19.3910844,-99.4732591]} zoom={6} scrollWheelZoom={false} className="mapa">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {puntos}
            </MapContainer>
        </>
    );
}

export default Mapa;