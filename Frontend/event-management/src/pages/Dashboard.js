// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// const Dashboard = () => {
//     const [report, setReport] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
    
//     useEffect(() => {
//         axios.get("http://localhost:5000/api/attendance/attendance/report")
//             .then((res) => setReport(res.data))
//             .catch((err) => setError(err.message))
//             .finally(() => setLoading(false));

           
//     }, []);

// }

// //     const downloadXLSX = () => {
// //         if (report.length === 0) {
// //             alert("No attendance data to download.");
// //             return;
// //         }

// //         // Convert JSON to Worksheet
// //         const worksheet = XLSX.utils.json_to_sheet(report);

// //         // Create Workbook and append worksheet
// //         const workbook = XLSX.utils.book_new();
// //         XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance Report");

// //         // Write Excel file and trigger download
// //         const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
// //         const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
// //         saveAs(data, "Attendance_Report.xlsx");
// //     };

// //     if (loading) return <p>Loading attendance data...</p>;
// //     if (error) return <p>Error: {error}</p>;

// //     return (
// //         <div className="container mx-auto px-4 py-8 text-center">
// //             <h1 className="text-2xl font-bold mb-4">Attendance Dashboard</h1>
// //             <button 
// //                 onClick={downloadXLSX} 
// //                 className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
// //             >
// //                 📥 Download as Excel (.xlsx)
// //             </button>
// //         </div>
// //     );
// // };

// // export default Dashboard;

// const downloadXLSX = async () => {
//     try {
//         const response = await axios.get("http://localhost:5000/api/attendance/attendance/report", {
//             responseType: "blob",
//         });

//         console.log(response)

//         // Create a download link
//         const url = window.URL.createObjectURL(new Blob([response.data]));
//         const link = document.createElement("a");
//         link.href = url;
//         link.setAttribute("download", "Attendance_Report.xlsx");
//         document.body.appendChild(link);
//         link.click();
//     } catch (error) {
//         alert("Failed to download attendance report.");
//     }
// };
// export default Dashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const downloadXLSX = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:5000/api/attendance/attendance/report", {
                responseType: "blob", // Ensures proper file handling
            });

            // Create a download link for the file
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Attendance_Report.xlsx");
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            setError("Failed to download attendance report.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Attendance Dashboard</h1>
            {error && <p className="text-red-500">{error}</p>}
            <button 
                onClick={downloadXLSX} 
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                disabled={loading}
            >
                {loading ? "Downloading..." : "📥 Download Attendance Report"}
            </button>
        </div>
    );
};

export default Dashboard;
