import { useEffect, useState } from 'react'
import { DirectorStat } from '../../models/Director'

export const DirectorAvg = () => {
  const [directors, setDirectors] = useState([])

  useEffect( () => {
  fetch("http://127.0.0.1:8000/api/director/avg/")
    .then(res => res.json())
    .then(data => setDirectors(data));
  }, []);


  if (directors.length === 0) {
    return <div>No directors</div>;
  }
  return (
    
    <div>
      <h1>Director List</h1>
      <table>
        <tbody>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Country</th>
                <th>Films directed</th>
                <th>Nominations</th>
                <th>Average movie years</th>
            </tr>
            { directors.map((director: DirectorStat, index) => (
                <tr key={index+1}>
                    <td>{index+1}</td>
                    <td>{director.name}</td>
                    <td>{director.dob.toString()}</td>
                    <td>{director.country}</td>
                    <td>{director.films_directed}</td>
                    <td>{director.nominations}</td>
                    <td>{director.avg_movie_years? director.avg_movie_years : "N/A"}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
