import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { useForm } from "react-hook-form";

const EventForm = () => {
    const { register, handleSubmit, setValue } = useForm();
    const [emails, setEmails] = useState([]);

    // Handle CSV Upload
    const handleCSVUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        Papa.parse(file, {
            complete: (result) => {
                const extractedEmails = result.data.map((row) => row[2]).filter(email => email);
                setEmails(extractedEmails);
                setValue("registeredStudents", extractedEmails);
            },
        });
    };

    // Submit Event Data
    const onSubmit = async (data) => {
        try {
            data.startTime = new Date(data.startTime).toISOString();
            data.endTime = new Date(data.endTime).toISOString();
            data.location = {
                type: "Point",
                coordinates: [parseFloat(data.longitude), parseFloat(data.latitude)],
            };

            delete data.latitude;
            delete data.longitude;

            const response = await axios.post("http://localhost:5000/admin/createevent", data);
            alert("Event Created Successfully!");
        } catch (error) {
            console.error("Error creating event", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="event-form">
            <input type="text" placeholder="Event Name" {...register("name", { required: true })} />
            <textarea placeholder="Description" {...register("description")} />
            <input type="datetime-local" {...register("startTime", { required: true })} />
            <input type="datetime-local" {...register("endTime", { required: true })} />
            <input type="number" placeholder="Radius (meters)" {...register("radius", { required: true })} />
            <input type="number" placeholder="Buffer Minutes" {...register("bufferMinutes", { required: true })} />
            <input type="email" placeholder="Creator Email" {...register("creator", { required: true })} />
            <input type="number" placeholder="Latitude" {...register("latitude", { required: true })} />
            <input type="number" placeholder="Longitude" {...register("longitude", { required: true })} />

            <input type="file" accept=".csv" onChange={handleCSVUpload} />
            <ul>
                {emails.map((email, index) => (
                    <li key={index}>{email}</li>
                ))}
            </ul>

            <button type="submit">Create Event</button>
        </form>
    );
};

export default EventForm;
