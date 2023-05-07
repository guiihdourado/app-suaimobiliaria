import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

interface ComponentMapProps {
  handleMapClick: (event: any) => void
  selectedPosition: [number, number]
}

const ComponentMap: React.FC<ComponentMapProps> = ({
  handleMapClick,
  selectedPosition,
}) => {
  return (
    <MapContainer
      center={selectedPosition}
      zoom={16}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', borderRadius: '12px' }}
    >
      <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibHVpei1lZHVhcmRvLWZyYW5jbyIsImEiOiJjbGhjeGZiNHAwaDh4M2lweGo2MDlhcHVpIn0.jg6N1LNQbIJy_t4M3oHaSw" />

      <Marker position={selectedPosition} />
    </MapContainer>
  )
}

export { ComponentMap }
