// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const StudentsList = () => {
//     const [students, setStudents] = useState([]);

//     useEffect(() => {
//         fetch("http://localhost:5000/students")
//             .then((res) => res.json())
//             .then((data) => setStudents(data))
//             .catch((error) => console.error("Error fetching students:", error));
//     }, []);

//     return (
//         <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">All Students</h1>
//             <ul className="list-disc list-inside">
//                 {students.map((student) => (
//                     <li key={student._id} className="p-2 border-b">
//                         <Link to={`/student/${student._id}`} className="text-blue-500 hover:underline">
//                             {student.fullName} ({student.email})
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default StudentsList;





// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const StudentsList = () => {
//     const [students, setStudents] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     useEffect(() => {
//         fetch(`http://localhost:5000/students?page=${page}&limit=5`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setStudents(data.students);
//                 setTotalPages(data.totalPages);
//             })
//             .catch((error) => console.error("Error fetching students:", error));
//     }, [page]);

//     return (
//         <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//             <h1 className="text-2xl font-bold mb-4">All Students</h1>
//             <ul className="list-disc list-inside">
//                 {students.map((student) => (
//                     <li key={student._id} className="p-2 border-b">
//                         <Link to={`/student/${student._id}`} className="text-blue-500 hover:underline">
//                             {student.fullName} ({student.email})
//                         </Link>
//                     </li>
//                 ))}
//             </ul>

//             {/* Pagination Controls */}
//             <div className="mt-4 flex justify-center space-x-2">
//                 <button 
//                     onClick={() => setPage(page - 1)} 
//                     disabled={page === 1}
//                     className="bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50"
//                 >
//                     Prev
//                 </button>
//                 <span className="px-3 py-1 border">{page} / {totalPages}</span>
//                 <button 
//                     onClick={() => setPage(page + 1)} 
//                     disabled={page === totalPages}
//                     className="bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50"
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default StudentsList;











// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { 
//     Users, 
//     ChevronLeft, 
//     ChevronRight, 
//     Mail, 
//     UserCircle 
// } from 'lucide-react';

// const StudentsList = () => {
//     const [students, setStudents] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         setIsLoading(true);
//         fetch(`http://localhost:5000/students?page=${page}&limit=5`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setStudents(data.students);
//                 setTotalPages(data.totalPages);
//                 setIsLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error fetching students:", error);
//                 setIsLoading(false);
//             });
//     }, [page]);

//     return (
//         <div className="container mx-auto px-4 py-8 max-w-3xl">
//             <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 p-6 flex items-center space-x-4">
//                     <Users className="text-white" size={32} />
//                     <h1 className="text-2xl font-bold text-white">Students Directory</h1>
//                 </div>

//                 {/* Students List */}
//                 {isLoading ? (
//                     <div className="text-center py-8">
//                         <p className="text-gray-500 animate-pulse">Loading students...</p>
//                     </div>
//                 ) : students.length === 0 ? (
//                     <div className="text-center py-8 bg-yellow-50">
//                         <p className="text-gray-600">No students found</p>
//                     </div>
//                 ) : (
//                     <ul className="divide-y divide-gray-200">
//                         {students.map((student) => (
//                             <li 
//                                 key={student._id} 
//                                 className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200 group"
//                             >
//                                 <Link 
//                                     to={`/student/${student._id}`} 
//                                     className="flex items-center space-x-4"
//                                 >
//                                     <UserCircle 
//                                         className="text-blue-500 group-hover:text-blue-600 transition-colors" 
//                                         size={40} 
//                                     />
//                                     <div className="flex-1">
//                                         <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
//                                             {student.fullName}
//                                         </p>
//                                         <div className="flex items-center space-x-2 text-gray-500">
//                                             <Mail size={16} />
//                                             <p className="text-sm">{student.email}</p>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 )}

//                 {/* Pagination Controls */}
//                 <div className="bg-gray-50 p-4 flex justify-center items-center space-x-4">
//                     <button 
//                         onClick={() => setPage(page - 1)} 
//                         disabled={page === 1}
//                         className="flex items-center space-x-2 bg-blue-500 text-white 
//                         px-4 py-2 rounded-md hover:bg-blue-600 
//                         disabled:bg-gray-300 disabled:cursor-not-allowed 
//                         transition-colors duration-300"
//                     >
//                         <ChevronLeft size={20} />
//                         <span>Previous</span>
//                     </button>

//                     <span className="text-gray-600 font-medium">
//                         Page {page} of {totalPages}
//                     </span>

//                     <button 
//                         onClick={() => setPage(page + 1)} 
//                         disabled={page === totalPages}
//                         className="flex items-center space-x-2 bg-blue-500 text-white 
//                         px-4 py-2 rounded-md hover:bg-blue-600 
//                         disabled:bg-gray-300 disabled:cursor-not-allowed 
//                         transition-colors duration-300"
//                     >
//                         <span>Next</span>
//                         <ChevronRight size={20} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StudentsList;





// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { 
//     Users, 
//     ChevronLeft, 
//     ChevronRight, 
//     Mail, 
//     UserCircle,
//     Search,
//     X
// } from 'lucide-react';

// const StudentsList = () => {
//     const [students, setStudents] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [isLoading, setIsLoading] = useState(true);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

//     // Debounce search query to reduce unnecessary API calls
//     useEffect(() => {
//         const timerId = setTimeout(() => {
//             setDebouncedSearchQuery(searchQuery);
//         }, 500);

//         return () => clearTimeout(timerId);
//     }, [searchQuery]);

//     // Fetch students with optional search
//     useEffect(() => {
//         setIsLoading(true);
//         const queryParams = new URLSearchParams({
//             page: page,
//             limit: 5,
//             search: debouncedSearchQuery
//         });

//         fetch(`http://localhost:5000/students?${queryParams}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setStudents(data.students);
//                 setTotalPages(data.totalPages);
//                 setIsLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Error fetching students:", error);
//                 setIsLoading(false);
//             });
//     }, [page, debouncedSearchQuery]);

//     // Handle search input change
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//         setPage(1); // Reset to first page when searching
//     };

//     // Clear search
//     const clearSearch = () => {
//         setSearchQuery("");
//         setPage(1);
//     };

//     return (
//         <div className="container mx-auto px-4 py-8 max-w-3xl">
//             <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 p-6 flex items-center justify-between">
//                     <div className="flex items-center space-x-4">
//                         <Users className="text-white" size={32} />
//                         <h1 className="text-2xl font-bold text-white">Students Directory</h1>
//                     </div>

//                     {/* Search Input */}
//                     <div className="relative flex items-center">
//                         <div className="absolute left-3 text-gray-400">
//                             <Search size={20} />
//                         </div>
//                         <input
//                             type="text"
//                             placeholder="Search students..."
//                             value={searchQuery}
//                             onChange={handleSearchChange}
//                             className="pl-10 pr-10 py-2 w-64 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                         />
//                         {searchQuery && (
//                             <button 
//                                 onClick={clearSearch} 
//                                 className="absolute right-3 text-gray-400 hover:text-gray-600"
//                             >
//                                 <X size={20} />
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Students List */}
//                 {isLoading ? (
//                     <div className="text-center py-8">
//                         <p className="text-gray-500 animate-pulse">Loading students...</p>
//                     </div>
//                 ) : students.length === 0 ? (
//                     <div className="text-center py-8 bg-yellow-50">
//                         <p className="text-gray-600">
//                             {debouncedSearchQuery 
//                                 ? `No students found matching "${debouncedSearchQuery}"` 
//                                 : "No students found"
//                             }
//                         </p>
//                     </div>
//                 ) : (
//                     <ul className="divide-y divide-gray-200">
//                         {students.map((student) => (
//                             <li 
//                                 key={student._id} 
//                                 className="px-6 py-4 hover:bg-gray-50 transition-colors duration-200 group"
//                             >
//                                 <Link 
//                                     to={`/student/${student._id}`} 
//                                     className="flex items-center space-x-4"
//                                 >
//                                     <UserCircle 
//                                         className="text-blue-500 group-hover:text-blue-600 transition-colors" 
//                                         size={40} 
//                                     />
//                                     <div className="flex-1">
//                                         <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
//                                             {student.fullName}
//                                         </p>
//                                         <div className="flex items-center space-x-2 text-gray-500">
//                                             <Mail size={16} />
//                                             <p className="text-sm">{student.email}</p>
//                                         </div>
//                                     </div>
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 )}

//                 {/* Pagination Controls */}
//                 <div className="bg-gray-50 p-4 flex justify-center items-center space-x-4">
//                     <button 
//                         onClick={() => setPage(page - 1)} 
//                         disabled={page === 1}
//                         className="flex items-center space-x-2 bg-blue-500 text-white 
//                         px-4 py-2 rounded-md hover:bg-blue-600 
//                         disabled:bg-gray-300 disabled:cursor-not-allowed 
//                         transition-colors duration-300"
//                     >
//                         <ChevronLeft size={20} />
//                         <span>Previous</span>
//                     </button>

//                     <span className="text-gray-600 font-medium">
//                         Page {page} of {totalPages}
//                     </span>

//                     <button 
//                         onClick={() => setPage(page + 1)} 
//                         disabled={page === totalPages}
//                         className="flex items-center space-x-2 bg-blue-500 text-white 
//                         px-4 py-2 rounded-md hover:bg-blue-600 
//                         disabled:bg-gray-300 disabled:cursor-not-allowed 
//                         transition-colors duration-300"
//                     >
//                         <span>Next</span>
//                         <ChevronRight size={20} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StudentsList;




import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    ChevronLeft,
    ChevronRight,
    Mail,
    UserCircle,
    Search,
    X
} from 'lucide-react';

const StudentsList = () => {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

    // Debounce search query
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500);
        return () => clearTimeout(timerId);
    }, [searchQuery]);

    // Fetch students
    useEffect(() => {
        setIsLoading(true);
        const queryParams = new URLSearchParams({
            page: page,
            limit: 5,
            search: debouncedSearchQuery
        });

        fetch(`http://localhost:5000/students?${queryParams}`)
            .then((res) => res.json())
            .then((data) => {
                setStudents(data.students);
                setTotalPages(data.totalPages);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
                setIsLoading(false);
            });
    }, [page, debouncedSearchQuery]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    const clearSearch = () => {
        setSearchQuery("");
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#58585a]/20">
                    {/* Header */}
                    <div className="bg-[#054e85] p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Users className="text-white" size={32} />
                            <h1 className="text-2xl font-bold text-white">Students Directory</h1>
                        </div>
                        <div className="relative flex items-center">
                            <Search size={20} className="absolute left-3 text-[#58585a]" />
                            <input
                                type="text"
                                placeholder="Search students..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="pl-10 pr-10 py-2 w-64 rounded-lg border border-[#58585a]/30 focus:ring-2 focus:ring-[#fece00] focus:border-[#054e85] transition-all duration-300"
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-3 text-[#58585a] hover:text-[#054e85] transition-colors duration-300"
                                >
                                    <X size={20} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Students List */}
                    {isLoading ? (
                        <div className="text-center py-8">
                            <p className="text-[#58585a] animate-pulse text-lg font-semibold">Loading students...</p>
                        </div>
                    ) : students.length === 0 ? (
                        <div className="text-center py-8 bg-[#ffffff]">
                            <p className="text-[#58585a]/80 text-lg">
                                {debouncedSearchQuery
                                    ? `No students found matching "${debouncedSearchQuery}"`
                                    : "No students found"
                                }
                            </p>
                        </div>
                    ) : (
                        <ul className="divide-y divide-[#58585a]/20">
                            {students.map((student) => (
                                <li
                                    key={student._id}
                                    className="px-6 py-4 hover:bg-[#054e85]/5 transition-colors duration-300 group"
                                >
                                    <Link
                                        to={`/student/${student._id}`}
                                        className="flex items-center space-x-4"
                                    >
                                        <UserCircle
                                            className="text-[#054e85] group-hover:text-[#fece00] transition-colors duration-300"
                                            size={40}
                                        />
                                        <div className="flex-1">
                                            <p className="text-lg font-semibold text-[#58585a] group-hover:text-[#054e85] transition-colors duration-300">
                                                {student.fullName}
                                            </p>
                                            <div className="flex items-center space-x-2 text-[#58585a]/80">
                                                <Mail size={16} />
                                                <p className="text-sm">{student.email}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Pagination Controls */}
                    <div className="bg-[#ffffff] p-4 flex justify-center items-center space-x-4 border-t border-[#58585a]/20">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                            className="flex items-center space-x-2 bg-[#fece00] text-[#054e85] px-4 py-2 rounded-lg hover:bg-[#fece00]/80 disabled:bg-[#58585a]/30 disabled:text-[#58585a]/50 disabled:cursor-not-allowed transition-colors duration-300 font-medium"
                        >
                            <ChevronLeft size={20} />
                            <span>Previous</span>
                        </button>
                        <span className="text-[#58585a] font-medium">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                            className="flex items-center space-x-2 bg-[#fece00] text-[#054e85] px-4 py-2 rounded-lg hover:bg-[#fece00]/80 disabled:bg-[#58585a]/30 disabled:text-[#58585a]/50 disabled:cursor-not-allowed transition-colors duration-300 font-medium"
                        >
                            <span>Next</span>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentsList;