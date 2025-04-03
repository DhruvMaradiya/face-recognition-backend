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
//             if (selectedDate && !getEventsForDate(selectedDate).length) setSelectedDate(null);
//         } catch (err) {
//             alert("Error removing student from event: " + err.message);
//         }
//     };

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

//         for (let i = 0; i < firstDay; i++) {
//             calendarDays.push(null);
//         }

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
//     const currentDate = new Date();

//     const eventsToShow = selectedDate ? getEventsForDate(selectedDate) : student.registeredEvents;

//     const upcomingEvents = eventsToShow.filter(event => new Date(event.startTime) > currentDate);
//     const ongoingEvents = eventsToShow.filter(event =>
//         new Date(event.startTime) <= currentDate && new Date(event.endTime) >= currentDate
//     );
//     const pastEvents = eventsToShow.filter(event => new Date(event.endTime) < currentDate);

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
//                         {/* Left Side: Profile Details and Calendar */}
//                         <div className="space-y-6">
//                             {/* Profile Details */}
//                             <div className="space-y-4">
//                                 <h2 className="text-lg font-semibold text-[#58585a] flex items-center space-x-2">
//                                     <User size={20} className="text-[#054e85]" />
//                                     <span>Profile Details</span>
//                                 </h2>
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

//                             {/* Calendar */}
//                             <div className="bg-[#ffffff] rounded-lg p-4 border border-[#58585a]/20">
//                                 <div className="flex justify-between items-center mb-4">
//                                     <button
//                                         onClick={handlePrevMonth}
//                                         className="text-[#054e85] hover:text-[#fece00] transition-colors duration-300"
//                                     >
//                                         Prev
//                                     </button>
//                                     <span className="text-[#58585a] font-medium">
//                                         {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
//                                     </span>
//                                     <button
//                                         onClick={handleNextMonth}
//                                         className="text-[#054e85] hover:text-[#fece00] transition-colors duration-300"
//                                     >
//                                         Next
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
//                         </div>

//                         {/* Right Side: Events Sections */}
//                         <div className="space-y-6">
//                             <h2 className="text-lg font-semibold text-[#58585a] flex items-center space-x-2">
//                                 <CalendarIcon size={20} className="text-[#054e85]" />
//                                 <span>Events</span>
//                             </h2>

//                             {/* Upcoming Events */}
//                             <div>
//                                 <h3 className="font-medium text-[#58585a] mb-2">Upcoming Events ({upcomingEvents.length})</h3>
//                                 {upcomingEvents.length === 0 ? (
//                                     <p className="text-[#58585a]/80 text-center py-4">No upcoming events</p>
//                                 ) : (
//                                     <ul className="divide-y divide-[#58585a]/20">
//                                         {upcomingEvents.map((event) => (
//                                             <EventItem key={event._id} event={event} onRemove={handleRemoveEvent} />
//                                         ))}
//                                     </ul>
//                                 )}
//                             </div>

//                             {/* Ongoing Events */}
//                             <div>
//                                 <h3 className="font-medium text-[#58585a] mb-2">Ongoing Events ({ongoingEvents.length})</h3>
//                                 {ongoingEvents.length === 0 ? (
//                                     <p className="text-[#58585a]/80 text-center py-4">No ongoing events</p>
//                                 ) : (
//                                     <ul className="divide-y divide-[#58585a]/20">
//                                         {ongoingEvents.map((event) => (
//                                             <EventItem key={event._id} event={event} onRemove={handleRemoveEvent} />
//                                         ))}
//                                     </ul>
//                                 )}
//                             </div>

//                             {/* Past Events */}
//                             <div>
//                                 <h3 className="font-medium text-[#58585a] mb-2">Past Events ({pastEvents.length})</h3>
//                                 {pastEvents.length === 0 ? (
//                                     <p className="text-[#58585a]/80 text-center py-4">No past events</p>
//                                 ) : (
//                                     <ul className="divide-y divide-[#58585a]/20">
//                                         {pastEvents.map((event) => (
//                                             <EventItem key={event._id} event={event} onRemove={handleRemoveEvent} />
//                                         ))}
//                                     </ul>
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

// // Helper Components
// const DetailItem = ({ icon, label, value }) => (
//     <div className="space-y-1">
//         <div className="flex items-center space-x-2">
//             {icon}
//             <label className="font-semibold text-[#58585a]">{label}</label>
//         </div>
//         <p className="text-[#58585a]">{value}</p>
//     </div>
// );

// const EventItem = ({ event, onRemove }) => (
//     <li className="py-4 flex justify-between items-center hover:bg-[#054e85]/5 transition-colors duration-300">
//         <div>
//             <p className="font-medium text-[#58585a]">{event.name}</p>
//             <p className="text-sm text-[#58585a]/80">
//                 {new Date(event.startTime).toLocaleDateString()}
//                 {" "}to{" "}
//                 {new Date(event.endTime).toLocaleDateString()}
//             </p>
//         </div>
//         <button
//             onClick={() => onRemove(event._id)}
//             className="text-red-600 hover:text-red-700 hover:bg-red-100/50 p-2 rounded-full transition-colors duration-300"
//             title="Remove from event"
//         >
//             <Trash2 size={20} />
//         </button>
//     </li>
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

const API_URL = process.env.REACT_APP_API_URL;

const StudentDetails = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const fetchStudentDetails = () => {
        fetch(`${API_URL}/students/${id}`)
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
            const response = await fetch(`${API_URL}/students/remove-from-event`, {
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

    const handleDeleteStudent = async () => {
        if (!window.confirm("Are you sure you want to delete this student? This action cannot be undone.")) return;

        try {
            const response = await fetch(`${API_URL}/delete/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to delete student");
            }

            alert("Student deleted successfully!");
            window.location.href = "/students"; // Redirect after deletion
        } catch (err) {
            alert("Error deleting student: " + err.message);
        }
    };

    const handleMailEvents = () => {
        if (!student || !student.registeredEvents) return;

        const subject = `Your Event Details - ${student.fullName}`;
        const from = "jani92@uwindsor.ca";
        const to = student.email;

        // Student Information
        const studentInfo = `
Student Information:
- Full Name: ${student.fullName}
- Email: ${student.email}
- Student ID: ${student.studentId}
- Role: ${student.role}
- Created At: ${new Date(student.createdAt).toLocaleString()}
- Updated At: ${new Date(student.updatedAt).toLocaleString()}
        `;

        // Total Events
        const totalEvents = `
Total Events: ${student.registeredEvents.length}
        `;

        // Event Attended Dates
        const eventDetails = student.registeredEvents.map(event => `
- Event: ${event.name}
  Start: ${new Date(event.startTime).toLocaleString()}
  End: ${new Date(event.endTime).toLocaleString()}
        `).join("");

        const body = encodeURIComponent(`${studentInfo}\n${totalEvents}\nEvent Attended Dates:\n${eventDetails}\n\nNote: An XLSX spreadsheet with this information should be attached.`);

        // Open mailto link
        window.location.href = `mailto:${to}?from=${from}&subject=${encodeURIComponent(subject)}&body=${body}`;

        alert("Please note: Actual XLSX attachment generation requires a client-side library (e.g., SheetJS) or backend support. The email body includes the data as text.");
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
                    <div className="bg-[#054e85] p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <User className="text-white" size={32} />
                            <h1 className="text-2xl font-bold text-white">Student Profile</h1>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={handleMailEvents}
                                className="bg-[#fece00] text-[#054e85] px-4 py-2 rounded-lg hover:bg-[#fece00]/80 transition flex items-center space-x-2"
                            >
                                <Mail size={20} />
                                <span>Mail Events</span>
                            </button>
                            <button
                                onClick={handleDeleteStudent}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center space-x-2"
                            >
                                <Trash2 size={20} />
                                <span>Delete Student</span>
                            </button>
                        </div>
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
                                            className={`p-2 cursor-pointer rounded-full hover:bg-[#054e85]/10 transition-colors duration-300 ${day && selectedDate === day ? 'bg-[#054e85] text-white' : ''}`}
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