import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Director } from "../../models/Director";
import backArrow from "../../assets/back_arrow.svg"
import axios from "axios";
import {BACKEND_API_URL} from "../../constants"

export const DirectorEdit = () => {
    const navigate = useNavigate();
    const { directorID } = useParams();
    

    const [ director, setDirector ] = useState<Director>({
        id: 0,
        name:"",
        dob: new Date(),
        country: "",
        films_directed: 0,
        nominations: 0
    });

    useEffect(() => {
        const fetchDirector = async () => {
          const response = await axios.get(
            `${BACKEND_API_URL}/director/${directorID}/`
          );
          const fetchedDirector: Director = response.data;
          setDirector({
            id: fetchedDirector.id,
            name: fetchedDirector.name,
            dob: new Date(fetchedDirector.dob),
            country: fetchedDirector.country,
            films_directed: fetchedDirector.films_directed,
            nominations: fetchedDirector.nominations,
          });
        };
        fetchDirector();
      }, [directorID]);

    const updateDirector = async (event: {preventDefault: () => void}) => {
        event.preventDefault();
        try{
            const formattedDirector = {
                ...director,
                dob: director.dob.toISOString().substring(0, 10) // format the date as "YYYY-MM-DD"
            };
            await axios.put(`${BACKEND_API_URL}/director/${directorID}/`, formattedDirector);
            navigate("/directors");
        }
        catch(error){
            console.log(error);
        }
    };

    return (
        <React.Fragment>
            <Link to={`/directors`}>
                <img src={backArrow} alt="" className="h-10 w-10"/>
            </Link>
            <form onSubmit={updateDirector}>
                <div className="mb-8 flex flex-row">
                    <label htmlFor="name">
                        Name: 
                        <input type="text" id="name" value={director.name} onChange={(event) => setDirector({ ...director, name: event.target.value })} />
                    </label>
                    <br/>
                    <label htmlFor="dob">
                        DOB:
                        <input type="date" id="dob" value={director.dob.toISOString().substring(0, 10)} onChange={(event) => setDirector({ ...director, dob: new Date(event.target.value) })} />
                    </label>
                    <br/>
                    <label htmlFor="country">
                        Country: 
                        <input type="text" id="country" value={director.country} onChange={(event) => setDirector({ ...director, country: event.target.value })} />
                    </label>
                    <br/>
                    <label htmlFor="films_directed">
                        Films Directed: 
                        <input type="number" id="films_directed" value={director.films_directed} onChange={(event) => setDirector({ ...director, films_directed: Number(event.target.value) })} />
                    </label>
                    <br/>
                    <label htmlFor="nominations">
                        Nominations: 
                        <input type="number" id="nominations" value={director.nominations} onChange={(event) => setDirector({ ...director, nominations: Number(event.target.value) })} />
                    </label>
                </div>
                <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 rounded-full h-10 w-20" >Update</button>
            </form>
            
        </React.Fragment>
    )
}