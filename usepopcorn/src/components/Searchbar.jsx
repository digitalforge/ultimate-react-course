import { useRef } from 'react'
import { useKey } from '../hooks/useKey'

export default function Searchbar({ query, setQuery }) {
  useKey('Enter', function () {
    if (document.activeElement === inputEl.current) return
    setQuery('')
    inputEl.current.focus()
  })

  const inputEl = useRef(null)

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}
