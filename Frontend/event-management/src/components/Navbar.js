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
//         <nav className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 shadow-xl p-4 sticky top-0 z-50 border-b border-blue-400/20">
//             <div className="container mx-auto flex justify-between items-center">
//                 {/* Logo and Brand Section */}
//                 <Link to="/" className="flex items-center space-x-5 group relative">
//                     <div className="relative">
//                         <img
//                             src={logo}
//                             alt="Event Manager Logo"
//                             className="h-14 w-auto transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3 drop-shadow-lg"
//                         />
//                         <div className="absolute -inset-2 bg-blue-300/20 rounded-full blur-xl group-hover:bg-blue-300/30 transition-all duration-300"></div>
//                     </div>
//                     <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
//                         <div className="border-l-2 border-white/40 h-12 mr-5 transition-all duration-300 group-hover:border-white/60"></div>
//                         <h2 className="text-3xl font-extrabold text-white tracking-wide bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent
//                             transition-all duration-300 drop-shadow-md">
//                             Event Manager
//                         </h2>
//                     </div>
//                 </Link>

//                 {/* Search Section */}
//                 <form onSubmit={handleSearch} className="flex items-center space-x-3 w-96 relative">
//                     <div className="relative w-full group">
//                         <input
//                             type="text"
//                             placeholder="Search events..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/95 backdrop-blur-md
//                                 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400/50 
//                                 transition-all duration-300 shadow-md hover:shadow-lg placeholder-gray-400"
//                         />
//                         <Search
//                             className="absolute left-4 top-1/2 transform -translate-y-1/2 
//                             text-gray-500 group-hover:text-blue-600 transition-colors duration-300"
//                             size={22}
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="bg-gradient-to-r from-white to-blue-50 text-blue-600 px-5 py-3 rounded-xl
//                         hover:from-blue-50 hover:to-blue-100 transition-all duration-300 flex items-center space-x-2
//                         shadow-md hover:shadow-lg font-medium group"
//                     >
//                         <span className="relative">
//                             Search
//                             <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600/0 group-hover:bg-blue-600/50 transition-all duration-300"></span>
//                         </span>
//                     </button>
//                 </form>

//                 {/* Action Buttons */}
//                 <div className="flex space-x-5">
//                     <Link
//                         to="/students"
//                         className="flex items-center space-x-2 bg-gradient-to-r from-white to-blue-50 text-blue-700
//                         px-5 py-3 rounded-xl hover:from-blue-50 hover:to-blue-100 
//                         transition-all duration-300 group shadow-md hover:shadow-lg"
//                     >
//                         <Users
//                             className="text-blue-700 group-hover:-rotate-12 group-hover:scale-110
//                             transition-all duration-300"
//                             size={22}
//                         />
//                         <span className="font-medium relative">
//                             Students
//                             <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-700/0 group-hover:bg-blue-700/50 transition-all duration-300"></span>
//                         </span>
//                     </Link>
//                     <Link
//                         to="/create"
//                         className="flex items-center space-x-2 bg-gradient-to-r from-white to-blue-50 text-blue-700
//                         px-5 py-3 rounded-xl hover:from-blue-50 hover:to-blue-100 
//                         transition-all duration-300 group shadow-md hover:shadow-lg"
//                     >
//                         <PlusCircle
//                             className="text-blue-700 group-hover:scale-125 group-hover:rotate-90
//                             transition-all duration-300"
//                             size={22}
//                         />
//                         <span className="font-medium relative">
//                             Create Event
//                             <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-700/0 group-hover:bg-blue-700/50 transition-all duration-300"></span>
//                         </span>
//                     </Link>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;








import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Users, PlusCircle, Calendar as CalendarIcon } from 'lucide-react';
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
        <nav className="bg-[#054e85] shadow-xl p-4 sticky top-0 z-50 border-b border-[#58585a]/20">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo and Brand Section */}
                <Link to="/" className="flex items-center space-x-5 group relative">
                    <div className="relative">
                        <img
                            src={logo}
                            alt="Event Manager Logo"
                            className="h-14 w-auto transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3 drop-shadow-lg"
                        />
                        <div className="absolute -inset-2 bg-[#fece00]/20 rounded-full blur-xl group-hover:bg-[#fece00]/30 transition-all duration-300"></div>
                    </div>
                    <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                        <div className="border-l-2 border-white/40 h-12 mr-5 transition-all duration-300 group-hover:border-white/60"></div>
                        <h2 className="text-3xl font-extrabold text-white tracking-wide drop-shadow-md">
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
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/95 backdrop-blur-md text-[#58585a] focus:outline-none focus:ring-2 focus:ring-[#fece00] transition-all duration-300 shadow-md hover:shadow-lg placeholder-[#58585a]/50"
                        />
                        <Search
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#58585a] group-hover:text-[#054e85] transition-colors duration-300"
                            size={22}
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#fece00] text-[#054e85] px-5 py-3 rounded-xl hover:bg-[#fece00]/80 transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg font-medium group"
                    >
                        <span className="relative">
                            Search
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#054e85]/0 group-hover:bg-[#054e85]/50 transition-all duration-300"></span>
                        </span>
                    </button>
                </form>

                {/* Action Buttons */}
                <div className="flex space-x-5">
                    <Link
                        to="/students"
                        className="flex items-center space-x-2 bg-[#ffffff] text-[#054e85] px-5 py-3 rounded-xl hover:bg-[#fece00]/80 transition-all duration-300 group shadow-md hover:shadow-lg"
                    >
                        <Users
                            className="text-[#054e85] group-hover:-rotate-12 group-hover:scale-110 transition-all duration-300"
                            size={22}
                        />
                        <span className="font-medium relative">
                            Students
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#054e85]/0 group-hover:bg-[#054e85]/50 transition-all duration-300"></span>
                        </span>
                    </Link>
                    <Link
                        to="/create"
                        className="flex items-center space-x-2 bg-[#ffffff] text-[#054e85] px-5 py-3 rounded-xl hover:bg-[#fece00]/80 transition-all duration-300 group shadow-md hover:shadow-lg"
                    >
                        <PlusCircle
                            className="text-[#054e85] group-hover:scale-125 group-hover:rotate-90 transition-all duration-300"
                            size={22}
                        />
                        <span className="font-medium relative">
                            Create Event
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#054e85]/0 group-hover:bg-[#054e85]/50 transition-all duration-300"></span>
                        </span>
                    </Link>
                    <Link
                        to="/calendar"
                        className="flex items-center space-x-2 bg-[#ffffff] text-[#054e85] px-5 py-3 rounded-xl hover:bg-[#fece00]/80 transition-all duration-300 group shadow-md hover:shadow-lg"
                    >
                        <CalendarIcon
                            className="text-[#054e85] group-hover:scale-110 transition-all duration-300"
                            size={22}
                        />
                        <span className="font-medium relative">
                            Calendar
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#054e85]/0 group-hover:bg-[#054e85]/50 transition-all duration-300"></span>
                        </span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;






