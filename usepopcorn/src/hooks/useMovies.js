import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'

const KEY = import.meta.env.VITE_API_KEY

export function useMovies(query = '', callback) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const debouncedQuery = useDebounce(query, 600)

  useEffect(() => {
    callback?.()
    if (debouncedQuery.length <= 0) {
      setMovies([])
      return
    }
    async function fetchMovies() {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${debouncedQuery}`,
        )
        //if error connecting
        if (!res.ok) throw new Error('Something went wrong....')

        const data = await res.json()
        //if error with data
        if (data.Response === 'False') throw new Error('Movie not found')

        setMovies(data.Search)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError(err.message)
      }
    }

    if (query.length < 3) {
      setMovies([])
      setError('')
      return
    }

    callback?.()
    fetchMovies()
  }, [debouncedQuery])

  return { movies, error, loading }
}
