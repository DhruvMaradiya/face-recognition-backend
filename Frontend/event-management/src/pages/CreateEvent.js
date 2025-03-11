// import React, { useState } from "react";
// import axios from "axios";
// import Papa from "papaparse";
// import { useNavigate } from "react-router-dom";


// //? CreateEvent component
// const CreateEvent = () => {

//   // useNavigate hook 
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     startTime: "",
//     endTime: "",
//     radius: "",
//     bufferMinutes: 10,
//     creator: "",
//     latitude: "",
//     longitude: "",
//     registeredStudents: []
//   });
//   const [error, setError] = useState("");

//   const handleCSVUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     Papa.parse(file, {
//       complete: (result) => {
//         const emails = result.data
//           .slice(1) // Skip header row if exists
//           .map((row) => row[2]?.trim()) // Assuming email is in 3rd column
//           .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)); // Basic email validation

//         setFormData((prev) => ({
//           ...prev,
//           registeredStudents: [...new Set(emails)] // Remove duplicates
//         }));
//       },
//       header: false // Treat first row as data, not header
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const {
//       name, description, startTime, endTime,
//       latitude, longitude, radius
//     } = formData;

//     if (!name) return "Event name is required";
//     if (!description) return "Description is required";
//     if (!startTime) return "Start time is required";
//     if (!endTime) return "End time is required";
//     if (new Date(startTime) >= new Date(endTime)) return "End time must be after start time";
//     if (!latitude || !longitude) return "Location coordinates are required";
//     if (!radius) return "Event radius is required";

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     try {
//       const eventDetails = {
//         ...formData,
//         startTime: new Date(formData.startTime).toISOString(),
//         endTime: new Date(formData.endTime).toISOString(),
//         location: {
//           type: "Point",
//           coordinates: [
//             parseFloat(formData.longitude),
//             parseFloat(formData.latitude)
//           ]
//         }
//       };

//       // Remove unnecessary fields
//       delete eventDetails.latitude;
//       delete eventDetails.longitude;

//       await axios.post("http://localhost:5000/admin/createevent", eventDetails);
//       navigate("/");
//     } catch (error) {
//       console.error("Error creating event:", error);
//       setError("Failed to create event. Please try again.");
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
//         <div className="px-6 py-4 bg-yellow-400 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-white">Create New Event</h2>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//               {error}
//             </div>
//           )}

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                 Event Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter event name"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="creator" className="block text-sm font-medium text-gray-700 mb-2">
//                 Creator
//               </label>
//               <input
//                 type="text"
//                 id="creator"
//                 name="creator"
//                 value={formData.creator}
//                 onChange={handleChange}
//                 placeholder="Enter creator name"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Event description"
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               rows="4"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
//                 Start Time
//               </label>
//               <input
//                 type="datetime-local"
//                 id="startTime"
//                 name="startTime"
//                 value={formData.startTime}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
//                 End Time
//               </label>
//               <input
//                 type="datetime-local"
//                 id="endTime"
//                 name="endTime"
//                 value={formData.endTime}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-4">
//             <div>
//               <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-2">
//                 Latitude
//               </label>
//               <input
//                 type="number"
//                 id="latitude"
//                 name="latitude"
//                 step="any"
//                 value={formData.latitude}
//                 onChange={handleChange}
//                 placeholder="Latitude"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">
//                 Longitude
//               </label>
//               <input
//                 type="number"
//                 id="longitude"
//                 name="longitude"
//                 step="any"
//                 value={formData.longitude}
//                 onChange={handleChange}
//                 placeholder="Longitude"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//             <div>
//               <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-2">
//                 Radius (meters)
//               </label>
//               <input
//                 type="number"
//                 id="radius"
//                 name="radius"
//                 value={formData.radius}
//                 onChange={handleChange}
//                 placeholder="Event radius"
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label htmlFor="csvUpload" className="block text-sm font-medium text-gray-700 mb-2">
//               Upload Registered Students (CSV)
//             </label>
//             <input
//               type="file"
//               id="csvUpload"
//               accept=".csv"
//               onChange={handleCSVUpload}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label htmlFor="bufferMinutes" className="block text-sm font-medium text-gray-700 mb-2">
//               Buffer Minutes
//             </label>
//             <input
//               type="number"
//               id="bufferMinutes"
//               name="bufferMinutes"
//               value={formData.bufferMinutes}
//               onChange={handleChange}
//               min="0"
//               placeholder="Buffer minutes"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//             >
//               Create Event
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateEvent;










import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  FileSpreadsheet,
  Save,
  Edit,
  User // Added Edit icon
} from 'lucide-react';

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
  const [error, setError] = useState("");
  const [showTimePicker, setShowTimePicker] = useState({ start: false, end: false });

  // const handleCSVUpload = (event) => {
  //   const file = event.target.files[0];
  //   if (!file) return;

  //   Papa.parse(file, {
  //     complete: (result) => {
  //       const emails = result.data
  //         .slice(1)
  //         .map((row) => row[2]?.trim())
  //         .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

  //       setFormData((prev) => ({
  //         ...prev,
  //         registeredStudents: [...new Set(emails)]
  //       }));
  //     },
  //     header: false
  //   });
  // };



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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (type, time) => {
    setFormData(prev => ({ ...prev, [type]: time }));
    setShowTimePicker(prev => ({ ...prev, [type === "startTime" ? "start" : "end"]: false }));
  };

  const validateForm = () => {
    const { name, description, startTime, endTime, latitude, longitude, radius } = formData;
    if (!name) return "Event name is required";
    if (!description) return "Description is required";
    if (!startTime) return "Start time is required";
    if (!endTime) return "End time is required";
    if (new Date(startTime) >= new Date(endTime)) return "End time must be after start time";
    if (!latitude || !longitude) return "Location coordinates are required";
    if (!radius) return "Event radius is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const eventDetails = {
        ...formData,
        startTime: new Date(formData.startTime).toISOString(),
        endTime: new Date(formData.endTime).toISOString(),
        location: {
          type: "Point",
          coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)]
        }
      };

      delete eventDetails.latitude;
      delete eventDetails.longitude;

      await axios.post("http://localhost:5000/admin/createevent", eventDetails);
      navigate("/");
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Failed to create event. Please try again.");
    }
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

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-[#58585a]/20">
        <div className="bg-[#054e85] p-6 flex items-center space-x-4">
          <Calendar className="text-white" size={32} />
          <h2 className="text-2xl font-bold text-white">Create New Event</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Event Name" name="name" value={formData.name} onChange={handleChange} icon={<Calendar className="text-[#054e85]" />} required />
            <InputField label="Creator" name="creator" value={formData.creator} onChange={handleChange} icon={<User className="text-[#054e85]" />} />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
              <Edit size={20} className="text-[#054e85]" /> {/* Fixed: Now using Edit */}
              <span>Description</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Event description"
              required
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField label="Latitude" name="latitude" type="number" step="any" value={formData.latitude} onChange={handleChange} icon={<MapPin className="text-[#054e85]" />} required />
            <InputField label="Longitude" name="longitude" type="number" step="any" value={formData.longitude} onChange={handleChange} icon={<MapPin className="text-[#054e85]" />} required />
            <InputField label="Radius (meters)" name="radius" type="number" value={formData.radius} onChange={handleChange} icon={<MapPin className="text-[#054e85]" />} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
              <FileSpreadsheet size={20} className="text-[#054e85]" /> {/* Used FileSpreadsheet */}
              <span>Upload Registered Students (CSV)</span>
            </label>
            <input
              type="file"
              id="csvUpload"
              accept=".csv"
              onChange={handleCSVUpload}
              className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:bg-[#fece00] file:text-[#054e85] hover:file:bg-[#fece00]/80 transition-colors duration-300"
            />
            {formData.registeredStudents.length > 0 && (
              <p className="mt-2 text-sm text-[#58585a]/80">{formData.registeredStudents.length} students uploaded</p>
            )}
          </div>

          <InputField label="Buffer Minutes" name="bufferMinutes" type="number" value={formData.bufferMinutes} onChange={handleChange} icon={<Clock className="text-[#054e85]" />} min="0" />

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#fece00] text-[#054e85] px-5 py-2 rounded-lg hover:bg-[#fece00]/80 transition-colors duration-300 flex items-center space-x-2 font-medium"
            >
              <Save size={20} />
              <span>Create Event</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Helper Component
const InputField = ({ label, name, type = "text", value, onChange, icon, required, min, step }) => (
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
      step={step}
      className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all duration-300"
    />
  </div>
);

export default CreateEvent;