// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Papa from "papaparse";
// import {
//   Calendar,
//   Edit,
//   Trash2,
//   MapPin,
//   Clock,
//   Users,
//   Plus,
//   ArrowLeft,
//   FileSpreadsheet,
//   Save,
//   X,
// } from "lucide-react";

// const EventDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [event, setEvent] = useState(null);
//   const [formData, setFormData] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [emails, setEmails] = useState([]);
//   const [newEmail, setNewEmail] = useState("");

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
//           registeredStudents: data.registeredStudents.map(
//             (student) => student.email
//           ),
//         });
//         setEmails(data.registeredStudents.map((student) => student.email));
//       })
//       .catch((err) => console.error("Failed to fetch event:", err));
//   }, [id]);

//   // ... (keep all existing handler functions)

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
//         const extractedEmails = result.data
//           .map((row) => row[2])
//           .filter((email) => email);
//         setEmails(extractedEmails);
//         setFormData({ ...formData, registeredStudents: extractedEmails });
//       },
//     });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         startTime: new Date(formData.startTime).toISOString(),
//         endTime: new Date(formData.endTime).toISOString(),
//         registeredStudents: emails,
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
//       alert("Please enter an email address");
//       return;
//     }

//     if (emails.includes(newEmail)) {
//       alert("This student is already registered for the event");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:5000/students/email/${newEmail}`
//       );
//       if (!response.ok) {
//         alert("Student not found");
//         return;
//       }

//       const registerResponse = await fetch(
//         "http://localhost:5000/students/register-to-event",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email: newEmail, eventId: id }), // Make sure 'id' is your event ID from useParams()
//         }
//       );

//       if (!registerResponse.ok) {
//         const errorData = await registerResponse.json();
//         alert("Failed to register student to event: " + errorData.error);
//         return;
//       }

//       setEmails([...emails, newEmail]);
//       setFormData({ ...formData, registeredStudents: [...emails, newEmail] });
//       setNewEmail("");
//     } catch (err) {
//       alert("Error adding student: " + err.message);
//     }
//   };

//   const handleRemoveEmail = async (email) => {
//     if (!window.confirm(`Are you sure you want to remove ${email}?`)) return;

//     try {
//       const response = await fetch(
//         "http://localhost:5000/students/remove-from-event",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, eventId: id }),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         alert("Failed to remove student: " + errorData.error);
//         return;
//       }

//       setEmails(emails.filter((e) => e !== email));
//       setFormData({
//         ...formData,
//         registeredStudents: emails.filter((e) => e !== email),
//       });
//       alert(`${email} removed successfully.`);
//     } catch (err) {
//       alert("Error removing student: " + err.message);
//     }
//   };

//   if (!event)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-pulse text-blue-600">
//           <Calendar size={48} className="mx-auto mb-4" />
//           <p className="text-center">Loading event details...</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-3xl">
//       <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 p-6 flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Calendar className="text-white" size={32} />
//             <h1 className="text-2xl font-bold text-white">{event.name}</h1>
//           </div>
//           {!editMode && (
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setEditMode(true)}
//                 className="bg-white text-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition flex items-center space-x-2"
//               >
//                 <Edit size={20} />
//                 <span>Edit</span>
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition flex items-center space-x-2"
//               >
//                 <Trash2 size={20} />
//                 <span>Delete</span>
//               </button>
//             </div>
//           )}
//         </div>

//         {!editMode ? (
//           // READ Mode: Display Event Details
//           <div className="p-6">
//             <div className="grid md:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <div className="flex items-center space-x-2 mb-2">
//                   <Clock size={20} className="text-blue-500" />
//                   <label className="font-semibold text-gray-700">
//                     Start Time
//                   </label>
//                 </div>
//                 <p>{new Date(event.startTime).toLocaleString()}</p>
//               </div>
//               <div>
//                 <div className="flex items-center space-x-2 mb-2">
//                   <Clock size={20} className="text-blue-500" />
//                   <label className="font-semibold text-gray-700">
//                     End Time
//                   </label>
//                 </div>
//                 <p>{new Date(event.endTime).toLocaleString()}</p>
//               </div>
//               <div>
//                 <div className="flex items-center space-x-2 mb-2">
//                   <MapPin size={20} className="text-blue-500" />
//                   <label className="font-semibold text-gray-700">Radius</label>
//                 </div>
//                 <p>{event.radius} meters</p>
//               </div>
//               <div>
//                 <div className="flex items-center space-x-2 mb-2">
//                   <Clock size={20} className="text-blue-500" />
//                   <label className="font-semibold text-gray-700">
//                     Buffer Minutes
//                   </label>
//                 </div>
//                 <p>{event.bufferMinutes} minutes</p>
//               </div>
//             </div>

//             <div className="border-t pt-4">
//               <div className="flex items-center space-x-2 mb-4">
//                 <Users size={20} className="text-blue-500" />
//                 <h3 className="font-semibold text-gray-700">
//                   Registered Students
//                 </h3>
//                 <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
//                   {event.registeredStudents.length}
//                 </span>
//               </div>
//               <ul className="divide-y divide-gray-200">
//                 {event.registeredStudents.map((student) => (
//                   <li
//                     key={student._id}
//                     className="py-2 flex justify-between items-center"
//                   >
//                     <div>
//                       <p className="font-medium">{student.fullName}</p>
//                       <p className="text-sm text-gray-600">{student.email}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="mt-6 flex space-x-2">
//               <button
//                 className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition flex items-center space-x-2"
//                 onClick={() => navigate("/")}
//               >
//                 <ArrowLeft size={20} />
//                 <span>Back to Events</span>
//               </button>
//             </div>
//           </div>
//         ) : (
//           // EDIT Mode: Form to Edit Event
//           <form onSubmit={handleUpdate} className="p-6 space-y-6">
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-2 font-semibold">Event Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2 font-semibold">
//                   Radius (meters)
//                 </label>
//                 <input
//                   type="number"
//                   name="radius"
//                   value={formData.radius}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-2 font-semibold">Description</label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
//                 rows="4"
//               ></textarea>
//             </div>

//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-2 font-semibold">Start Time</label>
//                 <input
//                   type="datetime-local"
//                   name="startTime"
//                   value={new Date(formData.startTime)
//                     .toISOString()
//                     .slice(0, 16)}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2 font-semibold">End Time</label>
//                 <input
//                   type="datetime-local"
//                   name="endTime"
//                   value={new Date(formData.endTime).toISOString().slice(0, 16)}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//             </div>

//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block mb-2 font-semibold">
//                   Buffer Minutes
//                 </label>
//                 <input
//                   type="number"
//                   name="bufferMinutes"
//                   value={formData.bufferMinutes}
//                   onChange={handleChange}
//                   className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2 font-semibold">Upload CSV</label>
//                 <div className="flex items-center">
//                   <input
//                     type="file"
//                     accept=".csv"
//                     onChange={handleCSVUpload}
//                     className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 flex-1"
//                   />
//                   <FileSpreadsheet className="ml-2 text-blue-500" size={24} />
//                 </div>
//               </div>
//             </div>

//             <div className="border-t pt-4">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center space-x-2">
//                   <Users size={20} className="text-blue-500" />
//                   <h3 className="font-semibold">Registered Students</h3>
//                   <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
//                     {emails.length}
//                   </span>
//                 </div>
//               </div>

//               <ul className="divide-y divide-gray-200 mb-4">
//                 {emails.map((email, index) => (
//                   <li
//                     key={index}
//                     className="py-2 flex justify-between items-center"
//                   >
//                     <p>{email}</p>
//                     <button
//                       type="button"
//                       className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full"
//                       onClick={() => handleRemoveEmail(email)}
//                     >
//                       <X size={20} />
//                     </button>
//                   </li>
//                 ))}
//               </ul>

//               <div className="flex space-x-2">
//                 <input
//                   type="email"
//                   placeholder="Add Student Email"
//                   value={newEmail}
//                   onChange={(e) => setNewEmail(e.target.value)}
//                   className="flex-1 border p-2 rounded focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button
//                   type="button"
//                   onClick={handleAddEmail}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition flex items-center space-x-2"
//                 >
//                   <Plus size={20} />
//                   <span>Add</span>
//                 </button>
//               </div>
//             </div>

//             <div className="flex space-x-2 mt-6">
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition flex items-center space-x-2"
//               >
//                 <Save size={20} />
//                 <span>Save Changes</span>
//               </button>
//               <button
//                 type="button"
//                 className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition flex items-center space-x-2"
//                 onClick={() => setEditMode(false)}
//               >
//                 <X size={20} />
//                 <span>Cancel</span>
//               </button>
//             </div>
//           </form>
//         )}
//       </div>
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
  const [showTimePicker, setShowTimePicker] = useState({ start: false, end: false });

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
          registeredStudents: data.registeredStudents.map((student) => student.email),
        });
        setEmails(data.registeredStudents.map((student) => student.email));
      })
      .catch((err) => console.error("Failed to fetch event:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (type, time) => {
    setFormData(prev => ({ ...prev, [type]: time }));
    setShowTimePicker(prev => ({ ...prev, [type === "startTime" ? "start" : "end"]: false }));
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
    // ... (keep existing handleAddEmail function)
  };

  const handleRemoveEmail = async (email) => {
    // ... (keep existing handleRemoveEmail function)
  };

  const TimePicker = ({ type, value, onChange }) => {
    const [date, setDate] = useState(value ? new Date(value) : new Date());
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    const handleSave = () => {
      const newTime = `${date.toISOString().split('T')[0]}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:00`;
      onChange(type, newTime);
    };

    return (
      <div className="absolute z-10 bg-white border border-[#58585a]/20 rounded-lg shadow-lg p-4 mt-2">
        <input
          type="date"
          value={date.toISOString().split('T')[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="mb-2 w-full px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            value={date.getHours().toString().padStart(2, '0')}
            onChange={(e) => setDate(new Date(date.setHours(parseInt(e.target.value))))}
            className="px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
          >
            {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
          </select>
          <select
            value={date.getMinutes().toString().padStart(2, '0')}
            onChange={(e) => setDate(new Date(date.setMinutes(parseInt(e.target.value))))}
            className="px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
          >
            {minutes.map(min => <option key={min} value={min}>{min}</option>)}
          </select>
        </div>
        <button
          onClick={handleSave}
          className="mt-2 w-full bg-[#fece00] text-[#054e85] px-3 py-1 rounded-md hover:bg-[#fece00]/80 transition-colors duration-300"
        >
          Set Time
        </button>
      </div>
    );
  };

  const InputField = ({ label, name, type = "text", value, onChange, icon, required, min }) => (
    <div>
      <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
        {icon}
        <span>{label}</span>
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        required={required}
        min={min}
        className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all duration-300"
      />
    </div>
  );

  if (!event) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-pulse text-[#054e85]">
        <Calendar size={48} className="mx-auto mb-4" />
        <p className="text-center">Loading event details...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-[#58585a]/20">
        <div className="bg-[#054e85] p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="text-white" size={32} />
            <h1 className="text-2xl font-bold text-white">{event.name}</h1>
          </div>
          {!editMode && (
            <div className="flex space-x-2">
              <button
                onClick={() => setEditMode(true)}
                className="bg-[#fece00] text-[#054e85] px-4 py-2 rounded-lg hover:bg-[#fece00]/80 transition flex items-center space-x-2"
              >
                <Edit size={20} />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center space-x-2"
              >
                <Trash2 size={20} />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        {!editMode ? (
          <div className="p-6">
            {/* ... (keep existing read mode display) */}
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Event Name" name="name" value={formData.name} onChange={handleChange} icon={<Calendar className="text-[#054e85]" />} required />
              <InputField label="Radius (meters)" name="radius" type="number" value={formData.radius} onChange={handleChange} icon={<MapPin className="text-[#054e85]" />} required />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
                <Edit size={20} className="text-[#054e85]" />
                <span>Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Event description"
                className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all duration-300"
                rows="4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <div className="relative">
                <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
                  <Clock size={20} className="text-[#054e85]" />
                  <span>Start Time</span>
                </label>
                <div
                  className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg cursor-pointer flex items-center justify-between hover:bg-[#054e85]/5 transition-colors duration-300"
                  onClick={() => setShowTimePicker(prev => ({ ...prev, start: !prev.start }))}
                >
                  <span>{formData.startTime ? new Date(formData.startTime).toLocaleString() : "Set start time"}</span>
                  <Clock size={16} className="text-[#054e85]" />
                </div>
                {showTimePicker.start && (
                  <TimePicker type="startTime" value={formData.startTime} onChange={handleTimeChange} />
                )}
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
                  <Clock size={20} className="text-[#054e85]" />
                  <span>End Time</span>
                </label>
                <div
                  className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg cursor-pointer flex items-center justify-between hover:bg-[#054e85]/5 transition-colors duration-300"
                  onClick={() => setShowTimePicker(prev => ({ ...prev, end: !prev.end }))}
                >
                  <span>{formData.endTime ? new Date(formData.endTime).toLocaleString() : "Set end time"}</span>
                  <Clock size={16} className="text-[#054e85]" />
                </div>
                {showTimePicker.end && (
                  <TimePicker type="endTime" value={formData.endTime} onChange={handleTimeChange} />
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Buffer Minutes" name="bufferMinutes" type="number" value={formData.bufferMinutes} onChange={handleChange} icon={<Clock className="text-[#054e85]" />} min="0" />
              <div>
                <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
                  <FileSpreadsheet size={20} className="text-[#054e85]" />
                  <span>Upload Registered Students (CSV)</span>
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:bg-[#fece00] file:text-[#054e85] hover:file:bg-[#fece00]/80 transition-colors duration-300"
                />
              </div>
            </div>

            <div className="border-t border-[#58585a]/20 pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Users size={20} className="text-[#054e85]" />
                  <h3 className="font-semibold text-[#58585a]">Registered Students</h3>
                  <span className="bg-[#fece00]/20 text-[#054e85] px-2 py-1 rounded-full text-xs">
                    {emails.length}
                  </span>
                </div>
              </div>

              <ul className="divide-y divide-[#58585a]/20 mb-4">
                {emails.map((email, index) => (
                  <li key={index} className="py-2 flex justify-between items-center">
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
                  className="flex-1 px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85]"
                />
                <button
                  type="button"
                  onClick={handleAddEmail}
                  className="bg-[#fece00] text-[#054e85] px-4 py-2 rounded-lg hover:bg-[#fece00]/80 transition flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-[#fece00] text-[#054e85] px-5 py-2 rounded-lg hover:bg-[#fece00]/80 transition-colors duration-300 flex items-center space-x-2 font-medium"
              >
                <Save size={20} />
                <span>Save Changes</span>
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 transition flex items-center space-x-2"
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