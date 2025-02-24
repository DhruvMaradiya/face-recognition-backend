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





import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentsList = () => {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`http://localhost:5000/students?page=${page}&limit=5`)
            .then((res) => res.json())
            .then((data) => {
                setStudents(data.students);
                setTotalPages(data.totalPages);
            })
            .catch((error) => console.error("Error fetching students:", error));
    }, [page]);

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-4">All Students</h1>
            <ul className="list-disc list-inside">
                {students.map((student) => (
                    <li key={student._id} className="p-2 border-b">
                        <Link to={`/student/${student._id}`} className="text-blue-500 hover:underline">
                            {student.fullName} ({student.email})
                        </Link>
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center space-x-2">
                <button 
                    onClick={() => setPage(page - 1)} 
                    disabled={page === 1}
                    className="bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="px-3 py-1 border">{page} / {totalPages}</span>
                <button 
                    onClick={() => setPage(page + 1)} 
                    disabled={page === totalPages}
                    className="bg-gray-300 px-3 py-1 rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default StudentsList;




