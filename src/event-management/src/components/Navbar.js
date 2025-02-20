import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 flex justify-between text-white">
            <h1 className="text-xl font-bold"><Link to="/">Event Manager</Link></h1>
            <Link to="/create" className="bg-white text-blue-600 px-4 py-2 rounded-md">
                + Create Event
            </Link>
        </nav>
    );
};

export default Navbar;
