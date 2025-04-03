import React, { useState } from "react";
import Papa from "papaparse";
import TimePicker from "./TimePicker"; // Ensure this is correctly imported

const API_URL = process.env.REACT_APP_API_URL;

const EventEditForm = ({ formData, setFormData, emails, setEmails, setEditMode, eventId, setEvent, newEmail, setNewEmail }) => {
    const [showTimePicker, setShowTimePicker] = useState({ start: false, end: false });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleCSVUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            complete: (result) => {
                const extractedEmails = result.data.map(row => row[2]).filter(email => email);
                setEmails(extractedEmails);
                setFormData({ ...formData, registeredStudents: extractedEmails });
            }
        });
    };

    const handleTimeChange = (type, time) => {
        setFormData(prev => ({ ...prev, [type]: time }));
        setShowTimePicker(prev => ({ ...prev, [type === "startTime" ? "start" : "end"]: false }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            startTime: new Date(formData.startTime).toISOString(),
            endTime: new Date(formData.endTime).toISOString(),
            registeredStudents: emails
        };

        const response = await fetch(`${API_URL}/admin/event/${eventId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Failed to update event");

        const updatedEvent = await response.json();
        setEvent(updatedEvent);
        setEditMode(false);
        alert("Event updated successfully!");
    };

    return (
        <form onSubmit={handleUpdate} className="mt-6 space-y-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
            <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full"></textarea>

            {/* Start Time Picker */}
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <div
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors"
                    onClick={() => setShowTimePicker(prev => ({ ...prev, start: !prev.start }))}
                >
                    <span>{formData.startTime ? new Date(formData.startTime).toLocaleString() : "Set start time"}</span>
                </div>
                {showTimePicker.start && (
                    <TimePicker type="startTime" value={formData.startTime} onChange={handleTimeChange} />
                )}
            </div>

            {/* End Time Picker */}
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <div
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer flex items-center justify-between hover:bg-gray-100 transition-colors"
                    onClick={() => setShowTimePicker(prev => ({ ...prev, end: !prev.end }))}
                >
                    <span>{formData.endTime ? new Date(formData.endTime).toLocaleString() : "Set end time"}</span>
                </div>
                {showTimePicker.end && (
                    <TimePicker type="endTime" value={formData.endTime} onChange={handleTimeChange} />
                )}
            </div>

            <input type="file" accept=".csv" onChange={handleCSVUpload} className="border p-2 w-full" />

            <div className="flex mt-4 space-x-2">
                <input type="email" placeholder="Add Student Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="border p-2 w-full" />
                <button type="button" onClick={() => setEmails([...emails, newEmail])} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
            </div>

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save Changes</button>
            <button type="button" onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </form>
    );
};

export default EventEditForm;
