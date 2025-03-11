const Student = require('../models/User');
const Event = require('../models/Event');
const Attendance = require('../models/Attendance');
const { Parser } = require('json2csv');

const generateReport = async (req, res) => {
    try {
        // Fetch all students
        const students = await Student.find();

        // Fetch all events
        const events = await Event.find();

        // Create an array to hold the report data
        const reportData = [];

        // Loop through each student
        for (const student of students) {
            const studentData = {
                student_id: student.studentId,
                Total: 0
            };

            // Loop through each event
            for (const event of events) {
                // Check if the student attended the event
                const attendanceRecord = await Attendance.findOne({ student: student._id, event: event._id });
                studentData[event.name] = attendanceRecord ? 1 : 0;
                studentData.Total += attendanceRecord ? 1 : 0;
            }

            reportData.push(studentData);
        }

        // Create a new CSV parser
        const parser = new Parser({ header: true, fields: Object.keys(reportData[0]) });
        const csv = parser.parse(reportData);

        // Set the response headers for a CSV file
        res.setHeader('Content-disposition', 'attachment; filename=attendance_report.csv');
        res.set('Content-Type', 'text/csv');

        // Send the CSV data
        res.send(csv);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { generateReport };