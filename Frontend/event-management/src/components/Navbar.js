// import React from "react";
// import { Link } from "react-router-dom";
// import logo from "../assets/logo.svg"; // Import the logo

// const Navbar = () => {
//     return (
//         <nav className="bg-blue-600 p-4 flex items-center justify-between text-white">
//             {/* Left Side: Logo and Event Manager Text */}
//             <Link to="/">

//             <div className="flex items-center space-x-3">
//                 {/* Logo */}
//                                     <img src={logo} alt="Event Manager Logo" className="h-12 w-auto" />
               
//                 {/* Vertical Line */}
//                 <div className="border-l-2 border-white h-10"></div>
//                 {/* Event Manager Text */}
//                 <h2 className="text-xl font-semibold">Event Manager</h2>
                
//             </div>
//             </Link>

//             {/* Right Side: Navigation Links */}
//             <div className="flex space-x-4">
//                 <Link to="/students" className="bg-white text-blue-600 px-4 py-2 rounded-md">
//                     Students
//                 </Link>
//                 <Link to="/create" className="bg-white text-blue-600 px-4 py-2 rounded-md">
//                     + Create Event
//                 </Link>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;




import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Users, PlusCircle } from 'lucide-react';
import logo from "../assets/logo.svg"; 

const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${searchTerm}`);
        } else {
            navigate("/");
        }
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo and Brand Section */}
                <Link to="/" className="flex items-center space-x-4 group">
                    <img 
                        src={logo} 
                        alt="Event Manager Logo" 
                        className="h-12 w-auto transition-transform duration-300 group-hover:rotate-6"
                    />
                    <div className="flex items-center">
                        <div className="border-l-2 border-white/50 h-10 mr-4"></div>
                        <h2 className="text-2xl font-bold text-white tracking-wider 
                            transition-all duration-300 group-hover:text-white/90">
                            Event Manager
                        </h2>
                    </div>
                </Link>

                {/* Search Section */}
                <form onSubmit={handleSearch} className="flex items-center space-x-2 w-96">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-full 
                                text-gray-800 focus:outline-none focus:ring-2 
                                focus:ring-blue-300 transition duration-300"
                        />
                        <Search 
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 
                            text-gray-400 pointer-events-none"
                            size={20}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="bg-white text-blue-600 px-4 py-2 rounded-full 
                        hover:bg-blue-100 transition duration-300 flex items-center space-x-2"
                    >
                        <span>Search</span>
                    </button>
                </form>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                    <Link 
                        to="/students" 
                        className="flex items-center space-x-2 bg-white text-blue-600 
                        px-4 py-2 rounded-full hover:bg-blue-50 
                        transition duration-300 group"
                    >
                        <Users 
                            className="text-blue-600 group-hover:rotate-6 
                            transition duration-300" 
                            size={20} 
                        />
                        <span>Students</span>
                    </Link>
                    <Link 
                        to="/create" 
                        className="flex items-center space-x-2 bg-white text-blue-600 
                        px-4 py-2 rounded-full hover:bg-blue-50 
                        transition duration-300 group"
                    >
                        <PlusCircle 
                            className="text-blue-600 group-hover:scale-110 
                            transition duration-300" 
                            size={20} 
                        />
                        <span>Create Event</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
