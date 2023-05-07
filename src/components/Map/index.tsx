import dynamic from 'next/dynamic'
import React from 'react'

interface MapProps {
  handleMapClick: (event: any) => void
  selectedPosition: [number, number]
}

const Map: React.FC<MapProps> = ({ handleMapClick, selectedPosition }) => {
  const MapWithNoSSR = dynamic(
    () => import('./ComponentMap').then((mod) => mod.ComponentMap),
    {
      ssr: false,
    },
  )
  return (
    <MapWithNoSSR
      handleMapClick={handleMapClick}
      selectedPosition={selectedPosition}
    />
  )
}

export { Map }
