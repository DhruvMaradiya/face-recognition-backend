import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`http://localhost:5000/admin/event/${id}`);
        console.log(response);
        if (!response.ok) throw new Error("Failed to fetch event");
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold">{event.name}</h1>
      <p className="text-gray-600">{event.description}</p>
      <p className="mt-2">
        <strong>Start:</strong> {new Date(event.startTime).toLocaleString()}
      </p>
      <p>
        <strong>End:</strong> {new Date(event.endTime).toLocaleString()}
      </p>
      <p>
        <strong>Radius:</strong> {event.radius} meters
      </p>
      <p>
        <strong>Buffer Time:</strong> {event.bufferMinutes} minutes
      </p>
      <p className="mt-4 font-semibold">
        Created by: {event.creator.fullName} ({event.creator.email})
      </p>
      <p className="mt-4 font-semibold">Registered Students:</p>
      <ul className="list-disc list-inside">
        {event.registeredStudents.map((student) => (
          <li key={student._id}>{student.email}</li>
        ))}
      </ul>
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={() => navigate("/")}
      >
        Back to Events
      </button>
    </div>
  );
};

export default EventDetails;
