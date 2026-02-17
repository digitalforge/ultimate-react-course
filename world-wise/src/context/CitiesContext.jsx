import {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react'

const CitiesContext = createContext()
const BASE_URL = 'http://localhost:8000'

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
}

function citiesReducer(state, { type, payload }) {
  switch (type) {
    case 'loading':
      return { ...state, isLoading: true }
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: payload }
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: payload }
    case 'city/created':
      return { ...state, isLoading: false, cities: [...state.cities, payload] }
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== payload),
      }
    case 'rejected':
      return { ...state, isLoading: false, error: payload }
    default:
      throw new Error('Action Unknown')
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    citiesReducer,
    initialState,
  )

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: 'loading' })
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: 'cities/loaded', payload: data })
      } catch (err) {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading city data',
        })
      }
    }

    fetchCities()
  }, [])

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return

      try {
        dispatch({ type: 'loading' })
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json()
        dispatch({ type: 'city/loaded', payload: data })
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'There was an error loading data',
        })
      }
    },
    [currentCity.id],
  )

  async function addCity(newCity) {
    try {
      dispatch({ type: 'loading' })
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      dispatch({ type: 'city/created', payload: data })
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error add the city. Please try again',
      })
    }
  }

  async function deleteCity(id) {
    try {
      dispatch({ type: 'loading' })
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      })
      dispatch({ type: 'city/deleted', payload: id })
    } catch (err) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error deleting the city. Please try again',
      })
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        addCity,
        deleteCity,
        error,
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
