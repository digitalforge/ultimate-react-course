import Movielist from './Movielist'
import Movie from './Movie'

export default function Watchedbox({ watched }) {
  return (
    <>
      <Movielist movies={watched}>
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
                <span>{movie.runtime} min</span>
              </p>
            </div>
          </Movie>
        ))}
      </Movielist>
    </>
  )
}
