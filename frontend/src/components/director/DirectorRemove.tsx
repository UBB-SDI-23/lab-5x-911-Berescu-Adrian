import axios from "axios";
import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import backArrow from "../../assets/back_arrow.svg"
import { Director } from "../../models/Director";

export const DirectorRemove = () => {
    const { directorID } = useParams();
    const navigate = useNavigate();
    const [ director, setDirector ] = useState<Director>();

    useEffect( () => {
        const fetchDirector = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/director/${directorID}`);
            const director = await response.json();
            setDirector(director);
            console.log(director);
        }
        fetchDirector();
    }, [directorID]);

    const handleDelete = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await axios.delete(`http://127.0.0.1:8000/api/director/${directorID}`);
		navigate("/directors");
	};

	const handleCancel = (event: { preventDefault: () => void }) => {
		event.preventDefault();
		navigate("/directors");
	};

    return (
        <React.Fragment>
            <Link to={`/directors`}>
                <img src={backArrow} alt="" className="h-10 w-10"/>
            </Link>
            <h1>Delete '{director?.name}'?</h1>
            <button onClick={handleDelete} className="bg-red-500 w-20 h-10 rounded-full m-2 hover:bg-red-400">Delete</button>
            <button onClick={handleCancel} className="w-20 h-10 border-2 border-font rounded-full m-2 hover:bg-blue-100">Cancel</button>

        </React.Fragment>
    )
}