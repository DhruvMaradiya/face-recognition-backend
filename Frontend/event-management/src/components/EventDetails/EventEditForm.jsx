import React from "react";
import Papa from "papaparse";

const EventEditForm = ({ formData, setFormData, emails, setEmails, setEditMode, eventId, setEvent, newEmail, setNewEmail }) => {
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

    const handleAddEmail = async () => {
        if (!newEmail) {
            alert("Please enter an email address");
            return;
        }

        if (emails.includes(newEmail)) {
            alert("This student is already registered for the event");
            return;
        }

        const response = await fetch(`http://localhost:5000/students/email/${newEmail}`);
        if (!response.ok) {
            alert("Student not found");
            return;
        }

        const registerResponse = await fetch("http://localhost:5000/students/register-to-event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: newEmail, eventId })
        });

        if (!registerResponse.ok) {
            const errorData = await registerResponse.json();
            alert("Failed to register student to event: " + errorData.error);
            return;
        }

        setEmails([...emails, newEmail]);
        setFormData({ ...formData, registeredStudents: [...emails, newEmail] });
        setNewEmail("");
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            startTime: new Date(formData.startTime).toISOString(),
            endTime: new Date(formData.endTime).toISOString(),
            registeredStudents: emails
        };

        const response = await fetch(`http://localhost:5000/admin/event/${eventId}`, {
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
            <input type="datetime-local" name="startTime" value={formData.startTime.slice(0, 16)} onChange={handleChange} className="border p-2 w-full" />
            <input type="datetime-local" name="endTime" value={formData.endTime.slice(0, 16)} onChange={handleChange} className="border p-2 w-full" />
            <input type="file" accept=".csv" onChange={handleCSVUpload} className="border p-2 w-full" />
            <div className="flex mt-4 space-x-2">
                <input type="email" placeholder="Add Student Email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} className="border p-2 w-full" />
                <button type="button" onClick={handleAddEmail}>Add</button>
            </div>
        </form>
    );
};

export default EventEditForm;
