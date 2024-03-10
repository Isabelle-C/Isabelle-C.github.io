import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";

const MyMap = () => {
  return (

<MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "100vh", width: "100%" }}>
  <TileLayer
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <Marker position={[51.505, -0.09]}>
    <Popup>
      <h2>Custom Popup</h2>
      <p>This is a custom popup with HTML elements.</p>
      <img src="https://via.placeholder.com/150" alt="Placeholder" />
    </Popup>
  </Marker>
  <Circle
    center={[51.508, -0.11]}
    radius={500}
    pathOptions={{ color: 'red', fillColor: '#f03', fillOpacity: 0.5 }}
  />
</MapContainer>
  );
}

export default MyMap;