
// import React, { useState } from "react";
// import axios from "axios";
// import Papa from "papaparse";
// import { useNavigate } from "react-router-dom";
// import {
//   Calendar,
//   Clock,
//   MapPin,
//   FileSpreadsheet,
//   Save,
//   Edit,
//   User // Added Edit icon
// } from 'lucide-react';

// const CreateEvent = () => {
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
//   const [showTimePicker, setShowTimePicker] = useState({ start: false, end: false });

//   // const handleCSVUpload = (event) => {
//   //   const file = event.target.files[0];
//   //   if (!file) return;

//   //   Papa.parse(file, {
//   //     complete: (result) => {
//   //       const emails = result.data
//   //         .slice(1)
//   //         .map((row) => row[2]?.trim())
//   //         .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

//   //       setFormData((prev) => ({
//   //         ...prev,
//   //         registeredStudents: [...new Set(emails)]
//   //       }));
//   //     },
//   //     header: false
//   //   });
//   // };



//   const handleCSVUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     Papa.parse(file, {
//         complete: (result) => {
//             const emails = result.data.map((row) => row[2]).filter(email => email);
//             setFormData((prev) => ({ ...prev, registeredStudents: emails }));
//         },
//     });
// };


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTimeChange = (type, time) => {
//     setFormData(prev => ({ ...prev, [type]: time }));
//     setShowTimePicker(prev => ({ ...prev, [type === "startTime" ? "start" : "end"]: false }));
//   };

//   const validateForm = () => {
//     const { name, description, startTime, endTime, latitude, longitude, radius } = formData;
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
//           coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)]
//         }
//       };

//       delete eventDetails.latitude;
//       delete eventDetails.longitude;

//       await axios.post("http://localhost:5000/admin/createevent", eventDetails);
//       navigate("/");
//     } catch (error) {
//       console.error("Error creating event:", error);
//       console.log(error)
//       setError("Failed to create event. Please try again.");
//     }
//   };

//   const TimePicker = ({ type, value, onChange }) => {
//     const [date, setDate] = useState(value ? new Date(value) : new Date());
//     const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
//     const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

//     const handleSave = () => {
//       const newTime = `${date.toISOString().split('T')[0]}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:00`;
//       onChange(type, newTime);
//     };

//     return (
//       <div className="absolute z-10 bg-white border border-[#58585a]/20 rounded-lg shadow-lg p-4 mt-2">
//         <input
//           type="date"
//           value={date.toISOString().split('T')[0]}
//           onChange={(e) => setDate(new Date(e.target.value))}
//           className="mb-2 w-full px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
//         />
//         <div className="grid grid-cols-2 gap-2">
//           <select
//             value={date.getHours().toString().padStart(2, '0')}
//             onChange={(e) => setDate(new Date(date.setHours(parseInt(e.target.value))))}
//             className="px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
//           >
//             {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
//           </select>
//           <select
//             value={date.getMinutes().toString().padStart(2, '0')}
//             onChange={(e) => setDate(new Date(date.setMinutes(parseInt(e.target.value))))}
//             className="px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
//           >
//             {minutes.map(min => <option key={min} value={min}>{min}</option>)}
//           </select>
//         </div>
//         <button
//           onClick={handleSave}
//           className="mt-2 w-full bg-[#fece00] text-[#054e85] px-3 py-1 rounded-md hover:bg-[#fece00]/80 transition-colors duration-300"
//         >
//           Set Time
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-[#58585a]/20">
//         <div className="bg-[#054e85] p-6 flex items-center space-x-4">
//           <Calendar className="text-white" size={32} />
//           <h2 className="text-2xl font-bold text-white">Create New Event</h2>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
//               <span>{error}</span>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <InputField label="Event Name" name="name" value={formData.name} onChange={handleChange} icon={<Calendar className="text-[#054e85]" />} required />
//             <InputField label="Creator" name="creator" value={formData.creator} onChange={handleChange} icon={<User className="text-[#054e85]" />} />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//               <Edit size={20} className="text-[#054e85]" /> {/* Fixed: Now using Edit */}
//               <span>Description</span>
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Event description"
//               required
//               className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all duration-300"
//               rows="4"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
//             <div className="relative">
//               <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//                 <Clock size={20} className="text-[#054e85]" />
//                 <span>Start Time</span>
//               </label>
//               <div
//                 className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg cursor-pointer flex items-center justify-between hover:bg-[#054e85]/5 transition-colors duration-300"
//                 onClick={() => setShowTimePicker(prev => ({ ...prev, start: !prev.start }))}
//               >
//                 <span>{formData.startTime ? new Date(formData.startTime).toLocaleString() : "Set start time"}</span>
//                 <Clock size={16} className="text-[#054e85]" />
//               </div>
//               {showTimePicker.start && (
//                 <TimePicker type="startTime" value={formData.startTime} onChange={handleTimeChange} />
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//                 <Clock size={20} className="text-[#054e85]" />
//                 <span>End Time</span>
//               </label>
//               <div
//                 className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg cursor-pointer flex items-center justify-between hover:bg-[#054e85]/5 transition-colors duration-300"
//                 onClick={() => setShowTimePicker(prev => ({ ...prev, end: !prev.end }))}
//               >
//                 <span>{formData.endTime ? new Date(formData.endTime).toLocaleString() : "Set end time"}</span>
//                 <Clock size={16} className="text-[#054e85]" />
//               </div>
//               {showTimePicker.end && (
//                 <TimePicker type="endTime" value={formData.endTime} onChange={handleTimeChange} />
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <InputField label="Latitude" name="latitude" type="number" step="any" value={formData.latitude} onChange={handleChange} icon={<MapPin className="text-[#054e85]" />} required />
//             <InputField label="Longitude" name="longitude" type="number" step="any" value={formData.longitude} onChange={handleChange} icon={<MapPin className="text-[#054e85]" />} required />
//             <InputField label="Radius (meters)" name="radius" type="number" value={formData.radius} onChange={handleChange} icon={<MapPin className="text-[#054e85]" />} required />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//               <FileSpreadsheet size={20} className="text-[#054e85]" /> {/* Used FileSpreadsheet */}
//               <span>Upload Registered Students (CSV)</span>
//             </label>
//             <input
//               type="file"
//               id="csvUpload"
//               accept=".csv"
//               onChange={handleCSVUpload}
//               className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:bg-[#fece00] file:text-[#054e85] hover:file:bg-[#fece00]/80 transition-colors duration-300"
//             />
//             {formData.registeredStudents.length > 0 && (
//               <p className="mt-2 text-sm text-[#58585a]/80">{formData.registeredStudents.length} students uploaded</p>
//             )}
//           </div>

//           <InputField label="Buffer Minutes" name="bufferMinutes" type="number" value={formData.bufferMinutes} onChange={handleChange} icon={<Clock className="text-[#054e85]" />} min="0" />

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="bg-[#fece00] text-[#054e85] px-5 py-2 rounded-lg hover:bg-[#fece00]/80 transition-colors duration-300 flex items-center space-x-2 font-medium"
//             >
//               <Save size={20} />
//               <span>Create Event</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Helper Component
// const InputField = ({ label, name, type = "text", value, onChange, icon, required, min, step }) => (
//   <div>
//     <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//       {icon}
//       <span>{label}</span>
//     </label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={label}
//       required={required}
//       min={min}
//       step={step}
//       className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all duration-300"
//     />
//   </div>
// );

// export default CreateEvent;

// import React, { useState } from "react";
// import axios from "axios";
// import Papa from "papaparse";
// import { useNavigate } from "react-router-dom";
// import {
//   Calendar,
//   Clock,
//   MapPin,
//   FileSpreadsheet,
//   Save,
//   Edit,
//   User
// } from 'lucide-react';

// const CreateEvent = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     startTime: "",
//     endTime: "",
//     radius: 10, // Default radius set to 10
//     bufferMinutes: 10, // Default buffer minutes set to 10
//     creator: "",
//     latitude: "",
//     longitude: "",
//     registeredStudents: [],
//     locationName: "" // New field for dropdown selection
//   });
//   const [error, setError] = useState("");
//   const [showTimePicker, setShowTimePicker] = useState({ start: false, end: false });
//   const [startPeriod, setStartPeriod] = useState("AM");
//   const [endPeriod, setEndPeriod] = useState("AM");
//   const [notFoundStudents, setNotFoundStudents] = useState([]);

//   const locations = [
//     { name: "300 Ouellette", lat: 42.3173202, lon: -83.03854756613467 },
//     { name: "Lambton Tower", lat: 42.3054306, lon: -83.06543525186542 },
//     { name: "Erie Hall", lat: 42.3051429, lon: -83.06530275686814 }
//   ];

//   const handleLocationChange = (e) => {
//     const selectedLocation = locations.find(loc => loc.name === e.target.value);
//     setFormData(prev => ({
//       ...prev,
//       locationName: e.target.value,
//       latitude: selectedLocation ? selectedLocation.lat : "",
//       longitude: selectedLocation ? selectedLocation.lon : ""
//     }));
//   };

//   const handleCSVUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     Papa.parse(file, {
//       complete: (result) => {
//         const emails = result.data
//           .map((row) => row[2]?.trim())
//           .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

//         // Simulate checking against backend (for UI purposes only)
//         // In reality, the backend will filter these
//         setFormData(prev => ({ ...prev, registeredStudents: emails }));
//         // Simulate not found students (e.g., emails not in DB)
//         // This is just for UI; backend will handle actual validation
//         setNotFoundStudents([]); // Placeholder; backend will determine this
//       },
//       header: false
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTimeChange = (type, time, period) => {
//     setFormData(prev => ({ ...prev, [type]: time }));
//     if (type === "startTime") setStartPeriod(period);
//     if (type === "endTime") setEndPeriod(period);
//     setShowTimePicker(prev => ({ ...prev, [type === "startTime" ? "start" : "end"]: false }));
//   };

//   const validateForm = () => {
//     const { name, description, startTime, endTime, latitude, longitude, radius } = formData;
//     if (!name) return "Event name is required";
//     if (!description) return "Description is required";
//     if (!startTime) return "Start time is required";
//     if (!endTime) return "End time is required";
//     if (new Date(startTime) >= new Date(endTime)) return "End time must be after start time";
//     if (!latitude || !longitude) return "Location selection is required";
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
//           coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)]
//         },
//         radius: parseInt(formData.radius, 10), // Ensure radius is a number
//         bufferMinutes: parseInt(formData.bufferMinutes, 10) // Ensure bufferMinutes is a number
//       };

//       delete eventDetails.latitude;
//       delete eventDetails.longitude;
//       delete eventDetails.locationName;

//       const response = await axios.post("http://localhost:5000/admin/createevent", eventDetails);
//       navigate("/");
//     } catch (error) {
//       console.error("Error creating event:", error);
//       setError("Failed to create event: " + (error.response?.data?.error || error.message));
//     }
//   };

//   const TimePicker = ({ type, value, onChange }) => {
//     const [date, setDate] = useState(value ? new Date(value) : new Date());
//     const [period, setPeriod] = useState("AM");
//     const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
//     const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

//     const handleSave = () => {
//       let hour = parseInt(date.getHours());
//       if (period === "PM" && hour < 12) hour += 12;
//       if (period === "AM" && hour === 12) hour = 0;
//       const newTime = `${date.toISOString().split('T')[0]}T${hour.toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:00`;
//       onChange(type, newTime, period);
//     };

//     return (
//       <div className="absolute z-10 bg-white border border-[#58585a]/20 rounded-lg shadow-lg p-4 mt-2">
//         <input
//           type="date"
//           value={date.toISOString().split('T')[0]}
//           onChange={(e) => setDate(new Date(e.target.value))}
//           className="mb-2 w-full px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
//         />
//         <div className="grid grid-cols-3 gap-2">
//           <select
//             value={date.getHours() % 12 || 12}
//             onChange={(e) => {
//               let h = parseInt(e.target.value);
//               if (period === "PM" && h < 12) h += 12;
//               if (period === "AM" && h === 12) h = 0;
//               setDate(new Date(date.setHours(h)));
//             }}
//             className="px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
//           >
//             {hours.map(hour => <option key={hour} value={hour}>{hour}</option>)}
//           </select>
//           <select
//             value={date.getMinutes().toString().padStart(2, '0')}
//             onChange={(e) => setDate(new Date(date.setMinutes(parseInt(e.target.value))))}
//             className="px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
//           >
//             {minutes.map(min => <option key={min} value={min}>{min}</option>)}
//           </select>
//           <div className="flex space-x-2">
//             <button
//               type="button"
//               onClick={() => setPeriod("AM")}
//               className={`px-2 py-1 rounded-md ${period === "AM" ? "bg-[#054e85] text-white" : "bg-gray-200 text-[#58585a]"}`}
//             >
//               AM
//             </button>
//             <button
//               type="button"
//               onClick={() => setPeriod("PM")}
//               className={`px-2 py-1 rounded-md ${period === "PM" ? "bg-black text-white" : "bg-gray-200 text-[#58585a]"}`}
//             >
//               PM
//             </button>
//           </div>
//         </div>
//         <button
//           onClick={handleSave}
//           className="mt-2 w-full bg-[#fece00] text-[#054e85] px-3 py-1 rounded-md hover:bg-[#fece00]/80 transition-colors duration-300"
//         >
//           Set Time
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-[#58585a]/20">
//         <div className="bg-[#054e85] p-6 flex items-center space-x-4">
//           <Calendar className="text-white" size={32} />
//           <h2 className="text-2xl font-bold text-white">Create New Event</h2>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
//               <span>{error}</span>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <InputField label="Event Name" name="name" value={formData.name} onChange={handleChange} icon={<Calendar className="text-[#054e85]" />} required />
//             <InputField label="Creator" name="creator" value={formData.creator} onChange={handleChange} icon={<User className="text-[#054e85]" />} />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//               <Edit size={20} className="text-[#054e85]" />
//               <span>Description</span>
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Event description"
//               required
//               className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all duration-300"
//               rows="4"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
//             <div className="relative">
//               <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//                 <Clock size={20} className={startPeriod === "AM" ? "text-white" : "text-black"} style={{ backgroundColor: startPeriod === "AM" ? "#054e85" : "transparent", padding: "2px", borderRadius: "4px" }} />
//                 <span>Start Time</span>
//               </label>
//               <div
//                 className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg cursor-pointer flex items-center justify-between hover:bg-[#054e85]/5 transition-colors duration-300"
//                 onClick={() => setShowTimePicker(prev => ({ ...prev, start: !prev.start }))}
//               >
//                 <span>{formData.startTime ? new Date(formData.startTime).toLocaleString() : "Set start time"}</span>
//                 <Clock size={16} className="text-[#054e85]" />
//               </div>
//               {showTimePicker.start && (
//                 <TimePicker type="startTime" value={formData.startTime} onChange={handleTimeChange} />
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//                 <Clock size={20} className={endPeriod === "AM" ? "text-white" : "text-black"} style={{ backgroundColor: endPeriod === "AM" ? "#054e85" : "transparent", padding: "2px", borderRadius: "4px" }} />
//                 <span>End Time</span>
//               </label>
//               <div
//                 className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg cursor-pointer flex items-center justify-between hover:bg-[#054e85]/5 transition-colors duration-300"
//                 onClick={() => setShowTimePicker(prev => ({ ...prev, end: !prev.end }))}
//               >
//                 <span>{formData.endTime ? new Date(formData.endTime).toLocaleString() : "Set end time"}</span>
//                 <Clock size={16} className="text-[#054e85]" />
//               </div>
//               {showTimePicker.end && (
//                 <TimePicker type="endTime" value={formData.endTime} onChange={handleTimeChange} />
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//                 <MapPin size={20} className="text-[#054e85]" />
//                 <span>Location</span>
//               </label>
//               <select
//                 name="locationName"
//                 value={formData.locationName}
//                 onChange={handleLocationChange}
//                 className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all duration-300"
//                 required
//               >
//                 <option value="">Select a location</option>
//                 {locations.map(loc => (
//                   <option key={loc.name} value={loc.name}>{loc.name}</option>
//                 ))}
//               </select>
//             </div>
//             <InputField label="Radius (meters)" name="radius" type="number" value={formData.radius} onChange={handleChange} icon={<MapPin className="text-[#054e85]" />} required />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//               <FileSpreadsheet size={20} className="text-[#054e85]" />
//               <span>Upload Registered Students (CSV)</span>
//             </label>
//             <input
//               type="file"
//               id="csvUpload"
//               accept=".csv"
//               onChange={handleCSVUpload}
//               className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:bg-[#fece00] file:text-[#054e85] hover:file:bg-[#fece00]/80 transition-colors duration-300"
//             />
//             {formData.registeredStudents.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-sm font-medium text-[#58585a]">Found Students ({formData.registeredStudents.length})</h3>
//                 <ul className="max-h-32 overflow-y-auto border border-[#58585a]/20 rounded-lg mt-2">
//                   {formData.registeredStudents.map((email, index) => (
//                     <li key={index} className="py-2 px-4 text-[#58585a]">{email}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {notFoundStudents.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-sm font-medium text-red-600">Students Not Found ({notFoundStudents.length})</h3>
//                 <ul className="max-h-32 overflow-y-auto border border-red-200 rounded-lg mt-2">
//                   {notFoundStudents.map((email, index) => (
//                     <li key={index} className="py-2 px-4 text-red-600">{email}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           <InputField label="Buffer Minutes" name="bufferMinutes" type="number" value={formData.bufferMinutes} onChange={handleChange} icon={<Clock className="text-[#054e85]" />} min="0" />

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="bg-[#fece00] text-[#054e85] px-5 py-2 rounded-lg hover:bg-[#fece00]/80 transition-colors duration-300 flex items-center space-x-2 font-medium"
//             >
//               <Save size={20} />
//               <span>Create Event</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Helper Component
// const InputField = ({ label, name, type = "text", value, onChange, icon, required, min, step }) => (
//   <div>
//     <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//       {icon}
//       <span>{label}</span>
//     </label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={label}
//       required={required}
//       min={min}
//       step={step}
//       className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all duration-300"
//     />
//   </div>
// );

// export default CreateEvent;




import React, { useState, useEffect } from "react";
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
  User
} from 'lucide-react';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    radius: 10,
    bufferMinutes: 10,
    creator: "",
    latitude: "",
    longitude: "",
    registeredStudents: [],
    locationName: ""
  });
  const [error, setError] = useState("");
  const [showTimePicker, setShowTimePicker] = useState({ start: false, end: false });
  const [startPeriod, setStartPeriod] = useState("AM");
  const [endPeriod, setEndPeriod] = useState("AM");
  const [notFoundStudents, setNotFoundStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  const locations = [
    { name: "300 Ouellette", lat: 42.3173202, lon: -83.03854756613467 },
    { name: "Lambton Tower", lat: 42.3054306, lon: -83.06543525186542 },
    { name: "Erie Hall", lat: 42.3051429, lon: -83.06530275686814 }
  ];

  // Fetch all students on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/students");
        setAllStudents(response.data.students || []);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to fetch student list.");
      }
    };
    fetchStudents();
  }, []);

  const handleLocationChange = (e) => {
    const selectedLocation = locations.find(loc => loc.name === e.target.value);
    setFormData(prev => ({
      ...prev,
      locationName: e.target.value,
      latitude: selectedLocation ? selectedLocation.lat : "",
      longitude: selectedLocation ? selectedLocation.lon : ""
    }));
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        const uploadedEmails = result.data
          .map((row) => row[2]?.trim())
          .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

        const registered = [];
        const notFound = [];

        uploadedEmails.forEach(email => {
          const student = allStudents.find(s => s.email.toLowerCase() === email.toLowerCase());
          if (student) {
            registered.push(email);
          } else {
            notFound.push(email);
          }
        });

        setFormData(prev => ({ ...prev, registeredStudents: registered }));
        setNotFoundStudents(notFound);
      },
      header: false
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimeChange = (type, date, time, period) => {
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours);
    if (period === "PM" && hour < 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;
    const newTime = `${date}T${hour.toString().padStart(2, '0')}:${minutes}:00`;
    setFormData(prev => ({ ...prev, [type]: newTime }));
    if (type === "startTime") setStartPeriod(period);
    if (type === "endTime") setEndPeriod(period);
    setShowTimePicker(prev => ({ ...prev, [type === "startTime" ? "start" : "end"]: false }));
  };

  const validateForm = () => {
    const { name, description, startTime, endTime, latitude, longitude, radius } = formData;
    if (!name) return "Event name is required";
    if (!description) return "Description is required";
    if (!startTime) return "Start time is required";
    if (!endTime) return "End time is required";
    if (new Date(startTime) >= new Date(endTime)) return "End time must be after start time";
    if (!latitude || !longitude) return "Location selection is required";
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
        },
        radius: parseInt(formData.radius, 10),
        bufferMinutes: parseInt(formData.bufferMinutes, 10)
      };

      delete eventDetails.latitude;
      delete eventDetails.longitude;
      delete eventDetails.locationName;

      await axios.post("http://localhost:5000/admin/createevent", eventDetails);
      navigate("/");
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Failed to create event: " + (error.response?.data?.error || error.message));
    }
  };

  const TimeInput = ({ type, value, onChange }) => {
    const [date, setDate] = useState(value ? value.split("T")[0] : "");
    const [time, setTime] = useState(value ? value.split("T")[1]?.slice(0, 5) : "12:00");
    const [period, setPeriod] = useState(value ? (new Date(value).getHours() >= 12 ? "PM" : "AM") : "AM");

    const handleSave = () => {
      onChange(type, date, time, period);
    };

    return (
      <div className="absolute z-10 bg-white border border-[#58585a]/20 rounded-lg shadow-lg p-4 mt-2 w-64">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mb-2 w-full px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
        />
        <div className="flex items-center space-x-2">
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
          />
          <div className="flex space-x-1">
            <button
              type="button"
              onClick={() => setPeriod("AM")}
              className={`px-2 py-1 rounded-md text-sm ${period === "AM" ? "bg-[#054e85] text-white" : "bg-gray-200 text-[#58585a]"}`}
            >
              AM
            </button>
            <button
              type="button"
              onClick={() => setPeriod("PM")}
              className={`px-2 py-1 rounded-md text-sm ${period === "PM" ? "bg-black text-white" : "bg-gray-200 text-[#58585a]"}`}
            >
              PM
            </button>
          </div>
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
              <Edit size={20} className="text-[#054e85]" />
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
                <Clock size={20} className={startPeriod === "AM" ? "text-white" : "text-black"} style={{ backgroundColor: startPeriod === "AM" ? "#054e85" : "transparent", padding: "2px", borderRadius: "4px" }} />
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
                <TimeInput type="startTime" value={formData.startTime} onChange={handleTimeChange} />
              )}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
                <Clock size={20} className={endPeriod === "AM" ? "text-white" : "text-black"} style={{ backgroundColor: endPeriod === "AM" ? "#054e85" : "transparent", padding: "2px", borderRadius: "4px" }} />
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
                <TimeInput type="endTime" value={formData.endTime} onChange={handleTimeChange} />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
                <MapPin size={20} className="text-[#054e85]" />
                <span>Location</span>
              </label>
              <select
                name="locationName"
                value={formData.locationName}
                onChange={handleLocationChange}
                className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all duration-300"
                required
              >
                <option value="">Select a location</option>
                {locations.map(loc => (
                  <option key={loc.name} value={loc.name}>{loc.name}</option>
                ))}
              </select>
            </div>
            <InputField label="Radius (meters)" name="radius" type="number" value={formData.radius} onChange={handleChange} icon={<MapPin className="text-[#054e85]" />} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
              <FileSpreadsheet size={20} className="text-[#054e85]" />
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
              <div className="mt-4">
                <h3 className="text-sm font-medium text-[#58585a]">Registered Students ({formData.registeredStudents.length})</h3>
                <ul className="max-h-32 overflow-y-auto border border-[#58585a]/20 rounded-lg mt-2">
                  {formData.registeredStudents.map((email, index) => (
                    <li key={index} className="py-2 px-4 text-[#58585a]">{email}</li>
                  ))}
                </ul>
              </div>
            )}
            {notFoundStudents.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-red-600">Students Not Found ({notFoundStudents.length})</h3>
                <ul className="max-h-32 overflow-y-auto border border-red-200 rounded-lg mt-2">
                  {notFoundStudents.map((email, index) => (
                    <li key={index} className="py-2 px-4 text-red-600">{email}</li>
                  ))}
                </ul>
              </div>
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




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Papa from "papaparse";
// import { useNavigate } from "react-router-dom";
// import Clock from 'react-clock'; // Import react-clock
// import 'react-clock/dist/Clock.css'; // Import default styles
// import {
//   Calendar,
//   Clock as ClockIcon,
//   MapPin,
//   FileSpreadsheet,
//   Save,
//   Edit,
//   User
// } from 'lucide-react';

// const CreateEvent = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     startTime: "",
//     endTime: "",
//     radius: 10,
//     bufferMinutes: 10,
//     creator: "",
//     latitude: "",
//     longitude: "",
//     registeredStudents: [],
//     locationName: ""
//   });
//   const [error, setError] = useState("");
//   const [showTimePicker, setShowTimePicker] = useState({ start: false, end: false });
//   const [startPeriod, setStartPeriod] = useState("AM");
//   const [endPeriod, setEndPeriod] = useState("AM");
//   const [notFoundStudents, setNotFoundStudents] = useState([]);
//   const [allStudents, setAllStudents] = useState([]);

//   const locations = [
//     { name: "300 Ouellette", lat: 42.3173202, lon: -83.03854756613467 },
//     { name: "Lambton Tower", lat: 42.3054306, lon: -83.06543525186542 },
//     { name: "Erie Hall", lat: 42.3051429, lon: -83.06530275686814 }
//   ];

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/students");
//         setAllStudents(response.data.students || []);
//       } catch (err) {
//         console.error("Error fetching students:", err);
//         setError("Failed to fetch student list.");
//       }
//     };
//     fetchStudents();
//   }, []);

//   const handleLocationChange = (e) => {
//     const selectedLocation = locations.find(loc => loc.name === e.target.value);
//     setFormData(prev => ({
//       ...prev,
//       locationName: e.target.value,
//       latitude: selectedLocation ? selectedLocation.lat : "",
//       longitude: selectedLocation ? selectedLocation.lon : ""
//     }));
//   };

//   const handleCSVUpload = (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     Papa.parse(file, {
//       complete: (result) => {
//         const uploadedEmails = result.data
//           .map((row) => row[2]?.trim())
//           .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

//         const registered = [];
//         const notFound = [];

//         uploadedEmails.forEach(email => {
//           const student = allStudents.find(s => s.email.toLowerCase() === email.toLowerCase());
//           if (student) {
//             registered.push(email);
//           } else {
//             notFound.push(email);
//           }
//         });

//         setFormData(prev => ({ ...prev, registeredStudents: registered }));
//         setNotFoundStudents(notFound);
//       },
//       header: false
//     });
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleTimeChange = (type, value) => {
//     const hours = value.getHours();
//     const period = hours >= 12 ? "PM" : "AM";
//     setFormData(prev => ({ ...prev, [type]: value.toISOString() }));
//     if (type === "startTime") setStartPeriod(period);
//     if (type === "endTime") setEndPeriod(period);
//     setShowTimePicker(prev => ({ ...prev, [type === "startTime" ? "start" : "end"]: false }));
//   };

//   const validateForm = () => {
//     const { name, description, startTime, endTime, latitude, longitude, radius } = formData;
//     if (!name) return "Event name is required";
//     if (!description) return "Description is required";
//     if (!startTime) return "Start time is required";
//     if (!endTime) return "End time is required";
//     if (new Date(startTime) >= new Date(endTime)) return "End time must be after start time";
//     if (!latitude || !longitude) return "Location selection is required";
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
//           coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)]
//         },
//         radius: parseInt(formData.radius, 10),
//         bufferMinutes: parseInt(formData.bufferMinutes, 10)
//       };

//       delete eventDetails.latitude;
//       delete eventDetails.longitude;
//       delete eventDetails.locationName;

//       await axios.post("http://localhost:5000/admin/createevent", eventDetails);
//       navigate("/");
//     } catch (error) {
//       console.error("Error creating event:", error);
//       setError("Failed to create event: " + (error.response?.data?.error || error.message));
//     }
//   };

//   const AnalogTimePicker = ({ type, value, onChange }) => {
//     const [date, setDate] = useState(value ? value.split("T")[0] : "");
//     const [timeValue, setTimeValue] = useState(value ? new Date(value) : new Date());

//     const handleSave = () => {
//       onChange(type, timeValue);
//     };

//     return (
//       <div className="absolute z-10 bg-white border border-[#58585a]/20 rounded-lg shadow-lg p-4 mt-2 w-64">
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="mb-4 w-full px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
//         />
//         <Clock
//           value={timeValue}
//           onChange={(newValue) => setTimeValue(newValue)}
//           size={150}
//           renderNumbers={true}
//           renderMinuteMarks={true}
//           hourHandWidth={4}
//           minuteHandWidth={3}
//           secondHandWidth={0} // Hide second hand for simplicity
//         />
//         <div className="flex justify-center space-x-2 mt-4">
//           <button
//             type="button"
//             onClick={() => {
//               const hours = timeValue.getHours();
//               if (hours >= 12) {
//                 timeValue.setHours(hours - 12);
//                 setTimeValue(new Date(timeValue));
//               }
//             }}
//             className={`px-3 py-1 rounded-md text-sm ${timeValue.getHours() < 12 ? "bg-[#054e85] text-white" : "bg-gray-200 text-[#58585a]"}`}
//           >
//             AM
//           </button>
//           <button
//             type="button"
//             onClick={() => {
//               const hours = timeValue.getHours();
//               if (hours < 12) {
//                 timeValue.setHours(hours + 12);
//                 setTimeValue(new Date(timeValue));
//               }
//             }}
//             className={`px-3 py-1 rounded-md text-sm ${timeValue.getHours() >= 12 ? "bg-black text-white" : "bg-gray-200 text-[#58585a]"}`}
//           >
//             PM
//           </button>
//         </div>
//         <button
//           onClick={handleSave}
//           className="mt-4 w-full bg-[#fece00] text-[#054e85] px-3 py-1 rounded-md hover:bg-[#fece00]/80 transition-colors duration-300"
//         >
//           Set Time
//         </button>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-[#58585a]/20">
//         <div className="bg-[#054e85] p-6 flex items-center space-x-4">
//           <Calendar className="text-white" size={32} />
//           <h2 className="text-2xl font-bold text-white">Create New Event</h2>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {error && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2">
//               <span>{error}</span>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <InputField label="Event Name" name="name" value={formData.name} onChange={handleChange} icon={<Calendar className="text-[#054e85]" />} required />
//             <InputField label="Creator" name="creator" value={formData.creator} onChange={handleChange} icon={<User className="text-[#054e85]" />} />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//               <Edit size={20} className="text-[#054e85]" />
//               <span>Description</span>
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               placeholder="Event description"
//               required
//               className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all duration-300"
//               rows="4"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
//             <div className="relative">
//               <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//                 <ClockIcon size={20} className={startPeriod === "AM" ? "text-white" : "text-black"} style={{ backgroundColor: startPeriod === "AM" ? "#054e85" : "transparent", padding: "2px", borderRadius: "4px" }} />
//                 <span>Start Time</span>
//               </label>
//               <div
//                 className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg cursor-pointer flex items-center justify-between hover:bg-[#054e85]/5 transition-colors duration-300"
//                 onClick={() => setShowTimePicker(prev => ({ ...prev, start: !prev.start }))}
//               >
//                 <span>{formData.startTime ? new Date(formData.startTime).toLocaleString() : "Set start time"}</span>
//                 <ClockIcon size={16} className="text-[#054e85]" />
//               </div>
//               {showTimePicker.start && (
//                 <AnalogTimePicker type="startTime" value={formData.startTime} onChange={handleTimeChange} />
//               )}
//             </div>
//             <div className="relative">
//               <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//                 <ClockIcon size={20} className={endPeriod === "AM" ? "text-white" : "text-black"} style={{ backgroundColor: endPeriod === "AM" ? "#054e85" : "transparent", padding: "2px", borderRadius: "4px" }} />
//                 <span>End Time</span>
//               </label>
//               <div
//                 className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg cursor-pointer flex items-center justify-between hover:bg-[#054e85]/5 transition-colors duration-300"
//                 onClick={() => setShowTimePicker(prev => ({ ...prev, end: !prev.end }))}
//               >
//                 <span>{formData.endTime ? new Date(formData.endTime).toLocaleString() : "Set end time"}</span>
//                 <ClockIcon size={16} className="text-[#054e85]" />
//               </div>
//               {showTimePicker.end && (
//                 <AnalogTimePicker type="endTime" value={formData.endTime} onChange={handleTimeChange} />
//               )}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//                 <MapPin size={20} className="text-[#054e85]" />
//                 <span>Location</span>
//               </label>
//               <select
//                 name="locationName"
//                 value={formData.locationName}
//                 onChange={handleLocationChange}
//                 className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all duration-300"
//                 required
//               >
//                 <option value="">Select a location</option>
//                 {locations.map(loc => (
//                   <option key={loc.name} value={loc.name}>{loc.name}</option>
//                 ))}
//               </select>
//             </div>
//             <InputField label="Radius (meters)" name="radius" type="number" value={formData.radius} onChange={handleChange} icon={<MapPin className="text-[#054e85]" />} required />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//               <FileSpreadsheet size={20} className="text-[#054e85]" />
//               <span>Upload Registered Students (CSV)</span>
//             </label>
//             <input
//               type="file"
//               id="csvUpload"
//               accept=".csv"
//               onChange={handleCSVUpload}
//               className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-l-lg file:border-0 file:bg-[#fece00] file:text-[#054e85] hover:file:bg-[#fece00]/80 transition-colors duration-300"
//             />
//             {formData.registeredStudents.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-sm font-medium text-[#58585a]">Registered Students ({formData.registeredStudents.length})</h3>
//                 <ul className="max-h-32 overflow-y-auto border border-[#58585a]/20 rounded-lg mt-2">
//                   {formData.registeredStudents.map((email, index) => (
//                     <li key={index} className="py-2 px-4 text-[#58585a]">{email}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             {notFoundStudents.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-sm font-medium text-red-600">Students Not Found ({notFoundStudents.length})</h3>
//                 <ul className="max-h-32 overflow-y-auto border border-red-200 rounded-lg mt-2">
//                   {notFoundStudents.map((email, index) => (
//                     <li key={index} className="py-2 px-4 text-red-600">{email}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>

//           <InputField label="Buffer Minutes" name="bufferMinutes" type="number" value={formData.bufferMinutes} onChange={handleChange} icon={<ClockIcon className="text-[#054e85]" />} min="0" />

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="bg-[#fece00] text-[#054e85] px-5 py-2 rounded-lg hover:bg-[#fece00]/80 transition-colors duration-300 flex items-center space-x-2 font-medium"
//             >
//               <Save size={20} />
//               <span>Create Event</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Helper Component
// const InputField = ({ label, name, type = "text", value, onChange, icon, required, min, step }) => (
//   <div>
//     <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
//       {icon}
//       <span>{label}</span>
//     </label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={label}
//       required={required}
//       min={min}
//       step={step}
//       className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all duration-300"
//     />
//   </div>
// );

// export default CreateEvent;