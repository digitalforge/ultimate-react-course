import { useSearchParams } from 'react-router-dom'

export function useUrlPosition() {
  const [searchParams] = useSearchParams()

  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const zoom = searchParams.get('zoom')

  return [lat, lng, zoom]
}
