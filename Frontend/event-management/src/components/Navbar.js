import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"; // Import the logo

const Navbar = () => {
    return (
        <nav className="bg-blue-600 p-4 flex items-center justify-between text-white">
            {/* Left Side: Logo and Event Manager Text */}
            <Link to="/">

            <div className="flex items-center space-x-3">
                {/* Logo */}
                                    <img src={logo} alt="Event Manager Logo" className="h-12 w-auto" />
               
                {/* Vertical Line */}
                <div className="border-l-2 border-white h-10"></div>
                {/* Event Manager Text */}
                <h2 className="text-xl font-semibold">Event Manager</h2>
                
            </div>
            </Link>

            {/* Right Side: Navigation Links */}
            <div className="flex space-x-4">
                <Link to="/students" className="bg-white text-blue-600 px-4 py-2 rounded-md">
                    Students
                </Link>
                <Link to="/create" className="bg-white text-blue-600 px-4 py-2 rounded-md">
                    + Create Event
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
