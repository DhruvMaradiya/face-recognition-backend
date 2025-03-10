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






//! OPTION 1

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Search, Users, PlusCircle } from 'lucide-react';
// import logo from "../assets/logo.svg"; 

// const Navbar = () => {
//     const [searchTerm, setSearchTerm] = useState("");
//     const navigate = useNavigate();

//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (searchTerm.trim()) {
//             navigate(`/?search=${searchTerm}`);
//         } else {
//             navigate("/");
//         }
//     };

//     return (
//         <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg p-4 sticky top-0 z-50">
//             <div className="container mx-auto flex justify-between items-center">
//                 {/* Logo and Brand Section */}
//                 <Link to="/" className="flex items-center space-x-4 group">
//                     <img 
//                         src={logo} 
//                         alt="Event Manager Logo" 
//                         className="h-12 w-auto transition-transform duration-300 group-hover:rotate-6"
//                     />
//                     <div className="flex items-center">
//                         <div className="border-l-2 border-white/50 h-10 mr-4"></div>
//                         <h2 className="text-2xl font-bold text-white tracking-wider 
//                             transition-all duration-300 group-hover:text-white/90">
//                             Event Manager
//                         </h2>
//                     </div>
//                 </Link>

//                 {/* Search Section */}
//                 <form onSubmit={handleSearch} className="flex items-center space-x-2 w-96">
//                     <div className="relative w-full">
//                         <input
//                             type="text"
//                             placeholder="Search events..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-10 pr-4 py-2 rounded-full 
//                                 text-gray-800 focus:outline-none focus:ring-2 
//                                 focus:ring-blue-300 transition duration-300"
//                         />
//                         <Search 
//                             className="absolute left-3 top-1/2 transform -translate-y-1/2 
//                             text-gray-400 pointer-events-none"
//                             size={20}
//                         />
//                     </div>
//                     <button 
//                         type="submit" 
//                         className="bg-white text-blue-600 px-4 py-2 rounded-full 
//                         hover:bg-blue-100 transition duration-300 flex items-center space-x-2"
//                     >
//                         <span>Search</span>
//                     </button>
//                 </form>

//                 {/* Action Buttons */}
//                 <div className="flex space-x-4">
//                     <Link 
//                         to="/students" 
//                         className="flex items-center space-x-2 bg-white text-blue-600 
//                         px-4 py-2 rounded-full hover:bg-blue-50 
//                         transition duration-300 group"
//                     >
//                         <Users 
//                             className="text-blue-600 group-hover:rotate-6 
//                             transition duration-300" 
//                             size={20} 
//                         />
//                         <span>Students</span>
//                     </Link>
//                     <Link 
//                         to="/create" 
//                         className="flex items-center space-x-2 bg-white text-blue-600 
//                         px-4 py-2 rounded-full hover:bg-blue-50 
//                         transition duration-300 group"
//                     >
//                         <PlusCircle 
//                             className="text-blue-600 group-hover:scale-110 
//                             transition duration-300" 
//                             size={20} 
//                         />
//                         <span>Create Event</span>
//                     </Link>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;




//! OPTION 2

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
        <nav className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-xl p-4 sticky top-0 z-50 border-b border-blue-400/20">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo and Brand Section */}
                <Link to="/" className="flex items-center space-x-5 group relative">
                    <div className="relative">
                        <img
                            src={logo}
                            alt="Event Manager Logo"
                            className="h-14 w-auto transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3 drop-shadow-lg"
                        />
                        <div className="absolute -inset-2 bg-blue-300/20 rounded-full blur-xl group-hover:bg-blue-300/30 transition-all duration-300"></div>
                    </div>
                    <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                        <div className="border-l-2 border-white/40 h-12 mr-5 transition-all duration-300 group-hover:border-white/60"></div>
                        <h2 className="text-3xl font-extrabold text-white tracking-wide bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent
                            transition-all duration-300 drop-shadow-md">
                            Event Manager
                        </h2>
                    </div>
                </Link>

                {/* Search Section */}
                <form onSubmit={handleSearch} className="flex items-center space-x-3 w-96 relative">
                    <div className="relative w-full group">
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/95 backdrop-blur-md
                                text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 
                                transition-all duration-300 shadow-md hover:shadow-lg placeholder-gray-400"
                        />
                        <Search
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 
                            text-gray-500 group-hover:text-blue-600 transition-colors duration-300"
                            size={22}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-white to-blue-50 text-blue-600 px-5 py-3 rounded-xl
                        hover:from-blue-50 hover:to-blue-100 transition-all duration-300 flex items-center space-x-2
                        shadow-md hover:shadow-lg font-medium group"
                    >
                        <span className="relative">
                            Search
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600/0 group-hover:bg-blue-600/50 transition-all duration-300"></span>
                        </span>
                    </button>
                </form>

                {/* Action Buttons */}
                <div className="flex space-x-5">
                    <Link
                        to="/students"
                        className="flex items-center space-x-2 bg-gradient-to-r from-white to-blue-50 text-blue-700
                        px-5 py-3 rounded-xl hover:from-blue-50 hover:to-blue-100 
                        transition-all duration-300 group shadow-md hover:shadow-lg"
                    >
                        <Users
                            className="text-blue-700 group-hover:-rotate-12 group-hover:scale-110
                            transition-all duration-300"
                            size={22}
                        />
                        <span className="font-medium relative">
                            Students
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-700/0 group-hover:bg-blue-700/50 transition-all duration-300"></span>
                        </span>
                    </Link>
                    <Link
                        to="/create"
                        className="flex items-center space-x-2 bg-gradient-to-r from-white to-blue-50 text-blue-700
                        px-5 py-3 rounded-xl hover:from-blue-50 hover:to-blue-100 
                        transition-all duration-300 group shadow-md hover:shadow-lg"
                    >
                        <PlusCircle
                            className="text-blue-700 group-hover:scale-125 group-hover:rotate-90
                            transition-all duration-300"
                            size={22}
                        />
                        <span className="font-medium relative">
                            Create Event
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-700/0 group-hover:bg-blue-700/50 transition-all duration-300"></span>
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;