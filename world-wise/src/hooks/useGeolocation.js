import { useState } from 'react'

export function useGeolocation(getCoords) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  function getPosition() {
    if (!navigator.geolocation)
      return setError('Your browser does not support geolocation')

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      success => {
        const coords = {
          lat: success.coords.latitude,
          lng: success.coords.longitude,
          zoomLevel: 10,
        }
        getCoords?.(coords)
        setIsLoading(false)
      },
      error => {
        setError(error.message)
        setIsLoading(false)
      },
    )
  }

  return { isLoading, error, getPosition }
}
