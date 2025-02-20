import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [events, setEvents] = useState({ ongoing: [], upcoming: [], past: [] });

    useEffect(() => {
        axios.get("http://localhost:5000/admin/events")
            .then((res) => setEvents(res.data))
            .catch((err) => console.error(err));
    }, []);

    const renderEvents = (category, title) => (
        <div>
            <h2 className="text-xl font-bold mt-4">{title}</h2>
            <div className="grid grid-cols-3 gap-4">
                {events[category].map((event) => (
                    <Link key={event._id} to={`/admin/event/${event._id}`} className="border p-4 rounded-lg shadow hover:bg-gray-100">
                        <h3 className="font-semibold">{event.name}</h3>
                        <p>{new Date(event.startTime).toLocaleString()}</p>
                    </Link>
                ))}
            </div>
        </div>
    );

    return (
        <div className="p-6">
            {renderEvents("ongoing", "Ongoing Events")}
            {renderEvents("upcoming", "Upcoming Events")}
            {renderEvents("past", "Past Events")}
        </div>
    );
};

export default Home;
