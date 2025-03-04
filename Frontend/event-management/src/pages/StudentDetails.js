// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// const StudentDetails = () => {
//     const { id } = useParams();
//     const [student, setStudent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch(`http://localhost:5000/students/${id}`)
//             .then((res) => {
//                 if (!res.ok) throw new Error("Failed to fetch student data");
//                 return res.json();
//             })
//             .then((data) => {
//                 setStudent(data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 setError(err.message);
//                 setLoading(false);
//             });
//     }, [id]);

//     if (loading) return <p>Loading student details...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//             <h1 className="text-2xl font-bold">{student.fullName}</h1>
//             <p><strong>Email:</strong> {student.email}</p>
//             <p><strong>Student ID:</strong> {student.studentId}</p>
//             <p><strong>Role:</strong> {student.role}</p>
//             <p><strong>Created At:</strong> {new Date(student.createdAt).toLocaleString()}</p>
//             <p><strong>Updated At:</strong> {new Date(student.updatedAt).toLocaleString()}</p>

//             <h2 className="mt-4 font-semibold">Registered Events</h2>
//             <ul className="list-disc list-inside">
//                 {student.registeredEvents.length > 0 ? (
//                     student.registeredEvents.map((event) => (
//                         <li key={event._id}>
//                             <strong>{event.name}</strong> - 
//                             {new Date(event.startTime).toLocaleDateString()} to 
//                             {new Date(event.endTime).toLocaleDateString()}
//                         </li>
//                     ))
//                 ) : (
//                     <p>No registered events</p>
//                 )}
//             </ul>

//             <Link to="/students" className="mt-4 inline-block text-blue-500 hover:underline">
//                 ← Back to Students
//             </Link>
//         </div>
//     );
// };

// export default StudentDetails;










// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// const StudentDetails = () => {
//     const { id } = useParams();
//     const [student, setStudent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const fetchStudentDetails = () => {
//         fetch(`http://localhost:5000/students/${id}`)
//             .then((res) => {
//                 if (!res.ok) throw new Error("Failed to fetch student data");
//                 return res.json();
//             })
//             .then((data) => {
//                 setStudent(data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 setError(err.message);
//                 setLoading(false);
//             });
//     };

//     useEffect(() => {
//         fetchStudentDetails();
//     }, [id]);

//     const handleRemoveEvent = async (eventId) => {
//         if (!window.confirm("Are you sure you want to remove this student from the event?")) return;

//         try {
//             const response = await fetch("http://localhost:5000/students/remove-from-event", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email: student.email, eventId })
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 alert("Failed to remove student from event: " + errorData.error);
//                 return;
//             }

//             alert("Student removed from event successfully!");

//             // Refresh the student data after removal
//             fetchStudentDetails();
//         } catch (err) {
//             alert("Error removing student from event: " + err.message);
//         }
//     };

//     if (loading) return <p>Loading student details...</p>;
//     if (error) return <p>Error: {error}</p>;

//     return (
//         <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//             <h1 className="text-2xl font-bold">{student.fullName}</h1>
//             <p><strong>Email:</strong> {student.email}</p>
//             <p><strong>Student ID:</strong> {student.studentId}</p>
//             <p><strong>Role:</strong> {student.role}</p>
//             <p><strong>Created At:</strong> {new Date(student.createdAt).toLocaleString()}</p>
//             <p><strong>Updated At:</strong> {new Date(student.updatedAt).toLocaleString()}</p>

//             <h2 className="mt-4 font-semibold">Registered Events</h2>
//             <ul className="list-disc list-inside">
//                 {student.registeredEvents.length > 0 ? (
//                     student.registeredEvents.map((event) => (
//                         <li key={event._id} className="flex justify-between items-center">
//                             <span>
//                                 <strong>{event.name}</strong> - 
//                                 {new Date(event.startTime).toLocaleDateString()} to 
//                                 {new Date(event.endTime).toLocaleDateString()}
//                             </span>
//                             <button
//                                 onClick={() => handleRemoveEvent(event._id)}
//                                 className="text-red-500 hover:text-red-700 ml-4"
//                             >
//                                 ❌
//                             </button>
//                         </li>
//                     ))
//                 ) : (
//                     <p>No registered events</p>
//                 )}
//             </ul>

//             <Link to="/students" className="mt-4 inline-block text-blue-500 hover:underline">
//                 ← Back to Students
//             </Link>
//         </div>
//     );
// };

// export default StudentDetails;

































import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
    User, 
    Mail, 
    Award, 
    Calendar, 
    Edit, 
    ArrowLeft, 
    Trash2 
} from 'lucide-react';

const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStudentDetails = () => {
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
    };

    useEffect(() => {
        fetchStudentDetails();
    }, [id]);

    const handleRemoveEvent = async (eventId) => {
        if (!window.confirm("Are you sure you want to remove this student from the event?")) return;

        try {
            const response = await fetch("http://localhost:5000/students/remove-from-event", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: student.email, eventId })
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert("Failed to remove student from event: " + errorData.error);
                return;
            }

            alert("Student removed from event successfully!");
            fetchStudentDetails();
        } catch (err) {
            alert("Error removing student from event: " + err.message);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-pulse text-blue-600">
                <User size={48} className="mx-auto mb-4" />
                <p className="text-center">Loading student details...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
            <Trash2 size={48} className="mx-auto mb-4 text-red-500" />
            <p className="text-red-700 font-semibold">Error: {error}</p>
            <Link 
                to="/students" 
                className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
                Back to Students
            </Link>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 p-6 flex items-center space-x-4">
                    <User className="text-white" size={32} />
                    <h1 className="text-2xl font-bold text-white">Student Profile</h1>
                </div>

                {/* Student Information */}
                <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <User size={20} className="text-blue-500" />
                                <label className="font-semibold text-gray-700">Full Name</label>
                            </div>
                            <p className="text-gray-800">{student.fullName}</p>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <Mail size={20} className="text-blue-500" />
                                <label className="font-semibold text-gray-700">Email</label>
                            </div>
                            <p className="text-gray-800">{student.email}</p>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <Award size={20} className="text-blue-500" />
                                <label className="font-semibold text-gray-700">Student ID</label>
                            </div>
                            <p className="text-gray-800">{student.studentId}</p>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2 mb-2">
                                <Edit size={20} className="text-blue-500" />
                                <label className="font-semibold text-gray-700">Role</label>
                            </div>
                            <p className="text-gray-800">{student.role}</p>
                        </div>
                    </div>

                    {/* Dates */}
                    <div className="border-t pt-4 mb-6">
                        <div className="flex items-center space-x-2 mb-2">
                            <Calendar size={20} className="text-blue-500" />
                            <label className="font-semibold text-gray-700">Dates</label>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Created At</p>
                                <p>{new Date(student.createdAt).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Updated At</p>
                                <p>{new Date(student.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Registered Events */}
                    <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <Calendar size={20} className="text-blue-500" />
                                <h2 className="font-semibold text-gray-700">Registered Events</h2>
                            </div>
                            {student.registeredEvents.length === 0 && (
                                <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded text-sm">
                                    No Events
                                </span>
                            )}
                        </div>
                        
                        {student.registeredEvents.length > 0 && (
                            <ul className="divide-y divide-gray-200">
                                {student.registeredEvents.map((event) => (
                                    <li 
                                        key={event._id} 
                                        className="py-3 flex justify-between items-center hover:bg-gray-50 transition"
                                    >
                                        <div>
                                            <p className="font-medium text-gray-800">{event.name}</p>
                                            <p className="text-sm text-gray-600">
                                                {new Date(event.startTime).toLocaleDateString()} 
                                                {" "}to{" "}
                                                {new Date(event.endTime).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleRemoveEvent(event._id)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition"
                                            title="Remove from event"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Back Button */}
                <div className="bg-gray-50 p-4">
                    <Link 
                        to="/students" 
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Students List</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StudentDetails;