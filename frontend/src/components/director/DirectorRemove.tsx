import axios from "axios";
import React from "react"
import { useNavigate, useParams } from "react-router-dom";

export const DirectorRemove = () => {
    const { directorID } = useParams();
    const navigate = useNavigate();

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
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleCancel}>Cancel</button>

        </React.Fragment>
    )
}