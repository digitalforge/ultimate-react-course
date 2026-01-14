import { BiSolidStar } from 'react-icons/bi'
import { BiBarChart } from 'react-icons/bi'
import { BiTime } from 'react-icons/bi'
const average = arr =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0)

export default function Watchedsummary({ watched }) {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating))
  const avgUserRating = average(watched.map(movie => movie.userRating))
  const avgRuntime = average(watched.map(movie => movie.Runtime))

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched?.length} movies</span>
        </p>
        <p>
          <span>
            <BiSolidStar />
          </span>
          <span>
            {avgImdbRating > 0 ? avgImdbRating.toFixed(1) : avgImdbRating}
          </span>
        </p>
        <p>
          <span>
            <BiBarChart />
          </span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>
            <BiTime />
          </span>
          <span>{Math.round(avgRuntime)} min</span>
        </p>
      </div>
    </div>
  )
}
