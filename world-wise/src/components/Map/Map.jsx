import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import styles from './Map.module.css'
import { useCities } from '../../context/CitiesContext'

function Map() {
  const { cities } = useCities()
  const navigate = useNavigate()
  const [mapPosition, setMapPosition] = useState([0, 0])
  const [searchParams, setSearchParams] = useSearchParams()

  const mapLat = searchParams.get('lat')
  const mapLng = searchParams.get('lng')

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([Number(mapLat), Number(mapLng)])
  }, [mapLat, mapLng])

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={2}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {cities.map(city => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  useEffect(() => {
    const isDefaultPosition = position[0] === 0 && position[1] === 0

    map.setView(position, isDefaultPosition ? 2 : 8)
  }, [map, position])

  return null
}

export default Map
