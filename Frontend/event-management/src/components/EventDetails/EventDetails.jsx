import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventDetailsView from "./EventDetailsView";
import EventEditForm from "./EventEditForm";
import Papa from "papaparse";

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [formData, setFormData] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [emails, setEmails] = useState([]);
    const [newEmail, setNewEmail] = useState("");

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
                setEmails(data.registeredStudents.map(student => student.email));
            })
            .catch((err) => console.error("Failed to fetch event:", err));
    }, [id]);

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;
        const response = await fetch(`http://localhost:5000/admin/event/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete event");
        alert("Event deleted successfully!");
        navigate("/");
    };

    if (!event) return <p>Loading event details...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            {editMode ? (
                <EventEditForm
                    formData={formData}
                    setFormData={setFormData}
                    emails={emails}
                    setEmails={setEmails}
                    setEditMode={setEditMode}
                    eventId={id}
                    setEvent={setEvent}
                    newEmail={newEmail}
                    setNewEmail={setNewEmail}
                />
            ) : (
                <EventDetailsView
                    event={event}
                    setEditMode={setEditMode}
                    handleDelete={handleDelete}
                    navigate={navigate}
                />
            )}
        </div>
    );
};

export default EventDetails;
