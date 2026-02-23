import { useEffect, useState } from 'react'

function useDebounce(delay) {
  const [debouncedValue, setDebouncedValue] = useState(null)
  useEffect(() => {
    const timer = setTimeout(() => {}, delay)
    return clearTimeout(timer)
  })

  return debouncedValue
}

export { useDebounce }
