import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Director } from "../../models/Director";
import backArrow from "../../assets/back_arrow.svg"

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
          <h1 className="text-4xl font-bold mt-[-12rem] mb-[8rem]">Director Details</h1>
          <Link to={`/directors`}>
            <img src={backArrow} alt="" className="h-10 w-10"/>
          </Link>
          {director ? (
            <div className="p-4 [&>*]:text-lg ">
              <p>Name: {director?.name}</p>
              <p>Born: {director?.dob.toString()}</p>
              <p>Country: {director?.country}</p>
              <p>Films directed: {director?.films_directed}</p>
              <p>Nominations: {director?.nominations}</p>
              <ul className="">
              <p>Movies: </p>
              {director?.movie?.length ? (
                director?.movie?.map((mov) => <li key={mov.id}>{mov.title}</li>)
              ) : (
                <p>No movies found</p>
              )}
              </ul>
            </div>
          ) : (
            <p>Director not found</p>
          )}
        </React.Fragment>
      );
}