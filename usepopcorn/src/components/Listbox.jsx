import Movie from './Movie'
import { BiCalendar } from 'react-icons/bi'
export default function Listbox({ movies, onSelected }) {
  return (
    <>
      <div className='summary'>
        <h2>Movie Search Results</h2>
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
