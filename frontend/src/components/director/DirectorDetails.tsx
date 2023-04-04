import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Director } from "../../models/Director";

export const DirectorDetails = () => {
    const { directorID } = useParams();
    const [ director, setDirector ] = useState<Director>();

    useEffect( () => {
        const fetchDirector = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/director/${directorID}/`);
            const director = await response.json();
            setDirector(director);
            console.log(director);
        }
        fetchDirector();
    }, [directorID]);

    if (!director) {
        return <div>no director found</div>;
      }

      return (
        <React.Fragment>
          <h1>Director Details</h1>
          {director ? (
            <React.Fragment>
              <p>Name: {director?.name}</p>
              <p>Born: {director?.dob.toString()}</p>
              <p>Country: {director?.country}</p>
              <p>Films directed: {director?.films_directed}</p>
              <p>Nominations: {director?.nominations}</p>
              <ul>
              {director?.movie?.length ? (
                director?.movie?.map((mov) => <li key={mov.id}>{mov.title}</li>)
              ) : (
                <p>No movies found</p>
              )}
            </ul>
            </React.Fragment>
          ) : (
            <p>Director not found</p>
          )}
        </React.Fragment>
      );
}