import React from "react";

const EventDetailsView = ({ event, setEditMode, handleDelete, navigate }) => {
    return (
        <>
            <h1 className="text-2xl font-bold">{event.name}</h1>
            <div className="space-y-2 mt-4">
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Start Time:</strong> {new Date(event.startTime).toLocaleString()}</p>
                <p><strong>End Time:</strong> {new Date(event.endTime).toLocaleString()}</p>
                <p><strong>Radius:</strong> {event.radius} meters</p>
                <p><strong>Buffer Minutes:</strong> {event.bufferMinutes}</p>
                <h3 className="font-bold mt-4">Registered Students:</h3>
                <ul className="list-disc list-inside">
                    {event.registeredStudents.map((student) => (
                        <li key={student._id}>{student.fullName} ({student.email})</li>
                    ))}
                </ul>
                <div className="mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2" onClick={() => setEditMode(true)}>Edit Event</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2" onClick={handleDelete}>Delete Event</button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2" onClick={() => navigate("/")}>Back to Events</button>
                </div>
            </div>
        </>
    );
};

export default EventDetailsView;
