import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        startTime: "",
        endTime: "",
        radius: "",
        bufferMinutes: 10,
        creator: "",
        latitude: "",
        longitude: "",
        registeredStudents: []
    });

    const handleCSVUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            complete: (result) => {
                const emails = result.data.map((row) => row[2]).filter(email => email);
                setFormData((prev) => ({ ...prev, registeredStudents: emails }));
            },
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const eventDetails = {
                ...formData,
                startTime: new Date(formData.startTime).toISOString(),
                endTime: new Date(formData.endTime).toISOString(),
                location: { type: "Point", coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)] }
            };
            delete eventDetails.latitude;
            delete eventDetails.longitude;

            await axios.post("http://localhost:5000/admin/createevent", eventDetails);
            navigate("/");
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg mt-6">
            <h2 className="text-2xl font-bold mb-4">Create Event</h2>
            <input type="text" name="name" placeholder="Event Name" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
            <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded mb-2"></textarea>
            <input type="datetime-local" name="startTime" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
            <input type="datetime-local" name="endTime" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
            <input type="number" name="radius" placeholder="Radius (meters)" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
            <input type="number" name="bufferMinutes" placeholder="Buffer Minutes" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
            <input type="email" name="creator" placeholder="Creator Email" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
            <input type="text" name="latitude" placeholder="Latitude" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
            <input type="text" name="longitude" placeholder="Longitude" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
            <input type="file" accept=".csv" onChange={handleCSVUpload} className="w-full p-2 border rounded mb-2" />
            <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">Create Event</button>
        </form>
    );
};

export default CreateEvent;
