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

































// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//     User,
//     Mail,
//     Award,
//     Calendar,
//     Edit,
//     ArrowLeft,
//     Trash2
// } from 'lucide-react';

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
//             fetchStudentDetails();
//         } catch (err) {
//             alert("Error removing student from event: " + err.message);
//         }
//     };

//     if (loading) return (
//         <div className="flex justify-center items-center min-h-screen">
//             <div className="animate-pulse text-blue-600">
//                 <User size={48} className="mx-auto mb-4" />
//                 <p className="text-center">Loading student details...</p>
//             </div>
//         </div>
//     );

//     if (error) return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-lg text-center">
//             <Trash2 size={48} className="mx-auto mb-4 text-red-500" />
//             <p className="text-red-700 font-semibold">Error: {error}</p>
//             <Link
//                 to="/students"
//                 className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//             >
//                 Back to Students
//             </Link>
//         </div>
//     );

//     return (
//         <div className="container mx-auto px-4 py-8 max-w-2xl">
//             <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//                 {/* Header */}
//                 <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 p-6 flex items-center space-x-4">
//                     <User className="text-white" size={32} />
//                     <h1 className="text-2xl font-bold text-white">Student Profile</h1>
//                 </div>

//                 {/* Student Information */}
//                 <div className="p-6">
//                     <div className="grid grid-cols-2 gap-4 mb-6">
//                         <div>
//                             <div className="flex items-center space-x-2 mb-2">
//                                 <User size={20} className="text-blue-500" />
//                                 <label className="font-semibold text-gray-700">Full Name</label>
//                             </div>
//                             <p className="text-gray-800">{student.fullName}</p>
//                         </div>
//                         <div>
//                             <div className="flex items-center space-x-2 mb-2">
//                                 <Mail size={20} className="text-blue-500" />
//                                 <label className="font-semibold text-gray-700">Email</label>
//                             </div>
//                             <p className="text-gray-800">{student.email}</p>
//                         </div>
//                         <div>
//                             <div className="flex items-center space-x-2 mb-2">
//                                 <Award size={20} className="text-blue-500" />
//                                 <label className="font-semibold text-gray-700">Student ID</label>
//                             </div>
//                             <p className="text-gray-800">{student.studentId}</p>
//                         </div>
//                         <div>
//                             <div className="flex items-center space-x-2 mb-2">
//                                 <Edit size={20} className="text-blue-500" />
//                                 <label className="font-semibold text-gray-700">Role</label>
//                             </div>
//                             <p className="text-gray-800">{student.role}</p>
//                         </div>
//                     </div>

//                     {/* Dates */}
//                     <div className="border-t pt-4 mb-6">
//                         <div className="flex items-center space-x-2 mb-2">
//                             <Calendar size={20} className="text-blue-500" />
//                             <label className="font-semibold text-gray-700">Dates</label>
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <p className="text-sm text-gray-600">Created At</p>
//                                 <p>{new Date(student.createdAt).toLocaleString()}</p>
//                             </div>
//                             <div>
//                                 <p className="text-sm text-gray-600">Updated At</p>
//                                 <p>{new Date(student.updatedAt).toLocaleString()}</p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Registered Events */}
//                     <div className="border-t pt-4">
//                         <div className="flex items-center justify-between mb-4">
//                             <div className="flex items-center space-x-2">
//                                 <Calendar size={20} className="text-blue-500" />
//                                 <h2 className="font-semibold text-gray-700">Registered Events</h2>
//                             </div>
//                             {student.registeredEvents.length === 0 && (
//                                 <span className="text-yellow-600 bg-yellow-50 px-2 py-1 rounded text-sm">
//                                     No Events
//                                 </span>
//                             )}
//                         </div>

//                         {student.registeredEvents.length > 0 && (
//                             <ul className="divide-y divide-gray-200">
//                                 {student.registeredEvents.map((event) => (
//                                     <li
//                                         key={event._id}
//                                         className="py-3 flex justify-between items-center hover:bg-gray-50 transition"
//                                     >
//                                         <div>
//                                             <p className="font-medium text-gray-800">{event.name}</p>
//                                             <p className="text-sm text-gray-600">
//                                                 {new Date(event.startTime).toLocaleDateString()}
//                                                 {" "}to{" "}
//                                                 {new Date(event.endTime).toLocaleDateString()}
//                                             </p>
//                                         </div>
//                                         <button
//                                             onClick={() => handleRemoveEvent(event._id)}
//                                             className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition"
//                                             title="Remove from event"
//                                         >
//                                             <Trash2 size={20} />
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </div>
//                 </div>

//                 {/* Back Button */}
//                 <div className="bg-gray-50 p-4">
//                     <Link
//                         to="/students"
//                         className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
//                     >
//                         <ArrowLeft size={20} />
//                         <span>Back to Students List</span>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default StudentDetails;
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//     User,
//     Mail,
//     Award,
//     Calendar,
//     Edit,
//     ArrowLeft,
//     Trash2,
//     ChevronDown,
//     ChevronUp
// } from 'lucide-react';

// const StudentDetails = () => {
//     const { id } = useParams();
//     const [student, setStudent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [openAccordion, setOpenAccordion] = useState(null);

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
//             fetchStudentDetails();
//         } catch (err) {
//             alert("Error removing student from event: " + err.message);
//         }
//     };

//     const toggleAccordion = (section) => {
//         setOpenAccordion(openAccordion === section ? null : section);
//     };

//     if (loading) return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="text-center animate-pulse">
//                 <User size={48} className="mx-auto mb-4 text-[#054e85]" />
//                 <p className="text-lg text-[#58585a] font-semibold">Loading student details...</p>
//             </div>
//         </div>
//     );

//     if (error) return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-[#ffffff] border border-[#58585a]/20 rounded-lg text-center shadow-lg">
//             <Trash2 size={48} className="mx-auto mb-4 text-red-600" />
//             <p className="text-[#58585a] font-semibold text-lg">Error: {error}</p>
//             <Link
//                 to="/students"
//                 className="mt-4 inline-block bg-[#fece00] text-[#054e85] px-5 py-2 rounded-lg hover:bg-[#fece00]/80 transition-colors duration-300 font-medium"
//             >
//                 Back to Students
//             </Link>
//         </div>
//     );

//     const currentDate = new Date();
//     const willBeEvents = student.registeredEvents.filter(event => new Date(event.endTime) > currentDate);
//     const registeredAfterEvents = student.registeredEvents.filter(event => new Date(event.endTime) <= currentDate);

//     return (
//         <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto">
//                 <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#58585a]/20">
//                     {/* Header */}
//                     <div className="bg-[#054e85] p-6 flex items-center space-x-4">
//                         <User className="text-white" size={32} />
//                         <h1 className="text-2xl font-bold text-white">Student Profile</h1>
//                     </div>

//                     {/* Two-Column Layout */}
//                     <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Profile Details (Left Side) */}
//                         <div className="space-y-6">
//                             <div className="space-y-4">
//                                 <h2 className="text-lg font-semibold text-[#58585a] flex items-center space-x-2">
//                                     <User size={20} className="text-[#054e85]" />
//                                     <span>Profile Details</span>
//                                 </h2>
//                                 <DetailItem icon={<User className="text-[#054e85]" />} label="Full Name" value={student.fullName} />
//                                 <DetailItem icon={<Mail className="text-[#054e85]" />} label="Email" value={student.email} />
//                                 <DetailItem icon={<Award className="text-[#054e85]" />} label="Student ID" value={student.studentId} />
//                                 <DetailItem icon={<Edit className="text-[#054e85]" />} label="Role" value={student.role} />
//                             </div>

//                             <div className="border-t border-[#58585a]/20 pt-4">
//                                 <h3 className="font-semibold text-[#58585a] flex items-center space-x-2 mb-4">
//                                     <Calendar size={20} className="text-[#054e85]" />
//                                     <span>Dates</span>
//                                 </h3>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <p className="text-sm text-[#58585a]/80">Created At</p>
//                                         <p className="text-[#58585a]">{new Date(student.createdAt).toLocaleString()}</p>
//                                     </div>
//                                     <div>
//                                         <p className="text-sm text-[#58585a]/80">Updated At</p>
//                                         <p className="text-[#58585a]">{new Date(student.updatedAt).toLocaleString()}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Events (Right Side) */}
//                         <div className="space-y-4">
//                             <h2 className="text-lg font-semibold text-[#58585a] flex items-center space-x-2">
//                                 <Calendar size={20} className="text-[#054e85]" />
//                                 <span>Events</span>
//                             </h2>

//                             {/* Upcoming Events Accordion */}
//                             <div>
//                                 <button
//                                     onClick={() => toggleAccordion('willBe')}
//                                     className="w-full flex justify-between items-center p-4 bg-[#054e85]/10 hover:bg-[#054e85]/20 transition-colors duration-300 rounded-lg"
//                                 >
//                                     <span className="font-medium text-[#58585a]">Upcoming Events</span>
//                                     <span className="flex items-center space-x-2">
//                                         <span className="text-[#054e85] bg-[#fece00]/20 px-2 py-1 rounded text-sm font-medium">
//                                             {willBeEvents.length}
//                                         </span>
//                                         {openAccordion === 'willBe' ? (
//                                             <ChevronUp size={20} className="text-[#054e85]" />
//                                         ) : (
//                                             <ChevronDown size={20} className="text-[#054e85]" />
//                                         )}
//                                     </span>
//                                 </button>
//                                 {openAccordion === 'willBe' && (
//                                     <div className="mt-2">
//                                         {willBeEvents.length === 0 ? (
//                                             <p className="text-[#58585a]/80 text-center py-4">No upcoming events</p>
//                                         ) : (
//                                             <ul className="divide-y divide-[#58585a]/20">
//                                                 {willBeEvents.map((event) => (
//                                                     <li
//                                                         key={event._id}
//                                                         className="py-4 flex justify-between items-center hover:bg-[#054e85]/5 transition-colors duration-300"
//                                                     >
//                                                         <div>
//                                                             <p className="font-medium text-[#58585a]">{event.name}</p>
//                                                             <p className="text-sm text-[#58585a]/80">
//                                                                 {new Date(event.startTime).toLocaleDateString()}
//                                                                 {" "}to{" "}
//                                                                 {new Date(event.endTime).toLocaleDateString()}
//                                                             </p>
//                                                         </div>
//                                                         <button
//                                                             onClick={() => handleRemoveEvent(event._id)}
//                                                             className="text-red-600 hover:text-red-700 hover:bg-red-100/50 p-2 rounded-full transition-colors duration-300"
//                                                             title="Remove from event"
//                                                         >
//                                                             <Trash2 size={20} />
//                                                         </button>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Past Events Accordion */}
//                             <div>
//                                 <button
//                                     onClick={() => toggleAccordion('registeredAfter')}
//                                     className="w-full flex justify-between items-center p-4 bg-[#054e85]/10 hover:bg-[#054e85]/20 transition-colors duration-300 rounded-lg"
//                                 >
//                                     <span className="font-medium text-[#58585a]">Past Events</span>
//                                     <span className="flex items-center space-x-2">
//                                         <span className="text-[#054e85] bg-[#fece00]/20 px-2 py-1 rounded text-sm font-medium">
//                                             {registeredAfterEvents.length}
//                                         </span>
//                                         {openAccordion === 'registeredAfter' ? (
//                                             <ChevronUp size={20} className="text-[#054e85]" />
//                                         ) : (
//                                             <ChevronDown size={20} className="text-[#054e85]" />
//                                         )}
//                                     </span>
//                                 </button>
//                                 {openAccordion === 'registeredAfter' && (
//                                     <div className="mt-2">
//                                         {registeredAfterEvents.length === 0 ? (
//                                             <p className="text-[#58585a]/80 text-center py-4">No past events</p>
//                                         ) : (
//                                             <ul className="divide-y divide-[#58585a]/20">
//                                                 {registeredAfterEvents.map((event) => (
//                                                     <li
//                                                         key={event._id}
//                                                         className="py-4 flex justify-between items-center hover:bg-[#054e85]/5 transition-colors duration-300"
//                                                     >
//                                                         <div>
//                                                             <p className="font-medium text-[#58585a]">{event.name}</p>
//                                                             <p className="text-sm text-[#58585a]/80">
//                                                                 {new Date(event.startTime).toLocaleDateString()}
//                                                                 {" "}to{" "}
//                                                                 {new Date(event.endTime).toLocaleDateString()}
//                                                             </p>
//                                                         </div>
//                                                         <button
//                                                             onClick={() => handleRemoveEvent(event._id)}
//                                                             className="text-red-600 hover:text-red-700 hover:bg-red-100/50 p-2 rounded-full transition-colors duration-300"
//                                                             title="Remove from event"
//                                                         >
//                                                             <Trash2 size={20} />
//                                                         </button>
//                                                     </li>
//                                                 ))}
//                                             </ul>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Back Button */}
//                     <div className="bg-[#ffffff] p-4 border-t border-[#58585a]/20">
//                         <Link
//                             to="/students"
//                             className="flex items-center space-x-2 text-[#054e85] hover:text-[#fece00] transition-colors duration-300 font-medium"
//                         >
//                             <ArrowLeft size={20} />
//                             <span>Back to Students List</span>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Helper Component
// const DetailItem = ({ icon, label, value }) => (
//     <div className="space-y-1">
//         <div className="flex items-center space-x-2">
//             {icon}
//             <label className="font-semibold text-[#58585a]">{label}</label>
//         </div>
//         <p className="text-[#58585a]">{value}</p>
//     </div>
// );

// export default StudentDetails;




















// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//     User,
//     Mail,
//     Award,
//     Edit,
//     ArrowLeft,
//     Trash2,
//     Calendar as CalendarIcon
// } from 'lucide-react';

// const StudentDetails = () => {
//     const { id } = useParams();
//     const [student, setStudent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [selectedDate, setSelectedDate] = useState(null);
//     const [currentMonth, setCurrentMonth] = useState(new Date());

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
//             fetchStudentDetails();
//             setSelectedDate(null); // Reset selected date after removal
//         } catch (err) {
//             alert("Error removing student from event: " + err.message);
//         }
//     };

//     // Calendar Logic
//     const getDaysInMonth = (date) => {
//         const year = date.getFullYear();
//         const month = date.getMonth();
//         const days = new Date(year, month + 1, 0).getDate();
//         const firstDay = new Date(year, month, 1).getDay();
//         return { days, firstDay };
//     };

//     const generateCalendar = () => {
//         const { days, firstDay } = getDaysInMonth(currentMonth);
//         const calendarDays = [];

//         // Add empty slots for days before the first day of the month
//         for (let i = 0; i < firstDay; i++) {
//             calendarDays.push(null);
//         }

//         // Add actual days
//         for (let i = 1; i <= days; i++) {
//             calendarDays.push(i);
//         }

//         return calendarDays;
//     };

//     const handlePrevMonth = () => {
//         setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
//         setSelectedDate(null);
//     };

//     const handleNextMonth = () => {
//         setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
//         setSelectedDate(null);
//     };

//     const getEventsForDate = (day) => {
//         if (!student || !day) return [];
//         const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
//         return student.registeredEvents.filter(event => {
//             const start = new Date(event.startTime);
//             const end = new Date(event.endTime);
//             return date >= start.setHours(0, 0, 0, 0) && date <= end.setHours(23, 59, 59, 999);
//         });
//     };

//     if (loading) return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100">
//             <div className="text-center animate-pulse">
//                 <User size={48} className="mx-auto mb-4 text-[#054e85]" />
//                 <p className="text-lg text-[#58585a] font-semibold">Loading student details...</p>
//             </div>
//         </div>
//     );

//     if (error) return (
//         <div className="max-w-md mx-auto mt-10 p-6 bg-[#ffffff] border border-[#58585a]/20 rounded-lg text-center shadow-lg">
//             <Trash2 size={48} className="mx-auto mb-4 text-red-600" />
//             <p className="text-[#58585a] font-semibold text-lg">Error: {error}</p>
//             <Link
//                 to="/students"
//                 className="mt-4 inline-block bg-[#fece00] text-[#054e85] px-5 py-2 rounded-lg hover:bg-[#fece00]/80 transition-colors duration-300 font-medium"
//             >
//                 Back to Students
//             </Link>
//         </div>
//     );

//     const calendarDays = generateCalendar();
//     const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

//     return (
//         <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-4xl mx-auto">
//                 <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#58585a]/20">
//                     {/* Header */}
//                     <div className="bg-[#054e85] p-6 flex items-center space-x-4">
//                         <User className="text-white" size={32} />
//                         <h1 className="text-2xl font-bold text-white">Student Profile</h1>
//                     </div>

//                     {/* Two-Column Layout */}
//                     <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                         {/* Profile Details (Left Side) */}
//                         <div className="space-y-6">
//                             <h2 className="text-lg font-semibold text-[#58585a] flex items-center space-x-2">
//                                 <User size={20} className="text-[#054e85]" />
//                                 <span>Profile Details</span>
//                             </h2>
//                             <div className="space-y-4">
//                                 <DetailItem icon={<User className="text-[#054e85]" />} label="Full Name" value={student.fullName} />
//                                 <DetailItem icon={<Mail className="text-[#054e85]" />} label="Email" value={student.email} />
//                                 <DetailItem icon={<Award className="text-[#054e85]" />} label="Student ID" value={student.studentId} />
//                                 <DetailItem icon={<Edit className="text-[#054e85]" />} label="Role" value={student.role} />
//                                 <div className="pt-4 border-t border-[#58585a]/20">
//                                     <p className="text-sm text-[#58585a]/80">Created At</p>
//                                     <p className="text-[#58585a]">{new Date(student.createdAt).toLocaleString()}</p>
//                                 </div>
//                                 <div>
//                                     <p className="text-sm text-[#58585a]/80">Updated At</p>
//                                     <p className="text-[#58585a]">{new Date(student.updatedAt).toLocaleString()}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Calendar and Events (Right Side) */}
//                         <div className="space-y-6">
//                             <h2 className="text-lg font-semibold text-[#58585a] flex items-center space-x-2">
//                                 <CalendarIcon size={20} className="text-[#054e85]" />
//                                 <span>Event Calendar</span>
//                             </h2>

//                             {/* Calendar */}
//                             <div className="bg-[#ffffff] rounded-lg p-4 border border-[#58585a]/20">
//                                 <div className="flex justify-between items-center mb-4">
//                                     <button
//                                         onClick={handlePrevMonth}
//                                         className="text-[#054e85] hover:text-[#fece00] transition-colors duration-300"
//                                     >
//                                         &lt; Prev
//                                     </button>
//                                     <span className="text-[#58585a] font-medium">
//                                         {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
//                                     </span>
//                                     <button
//                                         onClick={handleNextMonth}
//                                         className="text-[#054e85] hover:text-[#fece00] transition-colors duration-300"
//                                     >
//                                         Next &gt;
//                                     </button>
//                                 </div>
//                                 <div className="grid grid-cols-7 gap-2 text-center">
//                                     {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//                                         <div key={day} className="text-[#58585a] font-medium text-sm">
//                                             {day}
//                                         </div>
//                                     ))}
//                                     {calendarDays.map((day, index) => (
//                                         <div
//                                             key={index}
//                                             className={`p-2 cursor-pointer rounded-full hover:bg-[#054e85]/10 transition-colors duration-300 ${day && selectedDate === day ? 'bg-[#054e85] text-white' : ''
//                                                 }`}
//                                             onClick={() => day && setSelectedDate(day)}
//                                         >
//                                             {day || ''}
//                                             {day && getEventsForDate(day).length > 0 && (
//                                                 <div className="flex justify-center mt-1">
//                                                     <span className="w-2 h-2 bg-[#fece00] rounded-full"></span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Selected Date Events */}
//                             {selectedDate && (
//                                 <div className="space-y-4">
//                                     <h3 className="text-[#58585a] font-medium">
//                                         Events on {new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate).toLocaleDateString()}
//                                     </h3>
//                                     {selectedEvents.length === 0 ? (
//                                         <p className="text-[#58585a]/80 text-center py-4">No events on this date</p>
//                                     ) : (
//                                         <ul className="divide-y divide-[#58585a]/20">
//                                             {selectedEvents.map((event) => (
//                                                 <li
//                                                     key={event._id}
//                                                     className="py-4 flex justify-between items-center hover:bg-[#054e85]/5 transition-colors duration-300"
//                                                 >
//                                                     <div>
//                                                         <p className="font-medium text-[#58585a]">{event.name}</p>
//                                                         <p className="text-sm text-[#58585a]/80">
//                                                             {new Date(event.startTime).toLocaleDateString()}
//                                                             {" "}to{" "}
//                                                             {new Date(event.endTime).toLocaleDateString()}
//                                                         </p>
//                                                     </div>
//                                                     <button
//                                                         onClick={() => handleRemoveEvent(event._id)}
//                                                         className="text-red-600 hover:text-red-700 hover:bg-red-100/50 p-2 rounded-full transition-colors duration-300"
//                                                         title="Remove from event"
//                                                     >
//                                                         <Trash2 size={20} />
//                                                     </button>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Back Button */}
//                     <div className="bg-[#ffffff] p-4 border-t border-[#58585a]/20">
//                         <Link
//                             to="/students"
//                             className="flex items-center space-x-2 text-[#054e85] hover:text-[#fece00] transition-colors duration-300 font-medium"
//                         >
//                             <ArrowLeft size={20} />
//                             <span>Back to Students List</span>
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Helper Component
// const DetailItem = ({ icon, label, value }) => (
//     <div className="space-y-1">
//         <div className="flex items-center space-x-2">
//             {icon}
//             <label className="font-semibold text-[#58585a]">{label}</label>
//         </div>
//         <p className="text-[#58585a]">{value}</p>
//     </div>
// );

// export default StudentDetails;














import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    User,
    Mail,
    Award,
    Edit,
    ArrowLeft,
    Trash2,
    Calendar as CalendarIcon
} from 'lucide-react';

const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

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
            if (selectedDate && !getEventsForDate(selectedDate).length) setSelectedDate(null);
        } catch (err) {
            alert("Error removing student from event: " + err.message);
        }
    };

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        return { days, firstDay };
    };

    const generateCalendar = () => {
        const { days, firstDay } = getDaysInMonth(currentMonth);
        const calendarDays = [];

        for (let i = 0; i < firstDay; i++) {
            calendarDays.push(null);
        }

        for (let i = 1; i <= days; i++) {
            calendarDays.push(i);
        }

        return calendarDays;
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
        setSelectedDate(null);
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
        setSelectedDate(null);
    };

    const getEventsForDate = (day) => {
        if (!student || !day) return [];
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return student.registeredEvents.filter(event => {
            const start = new Date(event.startTime);
            const end = new Date(event.endTime);
            return date >= start.setHours(0, 0, 0, 0) && date <= end.setHours(23, 59, 59, 999);
        });
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center animate-pulse">
                <User size={48} className="mx-auto mb-4 text-[#054e85]" />
                <p className="text-lg text-[#58585a] font-semibold">Loading student details...</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-[#ffffff] border border-[#58585a]/20 rounded-lg text-center shadow-lg">
            <Trash2 size={48} className="mx-auto mb-4 text-red-600" />
            <p className="text-[#58585a] font-semibold text-lg">Error: {error}</p>
            <Link
                to="/students"
                className="mt-4 inline-block bg-[#fece00] text-[#054e85] px-5 py-2 rounded-lg hover:bg-[#fece00]/80 transition-colors duration-300 font-medium"
            >
                Back to Students
            </Link>
        </div>
    );

    const calendarDays = generateCalendar();
    const currentDate = new Date();

    const eventsToShow = selectedDate ? getEventsForDate(selectedDate) : student.registeredEvents;

    const upcomingEvents = eventsToShow.filter(event => new Date(event.startTime) > currentDate);
    const ongoingEvents = eventsToShow.filter(event =>
        new Date(event.startTime) <= currentDate && new Date(event.endTime) >= currentDate
    );
    const pastEvents = eventsToShow.filter(event => new Date(event.endTime) < currentDate);

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#58585a]/20">
                    {/* Header */}
                    <div className="bg-[#054e85] p-6 flex items-center space-x-4">
                        <User className="text-white" size={32} />
                        <h1 className="text-2xl font-bold text-white">Student Profile</h1>
                    </div>

                    {/* Two-Column Layout */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Side: Profile Details and Calendar */}
                        <div className="space-y-6">
                            {/* Profile Details */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-[#58585a] flex items-center space-x-2">
                                    <User size={20} className="text-[#054e85]" />
                                    <span>Profile Details</span>
                                </h2>
                                <DetailItem icon={<User className="text-[#054e85]" />} label="Full Name" value={student.fullName} />
                                <DetailItem icon={<Mail className="text-[#054e85]" />} label="Email" value={student.email} />
                                <DetailItem icon={<Award className="text-[#054e85]" />} label="Student ID" value={student.studentId} />
                                <DetailItem icon={<Edit className="text-[#054e85]" />} label="Role" value={student.role} />
                                <div className="pt-4 border-t border-[#58585a]/20">
                                    <p className="text-sm text-[#58585a]/80">Created At</p>
                                    <p className="text-[#58585a]">{new Date(student.createdAt).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-[#58585a]/80">Updated At</p>
                                    <p className="text-[#58585a]">{new Date(student.updatedAt).toLocaleString()}</p>
                                </div>
                            </div>

                            {/* Calendar */}
                            <div className="bg-[#ffffff] rounded-lg p-4 border border-[#58585a]/20">
                                <div className="flex justify-between items-center mb-4">
                                    <button
                                        onClick={handlePrevMonth}
                                        className="text-[#054e85] hover:text-[#fece00] transition-colors duration-300"
                                    >
                                        Prev
                                    </button>
                                    <span className="text-[#58585a] font-medium">
                                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                    </span>
                                    <button
                                        onClick={handleNextMonth}
                                        className="text-[#054e85] hover:text-[#fece00] transition-colors duration-300"
                                    >
                                        Next
                                    </button>
                                </div>
                                <div className="grid grid-cols-7 gap-2 text-center">
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="text-[#58585a] font-medium text-sm">
                                            {day}
                                        </div>
                                    ))}
                                    {calendarDays.map((day, index) => (
                                        <div
                                            key={index}
                                            className={`p-2 cursor-pointer rounded-full hover:bg-[#054e85]/10 transition-colors duration-300 ${day && selectedDate === day ? 'bg-[#054e85] text-white' : ''
                                                }`}
                                            onClick={() => day && setSelectedDate(day)}
                                        >
                                            {day || ''}
                                            {day && getEventsForDate(day).length > 0 && (
                                                <div className="flex justify-center mt-1">
                                                    <span className="w-2 h-2 bg-[#fece00] rounded-full"></span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Events Sections */}
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-[#58585a] flex items-center space-x-2">
                                <CalendarIcon size={20} className="text-[#054e85]" />
                                <span>Events</span>
                            </h2>

                            {/* Upcoming Events */}
                            <div>
                                <h3 className="font-medium text-[#58585a] mb-2">Upcoming Events ({upcomingEvents.length})</h3>
                                {upcomingEvents.length === 0 ? (
                                    <p className="text-[#58585a]/80 text-center py-4">No upcoming events</p>
                                ) : (
                                    <ul className="divide-y divide-[#58585a]/20">
                                        {upcomingEvents.map((event) => (
                                            <EventItem key={event._id} event={event} onRemove={handleRemoveEvent} />
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Ongoing Events */}
                            <div>
                                <h3 className="font-medium text-[#58585a] mb-2">Ongoing Events ({ongoingEvents.length})</h3>
                                {ongoingEvents.length === 0 ? (
                                    <p className="text-[#58585a]/80 text-center py-4">No ongoing events</p>
                                ) : (
                                    <ul className="divide-y divide-[#58585a]/20">
                                        {ongoingEvents.map((event) => (
                                            <EventItem key={event._id} event={event} onRemove={handleRemoveEvent} />
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Past Events */}
                            <div>
                                <h3 className="font-medium text-[#58585a] mb-2">Past Events ({pastEvents.length})</h3>
                                {pastEvents.length === 0 ? (
                                    <p className="text-[#58585a]/80 text-center py-4">No past events</p>
                                ) : (
                                    <ul className="divide-y divide-[#58585a]/20">
                                        {pastEvents.map((event) => (
                                            <EventItem key={event._id} event={event} onRemove={handleRemoveEvent} />
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="bg-[#ffffff] p-4 border-t border-[#58585a]/20">
                        <Link
                            to="/students"
                            className="flex items-center space-x-2 text-[#054e85] hover:text-[#fece00] transition-colors duration-300 font-medium"
                        >
                            <ArrowLeft size={20} />
                            <span>Back to Students List</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Components
const DetailItem = ({ icon, label, value }) => (
    <div className="space-y-1">
        <div className="flex items-center space-x-2">
            {icon}
            <label className="font-semibold text-[#58585a]">{label}</label>
        </div>
        <p className="text-[#58585a]">{value}</p>
    </div>
);

const EventItem = ({ event, onRemove }) => (
    <li className="py-4 flex justify-between items-center hover:bg-[#054e85]/5 transition-colors duration-300">
        <div>
            <p className="font-medium text-[#58585a]">{event.name}</p>
            <p className="text-sm text-[#58585a]/80">
                {new Date(event.startTime).toLocaleDateString()}
                {" "}to{" "}
                {new Date(event.endTime).toLocaleDateString()}
            </p>
        </div>
        <button
            onClick={() => onRemove(event._id)}
            className="text-red-600 hover:text-red-700 hover:bg-red-100/50 p-2 rounded-full transition-colors duration-300"
            title="Remove from event"
        >
            <Trash2 size={20} />
        </button>
    </li>
);

export default StudentDetails;