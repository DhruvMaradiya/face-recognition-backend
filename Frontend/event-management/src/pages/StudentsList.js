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

const API_URL = process.env.REACT_APP_API_URL;

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

        fetch(`${API_URL}/students?${queryParams}`)
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