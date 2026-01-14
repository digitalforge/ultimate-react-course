import Movie from './Movie'
import { BiCalendar } from 'react-icons/bi'
import Resultscount from './Resultscount'

export default function Listbox({ movies, onSelected }) {
  return (
    <>
      <div className='list-summary'>
        <h2>Movie Search Results</h2>
        <Resultscount movies={movies} />
      </div>
      {movies?.map((movie, index) => (
        <Movie key={movie.imdbID} movie={movie} onSelected={onSelected}>
          <div>
            <p>
              <span>
                <BiCalendar />
              </span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </Movie>
      ))}
    </>
  )
}
