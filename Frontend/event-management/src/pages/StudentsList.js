import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentsList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/students")
            .then((res) => res.json())
            .then((data) => setStudents(data))
            .catch((error) => console.error("Error fetching students:", error));
    }, []);

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
        </div>
    );
};

export default StudentsList;
