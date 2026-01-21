import { useEffect, useState, useRef } from 'react'
import StarRating from './StarRating'
import Loader from './Loader'
import { useKey } from '../hooks/useKey'

import placholderPoster from '../assets/poster.jpg'

const KEY = import.meta.env.VITE_API_KEY

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({})
  const [loading, setLoading] = useState(false)
  const [userRating, setUserRating] = useState(0)

  //REFS
  const countRef = useRef(0)

  useEffect(() => {
    if (userRating) countRef.current = countRef.current + 1
  }, [userRating])

  const isWatched = watched.map(watched => watched.imdbID).includes(selectedId)
  const watchedUserRating = watched.find(
    movie => movie.imdbID === selectedId,
  )?.userRating

  function handleSetRating(rating) {
    setUserRating(rating)
  }

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      Runtime: Number(movie.Runtime.split(' ').at(0)),
      userRating,
      countRating: countRef.current,
    }

    onAddWatched(newWatchedMovie)
    onCloseMovie()
  }

  useKey('Escape', onCloseMovie)

  // useEffect(() => {
  //   function callBack(e) {
  //     if (e.code === 'Escape') {
  //       onCloseMovie()
  //       console.log('CLOSED')
  //     }
  //   }
  //   document.addEventListener('keydown', callBack)

  //   return () => document.removeEventListener('keydown', callBack)
  // }, [onCloseMovie])

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true)
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
        )
        const data = await res.json()
        setMovie(data)
        setLoading(false)
      } catch (err) {
        setLoading(false)
        console.log(err.message)
      }
    }

    fetchMovie()

    return () => {
      //this is a cleanup function.
      //console.log('Clean up function called')
    }
  }, [selectedId])

  useEffect(() => {
    if (!movie.Title) return
    document.title = `Movie | ${movie.Title}`

    return function () {
      document.title = 'usePopcorn'
    }
  }, [movie.Title])

  return (
    <div className='details'>
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : placholderPoster}
              alt={`Poster of ${movie.Title}`}
              onError={e => (e.target.src = placholderPoster)}
            />
            <div className='details-overview'>
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMBb rating
              </p>
            </div>
          </header>
          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    starSize={24}
                    textSize={16}
                    onSetRating={handleSetRating}
                  />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={() => handleAdd()}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You already rated this movie {watchedUserRating}{' '}
                  <span>⭐️</span>
                </p>
              )}
            </div>
            <div className='details-description'>
              <p>
                <b>Plot: </b>
                <em>{movie.Plot}</em>
              </p>
              <br />
              <br />
              <p>
                <b>Starring:</b> {movie.Actors}
              </p>
              <br />
              <p>
                <b>Directed by: </b> {movie.Director}
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
