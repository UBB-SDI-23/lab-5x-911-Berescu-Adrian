import { useEffect, useState } from 'react'
import { Director } from '../../models/Director'

export const DirectorShowAll = () => {
  const [directors, setDirectors] = useState([])
  const [sortField, setSortField] = useState('id')

  useEffect( () => {
  fetch("http://127.0.0.1:8000/api/director/")
    .then(res => res.json())
    .then(data => setDirectors(data));
  }, []);

  const handleSort = () => {
    if(sortField == 'id'){
      setSortField('nominations');
      setDirectors([...directors].sort((a: Director, b: Director) => b.nominations - a.nominations))
    }
    else{
      setSortField('id');
      setDirectors([...directors].sort((a: Director, b: Director) => a.id - b.id))
    }
  };

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
            </tr>
            { directors.map((director: Director, index) => (
                <tr key={index+1}>
                    <td>{index+1}</td>
                    <td>{director.name}</td>
                    <td>{director.dob.toString()}</td>
                    <td>{director.country}</td>
                    <td>{director.films_directed}</td>
                    <td>{director.nominations}</td>
                </tr>
            ))}
        </tbody>
      </table>
      <button onClick={handleSort}>sort by {sortField === 'id' ? 'nominations' : 'id'}</button>
    </div>
  )
}
