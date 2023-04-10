import React from "react"
import { Link } from "react-router-dom"

export const Home = () => {

    return (
        <React.Fragment>
            <div className="flex flex-col [&>*>*]:bg [&>*>*]:rounded-md [&>*]:mb-6">
                <Link to="/directors">
                    <button className="h-32 w-48 hover:shadow-2xl hover:shadow-black-950">
                        Directors
                    </button>
                </Link>
            </div>
        </React.Fragment>
    )
}