import { useEffect, useState } from 'react'
import StarRating from './StarRating'
import Loader from './Loader'

import placholderPoster from '../assets/poster.jpg'

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  KEY,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({})
  const [loading, setLoading] = useState(false)
  const [userRating, setUserRating] = useState(0)

  const isWatched = watched.map(watched => watched.imdbID).includes(selectedId)
  console.log(isWatched)

  const watchedUserRating = watched.find(
    movie => movie.imdbID === selectedId
  )?.userRating

  console.log(selectedId)

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
    }

    onAddWatched(newWatchedMovie)
    onCloseMovie()
  }

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true)
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
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
            <div>
              <em>{movie.Plot}</em>
              <p>Starring {movie.Actors}</p>
              <p>Directed by {movie.Director}</p>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
