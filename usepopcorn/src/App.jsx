import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Logo from './components/Logo'
import Searchbar from './components/Searchbar'
import Main from './components/Main'
import Box from './components/Box'
import Listbox from './components/Listbox'
import MovieDetails from './components/MovieDetails'
import Watchedsummary from './components/Watchedsummary'
import Watchedbox from './components/Watchedbox'
import Loader from './components/Loader'
import ErrorMessage from './components/ErrorMessage'
import { useMovies } from './hooks/useMovies'
import { useLocalStorageState } from './hooks/useLocalStorageState'

export default function App() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const { movies, loading, error } = useMovies(query, handleCloseMovie)
  const [watched, setWatched] = useLocalStorageState([], 'watched')

  function handleSetSeletedId(id) {
    setSelectedId(selectedId => (id === selectedId ? null : id))
  }

  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleAddWatchedMovie(movie) {
    if (watched.some(watchedMovie => watchedMovie.imdbID === movie.imdbID)) {
      alert('Movie already on your list')
      return
    }

    setWatched(watched => [...watched, movie])

    //localStorage.setItem('watched', JSON.stringify([...watched, movie]))
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  return (
    <>
      <Navbar>
        <Logo />
        {/* <Resultscount movies={movies} /> */}
        <Searchbar query={query} setQuery={setQuery} />
      </Navbar>
      <Main>
        <Box>
          {loading && <Loader />}
          {!loading && !error && (
            <Listbox movies={movies} onSelected={handleSetSeletedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatchedMovie}
              watched={watched}
            />
          ) : (
            <>
              <Watchedsummary watched={watched} />
              <Watchedbox
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}
