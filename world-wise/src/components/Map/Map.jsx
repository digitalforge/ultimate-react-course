import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import styles from './Map.module.css'
import { useCities } from '../../context/CitiesContext'
import { useGeolocation } from '../../hooks/useGeolocation'
import Button from '../Button/Button'
import { useUrlPosition } from '../../hooks/useUrlPosition'

function Map() {
  const { cities } = useCities()
  const [mapPosition, setMapPosition] = useState([0, 0])
  const [geoZoom, setgeoZoom] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation(getCoords => {
    const { lat, lng, zoomLevel } = getCoords
    setgeoZoom(zoomLevel)
    setMapPosition([lat, lng])
    setSearchParams({ lat, lng })
  })

  const [mapLat, mapLng, zoom] = useUrlPosition()

  useEffect(() => {
    if (!mapLat && !mapLng) return

    const lat = Number(mapLat)
    const lng = Number(mapLng)
    const coords = [lat, lng]

    setMapPosition(coords)
  }, [mapLat, mapLng, geoZoom])

  return (
    <div className={styles.mapContainer}>
      <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'Get your position'}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={geoZoom ?? 2}
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
        <ChangeCenter
          position={mapPosition}
          zoomLevel={geoZoom ? geoZoom : zoom}
        />
        <DetectClick setgeoZoom={setgeoZoom} />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position, zoomLevel }) {
  const map = useMap()
  useEffect(() => {
    const mapZoom =
      position[0] === 0 && position[1] === 0
        ? 2
        : zoomLevel
          ? zoomLevel
          : map.getZoom()
    map.setView(position, mapZoom)
  }, [map, position, zoomLevel])

  return null
}

function DetectClick({ setgeoZoom }) {
  const navigate = useNavigate()

  useMapEvents({
    click: e => {
      setgeoZoom(null)
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    },
  })

  return null
}

export default Map
