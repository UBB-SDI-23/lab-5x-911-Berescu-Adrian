import React from "react";
import {Link, useLocation} from "react-router-dom"

export const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <React.Fragment>
            <Link to="/">
                <button>
                    home
                </button>
            </Link>

            <Link to="/directors">
                <button>
                    directors
                </button>
            </Link>
        </React.Fragment>
    )
}