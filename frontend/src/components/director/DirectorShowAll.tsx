import { useEffect, useState } from 'react'
import { Director } from '../../models/Director'
import { Link } from 'react-router-dom'
import detailIcon from '../../assets/detail.svg'
import deleteIcon from '../../assets/delete.svg'
import editIcon from '../../assets/edit.svg'

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
      <h1 className='text-4xl font-bold mb-[4rem]'>Directors List</h1>
      <div className='flex flex-row items-center [&>*]:px-2 mb-8'>
        <Link to={`/director/add`}>
          <h1 className='text-4xl text-blue-800'>+</h1>
        </Link>
        <Link to={`avg`}>
          <h1 className='text-lg hover:text-blue-600 ml-6 pt-2'>Average</h1>
        </Link>
      </div>
      <table className='mb-8'>
        <tbody className='[&>*>*]:px-2'>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Country</th>
                <th>Films directed</th>
                <th>Nominations</th>
                <th>Operations</th>
            </tr>
            { directors.map((director: Director, index) => (
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
                    <td className='flex flex-row [&>*]:px-2 [&>*>*]:h-8 '>
                      <Link to={`/director/${director.id}`}>
                        <img src={detailIcon} alt=""/>
                      </Link>
                      <Link to={`/director/${director.id}/remove`}>
                        <img src={deleteIcon} alt="" />
                      </Link>
                      <Link to={`/director/${director.id}/edit`}>
                        <img src={editIcon} alt="" />
                      </Link>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
      <button className='bg-yellow-500 rounded-3xl h-16 w-32 hover:bg-yellow-400' onClick={handleSort}>{sortField === 'id' ? 'sort by nominations' : 'reset'}</button>
    </div>
  )
}
