import { useState, useEffect } from 'react'

export function useLocalStorageState(initialState, key) {
  const [value, setValue] = useState(function () {
    //we can add a function to call in the useState to set an initial value
    const storedMovies = localStorage.getItem(key)

    // this JSON.parse will convert string back to array
    return storedMovies ? JSON.parse(storedMovies) : initialState
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}
