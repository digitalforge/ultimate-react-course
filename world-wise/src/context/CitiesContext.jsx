import { useContext, createContext, useState, useEffect } from 'react'

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:8000'

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([])
  const [currentCity, setCurrentCity] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch (err) {
        console.log(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  async function getCity(id) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      setCurrentCity(data)
      setIsLoading(false)
    } catch (err) {
      setIsLoading(false)
      console.log(err.message)
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined)
    throw new Error('CitiesContext was used outside the Cities Provider')
  return context
}

export { CitiesProvider, useCities }
