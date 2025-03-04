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



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Trash2, Eye } from 'lucide-react';

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = () => {
    const [events, setEvents] = useState({ ongoing: [], upcoming: [], past: [] });
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
            // Update events by removing the deleted event
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
            className="flex items-center justify-between py-3 px-4 border-b hover:bg-gray-100 transition-colors duration-200"
        >
            <div className="flex-grow">
                <p className="text-gray-800 font-medium">
                    {event.name}
                </p>
                <p className="text-sm text-gray-500">
                    {new Date(event.startTime).toLocaleString()}
                </p>
            </div>
            <div className="flex space-x-2">
                <Link 
                    to={`/admin/event/${event._id}`} 
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-100 transition-colors"
                >
                    <Eye size={20} />
                </Link>
                <button 
                    onClick={() => handleDeleteEvent(event._id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-100 transition-colors"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </li>
    );

    const renderEventsList = (category) => {
        const filteredEvents = filterEvents(events[category]);
        return (
            <div className="max-h-64 overflow-y-auto bg-white border border-gray-300 rounded-b-lg shadow-sm">
                {filteredEvents.length === 0 ? (
                    <p className="text-center py-4 text-gray-500">No events found.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {filteredEvents.map(event => renderEventItem(event, category))}
                    </ul>
                )}
            </div>
        );
    };

    const renderAccordionItem = (category, title) => (
        <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
            <div className="flex items-center justify-between bg-yellow-400 text-white p-4">
                <h2 className="text-lg font-bold">{title}</h2>
                {/* <Link 
                    to={`/admin/${category}-events`} 
                    className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-colors"
                >
                    View All
                </Link> */}
            </div>
            <div className="p-4 bg-gray-50">
                {renderEventsList(category)}
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="space-y-6">
                {renderAccordionItem("ongoing", "Ongoing Events")}
                {renderAccordionItem("upcoming", "Upcoming Events")}
                {renderAccordionItem("past", "Past Events")}
            </div>
        </div>
    );
};

export default Home;