import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Papa from "papaparse";

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [formData, setFormData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [emails, setEmails] = useState([]);  // For parsed emails

    useEffect(() => {
        fetch(`http://localhost:5000/admin/event/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setEvent(data);
                setFormData({
                    name: data.name,
                    description: data.description,
                    startTime: data.startTime,
                    endTime: data.endTime,
                    radius: data.radius,
                    bufferMinutes: data.bufferMinutes,
                    registeredStudents: data.registeredStudents.map(student => student.email)
                });
                setEmails(data.registeredStudents.map(student => student.email));  // Prepopulate existing students
            })
            .catch((err) => console.error("Failed to fetch event:", err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                startTime: new Date(formData.startTime).toISOString(),
                endTime: new Date(formData.endTime).toISOString(),
                registeredStudents: emails // Send updated student list
            };

            const response = await fetch(`http://localhost:5000/admin/event/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Failed to update event");

            const updatedEvent = await response.json();
            setEvent(updatedEvent);
            setEditMode(false);
            alert("Event updated successfully!");
        } catch (err) {
            alert("Error updating event: " + err.message);
        }
    };

    if (!event) return <p>Loading event details...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold">{event.name}</h1>
            <p>{event.description}</p>

            {!editMode && (
                <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={() => setEditMode(true)}>
                    Edit Event
                </button>
            )}

            {editMode && (
                <form onSubmit={handleUpdate} className="mt-6 space-y-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
                    <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full"></textarea>

                    <input type="datetime-local" name="startTime" value={new Date(formData.startTime).toISOString().slice(0, 16)} onChange={handleChange} className="border p-2 w-full" />
                    <input type="datetime-local" name="endTime" value={new Date(formData.endTime).toISOString().slice(0, 16)} onChange={handleChange} className="border p-2 w-full" />

                    <input type="number" name="radius" value={formData.radius} onChange={handleChange} className="border p-2 w-full" />
                    <input type="number" name="bufferMinutes" value={formData.bufferMinutes} onChange={handleChange} className="border p-2 w-full" />

                    <label className="block mt-2">
                        Upload New CSV (Optional):
                        <input type="file" accept=".csv" onChange={handleCSVUpload} className="border p-2 w-full" />
                    </label>

                    {/* Show current student list */}
                    <h3 className="mt-4 font-bold">Registered Students</h3>
                    <ul className="list-disc pl-5">
                        {emails.map((email, index) => <li key={index}>{email}</li>)}
                    </ul>

                    <div className="space-x-2 mt-4">
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditMode(false)}>Cancel</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EventDetails;
