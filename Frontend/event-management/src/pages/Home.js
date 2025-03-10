// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Home = () => {
//     const [events, setEvents] = useState({ ongoing: [], upcoming: [], past: [] });

//     useEffect(() => {
//         axios.get("http://localhost:5000/admin/events")
//             .then((res) => setEvents(res.data))
//             .catch((err) => console.error(err));
//     }, []);

//     const renderEvents = (category, title) => (
//         <div>
//             <h2 className="text-xl font-bold mt-4">{title}</h2>
//             <div className="grid grid-cols-3 gap-4">
//                 {events[category].map((event) => (
//                     <Link key={event._id} to={`/admin/event/${event._id}`} className="border p-4 rounded-lg shadow hover:bg-gray-100">
//                         <h3 className="font-semibold">{event.name}</h3>
//                         <p>{new Date(event.startTime).toLocaleString()}</p>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     );

//     return (
//         <div className="p-6">
//             {renderEvents("ongoing", "Ongoing Events")}
//             {renderEvents("upcoming", "Upcoming Events")}
//             {renderEvents("past", "Past Events")}
//         </div>
//     );
// };

// export default Home;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const Home = () => {
//     const [events, setEvents] = useState({ ongoing: [], upcoming: [], past: [] });
//     const [openAccordion, setOpenAccordion] = useState("");  // Which accordion is open

//     useEffect(() => {
//         axios.get("http://localhost:5000/admin/events")
//             .then((res) => setEvents(res.data))
//             .catch((err) => console.error(err));
//     }, []);

//     const toggleAccordion = (category) => {
//         setOpenAccordion(openAccordion === category ? "" : category);
//     };

//     const renderEventItem = (event) => (
//         <li key={event._id} className="py-2 border-b">
//             <Link to={`/admin/event/${event._id}`} className="text-blue-600 hover:underline">
//                 {event.name} - {new Date(event.startTime).toLocaleString()}
//             </Link>
//         </li>
//     );

//     const renderEventsList = (category) => (
//         <div className="max-h-64 overflow-y-auto bg-white border border-gray-300 rounded">
//             <ul className="divide-y divide-gray-200">
//                 {events[category].map(renderEventItem)}
//             </ul>
//         </div>
//     );

//     const renderAccordionItem = (category, title) => (
//         <div className="border rounded-lg overflow-hidden mb-4">
//             <button
//                 onClick={() => toggleAccordion(category)}
//                 className="w-full text-left p-4 bg-blue-500 text-white font-bold"
//             >
//                 {title}
//             </button>
//             {openAccordion === category && (
//                 <div className="p-4 bg-gray-50">
//                     {events[category].length > 0 ? (
//                         renderEventsList(category)
//                     ) : (
//                         <p className="text-gray-500">No {title.toLowerCase()}.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );

//     return (
//         <div className="p-6">
//             {renderAccordionItem("ongoing", "Ongoing Events")}
//             {renderAccordionItem("upcoming", "Upcoming Events")}
//             {renderAccordionItem("past", "Past Events")}
//         </div>
//     );
// };

// export default Home;






// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useLocation } from "react-router-dom";

// const useQuery = () => new URLSearchParams(useLocation().search);

// const Home = () => {
//     const [events, setEvents] = useState({ ongoing: [], upcoming: [], past: [] });
//     const query = useQuery();
//     const searchTerm = query.get("search")?.toLowerCase() || "";

//     useEffect(() => {
//         axios.get("http://localhost:5000/admin/events")
//             .then((res) => setEvents(res.data))
//             .catch((err) => console.error(err));
//     }, []);

//     const filterEvents = (events) => {
//         if (!searchTerm) return events;
//         return events.filter(event => event.name.toLowerCase().includes(searchTerm));
//     };

//     const renderEventItem = (event) => (
//         <li key={event._id} className="py-2 border-b">
//             <Link to={`/admin/event/${event._id}`} className="text-blue-600 hover:underline">
//                 {event.name} - {new Date(event.startTime).toLocaleString()}
//             </Link>
//         </li>
//     );

//     const renderEventsList = (category) => {
//         const filteredEvents = filterEvents(events[category]);
//         return (
//             <div className="max-h-64 overflow-y-auto bg-white border border-gray-300 rounded">
//                 <ul className="divide-y divide-gray-200">
//                     {filteredEvents.map(renderEventItem)}
//                 </ul>
//                 {filteredEvents.length === 0 && <p className="text-center py-2 text-gray-500">No events found.</p>}
//             </div>
//         );
//     };

//     const renderAccordionItem = (category, title) => (
//         <div className="border rounded-lg overflow-hidden mb-4">
//             <button className="w-full text-left p-4 bg-blue-500 text-white font-bold">
//                 {title}
//             </button>
//             <div className="p-4 bg-gray-50">
//                 {renderEventsList(category)}
//             </div>
//         </div>
//     );

//     return (
//         <div className="p-6">
//             {renderAccordionItem("ongoing", "Ongoing Events")}
//             {renderAccordionItem("upcoming", "Upcoming Events")}
//             {renderAccordionItem("past", "Past Events")}
//         </div>
//     );
// };

// export default Home;






//? code with search bar included in homepage
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useLocation } from "react-router-dom";
// import { Trash2, Eye, Search } from 'lucide-react';

// const useQuery = () => new URLSearchParams(useLocation().search);

// const Home = () => {
//     const [events, setEvents] = useState({ ongoing: [], upcoming: [], past: [] });
//     const [searchTerm, setSearchTerm] = useState("");
//     const query = useQuery();

//     useEffect(() => {
//         axios.get("http://localhost:5000/admin/events")
//             .then((res) => setEvents(res.data))
//             .catch((err) => console.error(err));
//     }, []);

//     const filterEvents = (events) => {
//         if (!searchTerm) return events;
//         return events.filter(event => 
//             event.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     };

//     const handleDeleteEvent = async (eventId) => {
//         try {
//             await axios.delete(`http://localhost:5000/admin/event/${eventId}`);
//             // Update events by removing the deleted event
//             const updatedEvents = { ...events };
//             Object.keys(updatedEvents).forEach(category => {
//                 updatedEvents[category] = updatedEvents[category].filter(
//                     event => event._id !== eventId
//                 );
//             });
//             setEvents(updatedEvents);
//         } catch (error) {
//             console.error("Error deleting event:", error);
//             alert("Failed to delete event");
//         }
//     };

//     const renderEventItem = (event, category) => (
//         <li 
//             key={event._id} 
//             className="flex items-center justify-between py-3 px-4 border-b hover:bg-gray-100 transition-colors duration-200"
//         >
//             <div className="flex-grow">
//                 <p className="text-gray-800 font-medium">
//                     {event.name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                     {new Date(event.startTime).toLocaleString()}
//                 </p>
//             </div>
//             <div className="flex space-x-2">
//                 <Link 
//                     to={`/admin/event/${event._id}`} 
//                     className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-colors"
//                 >
//                     <Eye size={20} />
//                 </Link>
//                 <button 
//                     onClick={() => handleDeleteEvent(event._id)}
//                     className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors"
//                 >
//                     <Trash2 size={20} />
//                 </button>
//             </div>
//         </li>
//     );

//     const renderEventsList = (category) => {
//         const filteredEvents = filterEvents(events[category]);
//         return (
//             <div className="max-h-64 overflow-y-auto bg-white border border-gray-300 rounded-b-lg shadow-sm">
//                 {filteredEvents.length === 0 ? (
//                     <p className="text-center py-4 text-gray-500">No events found.</p>
//                 ) : (
//                     <ul className="divide-y divide-gray-200">
//                         {filteredEvents.map(event => renderEventItem(event, category))}
//                     </ul>
//                 )}
//             </div>
//         );
//     };

//     const renderAccordionItem = (category, title) => (
//         <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
//             <div className="flex items-center justify-between bg-blue-500 text-white p-4">
//                 <h2 className="text-lg font-bold">{title}</h2>
//                 <Link 
//                     to={`/admin/${category}-events`} 
//                     className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-colors"
//                 >
//                     View All
//                 </Link>
//             </div>
//             <div className="p-4 bg-gray-50">
//                 {renderEventsList(category)}
//             </div>
//         </div>
//     );

//     return (
//         <div className="container mx-auto px-4 py-8 max-w-4xl">
//             <div className="mb-6 relative">
//                 <input 
//                     type="text" 
//                     placeholder="Search events..." 
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <Search 
//                     size={20} 
//                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
//                 />
//             </div>

//             <div className="space-y-6">
//                 {renderAccordionItem("ongoing", "Ongoing Events")}
//                 {renderAccordionItem("upcoming", "Upcoming Events")}
//                 {renderAccordionItem("past", "Past Events")}
//             </div>
//         </div>
//     );
// };

// export default Home;



//! OPTION 1

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useLocation } from "react-router-dom";
// import { Trash2, Eye } from 'lucide-react';

// const useQuery = () => new URLSearchParams(useLocation().search);

// const Home = () => {
//     const [events, setEvents] = useState({ ongoing: [], upcoming: [], past: [] });
//     const query = useQuery();
//     const searchTerm = query.get("search")?.toLowerCase() || "";

//     useEffect(() => {
//         axios.get("http://localhost:5000/admin/events")
//             .then((res) => setEvents(res.data))
//             .catch((err) => console.error(err));
//     }, []);

//     const filterEvents = (events) => {
//         if (!searchTerm) return events;
//         return events.filter(event => event.name.toLowerCase().includes(searchTerm));
//     };

//     const handleDeleteEvent = async (eventId) => {
//         try {
//             await axios.delete(`http://localhost:5000/admin/event/${eventId}`);
//             // Update events by removing the deleted event
//             const updatedEvents = { ...events };
//             Object.keys(updatedEvents).forEach(category => {
//                 updatedEvents[category] = updatedEvents[category].filter(
//                     event => event._id !== eventId
//                 );
//             });
//             setEvents(updatedEvents);
//         } catch (error) {
//             console.error("Error deleting event:", error);
//             alert("Failed to delete event");
//         }
//     };

//     const renderEventItem = (event, category) => (
//         <li 
//             key={event._id} 
//             className="flex items-center justify-between py-3 px-4 border-b hover:bg-gray-100 transition-colors duration-200"
//         >
//             <div className="flex-grow">
//                 <p className="text-gray-800 font-medium">
//                     {event.name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                     {new Date(event.startTime).toLocaleString()}
//                 </p>
//             </div>
//             <div className="flex space-x-2">
//                 <Link 
//                     to={`/admin/event/${event._id}`} 
//                     className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-colors"
//                 >
//                     <Eye size={20} />
//                 </Link>
//                 <button 
//                     onClick={() => handleDeleteEvent(event._id)}
//                     className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors"
//                 >
//                     <Trash2 size={20} />
//                 </button>
//             </div>
//         </li>
//     );

//     const renderEventsList = (category) => {
//         const filteredEvents = filterEvents(events[category]);
//         return (
//             <div className="max-h-64 overflow-y-auto bg-white border border-gray-300 rounded-b-lg shadow-sm">
//                 {filteredEvents.length === 0 ? (
//                     <p className="text-center py-4 text-gray-500">No events found.</p>
//                 ) : (
//                     <ul className="divide-y divide-gray-200">
//                         {filteredEvents.map(event => renderEventItem(event, category))}
//                     </ul>
//                 )}
//             </div>
//         );
//     };

//     const renderAccordionItem = (category, title) => (
//         <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
//             <div className="flex items-center justify-between bg-yellow-400 text-white p-4">
//                 <h2 className="text-lg font-bold">{title}</h2>
//                 {/* <Link 
//                     to={`/admin/${category}-events`} 
//                     className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-colors"
//                 >
//                     View All
//                 </Link> */}
//             </div>
//             <div className="p-4 bg-gray-50">
//                 {renderEventsList(category)}
//             </div>
//         </div>
//     );

//     return (
//         <div className="container mx-auto px-4 py-8 max-w-4xl">
//             <div className="space-y-6">
//                 {renderAccordionItem("ongoing", "Ongoing Events")}
//                 {renderAccordionItem("upcoming", "Upcoming Events")}
//                 {renderAccordionItem("past", "Past Events")}
//             </div>
//         </div>
//     );
// };

// export default Home;


//! option 2
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Trash2, Eye } from 'lucide-react';

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = () => {
    const [events, setEvents] = useState({ ongoing: [], upcoming: [], past: [] });
    const [expandedCategory, setExpandedCategory] = useState(null); // Track expanded category
    const query = useQuery();
    const searchTerm = query.get("search")?.toLowerCase() || "";

    useEffect(() => {
        axios.get("http://localhost:5000/admin/events")
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err));
    }, []);

    const filterEvents = (events) => {
        if (!searchTerm) return events;
        return events.filter(event => event.name.toLowerCase().includes(searchTerm));
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`http://localhost:5000/admin/event/${eventId}`);
            const updatedEvents = { ...events };
            Object.keys(updatedEvents).forEach(category => {
                updatedEvents[category] = updatedEvents[category].filter(
                    event => event._id !== eventId
                );
            });
            setEvents(updatedEvents);
        } catch (error) {
            console.error("Error deleting event:", error);
            alert("Failed to delete event");
        }
    };

    const renderEventItem = (event, category) => (
        <li
            key={event._id}
            className="flex items-center justify-between py-4 px-6 border-b border-gray-200/50 
                hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50/30 
                transition-all duration-300 group"
        >
            <div className="flex-grow">
                <p className="text-gray-800 font-semibold text-lg tracking-tight
                    group-hover:text-blue-700 transition-colors duration-300">
                    {event.name}
                </p>
                <p className="text-sm text-gray-600 mt-1 flex items-center space-x-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                        {category}
                    </span>
                    <span>{new Date(event.startTime).toLocaleString()}</span>
                </p>
            </div>
            <div className="flex space-x-3">
                <Link
                    to={`/admin/event/${event._id}`}
                    className="text-blue-600 p-2 rounded-full bg-blue-100/50 
                        hover:bg-blue-200 hover:text-blue-800 transition-all duration-300
                        shadow-sm hover:shadow-md group/icon"
                >
                    <Eye
                        size={22}
                        className="group-hover/icon:scale-110 transition-transform duration-300"
                    />
                </Link>
                <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="text-red-600 p-2 rounded-full bg-red-100/50 
                        hover:bg-red-200 hover:text-red-800 transition-all duration-300
                        shadow-sm hover:shadow-md group/icon"
                >
                    <Trash2
                        size={22}
                        className="group-hover/icon:rotate-12 transition-transform duration-300"
                    />
                </button>
            </div>
        </li>
    );

    const renderEventsList = (category) => {
        const filteredEvents = filterEvents(events[category]);
        return (
            <div className={`overflow-y-auto bg-white rounded-b-xl border border-gray-200/50 
                shadow-lg backdrop-blur-sm ${expandedCategory === category ? 'max-h-[80vh]' : 'max-h-72'}`}>
                {filteredEvents.length === 0 ? (
                    <p className="text-center py-6 text-gray-500 font-medium">
                        No events found.
                    </p>
                ) : (
                    <ul className="divide-y divide-gray-200/50">
                        {filteredEvents.map(event => renderEventItem(event, category))}
                    </ul>
                )}
            </div>
        );
    };

    const renderAccordionItem = (category, title) => (
        <div className={`bg-white rounded-xl shadow-xl mb-6 overflow-hidden transform 
            hover:scale-[1.01] transition-all duration-300 border border-gray-100
            ${expandedCategory && expandedCategory !== category ? 'hidden' : ''}`}>
            <div className={`flex items-center justify-between p-5 text-white
                ${category === 'ongoing' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    category === 'upcoming' ? 'bg-gradient-to-r from-blue-500 to-indigo-500' :
                        'bg-gradient-to-r from-gray-500 to-gray-700'}`}>
                <h2 className="text-xl font-bold tracking-wide drop-shadow-md">
                    {title}
                </h2>
                <button
                    onClick={() => setExpandedCategory(expandedCategory === category ? null : category)}
                    className="text-sm bg-white text-gray-800 px-4 py-2 rounded-full 
                        hover:bg-gray-100 transition-all duration-300 shadow-md font-medium"
                >
                    {expandedCategory === category ? 'Collapse' : 'View All'}
                </button>
            </div>
            <div className="p-2 bg-gradient-to-b from-gray-50 to-white/95">
                {renderEventsList(category)}
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-6 py-12 max-w-5xl bg-gradient-to-b from-blue-50 to-white min-h-screen">
            <div className="space-y-8">
                {/* <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center 
                    bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Event Dashboard
                </h1> */}
                {renderAccordionItem("ongoing", "Ongoing Events")}
                {renderAccordionItem("upcoming", "Upcoming Events")}
                {renderAccordionItem("past", "Past Events")}
            </div>
        </div>
    );
};

export default Home;