import placholderPoster from '../assets/poster.jpg'

export default function Movie({ movie, onSelected, children }) {
  return (
    <ul className='list list-movies'>
      <li
        key={movie.imdbID}
        onClick={onSelected ? () => onSelected(movie.imdbID) : undefined}
      >
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : placholderPoster}
          alt={`${movie.Title} poster`}
          onError={e => (e.target.src = placholderPoster)}
        />
        <h3>{movie.Title}</h3>
        {children}
      </li>
    </ul>
  )
}
