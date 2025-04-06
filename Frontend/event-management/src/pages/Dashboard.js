import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [eventName, setEventName] = useState(""); // New state for event search
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the attendance report as JSON for display
  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:5000/api/attendance/attendance/report", {
        params: { startDate, endDate, eventName, format: "json" },
      });
      setReport(response.data);
    } catch (error) {
      setError("Failed to fetch attendance report.");
    } finally {
      setLoading(false);
    }
  };

  // Download the attendance report as XLSX
  const downloadXLSX = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/attendance/attendance/report", {
        params: { startDate, endDate, eventName },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Attendance_Report${eventName ? `_${eventName}` : ""}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setError("Failed to download attendance report.");
    } finally {
      setLoading(false);
    }
  };

  // Set preset date ranges and fetch report
  const setPresetRange = (range) => {
    switch (range) {
      case "fall2024":
        setStartDate("2024-08-01");
        setEndDate("2024-12-31");
        break;
      case "winter2025":
        setStartDate("2025-01-01");
        setEndDate("2025-04-30");
        break;
      case "summer2025":
        setStartDate("2025-05-01");
        setEndDate("2025-09-30");
        break;
      default:
        break;
    }
    fetchReport(); // Auto-fetch after setting range
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-[#054e85] mb-8 text-center">
          Attendance Dashboard
        </h1>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-[#58585a]/20">
          <div className="flex flex-col gap-6">
            {/* Date Inputs and Event Search */}
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#58585a] mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#58585a] mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#58585a] mb-1">Event Name</label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Search by event name..."
                  className="w-full px-3 py-2 border border-[#58585a]/30 rounded-lg focus:ring-2 focus:ring-[#054e85] transition-all"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setPresetRange("fall2024")}
                  className="bg-[#054e85] text-white px-4 py-2 rounded-lg hover:bg-[#054e85]/80 transition flex items-center"
                  disabled={loading}
                >
                  Fall 2024
                </button>
                <button
                  onClick={() => setPresetRange("winter2025")}
                  className="bg-[#054e85] text-white px-4 py-2 rounded-lg hover:bg-[#054e85]/80 transition flex items-center"
                  disabled={loading}
                >
                  Winter 2025
                </button>
                <button
                  onClick={() => setPresetRange("summer2025")}
                  className="bg-[#054e85] text-white px-4 py-2 rounded-lg hover:bg-[#054e85]/80 transition flex items-center"
                  disabled={loading}
                >
                  Summer 2025
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={fetchReport}
                  className="bg-[#054e85] text-white px-4 py-2 rounded-lg hover:bg-[#054e85]/80 transition flex items-center"
                  disabled={loading}
                >
                  {loading ? "Fetching..." : "Fetch Report"}
                </button>
                <button
                  onClick={downloadXLSX}
                  className="bg-[#fece00] text-[#054e85] px-4 py-2 rounded-lg hover:bg-[#fece00]/80 transition flex items-center gap-2"
                  disabled={loading}
                >
                  {loading ? "Downloading..." : "📥 Download XLSX"}
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}
        </div>

        {/* Report Table */}
        {report.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-[#58585a]/20 overflow-hidden">
            <div className="max-h-[70vh] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#054e85] sticky top-0 z-10">
                  <tr>
                    {report[0].map((header, index) => (
                      <th
                        key={index}
                        className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {report.slice(1).map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                        >
                          {cell || "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !report.length && (
          <div className="flex justify-center items-center mt-8">
            <div className="animate-pulse text-[#054e85]">
              <p className="text-center">Loading report...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;