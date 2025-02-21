import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/students/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch student data");
                return res.json();
            })
            .then((data) => {
                setStudent(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading student details...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold">{student.fullName}</h1>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Student ID:</strong> {student.studentId}</p>
            <p><strong>Role:</strong> {student.role}</p>
            <p><strong>Created At:</strong> {new Date(student.createdAt).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(student.updatedAt).toLocaleString()}</p>

            <h2 className="mt-4 font-semibold">Registered Events</h2>
            <ul className="list-disc list-inside">
                {student.registeredEvents.length > 0 ? (
                    student.registeredEvents.map((event) => (
                        <li key={event._id}>
                            <strong>{event.name}</strong> - 
                            {new Date(event.startTime).toLocaleDateString()} to 
                            {new Date(event.endTime).toLocaleDateString()}
                        </li>
                    ))
                ) : (
                    <p>No registered events</p>
                )}
            </ul>

            <Link to="/students" className="mt-4 inline-block text-blue-500 hover:underline">
                ← Back to Students
            </Link>
        </div>
    );
};

export default StudentDetails;
