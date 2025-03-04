// import React, { useState } from "react";
// import axios from "axios";
// import Papa from "papaparse";
// import { useNavigate } from "react-router-dom";

// const CreateEvent = () => {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         name: "",
//         description: "",
//         startTime: "",
//         endTime: "",
//         radius: "",
//         bufferMinutes: 10,
//         creator: "",
//         latitude: "",
//         longitude: "",
//         registeredStudents: []
//     });

//     const handleCSVUpload = (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         Papa.parse(file, {
//             complete: (result) => {
//                 const emails = result.data.map((row) => row[2]).filter(email => email);
//                 setFormData((prev) => ({ ...prev, registeredStudents: emails }));
//             },
//         });
//     };

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const eventDetails = {
//                 ...formData,
//                 startTime: new Date(formData.startTime).toISOString(),
//                 endTime: new Date(formData.endTime).toISOString(),
//                 location: { type: "Point", coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)] }
//             };
//             delete eventDetails.latitude;
//             delete eventDetails.longitude;

//             await axios.post("http://localhost:5000/admin/createevent", eventDetails);
//             navigate("/");
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg mt-6">
//             <h2 className="text-2xl font-bold mb-4">Create Event</h2>
//             <input type="text" name="name" placeholder="Event Name" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
//             <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full p-2 border rounded mb-2"></textarea>
//             <input type="datetime-local" name="startTime" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
//             <input type="datetime-local" name="endTime" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
//             <input type="number" name="radius" placeholder="Radius (meters)" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
//             <input type="number" name="bufferMinutes" placeholder="Buffer Minutes" onChange={handleChange} className="w-full p-2 border rounded mb-2" />
//             <input type="email" name="creator" placeholder="Creator Email" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
//             <input type="text" name="latitude" placeholder="Latitude" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
//             <input type="text" name="longitude" placeholder="Longitude" onChange={handleChange} required className="w-full p-2 border rounded mb-2" />
//             <input type="file" accept=".csv" onChange={handleCSVUpload} className="w-full p-2 border rounded mb-2" />
//             <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">Create Event</button>
//         </form>
//     );
// };

// export default CreateEvent;


























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
  const [error, setError] = useState("");

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        const emails = result.data
          .slice(1) // Skip header row if exists
          .map((row) => row[2]?.trim()) // Assuming email is in 3rd column
          .filter(email => email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)); // Basic email validation
        
        setFormData((prev) => ({ 
          ...prev, 
          registeredStudents: [...new Set(emails)] // Remove duplicates
        }));
      },
      header: false // Treat first row as data, not header
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const {
      name, description, startTime, endTime, 
      latitude, longitude, radius
    } = formData;

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
          coordinates: [
            parseFloat(formData.longitude), 
            parseFloat(formData.latitude)
          ]
        }
      };

      // Remove unnecessary fields
      delete eventDetails.latitude;
      delete eventDetails.longitude;

      await axios.post("http://localhost:5000/admin/createevent", eventDetails);
      navigate("/");
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-yellow-400 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-white">Create New Event</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Event Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter event name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="creator" className="block text-sm font-medium text-gray-700 mb-2">
                Creator
              </label>
              <input
                type="text"
                id="creator"
                name="creator"
                value={formData.creator}
                onChange={handleChange}
                placeholder="Enter creator name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Event description"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                Start Time
              </label>
              <input
                type="datetime-local"
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                End Time
              </label>
              <input
                type="datetime-local"
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                step="any"
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Latitude"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                step="any"
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Longitude"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-2">
                Radius (meters)
              </label>
              <input
                type="number"
                id="radius"
                name="radius"
                value={formData.radius}
                onChange={handleChange}
                placeholder="Event radius"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="csvUpload" className="block text-sm font-medium text-gray-700 mb-2">
              Upload Registered Students (CSV)
            </label>
            <input
              type="file"
              id="csvUpload"
              accept=".csv"
              onChange={handleCSVUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="bufferMinutes" className="block text-sm font-medium text-gray-700 mb-2">
              Buffer Minutes
            </label>
            <input
              type="number"
              id="bufferMinutes"
              name="bufferMinutes"
              value={formData.bufferMinutes}
              onChange={handleChange}
              min="0"
              placeholder="Buffer minutes"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
