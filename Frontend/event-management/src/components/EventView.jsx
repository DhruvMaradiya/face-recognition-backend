// EventView.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, ArrowLeft, Edit, Trash2, Search } from "lucide-react";

const EventView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log("Fetching event with ID:", id);
        const res = await fetch(`http://localhost:5000/admin/event/${id}`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        console.log("Fetched event data:", data); // Log the full response
        setEvent(data);
        setFilteredStudents(data.registeredStudents || []); // Default to empty array if undefined
      } catch (err) {
        console.error("Failed to fetch event:", err.message);
        setEvent({ error: "Failed to load event details" });
      }
    };
    fetchEvent();
  }, [id]);

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

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!event || !event.registeredStudents) {
      console.log("Event or registeredStudents not yet loaded");
      setFilteredStudents([]);
      return;
    }

    if (!query) {
      setFilteredStudents(event.registeredStudents);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = event.registeredStudents.filter((student) => {
        const email = student.email || ""; // Default to empty string if undefined
        const fullName = student.fullName || student.name || ""; // Check for 'name' as fallback
        return (
          email.toLowerCase().includes(lowerQuery) ||
          fullName.toLowerCase().includes(lowerQuery)
        );
      });
      console.log("Filtered students:", filtered); // Debug log
      setFilteredStudents(filtered);
    }
  };

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
        <div className="bg-[#054e85] p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="text-white" size={32} />
            <h1 className="text-2xl font-bold text-white">{event.name}</h1>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate(`/event/edit/${id}`)}
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
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Clock size={20} className="text-[#054e85]" />
                <label className="font-semibold text-gray-700">Start Time</label>
              </div>
              <p>{new Date(event.startTime).toLocaleString()}</p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Clock size={20} className="text-[#054e85]" />
                <label className="font-semibold text-gray-700">End Time</label>
              </div>
              <p>{new Date(event.endTime).toLocaleString()}</p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <MapPin size={20} className="text-[#054e85]" />
                <label className="font-semibold text-gray-700">Radius</label>
              </div>
              <p>{event.radius} meters</p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Clock size={20} className="text-[#054e85]" />
                <label className="font-semibold text-gray-700">Buffer Minutes</label>
              </div>
              <p>{event.bufferMinutes} minutes</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center space-x-2 mb-4">
              <Users size={20} className="text-[#054e85]" />
              <h3 className="font-semibold text-gray-700">Registered Students</h3>
              <span className="bg-[#fece00]/20 text-[#054e85] px-2 py-1 rounded-full text-xs">
                {event.registeredStudents.length}
              </span>
            </div>

            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] pl-10"
                />
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#054e85]" />
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto border border-[#58585a]/20 rounded-lg">
              <ul className="divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <li key={student._id || student.email} className="py-2 px-4 flex justify-between items-center">
                      <div>
                        {/* Use fullName if available, otherwise omit or use email */}
                        {student.fullName ? (
                          <p className="font-medium">{student.fullName}</p>
                        ) : null}
                        <p className="text-sm text-gray-600">{student.email || "N/A"}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="py-2 px-4 text-gray-500">No students match your search.</li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex space-x-2">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition flex items-center space-x-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={20} />
              <span>Back to Events</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventView;