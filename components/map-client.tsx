"use client";

import { useEffect } from "react";
import type { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import "leaflet/dist/leaflet.css";

interface Coordinates {
  lat: number;
  lon: number;
}

interface MapClientProps {
  coord: Coordinates;
}

const FlyToActiveCity = ({ coord }: { coord: Coordinates }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo([coord.lat, coord.lon] as LatLngExpression, 13, {
      duration: 1.5,
    });
  }, [coord, map]);

  return null;
};

const MapClient = ({ coord }: MapClientProps) => (
  <MapContainer
    center={[coord.lat, coord.lon]}
    zoom={13}
    scrollWheelZoom={false}
    className="rounded-lg m-4"
    style={{ height: "100%", width: "100%" }}
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    />
    <FlyToActiveCity coord={coord} />
  </MapContainer>
);

export default MapClient;
