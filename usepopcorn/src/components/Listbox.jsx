import Movielist from './Movielist'
import Movie from './Movie'
export default function Listbox({ movies }) {
  return (
    <Movielist movies={movies}>
      {movies?.map(movie => (
        <Movie key={movie.imdbID} movie={movie}>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </Movie>
      ))}
    </Movielist>
  )
}
