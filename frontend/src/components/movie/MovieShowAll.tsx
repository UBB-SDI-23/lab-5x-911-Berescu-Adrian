import { useEffect, useState } from 'react'
import { Movie } from '../../models/Movie'

export const MovieShowAll = () => {
  const [movies, setMovies] = useState([])

  useEffect( () => {
  fetch("http://127.0.0.1:8000/api/movie/")
    .then(res => res.json())
    .then(data => setMovies(data));
  }, []);

  if (movies.length === 0) {
    return <div>No movies</div>;
  }
  return (
    
    <div>
      <h1>Movie List</h1>
      <table>
        <tbody>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Year</th>
                <th>Genre</th>
                <th>Synopsis</th>
                <th>Director</th>
            </tr>
            { movies.map((movie: Movie, index) => (
                <tr key={index+1}>
                    <td>{index+1}</td>
                    <td>{movie.title}</td>
                    <td>{movie.year}</td>
                    <td>{movie.genre}</td>
                    <td>{movie.synopsis}</td>
                    <td>{movie.director.id}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

