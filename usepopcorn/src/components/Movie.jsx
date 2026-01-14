export default function Movie({ movie, onSelected, children }) {
  return (
    <ul className='list list-movies'>
      <li
        key={movie.imdbID}
        onClick={onSelected ? () => onSelected(movie.imdbID) : undefined}
      >
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        {children}
      </li>
    </ul>
  )
}
