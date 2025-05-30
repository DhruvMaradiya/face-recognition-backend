import React, { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock as ClockIcon,
  MapPin,
  FileSpreadsheet,
  Save,
  Edit,
  User
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL;


const CreateEvent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startDate: "",
    startTime: "12:00",
    startPeriod: "AM",
    endDate: "",
    endTime: "12:00",
    endPeriod: "AM",
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
  const [notFoundStudents, setNotFoundStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);

  const locations = [
    { name: "300 Ouellette", lat: 42.3173202, lon: -83.03854756613467 },
    { name: "Lambton Tower", lat: 42.3054306, lon: -83.06543525186542 },
    { name: "Erie Hall", lat: 42.3051429, lon: -83.06530275686814 }
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${API_URL}/students`);
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
      header: false,
      error: (err) => {
        console.error("CSV parsing error:", err);
        setError("Failed to parse CSV file");
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const TimePicker = ({ type, time, period, onChange }) => {
    const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
    const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

    const [selectedHour, setSelectedHour] = useState(time.split(':')[0] || "12");
    const [selectedMinute, setSelectedMinute] = useState(time.split(':')[1] || "00");

    const handleSave = () => {
      const newTime = `${selectedHour.padStart(2, '0')}:${selectedMinute}`;
      onChange(type, newTime, period);
      setShowTimePicker(prev => ({ ...prev, [type === "start" ? "start" : "end"]: false }));
    };

    return (
      <div className="absolute z-10 bg-white border border-[#58585a]/20 rounded-lg shadow-lg p-4 mt-2 w-64">
        <div className="flex space-x-2 mb-4 max-h-40">
          <div className="overflow-y-auto flex-1">
            {hours.map(hour => (
              <div
                key={hour}
                className={`p-2 cursor-pointer text-center ${selectedHour === hour ? 'bg-[#054e85] text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedHour(hour)}
              >
                {hour}
              </div>
            ))}
          </div>
          <div className="overflow-y-auto flex-1">
            {minutes.map(minute => (
              <div
                key={minute}
                className={`p-2 cursor-pointer text-center ${selectedMinute === minute ? 'bg-[#054e85] text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setSelectedMinute(minute)}
              >
                {minute}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-2 mb-4">
          <button
            type="button"
            onClick={() => onChange(type, `${selectedHour.padStart(2, '0')}:${selectedMinute}`, "AM")}
            className={`px-3 py-1 rounded-md text-sm ${period === "AM" ? "bg-[#054e85] text-white" : "bg-gray-200 text-[#58585a]"}`}
          >
            AM
          </button>
          <button
            type="button"
            onClick={() => onChange(type, `${selectedHour.padStart(2, '0')}:${selectedMinute}`, "PM")}
            className={`px-3 py-1 rounded-md text-sm ${period === "PM" ? "bg-[#054e85] text-white" : "bg-gray-200 text-[#58585a]"}`}
          >
            PM
          </button>
        </div>
        <button
          onClick={handleSave}
          className="w-full bg-[#fece00] text-[#054e85] px-3 py-1 rounded-md hover:bg-[#fece00]/80 transition-colors duration-300"
        >
          Set Time
        </button>
      </div>
    );
  };

  const handleTimeChange = (type, time, period) => {
    setFormData(prev => ({
      ...prev,
      [type === "start" ? "startTime" : "endTime"]: time,
      [type === "start" ? "startPeriod" : "endPeriod"]: period
    }));
  };

  const validateForm = () => {
    const { name, description, startDate, startTime, endDate, endTime, latitude, longitude, radius } = formData;
    if (!name) return "Event name is required";
    if (!description) return "Description is required";
    if (!startDate || !startTime) return "Start date and time are required";
    if (!endDate || !endTime) return "End date and time are required";

    const startDateTime = new Date(`${startDate} ${startTime} ${formData.startPeriod}`);
    const endDateTime = new Date(`${endDate} ${endTime} ${formData.endPeriod}`);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      return "Invalid date or time format";
    }
    if (startDateTime >= endDateTime) return "End time must be after start time";
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
      const startDateTime = new Date(`${formData.startDate} ${formData.startTime} ${formData.startPeriod}`);
      const endDateTime = new Date(`${formData.endDate} ${formData.endTime} ${formData.endPeriod}`);

      const eventDetails = {
        ...formData,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
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
      delete eventDetails.startDate;
      delete eventDetails.startPeriod;
      delete eventDetails.endDate;
      delete eventDetails.endPeriod;

      await axios.post(`${API_URL}/admin/createevent`, eventDetails);
      navigate("/");
    } catch (error) {
      console.error("Error creating event:", error);
      setError("Failed to create event: " + (error.response?.data?.error || error.message));
    }
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
            <div>
              <InputField
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                icon={<Calendar className="text-[#054e85]" />}
                required
              />
              <div className="mt-4 relative">
                <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
                  <ClockIcon size={20} className="text-[#054e85]" />
                  <span>Start Time</span>
                </label>
                <div
                  className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg cursor-pointer flex items-center justify-between hover:bg-[#054e85]/5 transition-colors duration-300"
                  onClick={() => setShowTimePicker(prev => ({ ...prev, start: !prev.start }))}
                >
                  <span>{`${formData.startTime} ${formData.startPeriod}`}</span>
                  <ClockIcon size={16} className="text-[#054e85]" />
                </div>
                {showTimePicker.start && (
                  <TimePicker
                    type="start"
                    time={formData.startTime}
                    period={formData.startPeriod}
                    onChange={handleTimeChange}
                  />
                )}
              </div>
            </div>
            <div>
              <InputField
                label="End Date"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                icon={<Calendar className="text-[#054e85]" />}
                required
              />
              <div className="mt-4 relative">
                <label className="block text-sm font-medium text-[#58585a] mb-2 flex items-center space-x-2">
                  <ClockIcon size={20} className="text-[#054e85]" />
                  <span>End Time</span>
                </label>
                <div
                  className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg cursor-pointer flex items-center justify-between hover:bg-[#054e85]/5 transition-colors duration-300"
                  onClick={() => setShowTimePicker(prev => ({ ...prev, end: !prev.end }))}
                >
                  <span>{`${formData.endTime} ${formData.endPeriod}`}</span>
                  <ClockIcon size={16} className="text-[#054e85]" />
                </div>
                {showTimePicker.end && (
                  <TimePicker
                    type="end"
                    time={formData.endTime}
                    period={formData.endPeriod}
                    onChange={handleTimeChange}
                  />
                )}
              </div>
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
            <InputField
              label="Radius (meters)"
              name="radius"
              type="number"
              value={formData.radius}
              onChange={handleChange}
              icon={<MapPin className="text-[#054e85]" />}
              required
            />
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

          <InputField
            label="Buffer Minutes"
            name="bufferMinutes"
            type="number"
            value={formData.bufferMinutes}
            onChange={handleChange}
            icon={<ClockIcon className="text-[#054e85]" />}
            min="0"
          />

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