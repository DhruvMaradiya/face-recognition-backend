// EventEdit.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import {
  Calendar,
  Edit,
  MapPin,
  Clock,
  Users,
  Plus,
  FileSpreadsheet,
  Save,
  X,
} from "lucide-react";

const EventEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({});
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [showTimePicker, setShowTimePicker] = useState({ start: false, end: false });
  const [studentSuggestions, setStudentSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log("Fetching event with ID:", id);
        const res = await fetch(`http://localhost:5000/admin/event/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        console.log("Fetched event data:", data);
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
      } catch (err) {
        console.error("Failed to fetch event:", err.message);
        setEvent({ error: "Failed to load event details" });
      }
    };
    fetchEvent();
  }, [id]);

  // Debounced search function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchStudentSuggestions = async (query) => {
    if (!query) {
      setStudentSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const queryParams = new URLSearchParams({ search: query }).toString();
      const res = await fetch(`http://localhost:5000/students?${queryParams}`);
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      setStudentSuggestions(data.students || []);
      setShowSuggestions(true);
    } catch (err) {
      console.error("Error fetching student suggestions:", err);
      setStudentSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const debouncedFetchSuggestions = debounce(fetchStudentSuggestions, 300);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTimeChange = (type, time) => {
    setFormData((prev) => ({ ...prev, [type]: time }));
    setShowTimePicker((prev) => ({ ...prev, [type === "startTime" ? "start" : "end"]: false }));
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
      alert("Event updated successfully!");
      navigate(`/admin/event/${id}`);
    } catch (err) {
      alert("Error updating event: " + err.message);
    }
  };

  const handleAddEmail = async (emailToAdd) => {
    const email = emailToAdd || newEmail;
    if (!email) {
      alert("Please enter or select an email address");
      return;
    }
    if (emails.includes(email)) {
      alert("This student is already registered for the event");
      return;
    }
    try {
      const response = await fetch(`http://localhost:5000/students/email/${email}`);
      if (!response.ok) {
        alert("Student not found");
        return;
      }
      const registerResponse = await fetch("http://localhost:5000/students/register-to-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, eventId: id }),
      });
      if (!registerResponse.ok) {
        const errorData = await registerResponse.json();
        alert("Failed to register student to event: " + errorData.error);
        return;
      }
      setEmails([...emails, email]);
      setFormData({ ...formData, registeredStudents: [...emails, email] });
      setNewEmail("");
      setShowSuggestions(false);
    } catch (err) {
      alert("Error adding student: " + err.message);
    }
  };

  const handleRemoveEmail = async (email) => {
    if (!window.confirm(`Are you sure you want to remove ${email}?`)) return;
    try {
      const response = await fetch("http://localhost:5000/students/remove-from-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, eventId: id }),
      });
      if (!response.ok) {
        const errorData = await response.json(); // Fix: Use 'response' here
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

  const TimePicker = ({ type, value, onChange }) => {
    const [date, setDate] = useState(value ? new Date(value) : new Date());
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

    const handleSave = () => {
      const newTime = `${date.toISOString().split("T")[0]}T${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:00`;
      onChange(type, newTime);
    };

    return (
      <div className="absolute z-10 bg-white border border-[#58585a]/20 rounded-lg shadow-lg p-4 mt-2">
        <input
          type="date"
          value={date.toISOString().split("T")[0]}
          onChange={(e) => setDate(new Date(e.target.value))}
          className="mb-2 w-full px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
        />
        <div className="grid grid-cols-2 gap-2">
          <select
            value={date.getHours().toString().padStart(2, "0")}
            onChange={(e) => setDate(new Date(date.setHours(parseInt(e.target.value))))}
            className="px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
          >
            {hours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select
            value={date.getMinutes().toString().padStart(2, "0")}
            onChange={(e) => setDate(new Date(date.setMinutes(parseInt(e.target.value))))}
            className="px-2 py-1 border border-[#58585a]/30 rounded-md focus:ring-2 focus:ring-[#054e85]"
          >
            {minutes.map((min) => (
              <option key={min} value={min}>
                {min}
              </option>
            ))}
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

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-[#054e85]">
          <Calendar size={48} className="mx-auto mb-4" />
          <p className="text-center">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (event.error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">{event.error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-[#58585a]/20">
        <div className="bg-[#054e85] p-6 flex items-center space-x-4">
          <Calendar className="text-white" size={32} />
          <h1 className="text-2xl font-bold text-white">Edit Event: {event.name}</h1>
        </div>

        <form onSubmit={handleUpdate} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Event Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              icon={<Calendar className="text-[#054e85]" />}
              required
            />
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
                onClick={() => setShowTimePicker((prev) => ({ ...prev, start: !prev.start }))}
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
                onClick={() => setShowTimePicker((prev) => ({ ...prev, end: !prev.end }))}
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
            <InputField
              label="Buffer Minutes"
              name="bufferMinutes"
              type="number"
              value={formData.bufferMinutes}
              onChange={handleChange}
              icon={<Clock className="text-[#054e85]" />}
              min="0"
            />
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

            <div className="max-h-64 overflow-y-auto border border-[#58585a]/20 rounded-lg mb-4">
              <ul className="divide-y divide-[#58585a]/20">
                {emails.map((email, index) => (
                  <li key={index} className="py-2 px-4 flex justify-between items-center">
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
            </div>

            <div className="relative">
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Search or Add Student Email"
                  value={newEmail}
                  onChange={(e) => {
                    setNewEmail(e.target.value);
                    debouncedFetchSuggestions(e.target.value);
                  }}
                  onFocus={() => newEmail && setShowSuggestions(true)}
                  className="flex-1 px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85]"
                />
                <button
                  type="button"
                  onClick={() => handleAddEmail()}
                  className="bg-[#fece00] text-[#054e85] px-4 py-2 rounded-lg hover:bg-[#fece00]/80 transition flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add</span>
                </button>
              </div>
              {showSuggestions && studentSuggestions.length > 0 && (
                <ul className="absolute z-10 w-full max-h-48 overflow-y-auto bg-white border border-[#58585a]/20 rounded-lg shadow-lg mt-1">
                  {studentSuggestions.map((student) => (
                    <li
                      key={student.email}
                      className="px-4 py-2 hover:bg-[#054e85]/5 cursor-pointer flex justify-between items-center"
                      onClick={() => {
                        setNewEmail(student.email);
                        handleAddEmail(student.email);
                      }}
                    >
                      <span>{student.email}</span>
                      <span className="text-sm text-gray-500">{student.fullName}</span>
                    </li>
                  ))}
                </ul>
              )}
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
              onClick={() => navigate(`/admin/event/${id}`)}
            >
              <X size={20} />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventEdit;