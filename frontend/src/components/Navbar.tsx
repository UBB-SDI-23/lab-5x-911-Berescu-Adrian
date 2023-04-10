import React from "react";
import {Link, useLocation} from "react-router-dom"

export const Navbar = () => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <nav className="absolute top-0 left-0 ml-4 flex flex-row [&>*>*]:px-16 [&>*>*]:py-6 [&>*>*]:font-bold">
            <Link to="/">
                <button> 
                    Home
                </button>
            </Link>

            <Link to="/directors">
                <button>
                    Directors
                </button>
            </Link>
        </nav>
    )
}