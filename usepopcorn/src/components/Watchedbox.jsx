import Movie from './Movie'

export default function Watchedbox({ watched, onDeleteWatched }) {
  function handleReturn(e) {
    console.log(e.target)
  }

  return (
    <>
      {watched?.map(movie => (
        <Movie key={movie.imdbID} movie={movie}>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.Runtime} min</span>
            </p>
            <button
              onClick={() => onDeleteWatched(movie.imdbID)}
              className='btn-delete'
            >
              X
            </button>
          </div>
        </Movie>
      ))}
    </>
  )
}
