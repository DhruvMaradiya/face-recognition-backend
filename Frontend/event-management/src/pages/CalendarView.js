import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';

const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();

    // Fetch events on mount and flatten the response
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/admin/events");
                const { ongoing = [], upcoming = [], past = [] } = response.data || {};
                // Flatten all events into a single array
                const allEvents = [...ongoing, ...upcoming, ...past];
                setEvents(allEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
                setEvents([]); // Fallback to empty array on error
            }
        };
        fetchEvents();
    }, []);

    // Calendar Logic
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

    const isWeekend = (day) => {
        if (!day) return false;
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6; // Sunday (0) or Saturday (6)
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
        if (!day) return [];
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        return events.filter(event => {
            const start = new Date(event.startTime);
            const end = new Date(event.endTime);
            return date >= start.setHours(0, 0, 0, 0) && date <= end.setHours(23, 59, 59, 999);
        });
    };

    const calendarDays = generateCalendar();
    const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <div className="bg-[#054e85] p-6 flex justify-between items-center shadow-lg">
                <div className="flex items-center space-x-4">
                    <CalendarIcon size={32} className="text-white" />
                    <h1 className="text-3xl font-bold text-white">Event Calendar</h1>
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center space-x-2 text-white hover:text-[#fece00] transition-colors duration-300"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Home</span>
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-[#58585a]/20">
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={handlePrevMonth}
                            className="text-[#054e85] hover:text-[#fece00] transition-colors duration-300 font-medium"
                        >
                            Prev
                        </button>
                        <span className="text-[#58585a] text-xl font-semibold">
                            {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                        </span>
                        <button
                            onClick={handleNextMonth}
                            className="text-[#054e85] hover:text-[#fece00] transition-colors duration-300 font-medium"
                        >
                            Next
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-4 text-center">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="text-[#58585a] font-medium text-sm uppercase">
                                {day}
                            </div>
                        ))}
                        {calendarDays.map((day, index) => {
                            const hasEvents = day && getEventsForDate(day).length > 0;
                            const isWeekendDay = isWeekend(day);
                            return (
                                <div
                                    key={index}
                                    className={`p-4 cursor-pointer rounded-lg transition-colors duration-300 ${day && selectedDate === day
                                        ? 'bg-[#054e85] text-white'
                                        : hasEvents
                                            ? 'bg-[#fece00]/20 hover:bg-[#fece00]/30'
                                            : isWeekendDay
                                                ? 'bg-[#054e85]/10 hover:bg-[#054e85]/20'
                                                : 'bg-white hover:bg-[#054e85]/10'
                                        } border border-[#58585a]/10`}
                                    onClick={() => day && setSelectedDate(day)}
                                >
                                    <span className="block text-lg">{day || ''}</span>
                                    {hasEvents && (
                                        <div className="flex justify-center mt-2 space-x-1">
                                            {getEventsForDate(day).slice(0, 3).map((_, i) => (
                                                <span key={i} className="w-2 h-2 bg-[#fece00] rounded-full"></span>
                                            ))}
                                            {getEventsForDate(day).length > 3 && (
                                                <span className="text-xs text-[#58585a]">+{getEventsForDate(day).length - 3}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Events List */}
                <div className="bg-white rounded-xl shadow-lg p-6 border border-[#58585a]/20 overflow-y-auto max-h-[calc(100vh-12rem)]">
                    <h2 className="text-xl font-semibold text-[#58585a] mb-4">
                        {selectedDate
                            ? `Events on ${new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate).toLocaleDateString()}`
                            : "Select a date to view events"}
                    </h2>
                    {selectedDate && selectedEvents.length === 0 ? (
                        <p className="text-[#58585a]/80 text-center py-4">No events on this date</p>
                    ) : selectedDate ? (
                        <ul className="space-y-4">
                            {selectedEvents.map((event) => (
                                <li
                                    key={event._id}
                                    className="p-4 bg-[#054e85]/5 rounded-lg hover:bg-[#054e85]/10 transition-colors duration-300 cursor-pointer border-l-4 border-[#fece00]"
                                    onClick={() => navigate(`/admin/event/${event._id}`)}
                                >
                                    <p className="font-medium text-[#58585a]">{event.name}</p>
                                    <p className="text-sm text-[#58585a]/80">
                                        {new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-[#58585a]/80 text-center py-4">Click a date to see events</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CalendarView;