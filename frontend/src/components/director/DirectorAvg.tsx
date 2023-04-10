import { useEffect, useState } from 'react'
import { DirectorStat } from '../../models/Director'
import { Link } from 'react-router-dom';
import detailIcon from '../../assets/detail.svg'
import deleteIcon from '../../assets/delete.svg'
import editIcon from '../../assets/edit.svg'

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
      <h1 className='text-4xl font-bold mb-[4rem]'>Directors List with Average</h1>
      <table className='mb-8'>
        <tbody className='[&>*>*]:px-2'>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Country</th>
                <th>Films directed</th>
                <th>Nominations</th>
                <th>Average movie years</th>
                <th>Operations</th>
            </tr>
            { directors.map((director: DirectorStat, index) => (
                <tr key={index+1}>
                    <td>{index+1}</td>
                    <td>
                      <Link to ={`/director/${director.id}`} className='underline hover:text-blue-600'>
                        {director.name}
                      </Link>
                    </td>
                    <td>{director.dob.toString()}</td>
                    <td>{director.country}</td>
                    <td>{director.films_directed}</td>
                    <td>{director.nominations}</td>
                    <td>{director.avg_movie_years? director.avg_movie_years : "N/A"}</td>
                    <td className='flex flex-row [&>*]:px-1'>
                      <Link to={`/director/${director.id}`}>
                        <img src={detailIcon} alt=""  className='w-8 h-8'/>
                      </Link>
                      <Link to={`/director/${director.id}/remove`}>
                        <img src={deleteIcon} alt=""  className='w-8 h-8'/>
                      </Link>
                      <Link to={`/director/${director.id}/edit`}>
                        <img src={editIcon} alt=""  className='w-8 h-8'/>
                      </Link>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
