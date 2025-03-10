import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { Trash2, Eye } from 'lucide-react';


const useQuery = () => new URLSearchParams(useLocation().search);


const Home = () => {

    //? Setting parameters for use state

    const [events, setEvents] = useState({ ongoing: [], upcoming: [], past: [] });
    const [expandedCategory, setExpandedCategory] = useState(null); // Track expanded category

    //? For Searching Events
    const query = useQuery();
    const searchTerm = query.get("search")?.toLowerCase() || "";

    //? Use effect to get events
    useEffect(() => {
        axios.get("http://localhost:5000/admin/events")
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err));
    }, []);

    //? Filter events based on search term
    const filterEvents = (events) => {
        if (!searchTerm) return events;
        return events.filter(event => event.name.toLowerCase().includes(searchTerm));
    };


    //! Function to delete event
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

    //? Function to render event item
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


    //? Function to render events list
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