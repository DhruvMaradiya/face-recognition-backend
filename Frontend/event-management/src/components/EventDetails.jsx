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













import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Papa from "papaparse";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [emails, setEmails] = useState([]);

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
      navigate("/"); // Redirect to event list
    } catch (err) {
      alert("Error deleting event: " + err.message);
    }
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
        registeredStudents: emails
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

      {!editMode ? (
        // READ Mode: Display Event Details
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
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2" onClick={() => setEditMode(true)}>
              Edit Event
            </button>

            <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2" onClick={handleDelete}>
              Delete Event
            </button>

            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
              onClick={() => navigate("/")}
            >
              Back to Events
            </button>

          </div>
        </div>
      ) : (
        // EDIT Mode: Form to Edit Event
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

