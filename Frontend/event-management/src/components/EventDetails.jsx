// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const EventDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await fetch(`http://localhost:5000/admin/event/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch event");
//         const data = await response.json();
//         setEvent(data);
//         setFormData({
//           name: data.name,
//           description: data.description,
//           startTime: data.startTime,
//           endTime: data.endTime,
//           radius: data.radius,
//           bufferMinutes: data.bufferMinutes,
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvent();
//   }, [id]);

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this event?")) return;
//     try {
//       const response = await fetch(`http://localhost:5000/admin/event/${id}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) throw new Error("Failed to delete event");
//       alert("Event deleted successfully!");
//       navigate("/"); // Redirect to event list
//     } catch (err) {
//       alert("Error deleting event: " + err.message);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:5000/admin/event/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (!response.ok) throw new Error("Failed to update event");
//       alert("Event updated successfully!");
//       setEditMode(false);
//     } catch (err) {
//       alert("Error updating event: " + err.message);
//     }
//   };

//   if (loading) return <p>Loading event details...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold">{event.name}</h1>
//       <p className="text-gray-600">{event.description}</p>
//       <p>
//         <strong>Start:</strong> {new Date(event.startTime).toLocaleString()}
//       </p>
//       <p>
//         <strong>End:</strong> {new Date(event.endTime).toLocaleString()}
//       </p>
//       <p>
//         <strong>Radius:</strong> {event.radius} meters
//       </p>
//       <p>
//         <strong>Buffer Time:</strong> {event.bufferMinutes} minutes
//       </p>
//       <p className="mt-4 font-semibold">
//         Created by: {event.creator.fullName} ({event.creator.email})
//       </p>
//       <p className="mt-4 font-semibold">Registered Students:</p>
//       <ul className="list-disc list-inside">
//         {event.registeredStudents.map((student) => (
//           <li key={student._id}>{student.email}</li>
//         ))}
//       </ul>

//       {/* Buttons */}
//       <div className="mt-6">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
//           onClick={() => setEditMode(true)}
//         >
//           Edit Event
//         </button>
//         <button
//           className="bg-red-500 text-white px-4 py-2 rounded-lg"
//           onClick={handleDelete}
//         >
//           Delete Event
//         </button>
//         <button
//           className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
//           onClick={() => navigate("/")}
//         >
//           Back to Events
//         </button>
//       </div>

//       {/* Edit Form */}
//       {editMode && (
//         <form
//           onSubmit={handleUpdate}
//           className="mt-6 bg-gray-100 p-4 rounded-lg"
//         >
//           <label className="block">
//             Name:
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="border p-2 w-full"
//             />
//           </label>
//           <label className="block mt-2">
//             Description:
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="border p-2 w-full"
//             />
//           </label>
//           <label className="block mt-2">
//             Start Time:
//             <input
//               type="datetime-local"
//               name="startTime"
//               value={new Date(formData.startTime).toISOString().slice(0, 16)}
//               onChange={handleChange}
//               className="border p-2 w-full"
//             />
//           </label>
//           <label className="block mt-2">
//             End Time:
//             <input
//               type="datetime-local"
//               name="endTime"
//               value={new Date(formData.endTime).toISOString().slice(0, 16)}
//               onChange={handleChange}
//               className="border p-2 w-full"
//             />
//           </label>
//           <label className="block mt-2">
//             Radius:
//             <input
//               type="number"
//               name="radius"
//               value={formData.radius}
//               onChange={handleChange}
//               className="border p-2 w-full"
//             />
//           </label>
//           <label className="block mt-2">
//             Buffer Minutes:
//             <input
//               type="number"
//               name="bufferMinutes"
//               value={formData.bufferMinutes}
//               onChange={handleChange}
//               className="border p-2 w-full"
//             />
//           </label>
//           <button
//             type="submit"
//             className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Save Changes
//           </button>
//           <button
//             type="button"
//             className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded"
//             onClick={() => setEditMode(false)}
//           >
//             Cancel
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EventDetails;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Papa from "papaparse";

// const EventDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [emails, setEmails] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/admin/event/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setEvent(data);
//         setFormData({
//           name: data.name,
//           description: data.description,
//           startTime: data.startTime,
//           endTime: data.endTime,
//           radius: data.radius,
//           bufferMinutes: data.bufferMinutes,
//           registeredStudents: data.registeredStudents.map(student => student.email)
//         });
//         setEmails(data.registeredStudents.map(student => student.email));
//       })
//       .catch((err) => console.error("Failed to fetch event:", err));
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this event?")) return;
//     try {
//       const response = await fetch(`http://localhost:5000/admin/event/${id}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) throw new Error("Failed to delete event");
//       alert("Event deleted successfully!");
//       navigate("/"); // Redirect to event list
//     } catch (err) {
//       alert("Error deleting event: " + err.message);
//     }
//   };

//   const handleCSVUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     Papa.parse(file, {
//       complete: (result) => {
//         const extractedEmails = result.data.map(row => row[2]).filter(email => email);
//         setEmails(extractedEmails);
//         setFormData({ ...formData, registeredStudents: extractedEmails });
//       }
//     });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         startTime: new Date(formData.startTime).toISOString(),
//         endTime: new Date(formData.endTime).toISOString(),
//         registeredStudents: emails
//       };

//       const response = await fetch(`http://localhost:5000/admin/event/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) throw new Error("Failed to update event");

//       const updatedEvent = await response.json();
//       setEvent(updatedEvent);
//       setEditMode(false);
//       alert("Event updated successfully!");
//     } catch (err) {
//       alert("Error updating event: " + err.message);
//     }
//   };

//   if (!event) return <p>Loading event details...</p>;

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold">{event.name}</h1>

//       {!editMode ? (
//         // READ Mode: Display Event Details
//         <div className="space-y-2 mt-4">
//           <p><strong>Description:</strong> {event.description}</p>
//           <p><strong>Start Time:</strong> {new Date(event.startTime).toLocaleString()}</p>
//           <p><strong>End Time:</strong> {new Date(event.endTime).toLocaleString()}</p>
//           <p><strong>Radius:</strong> {event.radius} meters</p>
//           <p><strong>Buffer Minutes:</strong> {event.bufferMinutes}</p>
//           <h3 className="font-bold mt-4">Registered Students:</h3>
//           <ul className="list-disc list-inside">
//             {event.registeredStudents.map((student) => (
//               <li key={student._id}>{student.fullName} ({student.email})</li>
//             ))}
//           </ul>
//           <div className="mt-4">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2" onClick={() => setEditMode(true)}>
//               Edit Event
//             </button>

//             <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2" onClick={handleDelete}>
//               Delete Event
//             </button>

//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
//               onClick={() => navigate("/")}
//             >
//               Back to Events
//             </button>

//           </div>
//         </div>
//       ) : (
//         // EDIT Mode: Form to Edit Event
//         <form onSubmit={handleUpdate} className="mt-6 space-y-4">
//           <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
//           <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full"></textarea>

//           <input type="datetime-local" name="startTime" value={new Date(formData.startTime).toISOString().slice(0, 16)} onChange={handleChange} className="border p-2 w-full" />
//           <input type="datetime-local" name="endTime" value={new Date(formData.endTime).toISOString().slice(0, 16)} onChange={handleChange} className="border p-2 w-full" />

//           <input type="number" name="radius" value={formData.radius} onChange={handleChange} className="border p-2 w-full" />
//           <input type="number" name="bufferMinutes" value={formData.bufferMinutes} onChange={handleChange} className="border p-2 w-full" />

//           <label className="block mt-2">
//             Upload New CSV (Optional):
//             <input type="file" accept=".csv" onChange={handleCSVUpload} className="border p-2 w-full" />
//           </label>

//           <h3 className="mt-4 font-bold">Registered Students</h3>
//           <ul className="list-disc pl-5">
//             {emails.map((email, index) => <li key={index}>{email}</li>)}
//           </ul>

//           <div className="space-x-2 mt-4">
//             <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
//             <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditMode(false)}>Cancel</button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EventDetails;

//!! Perfectly Working
// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Papa from "papaparse";

// const EventDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [emails, setEmails] = useState([]);
//   const [newEmail, setNewEmail] = useState("");  // New state to handle the email input

//   useEffect(() => {
//     fetch(`http://localhost:5000/admin/event/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setEvent(data);
//         setFormData({
//           name: data.name,
//           description: data.description,
//           startTime: data.startTime,
//           endTime: data.endTime,
//           radius: data.radius,
//           bufferMinutes: data.bufferMinutes,
//           registeredStudents: data.registeredStudents.map(student => student.email)
//         });
//         setEmails(data.registeredStudents.map(student => student.email));
//       })
//       .catch((err) => console.error("Failed to fetch event:", err));
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this event?")) return;
//     try {
//       const response = await fetch(`http://localhost:5000/admin/event/${id}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) throw new Error("Failed to delete event");
//       alert("Event deleted successfully!");
//       navigate("/");
//     } catch (err) {
//       alert("Error deleting event: " + err.message);
//     }
//   };

//   const handleCSVUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     Papa.parse(file, {
//       complete: (result) => {
//         const extractedEmails = result.data.map(row => row[2]).filter(email => email);
//         setEmails(extractedEmails);
//         setFormData({ ...formData, registeredStudents: extractedEmails });
//       }
//     });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         startTime: new Date(formData.startTime).toISOString(),
//         endTime: new Date(formData.endTime).toISOString(),
//         registeredStudents: emails
//       };

//       const response = await fetch(`http://localhost:5000/admin/event/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) throw new Error("Failed to update event");

//       const updatedEvent = await response.json();
//       setEvent(updatedEvent);
//       setEditMode(false);
//       alert("Event updated successfully!");
//     } catch (err) {
//       alert("Error updating event: " + err.message);
//     }
//   };

//   const handleAddEmail = async () => {
//     if (!newEmail) {
//         alert("Please enter an email address");
//         return;
//     }

//     if (emails.includes(newEmail)) {
//         alert("This student is already registered for the event");
//         return;
//     }

//     try {
//         const response = await fetch(`http://localhost:5000/students/email/${newEmail}`);
//         if (!response.ok) {
//             alert("Student not found");
//             return;
//         }

//         const registerResponse = await fetch("http://localhost:5000/students/register-to-event", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email: newEmail, eventId: id })  // Make sure 'id' is your event ID from useParams()
//         });

//         if (!registerResponse.ok) {
//             const errorData = await registerResponse.json();
//             alert("Failed to register student to event: " + errorData.error);
//             return;
//         }

//         setEmails([...emails, newEmail]);
//         setFormData({ ...formData, registeredStudents: [...emails, newEmail] });
//         setNewEmail("");
//     } catch (err) {
//         alert("Error adding student: " + err.message);
//     }
// };

// const handleRemoveEmail = async (email) => {
//   if (!window.confirm(`Are you sure you want to remove ${email}?`)) return;

//   try {
//       const response = await fetch("http://localhost:5000/students/remove-from-event", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, eventId: id })
//       });

//       if (!response.ok) {
//           const errorData = await response.json();
//           alert("Failed to remove student: " + errorData.error);
//           return;
//       }

//       setEmails(emails.filter(e => e !== email));
//       setFormData({ ...formData, registeredStudents: emails.filter(e => e !== email) });
//       alert(`${email} removed successfully.`);
//   } catch (err) {
//       alert("Error removing student: " + err.message);
//   }
// };

//   if (!event) return <p>Loading event details...</p>;

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold">{event.name}</h1>

//       {!editMode ? (
//         // READ Mode: Display Event Details
//         <div className="space-y-2 mt-4">
//           <p><strong>Description:</strong> {event.description}</p>
//           <p><strong>Start Time:</strong> {new Date(event.startTime).toLocaleString()}</p>
//           <p><strong>End Time:</strong> {new Date(event.endTime).toLocaleString()}</p>
//           <p><strong>Radius:</strong> {event.radius} meters</p>
//           <p><strong>Buffer Minutes:</strong> {event.bufferMinutes}</p>
//           <h3 className="font-bold mt-4">Registered Students:</h3>
//           <ul className="list-disc list-inside">
//             {event.registeredStudents.map((student) => (
//               <li key={student._id}>{student.fullName} {student.email}</li>
//             ))}
//           </ul>
//           <div className="mt-4">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2" onClick={() => setEditMode(true)}>
//               Edit Event
//             </button>

//             <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2" onClick={handleDelete}>
//               Delete Event
//             </button>

//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
//               onClick={() => navigate("/")}
//             >
//               Back to Events
//             </button>
//           </div>
//         </div>
//       ) : (
//         // EDIT Mode: Form to Edit Event
//         <form onSubmit={handleUpdate} className="mt-6 space-y-4">
//           <input type="text" name="name" vsalue={formData.name} onChange={handleChange} className="border p-2 w-full" />
//           <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full"></textarea>

//           <input type="datetime-local" name="startTime" value={new Date(formData.startTime).toISOString().slice(0, 16)} onChange={handleChange} className="border p-2 w-full" />
//           <input type="datetime-local" name="endTime" value={new Date(formData.endTime).toISOString().slice(0, 16)} onChange={handleChange} className="border p-2 w-full" />

//           <input type="number" name="radius" value={formData.radius} onChange={handleChange} className="border p-2 w-full" />
//           <input type="number" name="bufferMinutes" value={formData.bufferMinutes} onChange={handleChange} className="border p-2 w-full" />

//           <label className="block mt-2">
//             Upload New CSV (Optional):
//             <input type="file" accept=".csv" onChange={handleCSVUpload} className="border p-2 w-full" />
//           </label>

//           <h3 className="mt-4 font-bold">Registered Students</h3>
// <ul className="list-disc pl-5">
//     {emails.map((email, index) => (
//         <li key={index} className="flex justify-between items-center">
//             {email}
//             <button
//                 type="button"
//                 className="text-red-500 ml-4"
//                 onClick={() => handleRemoveEmail(email)}
//             >
//                 ❌
//             </button>
//         </li>
//     ))}
// </ul>

//           {/* New Input Field to Add Email Manually */}
//           <div className="flex mt-4 space-x-2">
//             <input
//               type="email"
//               placeholder="Add Student Email"
//               value={newEmail}
//               onChange={(e) => setNewEmail(e.target.value)}
//               className="border p-2 w-full"
//             />
//             <button type="button" onClick={handleAddEmail} className="bg-blue-500 text-white px-4 py-2 rounded">
//               Add
//             </button>
//           </div>

//           <div className="space-x-2 mt-4">
//             <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
//             <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setEditMode(false)}>Cancel</button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EventDetails;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import {
  Calendar,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Users,
  Plus,
  ArrowLeft,
  FileSpreadsheet,
  Save,
  X,
} from "lucide-react";

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
          registeredStudents: data.registeredStudents.map(
            (student) => student.email
          ),
        });
        setEmails(data.registeredStudents.map((student) => student.email));
      })
      .catch((err) => console.error("Failed to fetch event:", err));
  }, [id]);

  // ... (keep all existing handler functions)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const response = await fetch(`http://localhost:5000/admin/event/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete event");
      alert("Event deleted successfully!");
      navigate("/");
    } catch (err) {
      alert("Error deleting event: " + err.message);
    }
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        const extractedEmails = result.data
          .map((row) => row[2])
          .filter((email) => email);
        setEmails(extractedEmails);
        setFormData({ ...formData, registeredStudents: extractedEmails });
      },
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
        registeredStudents: emails,
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

  const handleAddEmail = async () => {
    if (!newEmail) {
      alert("Please enter an email address");
      return;
    }

    if (emails.includes(newEmail)) {
      alert("This student is already registered for the event");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/students/email/${newEmail}`
      );
      if (!response.ok) {
        alert("Student not found");
        return;
      }

      const registerResponse = await fetch(
        "http://localhost:5000/students/register-to-event",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: newEmail, eventId: id }), // Make sure 'id' is your event ID from useParams()
        }
      );

      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        alert("Failed to register student to event: " + errorData.error);
        return;
      }

      setEmails([...emails, newEmail]);
      setFormData({ ...formData, registeredStudents: [...emails, newEmail] });
      setNewEmail("");
    } catch (err) {
      alert("Error adding student: " + err.message);
    }
  };

  const handleRemoveEmail = async (email) => {
    if (!window.confirm(`Are you sure you want to remove ${email}?`)) return;

    try {
      const response = await fetch(
        "http://localhost:5000/students/remove-from-event",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, eventId: id }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        alert("Failed to remove student: " + errorData.error);
        return;
      }

      setEmails(emails.filter((e) => e !== email));
      setFormData({
        ...formData,
        registeredStudents: emails.filter((e) => e !== email),
      });
      alert(`${email} removed successfully.`);
    } catch (err) {
      alert("Error removing student: " + err.message);
    }
  };

  if (!event)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-blue-600">
          <Calendar size={48} className="mx-auto mb-4" />
          <p className="text-center">Loading event details...</p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="text-white" size={32} />
            <h1 className="text-2xl font-bold text-white">{event.name}</h1>
          </div>
          {!editMode && (
            <div className="flex space-x-2">
              <button
                onClick={() => setEditMode(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition flex items-center space-x-2"
              >
                <Edit size={20} />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition flex items-center space-x-2"
              >
                <Trash2 size={20} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        {!editMode ? (
          // READ Mode: Display Event Details
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Clock size={20} className="text-blue-500" />
                  <label className="font-semibold text-gray-700">
                    Start Time
                  </label>
                </div>
                <p>{new Date(event.startTime).toLocaleString()}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Clock size={20} className="text-blue-500" />
                  <label className="font-semibold text-gray-700">
                    End Time
                  </label>
                </div>
                <p>{new Date(event.endTime).toLocaleString()}</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin size={20} className="text-blue-500" />
                  <label className="font-semibold text-gray-700">Radius</label>
                </div>
                <p>{event.radius} meters</p>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Clock size={20} className="text-blue-500" />
                  <label className="font-semibold text-gray-700">
                    Buffer Minutes
                  </label>
                </div>
                <p>{event.bufferMinutes} minutes</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center space-x-2 mb-4">
                <Users size={20} className="text-blue-500" />
                <h3 className="font-semibold text-gray-700">
                  Registered Students
                </h3>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {event.registeredStudents.length}
                </span>
              </div>
              <ul className="divide-y divide-gray-200">
                {event.registeredStudents.map((student) => (
                  <li
                    key={student._id}
                    className="py-2 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{student.fullName}</p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition flex items-center space-x-2"
                onClick={() => navigate("/")}
              >
                <ArrowLeft size={20} />
                <span>Back to Events</span>
              </button>
            </div>
          </div>
        ) : (
          // EDIT Mode: Form to Edit Event
          <form onSubmit={handleUpdate} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">Event Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">
                  Radius (meters)
                </label>
                <input
                  type="number"
                  name="radius"
                  value={formData.radius}
                  onChange={handleChange}
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                rows="4"
              ></textarea>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">Start Time</label>
                <input
                  type="datetime-local"
                  name="startTime"
                  value={new Date(formData.startTime)
                    .toISOString()
                    .slice(0, 16)}
                  onChange={handleChange}
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">End Time</label>
                <input
                  type="datetime-local"
                  name="endTime"
                  value={new Date(formData.endTime).toISOString().slice(0, 16)}
                  onChange={handleChange}
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 font-semibold">
                  Buffer Minutes
                </label>
                <input
                  type="number"
                  name="bufferMinutes"
                  value={formData.bufferMinutes}
                  onChange={handleChange}
                  className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Upload CSV</label>
                <div className="flex items-center">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCSVUpload}
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 flex-1"
                  />
                  <FileSpreadsheet className="ml-2 text-blue-500" size={24} />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Users size={20} className="text-blue-500" />
                  <h3 className="font-semibold">Registered Students</h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {emails.length}
                  </span>
                </div>
              </div>

              <ul className="divide-y divide-gray-200 mb-4">
                {emails.map((email, index) => (
                  <li
                    key={index}
                    className="py-2 flex justify-between items-center"
                  >
                    <p>{email}</p>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full"
                      onClick={() => handleRemoveEmail(email)}
                    >
                      <X size={20} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Add Student Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="flex-1 border p-2 rounded focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddEmail}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add</span>
                </button>
              </div>
            </div>

            <div className="flex space-x-2 mt-6">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition flex items-center space-x-2"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition flex items-center space-x-2"
                onClick={() => setEditMode(false)}
              >
                <X size={20} />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
